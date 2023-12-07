import { Component } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  receitas$!: Observable<any[]>;
  receitas: any[] = []
  receita : any

  criarModeloReceita(){

    this.receita = {
      id : 0,
      nome: '',
      ingredientes: '' ,
      modoPreparo: '' ,
      imagem: '' ,

      doencas: [],
      restricoes: [],
      categorias: []
 
   }
  }

  constructor(private recipesService: RecipesService, private dialog: MatDialog) {
    this.receitas$ = this.recipesService.buscarReceitas();
    this.criarModeloReceita()
    this.receitas$.subscribe(data => {
    this.receitas = data;
    });
  }

  openRecipeDialog(): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Funcionou!', result);

      if (result) {

      }
    });
  }
}