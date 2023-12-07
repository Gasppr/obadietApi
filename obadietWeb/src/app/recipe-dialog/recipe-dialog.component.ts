import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent {

  add? :  boolean
  update? : boolean
  delete? : boolean

  constructor(public dialogRef: MatDialogRef<RecipeDialogComponent>) {}


  
  onAdd(): void {

    this.add = true
    //this.dialogRef.close();
  }
  onUpdate(): void {

    this.dialogRef.close();
  }
  onDelete(): void {
    this.dialogRef.close();
  }
  onClose(): void {
    this.dialogRef.close();
  }
}