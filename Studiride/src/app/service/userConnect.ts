import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { CapacitorHttp } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserConnect {
  private utilisateurConnecte: any = null;

  constructor() { }

  // Connecter l'utilisateur
  connecter(utilisateur: any) {
    this.utilisateurConnecte = utilisateur;
  }

  // Déconnecter l'utilisateur
  deconnecter() {
    this.utilisateurConnecte = null;
  }

  // Obtenir l'utilisateur connecté
  getUtilisateurConnecte() {
    return this.utilisateurConnecte;
  }

  async changePassword(identifiant: string, newPassword: string): Promise<any> {
    const url = 'http://192.168.40.218:4000/user/' + identifiant;
    const body = { newpassword: newPassword };

    // Utilisation de la méthode put pour effectuer une requête PUT
    const response = await CapacitorHttp['put']({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: body
    });

    return response.data;
  }
}
