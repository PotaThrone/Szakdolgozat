import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../model/product/product";

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss']
})
export class ProductCommentComponent {
  @Output()
  sendCommentForm = new EventEmitter<FormGroup>();
  @Output()
  passRemovedId = new EventEmitter<number>();
  @Input()
  selectedProduct!: Product;
  @Input()
  userRole!: number;
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
    this.sendCommentForm.emit(this.commentForm);
    this.commentForm.reset();
    this.commentForm.get('rating')?.patchValue(1);
  }

  removeComment(index: number) {
    this.passRemovedId.emit(index);
  }
}

