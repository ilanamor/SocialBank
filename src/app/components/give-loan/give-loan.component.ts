import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-give-loan',
  templateUrl: './give-loan.component.html',
  styleUrls: ['./give-loan.component.css']
})
export class GiveLoanComponent implements OnInit {

  about: string;
  constructor(public dialogRef: MatDialogRef<GiveLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  createForm() {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(){
    this.dialogRef.close(true);
  }

}
