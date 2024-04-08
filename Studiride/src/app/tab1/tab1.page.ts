import { Component, IterableDiffers, OnInit } from '@angular/core';
import { UserConnect } from '../service/userConnect';
import { Router } from '@angular/router';
import { GetUserService } from '../service/getAllUser.service';
import { UserModal } from '../models/UserModel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  selectedDistance: number = 6000;
  maxPrice: number | undefined;
  showFilters: boolean = false;
  radius: number = 10;
  
  constructor(private userConnect : UserConnect,private router : Router, private getUserService: GetUserService) {}

  userName = '';
  public alertButtons = [
    {
      text: 'Non',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Oui',
      cssClass: 'alert-button-confirm',
    },
  ];
  

  items: UserModal[] = [];
  avatarUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';

  ngOnInit(): void {
    this.userName = this.userConnect.getUtilisateurConnecte().identifiant;
    console.log(this.userConnect.getUtilisateurConnecte());
    
    this.getUserService.getAllUser(this.userConnect.getUtilisateurConnecte().statuts)
      .then((data: UserModal[]) => {
        console.log(data, this.userConnect.getUtilisateurConnecte().status);
        for (const user of data) {
          this.items.push(user);
        }
      })
      .catch((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
      });
  }

  onDistanceChange() {
    this.items = this.items.filter(user => {
      const distance = this.calculateDistance(user["latitude"], user["longitude"], this.userConnect.getUtilisateurConnecte().latitude,this.userConnect.getUtilisateurConnecte().longitude);
      return distance <= this.selectedDistance;
    });
  }

  onPrixChange() {
    console.log("Le prix sélectionnée a changé :", this.maxPrice);
  }
  
  filteredItems: String[]=["Covoite 1", "Covoite 2"];


  sendMessage() {
    console.log("Send a message to covoiturage with index:");
  }

  desconnect(){
    this.userConnect.deconnecter()
    this.router.navigate(['/login']);
  }
  toggleFilters() {
    this.showFilters = !this.showFilters; // Inversez la valeur de showFilters
  }
  
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance en kilomètres
    return d;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  deletFilter(){
    this.maxPrice = undefined;
    this.selectedDistance = 6000
    this.items = []
    this.getUserService.getAllUser(this.userConnect.getUtilisateurConnecte().statuts)
      .then((data: UserModal[]) => {
        console.log(data, this.userConnect.getUtilisateurConnecte().status);
        for (const user of data) {
          this.items.push(user);
        }
      })
      .catch((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
      });
  }

  checkInmap(userInfoMap: UserModal){
    this.router.navigate(['/tabs/tab-map'], { state: { utilisateur: userInfoMap } });
  }
}
