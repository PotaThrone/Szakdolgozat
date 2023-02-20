import {Component, OnInit} from '@angular/core';
import {ForumService} from "../../shared/model/forum/forum.service";
import {tap} from "rxjs";
import {Forum} from "../../shared/model/forum/forum";
import firebase from "firebase/compat";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  title?: string;
  timestamp?: firebase.firestore.Timestamp[];
  forums: Forum[] = [];
  constructor(private forumService: ForumService) {
      this.forumService.getAll().pipe(
        tap(forums => this.forums = forums),
      ).subscribe();
  }
  ngOnInit(): void {

  }


}
