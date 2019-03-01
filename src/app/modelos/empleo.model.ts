import { Paciente } from "./paciente.model";

export class Empleo extends Paciente{
    private cargo : string;
    private estamento : string;
    
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
