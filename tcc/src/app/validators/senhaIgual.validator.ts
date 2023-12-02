import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const senhaIgual :  ValidatorFn = (control : AbstractControl) : ValidationErrors | null => {

    let senha = control.get('senha');
    let confirmaSenha = control.get('confirmaSenha');
    if(senha && confirmaSenha && senha?.value != confirmaSenha?.value){

        return {
            confirmaSenhaError : true
        }
    }
  
    return null
}





