export class Persona {
    private documento : number;
    private nombre : string;

    constructor (documento : number, nombre : string){
        this.documento = documento;
        this.nombre = nombre;
    }

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
