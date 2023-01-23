import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainComponent} from './pages/main/main.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MenuComponent} from './shared/menu/menu.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CategoriesComponent} from './shared/categories/categories.component';
import {MatMenuModule} from "@angular/material/menu";
import {HeaderComponent} from './shared/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    CategoriesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    MatMenuModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
