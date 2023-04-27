import {Component} from '@angular/core';
import {ForumService} from "../../shared/model/forum/forum.service";
import {finalize, map, take} from "rxjs";
import {Forum} from "../../shared/model/forum/forum";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Game} from "../../shared/model/game/game";
import {GameService} from "../../shared/model/game/game.service";
import {AuthService} from "../../shared/auth/auth.service";
import {AuthGuard} from "../../shared/auth/auth.guard";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  title?: string;
  forums: Forum[] = [];
  forumForm: FormGroup;
  games!: Game[];
  currentRating = 1;
  isLoading = false;

  constructor(private forumService: ForumService, public storage: AngularFireStorage, private fb: FormBuilder, private gameService: GameService,
              private authService: AuthService, public authGuard: AuthGuard) {
    this.isLoading = true;
    this.forumService.getAll().pipe(
      map(forums => {
        forums = forums.filter(forum => forum.id != null);
        forums = forums.sort((forum1, forum2) => forum2.date.toString().localeCompare(forum1.date.toString()));
        return forums;
      }),
    ).subscribe(forums => {
      forums.every(forum => forum.imageLink = this.storage.ref(forum.game.name.toLowerCase() + '.jpg').getDownloadURL());
      this.forums = forums;
      this.isLoading = false;
    });
    this.gameService.getAll().pipe(
      map(games => games.sort((game1, game2) => game1.name.localeCompare(game2.name))),
    ).subscribe(games => {
      this.games = games;
      this.isLoading = false;
    });
    this.forumForm = this.fb.group({
      game: ['', Validators.required],
      text: ['', Validators.required],
      rating: [1],
    })
  }

  createForum() {
    this.isLoading = true;
    let incremented = false;
    const user = this.authService.getLoggedInUser();
    if (user) {
      this.forumService.getLastId().pipe(
        map(lastId => lastId?.lastId),
        take(1),
        finalize(() => this.isLoading = false),
      ).subscribe(lastId => {
          let newId: number;
          if (lastId) {
            newId = ++lastId;
            if (!incremented) {
              this.forumService.incrementLastId(newId);
              incremented = true;
            }
            this.forumService.create({
              ...this.forumForm.value,
              id: (newId).toString(),
              user: user,
              date: Date.now()
            }).finally(() => {
              this.forumForm.reset();
              this.forumForm.get('rating')?.patchValue(1);
              this.currentRating = 1;
              this.isLoading = false;
            });
          }
        }
      );
    }
  }

  onStarRated(rating: number) {
    this.forumForm.controls['rating'].patchValue(rating);
    this.currentRating = rating;
  }

  delete(id: string) {
    this.isLoading = true;
    this.forumService.delete(id).finally(() => this.isLoading = false);
  }
}
