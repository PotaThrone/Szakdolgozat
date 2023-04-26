import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SubHeaderComponent} from './shared/sub-header/sub-header.component';
import {MatMenuModule} from "@angular/material/menu";
import {HeaderComponent} from './shared/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";
import {FavoriteModule} from "./pages/favorite/favorite.module";
import {ProductsModule} from "./pages/products/products.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MainModule} from "./pages/main/main.module";



@NgModule({
  declarations: [
    AppComponent,
    SubHeaderComponent,
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
    provideStorage(() => getStorage()),
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FavoriteModule,
    ProductsModule,
    MainModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
