import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {ProductService} from "../../shared/model/product/product.service";
import {tap} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared/model/user/user.service";
import {User} from "../../shared/model/user/user";
import {
  onlyNumbersValidator,
  onlyNumbersValidatorBankCard,
  onlyNumbersValidatorExpireDate
} from "../../shared/util/validators";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  firstFormGroup = this.formBuilder.group({
    city: ['', Validators.required],
    street: ['', Validators.required],
    postalCode: ['', [Validators.required, onlyNumbersValidator()]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    bankCard: ['', [Validators.required, onlyNumbersValidatorBankCard(), Validators.maxLength(19)]],
    expireTime: ['', [Validators.required, onlyNumbersValidatorExpireDate()]],
    cvc: ['', [Validators.required, onlyNumbersValidator()]],
    payMethod: [''],
  });

  showBankCard = false;
  loggedInUser?: firebase.default.User | null;
  modalRef?: BsModalRef;
  products: Product[] = [];
  displayedColumns = ['name', 'description', 'count', 'price', 'delete']
  bankCardNumbers: string = '';
  expireDate: string = '';
  isLoading = false;

  constructor(private productService: ProductService, private modalService: BsModalService, private formBuilder: FormBuilder,
              private authService: AuthService, private router: Router, private userService: UserService) {
    this.productService.getProducts('Cart')?.pipe(
      tap(products => {
        if (products) {
          const productArray = Object.values(products);
          this.products = Object.values(productArray[0]);
          this.products.sort((product1, product2) => product1.brand.localeCompare(product2.brand));
        } else {
          this.products = [];
        }
      }),
    ).subscribe();
  }

  removeFromCart(id: string) {
    this.isLoading = true;
    this.productService.deleteProduct(id, 'Cart').subscribe(isLoading => this.isLoading = isLoading);
  }

  openPayingModal(template: TemplateRef<any>) {
    if (this.loggedInUser) {
      this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
    } else {
      this.router.navigateByUrl('/login');
    }
  }



  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      localStorage.setItem('user', JSON.stringify(null));
    });
    let loggedInUser = localStorage.getItem('user');
    if(loggedInUser){
      let user: User = JSON.parse(loggedInUser);
      this.userService.getById(user.uid).subscribe(user => {
        if(user){
          this.firstFormGroup.controls.firstName.patchValue(user?.firstname);
          this.firstFormGroup.controls.lastName.patchValue(user?.lastname);
        }
      });
    }
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
    return this.products.reduce((total, product) => total + (product.count * product.price), 0);
  }
}

