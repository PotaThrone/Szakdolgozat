import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  category?: string | null;
  product?: string | null;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.product = params.get('product');
    });
  }
}
