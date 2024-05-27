import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor() { }

  async getAllReservation(idUser: number): Promise<any> {
    const url = environment.apiUrl + 'getALLReservation?idUser=' + idUser;
    
    const response = await CapacitorHttp['get']({ 
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //   const users: UserModal[] = response.data.map((user: any)=> UserModal.deserialize(user));

    return response.data;
  }


  async createReservation(idConducteur: number, idPassager: number): Promise<any> {
    const url = environment.apiUrl + 'addReservation';
    const headers = {
      'Content-Type': 'application/json'
    };

    const reservationData = {
      idConducteur,
      idPassager
    };

    const response = await CapacitorHttp['post']({
      url: url,
      headers: headers,
      data: reservationData
    });

    return response.data;
  }

}
