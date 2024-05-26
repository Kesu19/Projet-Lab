import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { UserModal } from '../models/UserModel';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor() { }

  async getAllReservation(idUser: number): Promise<any> {
    const url = environment.apiUrl + 'getUser?statuts=' + idUser;
    
    const response = await CapacitorHttp['get']({ 
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //   const users: UserModal[] = response.data.map((user: any)=> UserModal.deserialize(user));

    return response.data;
  }


  async createUser(): Promise<any> {
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
