import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  title!: string;
  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.title = data.title;
  }
  ngOnInit(): void { }

  confirm() {
    this.dialogRef.close(true);
    // this.matDialog.closeAll();
  }

  close() {
    this.dialogRef.close(false);
    // this.dialogRef.close();
  }


}
