import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  async login(identifiant: string, mdp: string): Promise<any> {
    const url = 'http://192.168.40.218:4000/login?identifiant=' + identifiant + '&mdp=' + mdp;
    
    // Utilisation de la méthode get pour effectuer une requête GET
    const response = await CapacitorHttp['get']({
      url: url
    });

    return response.data;
  }
}
