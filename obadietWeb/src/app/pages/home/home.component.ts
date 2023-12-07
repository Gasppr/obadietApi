import { Component } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../../recipe-dialog/recipe-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
   
    this.carregarDoencasEREstricoes()
    
  }

  openRecipeDialog(): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Funcionou!', result);

      if (result) {

      }
    });
  }

  doencas : any[] = []
  restricoes  : any[] = []

  async carregarDoencasEREstricoes(){
     this.recipesService.carregarDoencas().subscribe({
      next:(data : any) => {
        this.doencas = data
        console.log(this.doencas)
      }
     })
     this.recipesService.carregarRestricoes().subscribe({
      next:(data : any) =>{
        this.restricoes = data
        console.log(this.restricoes)
      }
     })
  }
}