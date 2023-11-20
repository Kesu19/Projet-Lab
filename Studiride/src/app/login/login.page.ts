import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { UserConnect } from '../service/userConnect';
import { AlertController } from '@ionic/angular';
import { CreateUserService } from '../service/createUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private loginService : LoginService, private userConnect : UserConnect, private alertController: AlertController, private createUserService : CreateUserService) { }

  username: string = '';
  password: string = '';
  nom: string = "";
  prenom: string = "";
  email: string = "";
  identifiant: string = '';
  motDePasse: string = '';
  statut: string = '';

  public alertButtons = ['OK'];
  isAlertOpen = false;
  login() {
    this.loginService.login(this.username, this.password).subscribe((data) => {
      if(data.id){
        this.userConnect.connecter(data)
        this.onLoginSuccess()
      }
      // Traitez la réponse du serveur ici
    }, (error) => {
      this.presentAlert()
      // this.isAlertOpen = true 
    });
  }

  ngOnInit() {
  }

  onLoginSuccess() {
    // Effectuez la redirection vers la page "home"
    this.router.navigate(['/tabs']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: ['text-centered','titre-personnalise'], 
      header: 'Erreur',
      message: 'Identifiant ou mot de passe incorrect.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async createAccount() {
    const accountAlert = await this.alertController.create({
      header: 'Création de compte',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom',
          value: this.nom, // Valeur initiale vide
          attributes: {
            required: true, // Champ obligatoire
          },
        },
        {
          name: 'prenom',
          type: 'text',
          placeholder: 'Prénom',
          value: this.prenom, // Valeur initiale vide
          attributes: {
            required: true, // Champ obligatoire
          },
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.email, // Valeur initiale vide
          attributes: {
            required: true, // Champ obligatoire
          },
        },
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nom d\'utilisateur',
          value: this.identifiant, // Valeur initiale vide
          attributes: {
            required: true, // Champ obligatoire
          },
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Mot de passe',
          value: this.motDePasse, // Valeur initiale vide
          attributes: {
            required: true, // Champ obligatoire
          },
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirmer le mot de passe',
          value: '', // Valeur initiale vide
          attributes: {
            required: true, // Champ obligatoire
          },
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Suivant',
          handler: async (data) => {
            // Validez les champs du formulaire
            const nom = data.nom;
            const prenom = data.prenom;
            const email = data.email;
            const username = data.username;
            const password = data.password;
            const confirmPassword = data.confirmPassword;
            this.nom  = nom;
            this.prenom = prenom;
            this.email = email;
            this.identifiant = username;
            this.motDePasse = password;
  
            // Expression régulière pour valider une adresse e-mail
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
            if (nom && prenom && email && username && password && confirmPassword && emailRegex.test(email)) {
              if (password === confirmPassword) {
                // Les mots de passe correspondent, vous pouvez créer le compte
                // Appelez ici votre API ou effectuez d'autres opérations de création de compte
  
                // Maintenant, affichez une nouvelle alerte pour demander si l'utilisateur est conducteur ou passager
                const roleAlert = await this.alertController.create({
                  header: 'Sélectionnez votre rôle',
                  inputs: [
                    {
                      name: 'role',
                      type: 'radio',
                      label: 'Conducteur',
                      value: '1',
                    },
                    {
                      name: 'role',
                      type: 'radio',
                      label: 'Passager',
                      value: '2',
                    },
                  ],
                  buttons: [
                    {
                      text: 'Annuler',
                      role: 'cancel',
                    },
                    {
                      text: 'Suivant',
                      handler: (selectedRole) => {
                        this.statut = selectedRole;
                        this.create()
                        // Vous pouvez maintenant utiliser "selectedRole" pour effectuer des actions en fonction du choix de l'utilisateur.
                      },
                    },
                  ],
                });
  
                await roleAlert.present();
              } else {
                const errorAlert = await this.alertController.create({
                  header: 'Erreur',
                  message: 'Les mots de passe ne correspondent pas.',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        // Interaction après avoir cliqué sur "OK" dans l'alerte d'erreur
                        this.createAccount()
                      },
                    },
                  ],
                  cssClass: ['text-centered', 'titre-personnalise'],
                });
  
                await errorAlert.present();
              }
            } else {
              // Affichez un message d'erreur si tous les champs ne sont pas remplis correctement
              const incompleteAlert = await this.alertController.create({
                header: 'Erreur',
                message: 'Veuillez remplir tous les champs du formulaire correctement.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      // Interaction après avoir cliqué sur "OK" dans l'alerte d'erreur d'inachèvement
                      this.createAccount()
                    },
                  },
                ],
                cssClass: ['text-centered', 'titre-personnalise'],
              });
  
              await incompleteAlert.present();
            }
          },
        },
      ],
    });
  
    await accountAlert.present();
  }
  create(){
    this.createUserService.createUser(this.nom,this.prenom,this.email,this.identifiant,this.motDePasse,this.statut).subscribe((data)=>{
      this.username = this.identifiant;
      this.password = this.motDePasse;
      this.loginService.login(this.username, this.password).subscribe((data) => {
        if(data.id){
          this.userConnect.connecter(data)
          this.onLoginSuccess()
        }
        // Traitez la réponse du serveur ici
      }, (error) => {
        this.presentAlert()
        // this.isAlertOpen = true 
      }); 
    }, (error) => {
      this.errorCreate(error)
      // this.isAlertOpen = true 
    })
  }

  async errorCreate(erreur:any){
    const incompleteAlert = await this.alertController.create({
      header: 'Erreur',
      message: erreur.error.message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Interaction après avoir cliqué sur "OK" dans l'alerte d'erreur d'inachèvement
            this.createAccount()
          },
        },
      ],
      cssClass: ['text-centered', 'titre-personnalise'],
    });

    await incompleteAlert.present();
  }
}
