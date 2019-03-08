import { Medicamento } from "./medicamento.model";

export class InventarioMedicamento {
    private medicamentos = Array<Medicamento>();

    constructor (medicamentos :  Array<Medicamento>) {
        this.medicamentos = medicamentos;
    }

    
    public get getMedicamentos() : Array<Medicamento> {
        return this.medicamentos;
    }
    
    public set setMedicamentos(newMedicamentos : Array<Medicamento>) {
        this.medicamentos = newMedicamentos;
    }

    public agregarMedicamento(medicamento : Medicamento) {
        this.medicamentos.push(medicamento);
    }

    public modificarCantidadMedicamento (medicamento : Medicamento) {
        this.medicamentos.forEach((med) => {
            if (med.getNombre == medicamento.getNombre) {
                med.setCantidad = medicamento.getCantidad;
            }
        });
    }

    public retirarMedicamento (medicamento : Medicamento) {
        let i : number;
        this.medicamentos.forEach((med, index)=>{
            if (med.getNombre == medicamento.getNombre) {
                i = index;
            }
        });
        this.medicamentos.splice(i,1);
    }
    
}
