import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConnect {
  private utilisateurConnecte: any = null;

  constructor(private http: HttpClient) { }

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
  changePassword(identifiant: string, newPassword: string): Observable<any> {
    const url = 'http://localhost:4000/user/' + identifiant;
    console.log(url);
    const body = { newpassword: newPassword };
  
    return this.http.put(url, body);
  }
}
