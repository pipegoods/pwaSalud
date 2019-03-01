export class Persona {
    private documento : number;
    private nombre : string;

    
    public get getDocumento() : number {
        return this.documento;
    }
    
    public get getNombre() : string {
        return this.nombre;
    }
    
    public set setDocumento(newDocumento : number) {
        this.documento = newDocumento;
    }
    
    public set setNombre(newNombre : string) {
        this.nombre = newNombre;
    }
    
    
}
