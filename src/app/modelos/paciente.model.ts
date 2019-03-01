import { Persona } from "./persona.model";
import { HistorialMedico } from "./historial-medico.model";

export class Paciente extends Persona {
    private historial : HistorialMedico[];

    
    public get getHistorial() : HistorialMedico[] {
        return this.historial;
    }
    
    public set setHistorial(newHistorial : HistorialMedico[]) {
        this.historial = newHistorial;
    }
    
    
}
