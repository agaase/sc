import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubComponent } from './club/club.component';
import { ReviewComponent } from './review/review.component';
import { NewItemComponent } from './newitem/newitem.component';

// import { GoogleMapsModule } from '@angular/google-maps'
// GoogleMapsModule,


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccountComponent,
    HeaderComponent,
    ClubsComponent,
    ClubComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: 'account', component: AccountComponent},
      {path: 'clubs', component: ClubsComponent},
      {path: 'club', component: ClubComponent},
      {path: 'review', component: ReviewComponent},
      {path: 'add', component: NewItemComponent},
      {path: '', redirectTo: '/club', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
