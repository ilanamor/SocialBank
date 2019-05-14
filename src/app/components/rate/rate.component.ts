import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  currentRate = 8.5;
  rateForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    config: NgbRatingConfig) { 
      config.readonly = false;
    }

  ngOnInit() {
    
    this.currentRate = arrAvg(this.data.rates.map(rate => rate.grade));
    this.createForm();
  }

  createForm() {
    this.rateForm = this.fb.group({
      Comment: ['', Validators.required]
    });
  }

  onSubmit(){
    let rate = this.getRateData();
    this.dialogRef.close(rate);
  }

  getRateData() : Rate{
    let rateFormModel = this.rateForm.value;
    let rate: Rate = {
      grade: this.currentRate,
      comment: rateFormModel.Comment
    };
    return rate;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getCommentErrorMessage(){
    return this.rateForm.controls.Comment.hasError('required') ? 'You must enter a comment' : '';
  }

  checkFormStatus(){
    return this.rateForm.status === "INVALID";
  }


}

const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

export interface Rate {
  grade: number,
  comment: string
}
