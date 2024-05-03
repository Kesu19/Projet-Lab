import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor() { }

  async getAllUser(statut: number): Promise<any> {
    const url = 'http://192.168.40.218:4000/getUser?statuts=' + statut;
    
    const response = await CapacitorHttp['get']({ 
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  }
}
