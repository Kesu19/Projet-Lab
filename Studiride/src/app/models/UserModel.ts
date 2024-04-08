import { UserInterface } from "../Interface/UserInterface"

export class UserModal implements UserInterface {

    id: number;
    identifiant: string;
    email: string;
    latitude: number;
    longitude: number;
    mot_de_passe: string;
    nom: string;
    prenom: string;
    statuts: number;
    tel: string;

    constructor(data: any){
        this.id = data.id;
        this.identifiant = data.identifiant;
        this.email = data.email;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.mot_de_passe = data.mot_de_passe;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.statuts = data.statuts;
        this.tel = data.tel;
    
    }

    static deserialize(data: any): UserModal {

        var userModel = new UserModal(data)
        return userModel

    }

}