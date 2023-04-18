import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {map, take} from "rxjs";

@Component({
  selector: 'app-gpu-edit',
  templateUrl: './gpu-edit.component.html',
  styleUrls: ['./gpu-edit.component.scss']
})
export class GpuEditComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private gpuService: GpuService) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      clock: ['', Validators.required],
      memory: ['', Validators.required],
      slot: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
    });
  }

  addGpu() {
    let incremented = false;
    this.gpuService.getLastId().pipe(
      map(lastId => lastId?.lastId),
      take(1),
    ).subscribe(lastId => {
      let newId: number;
      if (lastId) {
        newId = ++lastId;
        if(!incremented){
          this.gpuService.incrementLastId(newId);
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
}
