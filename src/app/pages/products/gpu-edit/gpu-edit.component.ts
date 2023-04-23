import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {finalize, map, take} from "rxjs";
import {Gpu, GpuSlot} from "../../../shared/model/gpu/gpu";
import {ProductService} from "../../../shared/model/product/product.service";
import {isPositive} from "../../../shared/util/validators";

@Component({
  selector: 'app-gpu-edit',
  templateUrl: './gpu-edit.component.html',
  styleUrls: ['./gpu-edit.component.scss']
})
export class GpuEditComponent implements OnInit {
  form!: FormGroup;
  title?: string;
  gpu?: Gpu | null;
  gpuSlots = Object.values(GpuSlot);
  isLoading = false;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private gpuService: GpuService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.gpu?.id],
      brand: [this.gpu?.brand, Validators.required],
      clock: [this.gpu?.clock,  [Validators.required, isPositive()]],
      memory: [this.gpu?.memory,  [Validators.required, isPositive()]],
      slot: [this.gpu?.slot, Validators.required],
      description: [this.gpu?.description],
      price: [this.gpu?.price,  [Validators.required, isPositive()]],
    });
  }

  addGpu() {
    this.isLoading = true;
    let incremented = false;
    this.productService.getLastId('GPU').pipe(
      map(lastId => lastId?.lastId),
      finalize(() => this.isLoading = false),
      take(1),
    ).subscribe(lastId => {
      let newId: number;
      if (lastId) {
        newId = ++lastId;
        if (!incremented) {
          this.productService.incrementLastId(newId, 'GPU');
          incremented = true;
        }
        this.gpuService.create({
          ...this.form.value,
          id: (newId).toString(),
          rating: 0,
        }).finally(()=> this.isLoading = false);
      }
    });
    this.modalRef.hide();
  }

  editGpu() {
    this.isLoading = true;
    this.gpuService.update({...this.form.value, price: this.gpu?.price, rating: this.gpu?.rating, comments: this.gpu?.comments}).finally(() => this.isLoading = false);
    this.modalRef.hide();
  }
}
