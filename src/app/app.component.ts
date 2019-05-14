import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import{ AboutDialogComponent } from '../app/components/about-dialog/about-dialog.component';
import{ AddOfferComponent } from '../app/components/add-offer/add-offer.component';
import{ GiveLoanComponent } from '../app/components/give-loan/give-loan.component';
import{ TakeLoanComponent } from '../app/components/take-loan/take-loan.component';
import{ AddRequestComponent } from '../app/components/add-request/add-request.component';
import{ ReviewsComponent } from '../app/components/reviews/reviews.component';
import{ RateComponent } from '../app/components/rate/rate.component';
import{ SignupDialogComponent } from '../app/components/signup-dialog/signup-dialog.component';
import{ SigninDialogComponent } from '../app/components/signin-dialog/signin-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['Username', 'Amount', 'Currency', 'Interest', 'button', 'rate', 'Reviews', 'fb'];
  offersDataSource = new MatTableDataSource(offers);
  requestsDataSource = new MatTableDataSource(requests);
  loggedInUser : User = null;
  
  

  @ViewChild('firstTableSort') offersSort: MatSort;
  @ViewChild('secondTableSort') requestsSort: MatSort;

  constructor(public dialog: MatDialog,
    private localStorageService: LocalStorageService, ){

  }

  ngOnInit() {
    this.checkIfLogin();
    this.loggedInUser = JSON.parse(localStorage.getItem('login'));
    this.offersDataSource.sort = this.offersSort;
    this.requestsDataSource.sort = this.requestsSort;
  }

  openAboutDialog(): void {
    let dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '500px'
    });
  }

  openRatesDialog(username: string){
    let dialogRef = this.dialog.open(ReviewsComponent, {
      width: '500px',
      data: USERS.filter(user => user.Username === username)[0]
    });
  }

  openGiveLoanDialog(request: Request, index){
    console.log(index);
    let dialogRef = this.dialog.open(GiveLoanComponent, {
      width: '500px',
      data: request
    });

    dialogRef.afterClosed().subscribe((yes) => {
      if(yes){
        requests.splice(index, 1);
        this.requestsDataSource.data = requests;
      }
      
    }, err =>{
    });
  }

  openTakeLoanDialog(offer: Request, index){
    console.log(index);
    let dialogRef = this.dialog.open(TakeLoanComponent, {
      width: '500px',
      data: offer
    });

    dialogRef.afterClosed().subscribe((yes) => {
      if(yes){
        offers.splice(index, 1);
        this.offersDataSource.data = offers;
      }
      
    }, err =>{
    });
  }

  getNumOfRates(username: string){
    let userArray = USERS.filter(user => user.Username === username);
    return userArray[0].rates.length;
  }

  openRate(username: string): void {
    let dialogRef = this.dialog.open(RateComponent, {
      width: '500px',
      data: USERS.filter(user => user.Username === username)[0]
    });

    dialogRef.afterClosed().subscribe((rate: Rate) => {
      if(rate !== undefined){
        USERS.filter(user => user.Username === username)[0].rates.push(rate);
      }
      
    }, err =>{
    });
  }

  openAddOfferDialog(): void {
    let dialogRef = this.dialog.open(AddOfferComponent, {
      width: '500px',
      data: []
    });

    dialogRef.afterClosed().subscribe((offer: Offer) => {
      if(offer !== undefined){
        offers.push(offer);
        this.offersDataSource.data = offers;
        console.log(this.offersDataSource.data);
      }
      
    }, err =>{
    });
  }

  openAddRequestDialog(): void {
    let dialogRef = this.dialog.open(AddRequestComponent, {
      width: '500px',
      data: []
    });

    dialogRef.afterClosed().subscribe((request: Request) => {
      if(request !== undefined){
        requests.push(request);
        this.requestsDataSource.data = requests;
      }
      
    }, err =>{
    });
  }

  getRatesAverage(username){
    let userArray = USERS.filter(user => user.Username === username);
    return arrAvg(userArray[0].rates.map(rate => rate.grade));
  }

  

  openSignupDialog(): void {
    let dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((user: User) => {
      if(user !== undefined){
        USERS.push(user);
        console.log(USERS);
      }
      
    }, err =>{
    });
  }

  openSigninDialog(): void {
    let dialogRef = this.dialog.open(SigninDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(signinData => {
      if(signinData !== undefined){
        this.loggedInUser = signinData;
      }
      
    });
  }
  signOut(){
    localStorage.removeItem('login');
    this.loggedInUser = null;
  }

  openFacebook(username){
    let user = USERS.filter(user => user.Username === username)[0];
    window.open("https://www.facebook.com/" + user.Facebook);
  }

  checkIfLogin(){

  }
}

export const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
export interface Offer {
  Username: string;
  Amount: number;
  Currency: string;
  Interest: number;
}

export interface Request {
  Username: string;
  Amount: number;
  Currency: string;
  Interest: number;
}

