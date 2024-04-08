import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModal } from '../models/UserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  utilisateur: UserModal | undefined
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.utilisateur = history.state.utilisateur;
  }

  fermeCarte(){
    this.router.navigate(['/tabs'], { relativeTo: this.route });
  }
  navigateTab2() {
    this.router.navigate(['/tab-map']);
  }
}
