import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Categories} from "./categories";


@Component({
  selector: 'app-categories',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  categories = Object.values(Categories);
  categoryFromParam?: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      let categoryParam = params.get('category');
      if(categoryParam){
        this.categoryFromParam = Categories[categoryParam as keyof typeof Categories];
      }
    });
  }

  categorySelected(category: string, event: any) {
    if (event.isUserInput) {
      let categoryObject = Object(Categories);
      for (let categoryKey in categoryObject) {
        if (categoryObject[categoryKey] === category) {
          category = categoryKey;
          break;
        }
      }
      this.router.navigate(['../products'], {queryParams: {category: category}});
    }
  }
}
