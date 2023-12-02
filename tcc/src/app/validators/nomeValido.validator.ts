import { AbstractControl, ValidatorFn } from "@angular/forms";


export const nomeValido : ValidatorFn = (control : AbstractControl) =>{

    let nome = control.get('name')

    if(nome?.value == '' || nome?.value?.length < 3){
        return {
            nomeError : true 
        }
    }
    return null 

}