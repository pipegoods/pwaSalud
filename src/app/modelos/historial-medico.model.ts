import { RegistroMedico } from "./registro-medico.model";

export class HistorialMedico {
    private registrosMedicos = Array<RegistroMedico>();
    
    constructor () {

    }
    public get getRegistrosMedicos() : Array<RegistroMedico> {
        return this.registrosMedicos;
    }
    
    public set setRegistrosMedicos(newRegistrosMedicos : Array<RegistroMedico> ) {
        this.registrosMedicos = newRegistrosMedicos;
    }
    
    public agregarRegistroMedico (newRegistro : RegistroMedico) {
        this.registrosMedicos.push(newRegistro);
    }

    public consultarRegistro (index) : RegistroMedico {
        return this.registrosMedicos[index];
    }

    public modificarRegistroMedico (index, registroMedico) {
        this.registrosMedicos[index] = registroMedico;
    }

}
