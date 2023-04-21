import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ProductService} from "../../../shared/model/product/product.service";
import {map, take} from "rxjs";
import {Ram} from "../../../shared/model/ram/ram";
import {RamService} from "../../../shared/model/ram/ram.service";

@Component({
  selector: 'app-ram-edit',
  templateUrl: './ram-edit.component.html',
  styleUrls: ['./ram-edit.component.scss']
})
export class RamEditComponent implements OnInit{
  form!: FormGroup;
  title?: string;
  ram?: Ram | null;
  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private ramService: RamService,
              private productService: ProductService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.ram?.id],
      brand: [this.ram?.brand, Validators.required],
      memorySize: [this.ram?.memorySize, Validators.required],
      speed: [this.ram?.speed, Validators.required],
      slot: [this.ram?.slot, Validators.required],
      description: [this.ram?.description],
      price: [this.ram?.price, Validators.required],
    });
  }

  addRam() {
    let incremented = false;
    this.productService.getLastId('RAM').pipe(
      map(lastId => lastId?.lastId),
      take(1),
    ).subscribe(lastId => {
      let newId: number;
      if (lastId) {
        newId = ++lastId;
        if (!incremented) {
          this.productService.incrementLastId(newId, 'RAM');
          incremented = true;
        }
        this.ramService.create({
          ...this.form.value,
          id: (newId).toString(),
          rating: 0,
        });
      }
    });
    this.modalRef.hide();
  }

  editRam() {
    this.ramService.update({...this.form.value});
    this.modalRef.hide();
  }
}
