import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Gpu} from "../../shared/model/gpu/gpu";
import {CollectionName, Product, ProductType} from "../../shared/model/product/product";
import {map, take} from "rxjs";
import {ProductService} from "../../shared/model/product/product.service";
import {Hdd} from "../../shared/model/hdd/hdd";
import {Ram} from "../../shared/model/ram/ram";
import {Motherboard} from "../../shared/model/motherboard/motherboard";
import {Processor} from "../../shared/model/processor/processor";
import {CartService} from "../cart/cart.service";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Comment} from "../../shared/model/user/user";
import {AuthGuard} from "../../shared/auth/auth.guard";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  commentForm!: FormGroup;
  category?: string | null;
  product?: string | null;
  selectedGpu?: Gpu;
  selectedHdd?: Hdd;
  selectedRam?: Ram;
  selectedProcessor?: Processor;
  selectedMotherboard?: Motherboard;
  isLoading = false;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private authService: AuthService,
              public authGuard: AuthGuard) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      take(1);
      this.category = params.get('category');
      this.getProduct(params.get('product'));
      this.product = params.get('product');
    });
  }

  getProduct(productId: string | null) {
    if (productId?.includes(ProductType.GPU)) {
      let id = productId?.replace(ProductType.GPU, '');
      this.productService.getById(id, CollectionName.GPU).subscribe(gpu => {
        take(1);
        this.selectedGpu = gpu;
      });
      return;
    }
    if (productId?.includes(ProductType.RAM)) {
      let id = productId?.replace(ProductType.RAM, '');
      this.productService.getById(id, CollectionName.RAM).subscribe(ram => {
        take(1);
        this.selectedRam = ram;
      });
      return;
    }
    if (productId?.includes(ProductType.HDD)) {
      let id = productId?.replace(ProductType.HDD, '');
      this.productService.getById(id, CollectionName.HDD).subscribe(hdd => {
        take(1);
        this.selectedHdd = hdd;
      });
      return;
    }
    if (productId?.includes(ProductType.PROCESSOR)) {
      let id = productId?.replace(ProductType.PROCESSOR, '');
      this.productService.getById(id, CollectionName.PROCESSOR).subscribe(processor => {
        take(1);
        this.selectedProcessor = processor;
      });
      return;
    }
    if (productId?.includes(ProductType.MOTHERBOARD)) {
      let id = productId?.replace(ProductType.MOTHERBOARD, '');
      this.productService.getById(id, CollectionName.MOTHERBOARD).subscribe(motherboard => {
        take(1);
        this.selectedMotherboard = motherboard;
      });
    }
  }

  openCart(selectedProduct: Product | undefined, productType: string) {
    if(selectedProduct){
      this.isLoading = true;
      this.cartService.openCart(selectedProduct, productType).subscribe(isLoading => this.isLoading = isLoading);
    }
  }

  private sendComment(productType: string) {
    this.isLoading = true;
    let comment: Comment = {
      comment: this.commentForm.get('comment')?.value,
      rating: this.commentForm.get('rating')?.value,
      userEmail: this.authService.getLoggedInUser()?.email ?? "",
    }
    switch (productType) {
      case ProductType.HDD:
        if(this.selectedHdd){
          this.productService.update({
            ...this.selectedHdd,
            rating: this.selectedHdd.rating == 0 ? this.commentForm.value.rating : (this.selectedHdd.rating + this.commentForm.value.rating) / 2,
            comments: [
              ...this.selectedHdd.comments ?? [],
              comment
            ]}, CollectionName.HDD).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.GPU:
        if(this.selectedGpu){
          this.productService.update({
            ...this.selectedGpu,
            rating: this.selectedGpu.rating == 0 ? this.commentForm.value.rating : (this.selectedGpu.rating + this.commentForm.value.rating) / 2,
            comments: [
            ...this.selectedGpu.comments ?? [],
            comment
          ]}, CollectionName.GPU).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.RAM:
        if(this.selectedRam){
          this.productService.update({
            ...this.selectedRam,
            rating: this.selectedRam.rating == 0 ? this.commentForm.value.rating : (this.selectedRam.rating + this.commentForm.value.rating) / 2,
            comments: [
              ...this.selectedRam.comments ?? [],
              comment
            ]}, CollectionName.RAM).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.PROCESSOR:
        if(this.selectedProcessor){
          this.productService.update({
            ...this.selectedProcessor,
            rating: this.selectedProcessor.rating == 0 ? this.commentForm.value.rating : (this.selectedProcessor.rating + this.commentForm.value.rating) / 2,
            comments: [
              ...this.selectedProcessor.comments ?? [],
              comment
            ]}, CollectionName.PROCESSOR).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.MOTHERBOARD:
        if(this.selectedMotherboard){
          this.productService.update({
            ...this.selectedMotherboard,
            rating: this.selectedMotherboard.rating == 0 ? this.commentForm.value.rating : (this.selectedMotherboard.rating + this.commentForm.value.rating) / 2,
            comments: [
              ...this.selectedMotherboard.comments ?? [],
              comment
            ]}, CollectionName.MOTHERBOARD).finally(() => this.isLoading = false);
        }
        break;
    }
  }

  initForm(commentFrom: FormGroup, productType: string) {
    this.commentForm = commentFrom;
    this.sendComment(productType);
  }

  addToPc(selectedProduct: Product | undefined, productType: string) {
    if(selectedProduct){
      this.isLoading = true;
      this.productService.addProductToPc(selectedProduct, productType).subscribe(isLoading => this.isLoading = isLoading);
    }
  }

  removeComment(index: number, productType: string) {
    this.isLoading = true;
    switch (productType) {
      case ProductType.HDD:
        if(this.selectedHdd){
          this.selectedHdd.comments?.splice(index,1);
          this.productService.update({...this.selectedHdd}, CollectionName.HDD).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.GPU:
        if(this.selectedGpu){
          this.selectedGpu.comments?.splice(index,1);
          this.productService.update({...this.selectedGpu}, CollectionName.GPU).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.PROCESSOR:
        if(this.selectedProcessor){
          this.selectedProcessor.comments?.splice(index,1);
          this.productService.update({...this.selectedProcessor}, CollectionName.PROCESSOR).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.MOTHERBOARD:
        if(this.selectedMotherboard){
          this.selectedMotherboard.comments?.splice(index,1);
          this.productService.update({...this.selectedMotherboard}, CollectionName.MOTHERBOARD).finally(() => this.isLoading = false);
        }
        break;
      case ProductType.RAM:
        if(this.selectedRam){
          this.selectedRam.comments?.splice(index,1);
          this.productService.update({...this.selectedRam}, CollectionName.RAM).finally(() => this.isLoading = false);
        }
        break;
    }
  }
}
