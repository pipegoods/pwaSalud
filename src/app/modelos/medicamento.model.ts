export class Medicamento {
    private cantidad : number;
    private nombre : string;
    private presentacion : string;
    private vencimiento : Date;

    constructor (cantidad : number, nombre : string, presentacion: string, vencimiento : Date){
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.presentacion = presentacion;
        this.vencimiento = vencimiento;
    }
    
    public get getCantidad() : number {
        return this.cantidad;
    }
    
    public get getNombre() : string {
        return this.nombre;
    }
    
    public get getPresentacion() : string {
        return this.getPresentacion;
    }
    
    public get getVencimiento() : Date {
        return this.vencimiento;
    }
    
    public set setCantidad(newCantidad : number) {
        this.cantidad = newCantidad;
    }
    
    public set setNombre(newNombre : string) {
        this.nombre = newNombre;
    }
    
    public set setPresentacion(newPresentacion : string) {
        this.presentacion = newPresentacion;
    }
    
    public set setVencimiento(newVencimiento : Date) {
        this.vencimiento = newVencimiento;
    }
    
    

    

    
    

}
