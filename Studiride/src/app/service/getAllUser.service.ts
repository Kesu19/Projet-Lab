import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor() { }

  async getAllUser(statut: number): Promise<any> {
    const url = environment.apiUrl + 'getUser?statuts=' + statut;
    
    const response = await CapacitorHttp['get']({ 
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  }
}
