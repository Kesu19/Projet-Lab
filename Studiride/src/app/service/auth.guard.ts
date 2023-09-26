import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserConnect } from './userConnect'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userConnect: UserConnect, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userConnect.getUtilisateurConnecte()) {
      return true; // L'utilisateur est connecté, permettre la navigation
    } else {
      // Rediriger l'utilisateur vers la page de connexion
      this.router.navigate(['/login']);
      return false; // Empêcher la navigation
    }
  }
}
