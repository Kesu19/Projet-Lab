import { Injectable } from '@angular/core';

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
}
