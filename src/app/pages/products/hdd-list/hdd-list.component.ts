import {Component, Input} from '@angular/core';
import {map, tap} from "rxjs";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {Hdd} from "../../../shared/model/hdd/hdd";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {GpuEditComponent} from "../gpu-edit/gpu-edit.component";
import {Router} from "@angular/router";
import {HddEditComponent} from "../hdd-edit/hdd-edit.component";
import {ProductType} from "../../../shared/model/product/product";

@Component({
  selector: 'app-hdd-list',
  templateUrl: './hdd-list.component.html',
  styleUrls: ['./hdd-list.component.scss']
})
export class HddListComponent {
  @Input()
  hdds: Hdd[] = [];
  bsModalRef?: BsModalRef;

  constructor(private hddService: HddService, private cartService: CartService, private productService: ProductService, private modalService: BsModalService,
              private router: Router) {}

  openCart(hdd: Hdd) {
    this.cartService.openCart(hdd, ProductType.HDD);
  }

  addToFavorites(hdd: Hdd) {
    this.productService.addProductToFavorites(hdd, ProductType.HDD);
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
}
