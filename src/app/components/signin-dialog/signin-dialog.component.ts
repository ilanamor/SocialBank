
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { USERS } from '../../app.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css']
})
export class SigninDialogComponent implements OnInit {
  signinForm: FormGroup;
  loginError = "";
  
  constructor(
    public dialogRef: MatDialogRef<SigninDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.signinForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit(){
    let signinData :SignInData = this.getSigninData(this.signinForm);
    if(this.isValid(signinData)){
      localStorage.setItem('login', JSON.stringify(signinData));
      this.dialogRef.close(signinData);
    }
    else{
      this.loginError = "Username or password are invalid";
    }
    
  }

  isValid(signinData: SignInData): Boolean{
    let usersArray = USERS.map(x => x.Username);
    let isUserExist = usersArray.includes(signinData.Username);
    if(isUserExist){
      return this.isCorrectPassword(signinData, USERS);
    }
    else{
      return false;
    }
  }

  isCorrectPassword(signinData : SignInData, users: User[]): Boolean{
    let filteredUser = users.filter(x => x.Username === signinData.Username);
    let isPasswordValid = filteredUser[0].Password === signinData.Password;
    return isPasswordValid;
  }

  getEmailErrorMessage(){
    return this.signinForm.controls.Email.hasError('required') ? 'You must enter an email' : 
    this.signinForm.controls.Email.hasError('email') ? 'The email you entered is invalid' : '';
  }

  getSigninData(signinForm: FormGroup) : SignInData{
    let signinFormModel = this.signinForm.value;
    let signinMember: SignInData = {
      Username: signinFormModel.Username,
      Password: signinFormModel.Password
    };
    return signinMember;
  }

  

  getUsernameErrorMessage(){
    return this.signinForm.controls.Username.hasError('required') ? 'You must enter a value' : '';
  }

  checkFormStatus(){
    return this.signinForm.status === "INVALID";
  }

}

export interface SignInData {
  Username : string,
  Password : string
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
}