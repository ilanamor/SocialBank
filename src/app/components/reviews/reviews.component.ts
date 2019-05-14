import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  about: string;
  constructor(public dialogRef: MatDialogRef<ReviewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbRatingConfig) { 
    config.readonly = true;
    }

  ngOnInit() {
    console.log(this.data);
  }

  getAverage(){
    return arrAvg(this.data.rates.map(rate => rate.grade));
  }

  createForm() {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
  }

}

const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
