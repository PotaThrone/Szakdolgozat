import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {map, take} from "rxjs";
import {Hdd} from "../../../shared/model/hdd/hdd";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {ProductService} from "../../../shared/model/product/product.service";

@Component({
  selector: 'app-hdd-edit',
  templateUrl: './hdd-edit.component.html',
  styleUrls: ['./hdd-edit.component.scss']
})
export class HddEditComponent implements OnInit {
  form!: FormGroup;
  title?: string;
  hdd?: Hdd | null;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private hddService: HddService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.hdd?.id],
      brand: [this.hdd?.brand, Validators.required],
      cableType: [this.hdd?.cableType, Validators.required],
      size: [this.hdd?.size, Validators.required],
      description: [this.hdd?.description],
      price: [this.hdd?.price, Validators.required],
    });
  }

  addHdd() {
    let incremented = false;
    this.productService.getLastId('HDD').pipe(
      map(lastId => lastId?.lastId),
      take(1),
    ).subscribe(lastId => {
      let newId: number;
      if (lastId) {
        newId = ++lastId;
        if (!incremented) {
          this.productService.incrementLastId(newId, 'HDD');
          incremented = true;
        }
        this.hddService.create({
          ...this.form.value,
          id: (newId).toString()
        });
      }
    });
    this.modalRef.hide();
  }

  editHdd() {
    this.hddService.update({...this.form.value});
    this.modalRef.hide();
  }
}
