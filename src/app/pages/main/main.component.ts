import {Component} from '@angular/core';
import {ForumService} from "../../shared/model/forum/forum.service";
import {tap} from "rxjs";
import {Forum} from "../../shared/model/forum/forum";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  title?: string;
  forums: Forum[] = [];
  constructor(private forumService: ForumService) {
      this.forumService.getAll().pipe(
        tap(forums => this.forums = forums),
      ).subscribe()
  }
}
