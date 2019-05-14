
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { USERS } from '../../app.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  addRequestForm: FormGroup;
  loginError = "";
  currencies = [
    {name: 'USD', symbol: '$'},
    {name: 'EUR', symbol: ''},
    {name: 'NIS', symbol: ''}
  ];
  
  constructor(
    public dialogRef: MatDialogRef<AddRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.addRequestForm = this.fb.group({
      Amount: ['', Validators.required],
      Currency: ['', Validators.required],
      Interest: ['', Validators.required]
    });
  }

  onSubmit(){
    let offer :Request = this.getOfferData(this.addRequestForm);
    console.log(offer);
    this.dialogRef.close(offer);
    
  }

  isValid(offer: Request){
    
  }


  

  getOfferData(addOfferForm: FormGroup) : Request{
    let addRequestFormModel = this.addRequestForm.value;
    let request: Request = {
      Amount: addRequestFormModel.Amount,
      Currency: addRequestFormModel.Currency,
      Interest: addRequestFormModel.Interest,
      Username: JSON.parse(localStorage.getItem('login')).Username
    };
    return request;
  }

  

  getAmountErrorMessage(){
    return this.addRequestForm.controls.Amount.hasError('required') ? 'You must enter an amount' : '';
  }

  getCurrencyErrorMessage(){
    return this.addRequestForm.controls.Currency.hasError('required') ? 'You must enter the currency' : '';
  }

  getInterestErrorMessage(){
    return this.addRequestForm.controls.Interest.hasError('required') ? 'You must enter interest' : '';
  }

  checkFormStatus(){
    return this.addRequestForm.status === "INVALID";
  }

}

export interface Request {
  Username: string;
  Amount: number;
  Currency: string;
  Interest: number;
}
