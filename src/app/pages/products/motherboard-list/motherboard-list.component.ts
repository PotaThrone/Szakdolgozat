import {Component, Input, OnInit} from '@angular/core';
import {map} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {MotherboardEditComponent} from "../motherboard-edit/motherboard-edit.component";
import {ProductType} from "../../../shared/model/product/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Role} from "../../../shared/model/user/user";

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.scss']
})
export class MotherboardListComponent implements OnInit{
  @Input() userRole!: number;
  motherboards: Motherboard[] = [];
  filteredMotherboards: Motherboard[] = [];
  bsModalRef?: BsModalRef;
  isLoading = false;
  searchForm: FormGroup;

  constructor(private motherboardService: MotherboardService, private cartService: CartService, private productService: ProductService,
              private modalService: BsModalService, private router: Router, private fb: FormBuilder) {
    this.isLoading = true;
    this.motherboardService.getAll().pipe(
      map(motherboards => motherboards.filter(motherboard => motherboard.id != null)),
    ).subscribe(motherboards => {
      this.motherboards = motherboards;
      this.filteredMotherboards = motherboards;
      this.isLoading = false;
    });
    this.searchForm = this.fb.group({
      searchTerm: new FormControl(),
    });
  }

  openCart(motherboard: Motherboard) {
    this.isLoading = true;
    this.cartService.openCart(motherboard, ProductType.MOTHERBOARD).subscribe(isLoading => this.isLoading = isLoading);
  }

  addToFavorites(motherboard: Motherboard) {
    this.isLoading = true;
    this.productService.addProductToFavorites(motherboard, ProductType.MOTHERBOARD).subscribe(isLoading => this.isLoading = isLoading);
  }

  openMotherboardEdit(motherboard: Motherboard | null) {
    let title = "Alaplap hozzáadása";
    if(motherboard){
      title = "Alaplap módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        motherboard: motherboard,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(MotherboardEditComponent, initialState);
  }

  navigateToProduct(motherboard: Motherboard) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.MOTHERBOARD + motherboard.id}});
  }

  delete(motherboard: Motherboard) {
     this.motherboardService.delete(motherboard.id);
  }
  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(searchTerm => {
      this.filteredMotherboards = this.motherboards.filter(motherboard => motherboard.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }

  protected readonly Role = Role;
}
