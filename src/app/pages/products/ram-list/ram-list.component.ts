import {Component, Input, OnInit} from '@angular/core';
import {map} from "rxjs";
import {Ram} from "../../../shared/model/ram/ram";
import {RamService} from "../../../shared/model/ram/ram.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {RamEditComponent} from "../ram-edit/ram-edit.component";
import {ProductType} from "../../../shared/model/product/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss']
})
export class RamListComponent implements OnInit{
  rams: Ram[] = [];
  filteredRams: Ram[] = [];
  bsModalRef?: BsModalRef;
  isLoading = false;
  searchForm: FormGroup;
  constructor(private ramService: RamService, private cartService: CartService,  private productService: ProductService,
              private modalService: BsModalService, private router: Router, private fb: FormBuilder) {
    this.ramService.getAll().pipe(
      map(rams => rams.filter(ram => ram.id != null)),
    ).subscribe(rams => {
      this.rams = rams;
      this.filteredRams = rams;
    });
    this.searchForm = this.fb.group({
      searchTerm: new FormControl(),
    });
  }

  openCart(ram: Ram) {
    this.isLoading = true;
    this.cartService.openCart(ram, ProductType.RAM).subscribe(isLoading => this.isLoading = isLoading);
  }

  addToFavorites(ram: Ram) {
    this.isLoading = true;
    this.productService.addProductToFavorites(ram,  ProductType.RAM).subscribe(isLoading => this.isLoading = isLoading);
  }

  openRamEdit(ram: Ram | null) {
    let title = "RAM hozzáadása";
    if(ram){
      title = "RAM módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        ram: ram,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(RamEditComponent, initialState);
  }

  navigateToProduct(ram: Ram) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.RAM + ram.id}});
  }

  delete(ram: Ram) {
    this.ramService.delete(ram.id);
  }
  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(searchTerm => {
      this.filteredRams = this.rams.filter(ram => ram.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
}
