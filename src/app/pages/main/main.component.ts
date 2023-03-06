import {Component, OnInit} from '@angular/core';
import {ForumService} from "../../shared/model/forum/forum.service";
import {tap} from "rxjs";
import {Forum} from "../../shared/model/forum/forum";
import {AngularFireStorage} from "@angular/fire/compat/storage";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  title?: string;
  forums: Forum[] = [];

  constructor(private forumService: ForumService, public storage: AngularFireStorage) {
      this.forumService.getAll().pipe(
        tap(forums => this.forums = forums),
      ).subscribe(forums => {
         forums.every(forum => forum.imageLink = this.storage.ref(forum.title.toLowerCase() +'.jpg').getDownloadURL());
        }
      );
  }
  ngOnInit(): void {

  }


}
