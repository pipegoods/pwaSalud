import { Persona } from "./persona.model";

export class PersonalMedico extends Persona {
    private rol : string;
    private uid : string;
    private photoURL : string;
    
    constructor(rol : string, uid : string, photoURL : string, nombre : string, documento : number){
        super(documento, nombre);
        this.rol = rol;
        this.uid = uid,
        this.photoURL = photoURL;
    }
    
    public get getRol() : string {
        return this.rol;
    }
    
    public get getUid() : string {
        return this.uid;
    }
    
    public get getPhotoURL() : string {
        return this.photoURL;
    }
    
    public set setRol(newRol : string) {
        this.rol = newRol;
    }
    
    public set setUid(newUid : string) {
        this.uid = newUid;
    }
    
    public set setPhotoURL(newPhotoURL : string) {
        this.photoURL = newPhotoURL;
    }
    
    
    
    
    
}
