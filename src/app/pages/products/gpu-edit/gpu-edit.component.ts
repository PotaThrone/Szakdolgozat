import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {map, take} from "rxjs";
import {Gpu} from "../../../shared/model/gpu/gpu";
import {ProductService} from "../../../shared/model/product/product.service";

@Component({
  selector: 'app-gpu-edit',
  templateUrl: './gpu-edit.component.html',
  styleUrls: ['./gpu-edit.component.scss']
})
export class GpuEditComponent implements OnInit {
  form!: FormGroup;
  title?: string;
  gpu?: Gpu | null;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private gpuService: GpuService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.gpu?.id],
      brand: [this.gpu?.brand, Validators.required],
      clock: [this.gpu?.clock, Validators.required],
      memory: [this.gpu?.memory, Validators.required],
      slot: [this.gpu?.slot, Validators.required],
      description: [this.gpu?.description],
      price: [this.gpu?.price, Validators.required],
    });
  }

  addGpu() {
    let incremented = false;
    this.productService.getLastId('GPU').pipe(
      map(lastId => lastId?.lastId),
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
          id: (newId).toString()
        });
      }
    });
    this.modalRef.hide();
  }

  editGpu() {
    this.gpuService.update({...this.form.value});
    this.modalRef.hide();
  }
}
