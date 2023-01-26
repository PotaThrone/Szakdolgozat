import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Categories} from "./categories";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categoryForm: FormGroup;
  categories = Object.values(Categories);
  constructor(private router: Router, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      category: ['Videókártya']
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
