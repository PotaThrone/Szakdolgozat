import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {finalize, map, take} from "rxjs";
import {Chipset, Processor} from "../../../shared/model/processor/processor";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {isPositive} from "../../../shared/util/validators";

@Component({
  selector: 'app-processor-edit',
  templateUrl: './processor-edit.component.html',
  styleUrls: ['./processor-edit.component.scss']
})
export class ProcessorEditComponent implements OnInit{
  form!: FormGroup;
  title?: string;
  processor?: Processor | null;
  isLoading = false;
  chipsets = Object.values(Chipset);

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private processorService: ProcessorService, private productService: ProductService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id:[this.processor?.id],
      brand: [this.processor?.brand, Validators.required],
      clockSpeed: [this.processor?.clockSpeed, [Validators.required, isPositive()]],
      chipset: [this.processor?.chipset, Validators.required],
      core: [this.processor?.core, [Validators.required, isPositive()]],
      description: [this.processor?.description],
      price: [this.processor?.price, [Validators.required, isPositive()]],
    });
  }

  addProcessor() {
    this.isLoading = true;
    let incremented = false;
    this.productService.getLastId('Processor').pipe(
      map(lastId => lastId?.lastId),
      finalize(() => this.isLoading = false),
      take(1),
    ).subscribe(lastId => {
      let newId: number;
      if (lastId) {
        newId = ++lastId;
        if (!incremented) {
          this.productService.incrementLastId(newId, 'Processor');
          incremented = true;
        }
        this.processorService.create({
          ...this.form.value,
          id: (newId).toString(),
          rating: 0,
        }).finally(() => this.isLoading = false);
      }
    });
    this.modalRef.hide();
  }

  editProcessor() {
    this.isLoading = true;
    this.processorService.update({...this.form.value, price: this.processor?.price, rating: this.processor?.rating, comments: this.processor?.comments ?? null}).finally(() => this.isLoading = false);
    this.modalRef.hide();
  }
}
