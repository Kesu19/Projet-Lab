import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  constructor() { }

  async createUser(nom: string, prenom: string, email: string, tel: string, identifiant: string, motDePasse: string, statut: string, longitude: number, latitude: number): Promise<any> {
    const url = environment.apiUrl + 'signup';
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
      statut,
      longitude,
      latitude
    };

    const response = await CapacitorHttp['post']({
      url: url,
      headers: headers,
      data: userData
    });

    return response.data;
  }
}
