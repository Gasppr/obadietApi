import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent {

  add? :  boolean
  update? : boolean
  delete? : boolean
  receita : any

  constructor(public dialogRef: MatDialogRef<RecipeDialogComponent>, private recipesService : RecipesService) {

    this.criarModeloReceita()
    this.carregarDoencasEREstricoes()
  }

  cadastroReceita : FormGroup = new FormGroup({
    nome : new FormControl('' , Validators.required),
    ingredientes : new FormControl('' , Validators.required),
    modoPreparo : new FormControl('' , Validators.required),
    Imagem : new FormControl()
  })


  doencas : any[] = []
  restricoes  : any[] = []

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