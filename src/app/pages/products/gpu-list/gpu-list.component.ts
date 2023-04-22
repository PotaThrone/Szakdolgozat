import {Component, OnInit} from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {GpuEditComponent} from "../gpu-edit/gpu-edit.component";
import {Router} from "@angular/router";
import {ProductType} from "../../../shared/model/product/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map} from "rxjs";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent implements OnInit{
  gpus: Gpu[] = [];
  filteredGpus: Gpu[] = [];
  bsModalRef?: BsModalRef;
  isLoading = false;
  searchForm: FormGroup;

  constructor(private gpuService: GpuService, private cartService: CartService, private productService: ProductService,
              private modalService: BsModalService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: new FormControl(),
    });
    this.gpuService.getAll().pipe(
      map(gpus => gpus.filter(gpu => gpu.id != null)),
    ).subscribe(gpus => {
      this.gpus = gpus;
      this.filteredGpus = gpus;
    });
  }

  openCart(gpu: Gpu) {
    this.isLoading = true;
    this.cartService.openCart(gpu, 'gpu').subscribe(isLoading => this.isLoading = isLoading);
  }

  addToFavorites(gpu: Gpu) {
    this.isLoading = true;
    this.productService.addProductToFavorites(gpu, 'gpu').subscribe(isLoading => this.isLoading = isLoading);
  }

  openGpuEdit(gpu: Gpu | null) {
    let title = "Videokártya hozzáadása";
    if (gpu) {
      title = "Videokártya módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        gpu: gpu,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(GpuEditComponent, initialState);
  }

  navigateToProduct(gpu: Gpu) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.GPU + gpu.id}});
  }

  delete(gpu: Gpu) {
    this.gpuService.delete(gpu.id);
  }
  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(searchTerm => {
      this.filteredGpus = this.gpus.filter(gpu => gpu.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
}