export interface Rate {
  grade: number,
  comment: string
}



export interface User {
  Username: string,
  Password: string,
  ID: string,
  Email: string,
  Facebook: string,
  Age: number
  Degree: string
  University: string
  rates: Rate[]
}



export let offers: Offer[] = [
  {Username: 'banuel', Amount: 20, Currency: 'Dollar', Interest: 1},
  {Username: 'ronitki', Amount: 30, Currency: 'NIS', Interest: 2},
  {Username: 'edenfi', Amount: 40, Currency: 'Dollar', Interest: 1},
  {Username: 'ilanamord', Amount: 35, Currency: 'NIS', Interest: 2},
  {Username: 'karin', Amount: 20, Currency: 'Dollar', Interest: 3}
];

export let requests: Request[] = [
  {Username: 'banuel', Amount: 20, Currency: 'Dollar', Interest: 1},
  {Username: 'ronitki', Amount: 30, Currency: 'NIS', Interest: 2},
  {Username: 'edenfi', Amount: 40, Currency: 'Dollar', Interest: 1},
  {Username: 'ilanamord', Amount: 35, Currency: 'NIS', Interest: 2},
  {Username: 'karin', Amount: 20, Currency: 'Dollar', Interest: 3}
];

export let USERS: User[] = [
  {
    Username: 'banuel', 
    Password: '123456',
    Age: 21,
    Degree: 'SISE',
    Email: 'banuel1997n@gmail.com',
    Facebook: 'banuel novak',
    ID: '207521113',
    University: 'Ben gurion university',
    rates: [
      {
        grade: 8, 
        comment: "good loan, really recomended"
      },
      {
        grade: 10, 
        comment: "perfect"
      },
      {
        grade: 2, 
        comment: "didn't got the money in time"
      },
      {
        grade: 6, 
        comment: "it could be better"
      },
      {
        grade: 10, 
        comment: "very good"
      },
      {
        grade: 9, 
        comment: "perfect"
      }
    ]
  },
  {
    Username: 'ronitki', 
    Password: '123456',
    Age: 21,
    Degree: 'SISE',
    Email: 'ronitkisis1997@gmail.com',
    Facebook: 'ronit kissis',
    ID: '318551454',
    University: 'Ben gurion university',
    rates: [
      {
        grade: 9, 
        comment: "good loan, really recomended"
      },
      {
        grade: 10, 
        comment: "perfect, it was perfect"
      },
      {
        grade: 8, 
        comment: "very good, no complaints"
      },
      {
        grade: 10, 
        comment: "perfect"
      },
      {
        grade: 5, 
        comment: "it could be better"
      },
      {
        grade: 6, 
        comment: "can be better"
      },
      {
        grade: 9, 
        comment: "perfect"
      }
    ]
  },
  {
    Username: 'edenfi', 
    Password: '123456',
    Age: 24,
    Degree: 'SISE',
    Email: 'edenfi@gmail.com',
    Facebook: 'eden firouz',
    ID: '305420366',
    University: 'Ben gurion university',
    rates: [
      {
        grade: 8, 
        comment: "good loan, really recomended"
      },
      {
        grade: 7, 
        comment: "good"
      },
      {
        grade: 9, 
        comment: "very good, no complaints"
      },
      {
        grade: 2, 
        comment: "didn't got the money in time"
      },
      {
        grade: 5, 
        comment: "can improve"
      },
      {
        grade: 3, 
        comment: "got the money late"
      }
    ]
  },
  {
    Username: 'ilanamord', 
    Password: '123456',
    Age: 27,
    Degree: 'SISE',
    Email: 'ilanamord@gmail.com',
    Facebook: 'ilana.mord',
    ID: '203763114',
    University: 'Ben gurion university',
    rates: [
      {
        grade: 8, 
        comment: "good loan, really recomended"
      },
      {
        grade: 7, 
        comment: "good"
      },
      {
        grade: 9, 
        comment: "very good, no complaints"
      },
      {
        grade: 2, 
        comment: "didn't got the money in time"
      },
      {
        grade: 5, 
        comment: "can improve"
      },
      {
        grade: 3, 
        comment: "got the money late"
      }
    ]
  },
  {
    Username: 'karin', 
    Password: '123456',
    Age: 25,
    Degree: 'SISE',
    Email: 'karin@gmail.com',
    Facebook: 'karin.karin',
    ID: '318551454',
    University: 'Ben gurion university',
    rates: [
      {
        grade: 9, 
        comment: "good loan, really recomended"
      },
      {
        grade: 10, 
        comment: "perfect, it was perfect"
      },
      {
        grade: 8, 
        comment: "very good, no complaints"
      },
      {
        grade: 10, 
        comment: "perfect"
      },
      {
        grade: 5, 
        comment: "it could be better"
      },
      {
        grade: 6, 
        comment: "can be better"
      },
      {
        grade: 9, 
        comment: "perfect"
      }
    ]
  },
];





