import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent {

  constructor(public dialogRef: MatDialogRef<RecipeDialogComponent>) {}
  onAdd(): void {
    this.dialogRef.close();
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