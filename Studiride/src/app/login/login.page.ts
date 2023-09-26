import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  username: string = '';
  password: string = '';

  login() {
    // Ajoutez ici votre logique de connexion, par exemple, une requête HTTP vers un serveur.
    console.log(`Nom d'utilisateur: ${this.username}, Mot de passe: ${this.password}`);
  }

  ngOnInit() {
  }

  onLoginSuccess() {
    // Effectuez la redirection vers la page "home"
    this.router.navigate(['/tab']);
  }

}
