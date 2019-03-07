export class RegistroMedico {
    private diagnostico : string;
    private fecha : Date;
    private observaciones : string;

    constructor(diagnostico : string,
        fecha : Date,
        observaciones : string) {
            this.diagnostico = diagnostico;
            this.fecha = fecha;
            this.observaciones = observaciones;
    }

    
    public get getFecha() : Date {
        return this.fecha;
    }
    
    public get getDiagnostico() : string {
        return this.diagnostico;
    }
    
    public get getObservaciones() : string {
        return this.observaciones;
    }
    
    public set setFecha(newFecha : Date) {
        this.fecha = newFecha;
    }
    
    public set setDiagnostico(newDiagnostico : string) {
        this.diagnostico = newDiagnostico;
    }
    
    public set setObservaciones(newObservacioes : string) {
        this.observaciones = newObservacioes;
    }

    
    
    
}
