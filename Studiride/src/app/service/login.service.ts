import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }

  // Fonction pour effectuer la requête de connexion
  login(identifiant: string, mdp: string): Observable<any> {
    const url = 'http://localhost:4000/login?identifiant=' + identifiant + '&mdp=' + mdp;

    return this.http.get(url);
  }
}
