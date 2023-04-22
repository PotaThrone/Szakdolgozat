import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input()
  currentRating!: number;
  @Input()
  rating?: number;
  @Output()
  starSelected = new EventEmitter<number>();
  stars: number[] = [5, 4, 3, 2, 1];

  rate(star: number) {
    this.starSelected.emit(star);
  }
}
