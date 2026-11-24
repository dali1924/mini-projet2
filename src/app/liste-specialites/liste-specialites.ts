import { Component, OnInit } from '@angular/core';
import { Specialite } from '../model/specialite.model';
import { MedecinService } from '../service/medecin.service';
import { UpdateSpecialite } from '../update-specialite/update-specialite';

@Component({
  selector: 'app-liste-specialites',
  imports: [UpdateSpecialite],
  templateUrl: './liste-specialites.html',
  styles: ``
})
export class ListeSpecialites implements OnInit {
  specialites!: Specialite[];
  updatedSpec: Specialite = { idSpec: 0, nomSpec: "" };
  ajout: boolean = true;

  constructor(private medecinService: MedecinService) { }

  ngOnInit(): void {
    this.chargerSpecialites();
  }

  specialiteUpdated(spec: Specialite) {
    console.log("Spec updated event", spec);
    if (this.ajout) {
      this.medecinService.ajouterSpecialite(spec);
    } else {
      this.medecinService.updateSpecialite(spec);
    }
    this.chargerSpecialites();
    this.updatedSpec = { idSpec: 0, nomSpec: "" };
    this.ajout = true;
  }

  chargerSpecialites() {
    this.medecinService.listeSpecialites().subscribe(specs => {
      this.specialites = specs._embedded.specialites;
    });
  }

  updateSpec(spec: Specialite) {
    this.updatedSpec = { ...spec };
    this.ajout = false;
  }
}