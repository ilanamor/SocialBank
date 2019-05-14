
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { USERS } from '../../app.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  addOfferForm: FormGroup;
  loginError = "";
  currencies = [
    {name: 'USD', symbol: '$'},
    {name: 'EUR', symbol: ''},
    {name: 'NIS', symbol: ''}
  ];
  
  constructor(
    public dialogRef: MatDialogRef<AddOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.addOfferForm = this.fb.group({
      Amount: ['', Validators.required],
      Currency: ['', Validators.required],
      Interest: ['', Validators.required]
    });
  }

  onSubmit(){
    let offer :Offer = this.getOfferData(this.addOfferForm);
    console.log(offer);
    this.dialogRef.close(offer);
    
  }

  isValid(offer: Offer){
    
  }


  

  getOfferData(addOfferForm: FormGroup) : Offer{
    let addOfferFormModel = this.addOfferForm.value;
    let offer: Offer = {
      Amount: addOfferFormModel.Amount,
      Currency: addOfferFormModel.Currency,
      Interest: addOfferFormModel.Interest,
      Username: JSON.parse(localStorage.getItem('login')).Username
    };
    return offer;
  }

  

  getAmountErrorMessage(){
    return this.addOfferForm.controls.Amount.hasError('required') ? 'You must enter an amount' : '';
  }

  getCurrencyErrorMessage(){
    return this.addOfferForm.controls.Currency.hasError('required') ? 'You must enter the currency' : '';
  }

  getInterestErrorMessage(){
    return this.addOfferForm.controls.Interest.hasError('required') ? 'You must enter interest' : '';
  }

  checkFormStatus(){
    return this.addOfferForm.status === "INVALID";
  }

}

export interface Offer {
  Username: string;
  Amount: number;
  Currency: string;
  Interest: number;
}
