import { Paciente } from "./paciente.model";
import { HistorialMedico } from "./historial-medico.model";

export class Estudiante extends Paciente{
    private codigo : number;
    private programa : string;
    private semestre : string;
    
    constructor(codigo : number, programa : string, semestre : string, nombre : string, documento : number){
        super(new HistorialMedico, nombre, documento);
        this.codigo = codigo || 0;
        this.programa = programa || '';
        this.semestre = semestre || '';
    }

    public get getCodigo() : number {
        return this.codigo;
    }
    
    public get getPrograma() : string {
        return this.programa;
    }

    public get getSemestre() : string {
        return this.semestre;
    }
    
    public set setCodigo(newCodigo : number) {
        this.codigo = newCodigo;
    }
    
    public set setPrograma(newPrograma : string) {
        this.programa = newPrograma;
    }

    public set setSemestre(newSemestre : string) {
        this.semestre = newSemestre;
    }
    
}
