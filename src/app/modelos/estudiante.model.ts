import { Paciente } from "./paciente.model";

export class Estudiante extends Paciente{
    private codigo : number;
    private programa : string;
    private semestre : string;
    
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
