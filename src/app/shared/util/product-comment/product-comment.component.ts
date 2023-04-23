import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../model/product/product";

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss']
})
export class ProductCommentComponent {
  @Output()
  sendCommentForm = new EventEmitter<CommentFormData>();
  @Input()
  selectedProduct!: Product;
  @Input()
  productType!: string;
  commentForm: FormGroup;
  currentRating: number = 1;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
        rating: [1],
        comment: ["", Validators.required],
      }
    )
  }

  onStarRated(star: number) {
    this.commentForm.controls['rating'].patchValue(star);
    this.currentRating = star;
  }

  sendComment() {
    this.currentRating = 1;
    this.sendCommentForm.emit({commentForm: this.commentForm, productType: this.productType});
    this.commentForm.reset();
    this.commentForm.get('rating')?.patchValue(1);
  }
}

export interface CommentFormData {
  commentForm: FormGroup;
  productType: string;
}
