import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {ProductService} from "../../shared/model/product/product.service";
import {Observable, tap} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared/model/user/user.service";
import {User} from "../../shared/model/user/user";
import {
  onlyNumbersValidator,
  onlyNumbersValidatorBankCard,
  onlyNumbersValidatorExpireDate
} from "../../shared/util/validators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getProductUrl} from "../products/products.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  showBankCard = false;
  modalRef?: BsModalRef;
  products: Product[] = [];
  displayedColumns = ['name', 'count', 'price', 'delete']
  bankCardNumbers: string = '';
  expireDate: string = '';
  isLoading = false;
  emptyCart = true;
  deliveryAddress: FormGroup;
  paymentInfo: FormGroup;
  imageLink: Observable<string>;

  constructor(private productService: ProductService, private modalService: BsModalService, private formBuilder: FormBuilder,
              private authService: AuthService, private router: Router, private userService: UserService, public storage: AngularFireStorage) {
    this.isLoading = true;
    this.productService.getProducts('Cart')?.pipe(
      tap(products => {
        if (products) {
          const productArray = Object.values(products);
          this.products = Object.values(productArray[0]);
          this.products.sort((product1, product2) => product1.brand.localeCompare(product2.brand));
          this.emptyCart = false;
        } else {
          this.products = [];
        }
      }),
    ).subscribe(() => this.isLoading = false);

    this.deliveryAddress = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', [Validators.required, onlyNumbersValidator()]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.paymentInfo = this.formBuilder.group({
      bankCard: [''],
      expireTime: [''],
      cvc: [''],
      payingWithCard: ['', Validators.required],
    });

    this.imageLink = this.storage.ref('delivery.png').getDownloadURL();
  }

  removeFromCart(id: string) {
    this.isLoading = true;
    this.productService.deleteProduct(id, 'Cart').subscribe(isLoading => this.isLoading = isLoading);
  }

  addToCart(id: string) {
    this.isLoading = true;
    this.productService.incrementProductCount(id, 'Cart').subscribe(isLoading => this.isLoading = isLoading);
  }

  openPayingModal(template: TemplateRef<any>) {
    let user = this.authService.getLoggedInUser();
    if (user) {
      this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    let loggedInUser = localStorage.getItem('user');
    if(loggedInUser){
      let user: User = JSON.parse(loggedInUser);
      this.userService.getById(user.uid).subscribe(user => {
        if(user){
          this.deliveryAddress.get('firstName')?.patchValue(user?.firstname);
          this.deliveryAddress.get('lastName')?.patchValue(user?.lastname);
        }
      });
    }
    this.paymentInfo.get('payingWithCard')?.valueChanges.subscribe(value =>
      {
        this.showBankCard = value;
        const bankCardControl = this.paymentInfo.get('bankCard');
        const expireTimeControl = this.paymentInfo.get('expireTime');
        const cvcControl = this.paymentInfo.get('cvc');
        if(this.showBankCard){
          bankCardControl?.clearValidators();
          bankCardControl?.setValidators([onlyNumbersValidatorBankCard(), Validators.maxLength(19), Validators.minLength(19), Validators.required]);
          bankCardControl?.updateValueAndValidity();

          expireTimeControl?.clearValidators();
          expireTimeControl?.setValidators([onlyNumbersValidatorExpireDate(), Validators.required]);
          expireTimeControl?.updateValueAndValidity();

          cvcControl?.clearValidators();
          cvcControl?.setValidators([onlyNumbersValidator(), Validators.required]);
          cvcControl?.updateValueAndValidity();
        }else{
          bankCardControl?.clearValidators();
          bankCardControl?.updateValueAndValidity();
          expireTimeControl?.clearValidators();
          expireTimeControl?.updateValueAndValidity();
          cvcControl?.clearValidators();
          cvcControl?.updateValueAndValidity();
        }
      });
  }

  addSpaceBetween(bankCard: string) {
    bankCard = bankCard.replace(/[^0-9]/g, '');
    const regex = /^(\d{4})(\d{4})(\d{4})(\d{1,})$/;
    this.bankCardNumbers = bankCard.replace(regex, '$1 $2 $3 $4');
  }
  addSlashBetween(expireDate: string) {
    expireDate = expireDate.replace(/[^0-9]/g, '');
    this.expireDate = expireDate.replace(/(\d{2})(?=\d)/g, '$1/');
  }

  getTotalPrice(): number {
    let totalPrice =  this.products.reduce((total, product) => total + (product.count * product.price), 0);
    if(totalPrice === 0){
      this.emptyCart = true;
    }
    return totalPrice;
  }

  clearCart() {
    if(this.products){
      this.isLoading = true;
      this.productService.delete()?.finally(() => this.isLoading = false);
      this.emptyCart = true;
    }
  }

  protected readonly getProductUrl = getProductUrl;
}

