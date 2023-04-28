import {Component, Input, OnInit} from '@angular/core';
import {map} from "rxjs";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {Processor} from "../../../shared/model/processor/processor";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ProcessorEditComponent} from "../processor-edit/processor-edit.component";
import {ProductType} from "../../../shared/model/product/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Role} from "../../../shared/model/user/user";

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent implements OnInit{
  @Input() userRole!: number;
  processors: Processor[] = [];
  filteredProcessors: Processor[] = [];
  bsModalRef?: BsModalRef;
  isLoading = false;
  searchForm: FormGroup;
  constructor(private processorService: ProcessorService, private cartService: CartService,  private productService: ProductService,
              private modalService: BsModalService, private router: Router, private fb: FormBuilder) {
    this.isLoading = true;
    this.processorService.getAll().pipe(
      map(processors => processors.filter(processor => processor.id != null)),
    ).subscribe(processors => {
      this.processors = processors;
      this.filteredProcessors = processors;
      this.isLoading = false;
    });
    this.searchForm = this.fb.group({
      searchTerm: new FormControl(),
    });
  }

  openCart(processor: Processor) {
    this.isLoading = true;
    this.cartService.openCart(processor, ProductType.PROCESSOR).subscribe(isLoading => this.isLoading = isLoading);
  }

  addToFavorites(processor: Processor) {
    this.isLoading = true;
    this.productService.addProductToFavorites(processor, ProductType.PROCESSOR).subscribe(isLoading => this.isLoading = isLoading);
  }

  openProcessorEdit(processor: Processor | null) {
    let title = "Processzor hozzáadása";
    if(processor){
      title = "Processzor módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        processor: processor,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ProcessorEditComponent, initialState);
  }

  navigateToProduct(processor: Processor) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.PROCESSOR + processor.id}});
  }

  delete(processor: Processor) {
    this.processorService.delete(processor.id);
  }
  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(searchTerm => {
      this.filteredProcessors = this.processors.filter(processor => processor.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }

    protected readonly Role = Role;
}
