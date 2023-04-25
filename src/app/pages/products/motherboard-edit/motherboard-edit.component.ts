import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {finalize, map, take} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {Chipset} from "../../../shared/model/processor/processor";
import {GpuSlot} from "../../../shared/model/gpu/gpu";
import {CableType} from "../../../shared/model/hdd/hdd";
import {RamSlot} from "../../../shared/model/ram/ram";
import {isPositive} from "../../../shared/util/validators";

@Component({
  selector: 'app-motherboard-edit',
  templateUrl: './motherboard-edit.component.html',
  styleUrls: ['./motherboard-edit.component.scss']
})
export class MotherboardEditComponent implements OnInit {
  form!: FormGroup;
  title?: string;
  motherboard?: Motherboard | null;
  isLoading = false;
  chipsets = Object.values(Chipset);
  gpuSlots = Object.values(GpuSlot);
  cableTypes = Object.values(CableType);
  ramSlots = Object.values(RamSlot);

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private motherboardService: MotherboardService,
              private productService: ProductService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.motherboard?.id],
      brand: [this.motherboard?.brand, Validators.required],
      chipset: [this.motherboard?.chipset, Validators.required],
      gpuSlots: [this.motherboard?.gpuSlots, Validators.required],
      hddCable: [this.motherboard?.hddCable, Validators.required],
      ramCount: [this.motherboard?.ramCount, [Validators.required, isPositive()]],
      ramSlots: [this.motherboard?.ramSlots, Validators.required],
      description: [this.motherboard?.description],
      price: [this.motherboard?.price, [Validators.required, isPositive()]],
    });
  }

  addMotherboard() {
    this.isLoading = true;
    let incremented = false;
    this.productService.getLastId('Motherboard').pipe(
      map(lastId => lastId?.lastId),
      finalize(() => this.isLoading = false),
      take(1),
    ).subscribe(lastId => {
      let newId: number;
      if (lastId) {
        newId = ++lastId;
        if (!incremented) {
          this.productService.incrementLastId(newId, 'Motherboard');
          incremented = true;
        }
        this.motherboardService.create({
          ...this.form.value,
          id: (newId).toString(),
          rating: 0,
        }).finally(() => this.isLoading = false);
      }
    });
    this.modalRef.hide();
  }

  editMotherboard() {
    this.isLoading = true;
    this.motherboardService.update({...this.form.value, price: this.motherboard?.price, rating: this.motherboard?.rating, comments: this.motherboard?.comments}).finally(() => this.isLoading = false);
    this.modalRef.hide();
  }
}
