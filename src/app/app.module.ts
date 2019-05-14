import { BrowserModule } from '@angular/platform-browser';
import { MaterialsModule } from './modules/material.modules'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { SigninDialogComponent } from './components/signin-dialog/signin-dialog.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { RateComponent } from './components/rate/rate.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { AddRequestComponent } from './components/add-request/add-request.component';
import { TakeLoanComponent } from './components/take-loan/take-loan.component';
import { GiveLoanComponent } from './components/give-loan/give-loan.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReviewsComponent } from './components/reviews/reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutDialogComponent,
    SignupDialogComponent,
    SigninDialogComponent,
    RateComponent,
    AddOfferComponent,
    AddRequestComponent,
    TakeLoanComponent,
    GiveLoanComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage,
    NgbModule.forRoot()
  ],
  entryComponents: [
    AboutDialogComponent,
    SignupDialogComponent,
    SigninDialogComponent,
    RateComponent,
    AddOfferComponent,
    AddRequestComponent,
    TakeLoanComponent,
    GiveLoanComponent,
    ReviewsComponent
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
