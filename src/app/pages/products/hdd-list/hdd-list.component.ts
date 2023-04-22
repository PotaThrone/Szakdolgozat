import {Component, Input, OnInit} from '@angular/core';
import {map, tap} from "rxjs";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {Hdd} from "../../../shared/model/hdd/hdd";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {GpuEditComponent} from "../gpu-edit/gpu-edit.component";
import {Router} from "@angular/router";
import {HddEditComponent} from "../hdd-edit/hdd-edit.component";
import {CollectionName, ProductType} from "../../../shared/model/product/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-hdd-list',
  templateUrl: './hdd-list.component.html',
  styleUrls: ['./hdd-list.component.scss']
})
export class HddListComponent implements OnInit{
  hdds: Hdd[] = [];
  filteredHdds: Hdd[] = [];
  bsModalRef?: BsModalRef;
  isLoading = false;
  searchForm: FormGroup;

  constructor(private hddService: HddService, private cartService: CartService, private productService: ProductService, private modalService: BsModalService,
              private router: Router, private fb: FormBuilder) {
    this.hddService.getAll().pipe(
      map(hdds => hdds.filter(hdd => hdd.id != null)),
    ).subscribe(hdds => {
      this.hdds = hdds;
      this.filteredHdds = hdds;
    });
    this.searchForm = this.fb.group({
      searchTerm: new FormControl(),
    });
  }

  openCart(hdd: Hdd) {
    this.isLoading = true;
    this.cartService.openCart(hdd, ProductType.HDD).subscribe(isLoading => this.isLoading = isLoading);
  }

  addToFavorites(hdd: Hdd) {
    this.isLoading = true;
    this.productService.addProductToFavorites(hdd, ProductType.HDD).subscribe(isLoading => this.isLoading = isLoading);
  }

  openHddEdit(hdd: Hdd | null) {
    let title = "Merevlemez hozzáadása";
    if (hdd) {
      title = "Merevlemez módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        hdd: hdd,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(HddEditComponent, initialState);
  }

  navigateToProduct(hdd: Hdd) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.HDD + hdd.id}});
  }

  delete(hdd: Hdd) {
     this.hddService.delete(hdd.id);
  }
  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(searchTerm => {
      this.filteredHdds = this.hdds.filter(hdd => hdd.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
}
