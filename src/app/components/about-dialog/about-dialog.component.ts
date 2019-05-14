import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {
  about: string;
  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) { }

  ngOnInit() {

  }

  createForm() {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
  }

  

 

  

}
