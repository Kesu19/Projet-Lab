import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  constructor() { }

  async createUser(nom: string, prenom: string, email: string, tel: string, identifiant: string, motDePasse: string, statut: string): Promise<any> {
    const url = 'http://192.168.40.218:4000/signup'; 
    const headers = {
      'Content-Type': 'application/json'
    };

    const userData = {
      nom,
      prenom,
      email,
      tel,
      identifiant,
      motDePasse,
      statut
    };

    const response = await CapacitorHttp['post']({
      url: url,
      headers: headers,
      data: userData
    });

    return response.data;
  }
}
