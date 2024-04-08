import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { UserConnect } from '../service/userConnect';
import { UserModal } from '../models/UserModel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private mapInitialized = false;
  user = '';
  latitude = 0;
  longitude = 0;
  @Input() utilisateur: UserModal | undefined;

  constructor(private userConnect: UserConnect, private elementRef: ElementRef) {}

  ngOnInit() {
    this.user = this.userConnect.getUtilisateurConnecte();
    this.latitude = this.userConnect.getUtilisateurConnecte().latitude;
    this.longitude = this.userConnect.getUtilisateurConnecte().longitude;
    this.addAvatarMarker();
  }

  ngAfterViewInit() {
    if (!this.mapInitialized) {
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map(this.elementRef.nativeElement.querySelector('.map-container')).setView([this.latitude, this.longitude], 13);
    this.mapInitialized = true;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const houseIcon = L.icon({
      iconUrl: '../../assets/icon/maison.png',
      iconSize: [50, 50],
    });

    const avatarIcon = L.icon({
      iconUrl: "https://www.w3schools.com/howto/img_avatar.png",
      iconSize: [45, 45],
    });

    const houseMarker = L.marker([this.latitude, this.longitude], { icon: houseIcon }).addTo(this.map);
    houseMarker.bindPopup("<b>Votre Maison</b>");

    if (this.utilisateur) {
      L.marker([this.utilisateur.latitude, this.utilisateur.longitude], { icon: avatarIcon }).addTo(this.map)
    }

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }
  private addAvatarMarker(): void {
    if (this.mapInitialized && this.utilisateur) {
      const avatarIcon = L.icon({
        iconUrl: "https://www.w3schools.com/howto/img_avatar.png",
        iconSize: [45, 45],
      });
      L.marker([this.utilisateur.latitude, this.utilisateur.longitude], { icon: avatarIcon }).addTo(this.map);
      setTimeout(() => {
        this.map.invalidateSize();
      }, 500);
    }
  }
}
