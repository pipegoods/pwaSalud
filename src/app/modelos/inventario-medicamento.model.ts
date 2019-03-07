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
    
}
