import { Component } from '@angular/core';
import { ReceitasService } from './services/receitas.service';
import { ReceitaModel } from './services/receita.model';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'obadietWeb';

  constructor(private dialog: MatDialog){}

  receita?: ReceitaModel

  openRecipeDialog(): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Funcionou!', result);

      if (result) {

      }
    });
  }

 
  

}
