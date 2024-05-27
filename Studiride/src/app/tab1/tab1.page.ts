import { Component, IterableDiffers, OnInit } from '@angular/core';
import { UserConnect } from '../service/userConnect';
import { Router } from '@angular/router';
import { GetUserService } from '../service/getAllUser.service';
import { UserModal } from '../models/UserModel';
import { ReservationService } from '../service/reservation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  selectedDistance: number = 300;
  maxPrice: number | undefined;
  showFilters: boolean = false;
  radius: number = 10;
  
  constructor(private userConnect : UserConnect,private router : Router, private getUserService: GetUserService,private reservationService : ReservationService) {}

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
    
    this.getUserService.getAllUser(this.userConnect.getUtilisateurConnecte().statuts)
      .then((data: UserModal[]) => {
        for (const user of data) {
          this.items.push(user);
        }
      })
      .catch((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
      });
  }

  onDistanceChange(ev: Event) {
    this.selectedDistance = parseInt((event as CustomEvent).detail.value)
    this.getUserService.getAllUser(this.userConnect.getUtilisateurConnecte().statuts)
    .then((data: UserModal[]) => {
      this.items = []
      for (const user of data) {
        if(this.calculateDistance(user["latitude"], user["longitude"], this.userConnect.getUtilisateurConnecte().latitude,this.userConnect.getUtilisateurConnecte().longitude)<= this.selectedDistance){
          this.items.push(user);
        }
      }
    })
    .catch((error: any) => {
      console.error('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
    });
  }



  sendMessage() {
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
    this.selectedDistance = 300
    this.items = []
    this.getUserService.getAllUser(this.userConnect.getUtilisateurConnecte().statuts)
      .then((data: UserModal[]) => {
        for (const user of data) {
          this.items.push(user);
        }
      })
      .catch((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
      });
  }

  checkInmap(userInfoMap: UserModal){
    this.router.navigate(['/tab-map'], { state: { utilisateur: userInfoMap } });
  }
  reserver(id: number){
    let idConducteur;
    let idPassager
    if(this.userConnect.getUtilisateurConnecte().statuts == 1){
      idConducteur = this.userConnect.getUtilisateurConnecte().id
      idPassager = id
    }
    else{
      idConducteur = id
      idPassager = this.userConnect.getUtilisateurConnecte().id
    }
    this.reservationService.createReservation(idConducteur,idPassager)
  }
}
