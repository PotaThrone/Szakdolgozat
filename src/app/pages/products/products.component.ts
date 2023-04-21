import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Gpu} from "../../shared/model/gpu/gpu";
import {CollectionName, Product, ProductType} from "../../shared/model/product/product";
import {map, take} from "rxjs";
import {GpuService} from "../../shared/model/gpu/gpu.service";
import {ProductService} from "../../shared/model/product/product.service";
import {Hdd} from "../../shared/model/hdd/hdd";
import {Ram} from "../../shared/model/ram/ram";
import {Motherboard} from "../../shared/model/motherboard/motherboard";
import {Processor} from "../../shared/model/processor/processor";
import {CartService} from "../cart/cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  category?: string | null;
  product?: string | null;
  gpus: Gpu[] = [];
  hdds: Hdd[] = [];
  rams: Ram[] = [];
  motherboards: Motherboard[] = [];
  processors: Processor[] = [];
  selectedGpu?: Gpu;
  selectedHdd?: Hdd;
  selectedRam?: Ram;
  selectedProcessor?: Processor;
  selectedMotherboard?: Motherboard;
  commentForm: FormGroup;
  stars: number[] = [5, 4, 3, 2, 1];
  currentRating: number = 0;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private fb: FormBuilder, private authService: AuthService) {
    this.commentForm = fb.group({
        rating: [0],
        comment: ["", Validators.required],
        user: [authService.getLoggedInUser()],
      }
    )
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      take(1);
      this.getAllProducts(params.get('category'));
      this.category = params.get('category');
      this.getProduct(params.get('product'));
      this.product = params.get('product');
    });
  }

  getProduct(productId: string | null) {
    if (productId?.includes(ProductType.GPU)) {
      let id = productId?.replace(ProductType.GPU, "");
      this.productService.getById(id, CollectionName.GPU).subscribe(gpu => {
        take(1);
        this.selectedGpu = gpu;
      });
      return;
    }
    if (productId?.includes(ProductType.RAM)) {
      let id = productId?.replace(ProductType.RAM, "");
      this.productService.getById(id, CollectionName.RAM).subscribe(ram => {
        take(1);
        this.selectedRam = ram;
      });
      return;
    }
    if (productId?.includes(ProductType.HDD)) {
      let id = productId?.replace(ProductType.HDD, "");
      this.productService.getById(id, CollectionName.HDD).subscribe(hdd => {
        take(1);
        this.selectedHdd = hdd;
      });
      return;
    }
    if (productId?.includes(ProductType.PROCESSOR)) {
      let id = productId?.replace(ProductType.PROCESSOR, "");
      this.productService.getById(id, CollectionName.PROCESSOR).subscribe(processor => {
        take(1);
        this.selectedProcessor = processor;
      });
      return;
    }
    if (productId?.includes(ProductType.MOTHERBOARD)) {
      let id = productId?.replace(ProductType.MOTHERBOARD, "");
      this.productService.getById(id, CollectionName.MOTHERBOARD).subscribe(motherboard => {
        take(1);
        this.selectedMotherboard = motherboard;
      });
    }
  }

  getAllProducts(category: string | null) {
    switch (category) {
      case ProductType.HDD:
        this.productService.getAll(CollectionName.HDD).pipe(
          map(hdds => hdds.filter(hdd => hdd.id != null)),
        ).subscribe(hdds => {
          this.hdds = hdds;
        });
        break;
      case ProductType.GPU:
        this.productService.getAll(CollectionName.GPU).pipe(
          map(gpus => gpus.filter(gpu => gpu.id != null)),
        ).subscribe(gpus => {
          this.gpus = gpus;
        });
        break;
      case ProductType.RAM:
        this.productService.getAll(CollectionName.RAM).pipe(
          map(rams => rams.filter(ram => ram.id != null)),
        ).subscribe(rams => {
          this.rams = rams;
        });
        break;
      case ProductType.PROCESSOR:
        this.productService.getAll(CollectionName.PROCESSOR).pipe(
          map(processors => processors.filter(processor => processor.id != null)),
        ).subscribe(processors => {
          this.processors = processors;
        });
        break;
      case ProductType.MOTHERBOARD:
        this.productService.getAll(CollectionName.MOTHERBOARD).pipe(
          map(motherboards => motherboards.filter(motherboard => motherboard.id != null)),
        ).subscribe(motherboards => {
          this.motherboards = motherboards;
        });
        break;
    }
  }

  openCart(selectedProduct: Product | undefined, productType: string) {
    if(selectedProduct){
      this.cartService.openCart(selectedProduct, productType);
    }
  }

  sendComment(productType: string) {
    switch (productType) {
      case ProductType.HDD:
        this.productService.update({...this.commentForm.value}, CollectionName.HDD);
        break;
      case ProductType.GPU:
        this.productService.update({...this.commentForm.value, ...this.selectedGpu}, CollectionName.GPU);
        break;
      case ProductType.RAM:
        this.productService.update({...this.commentForm.value}, CollectionName.RAM);
        break;
      case ProductType.PROCESSOR:
        this.productService.update({...this.commentForm.value}, CollectionName.PROCESSOR);
        break;
      case ProductType.MOTHERBOARD:
        this.productService.update({...this.commentForm.value}, CollectionName.MOTHERBOARD);
        break;
    }
  }

  rate(rating: number) {
    this.commentForm.controls['rating'].patchValue(rating);
    this.currentRating = rating;
  }

}
