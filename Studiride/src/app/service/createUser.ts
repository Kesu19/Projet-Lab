import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateUserService {
  constructor(private http: HttpClient) { }

  // Fonction pour effectuer la requête de connexion
  createUser(nom: string, prenom: string, email: string, identifiant: string, motDePasse: string, statut: string): Observable<any> {
    const url = 'http://localhost:4000/signup'; // L'URL pour créer un utilisateur
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Créez un objet contenant les données de l'utilisateur à envoyer dans la requête POST
    const userData = {
      nom,
      prenom,
      email,
      identifiant,
      motDePasse,
      statut
    };

    return this.http.post(url, userData, { headers });
  }
}
