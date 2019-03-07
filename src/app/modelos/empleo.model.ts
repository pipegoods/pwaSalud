import { Paciente } from "./paciente.model";
import { HistorialMedico } from "./historial-medico.model";

export class Empleo extends Paciente{
    private cargo : string;
    private estamento : string;
    
    constructor(cargo : string, estamento : string, nombre : string, documento : number){
   
        
        super(new HistorialMedico, nombre, documento);
        this.cargo = cargo || '';
        this.estamento = estamento || '';
    }

    public get getCargo() : string {
        return this.cargo;
    }
    
    public set setCargo(newCargo : string) {
        this.cargo = newCargo;
    }
    
    public get getEstamento() : string {
        return this.estamento;
    }
    
    public set setEstamento(newEstamento : string) {
        this.estamento = newEstamento;
    }
    
}
