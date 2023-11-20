import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  constructor(private http: HttpClient) { }

  // Fonction pour effectuer la requête de connexion
  getAllUser(statut: number): Observable<any> {
    const url = 'http://localhost:4000/getUser?statuts=' + statut;
    return this.http.get(url);
  }
}
