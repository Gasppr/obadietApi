import * as bcrypt from 'bcrypt'

export class criptografia{

    private SALT_RANDOMS = 8
    
    async criptografar(senha: string){
        const saltGenerated = await bcrypt.genSalt(this.SALT_RANDOMS)

        const hash = await bcrypt.hash(senha , saltGenerated)

        return hash
    }


    async verificarSenha(senha : string, hash : string){
       return await bcrypt.compare(senha , hash)
    }


  
}