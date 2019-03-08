import { InventarioMedicamento } from "./inventario-medicamento.model";
import { PersonalMedico } from "./personal-medico.model";

export class Enfermeria {
    private inventarioMedicamento : InventarioMedicamento;
    private personalMedico = Array<PersonalMedico>();
    private sede : string;
    constructor(inventarioMedicamento : InventarioMedicamento, personalMedico : Array<PersonalMedico>, sede :string) {
        this.inventarioMedicamento = inventarioMedicamento;
        this.personalMedico = personalMedico; 
        this.sede = sede;
    }
    
    public get getInventarioMedicamento() : InventarioMedicamento {
        return this.inventarioMedicamento;
    }
    
    public set setInventarioMedicamento(newInventarioMedicamento : InventarioMedicamento) {
        this.inventarioMedicamento = newInventarioMedicamento;
    }
    
    public set setPersonalMedico(newPersonalMedico : Array<PersonalMedico>) {
        this.personalMedico = newPersonalMedico;
    }
    
    public get getPersonalMedico() : Array<PersonalMedico> {
        return this.personalMedico;
    }
    
    public get getSede() : string {
        return this.sede;
    }
    
    public set setSede(newSede : string) {
        this.sede = newSede;
    }
    
    
    
    
    
}
