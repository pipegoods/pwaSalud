import { RegistroMedico } from "./registro-medico.model";

export class HistorialMedico {
    private registrosMedicos : RegistroMedico [];
    
    public get getRegistrosMedicos() : RegistroMedico [] {
        return this.registrosMedicos;
    }
    
    public set setRegistrosMedicos(newRegistrosMedicos : RegistroMedico []) {
        this.registrosMedicos = newRegistrosMedicos;
    }
    
}
