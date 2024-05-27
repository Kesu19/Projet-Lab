import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { UserModal } from '../models/UserModel';

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

      const users: UserModal[] = response.data.map((user: any)=> UserModal.deserialize(user));

    return users;
  }

  async getUserById(id: number) {
    const url = environment.apiUrl + 'getUserById?id=' + id;
    
    const response = await CapacitorHttp['get']({ 
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const users: UserModal = response.data

    return users;
  }
}
