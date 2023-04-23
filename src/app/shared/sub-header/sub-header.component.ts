import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "./category";


@Component({
  selector: 'app-categories',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  categories = Object.values(Category);
  categoryFromParam?: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      let categoryParam = params.get('category');
      if(categoryParam){
        this.categoryFromParam = Category[categoryParam as keyof typeof Category];
      }
    });
  }

  categorySelected(category: string, event: any) {
    if (event.isUserInput) {
      let categoryObject = Object(Category);
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
