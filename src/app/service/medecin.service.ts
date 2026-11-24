import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from '../model/medecin.model';
import { Specialite } from '../model/specialite.model';
import { SpecialiteWrapper } from '../model/specialite-wrapper';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  medecins: Medecin[];
  specialites: Specialite[];
  
  // L'URL mte3 Spring Boot (mrigel 8081 w /medecins)
  apiURLSpec: string = 'http://localhost:8081/medecins/spe';

  constructor(private http: HttpClient) {
    this.specialites = [
      { idSpec: 1, nomSpec: "Cardiologie" },
      { idSpec: 2, nomSpec: "Pédiatrie" }
    ];

    this.medecins = [
      { idMedecin: 1, nomMedecin: "Dr Ben Ali Sami", tarifMedecin: 80,
        dateEmbauche: new Date("2018-03-15"),
        specialite: { idSpec: 1, nomSpec: "Cardiologie" } },
      { idMedecin: 2, nomMedecin: "Dr Trabelsi Leila", tarifMedecin: 60,
        dateEmbauche: new Date("2020-09-01"),
        specialite: { idSpec: 2, nomSpec: "Pédiatrie" } },
      { idMedecin: 3, nomMedecin: "Dr Gharbi Khaled", tarifMedecin: 90.5,
        dateEmbauche: new Date("2015-01-20"),
        specialite: { idSpec: 1, nomSpec: "Cardiologie" } }
    ];
  }

  listeMedecins(): Medecin[] {
    return this.medecins;
  }

  ajouterMedecin(med: Medecin) {
    this.medecins.push(med);
  }

  supprimerMedecin(med: Medecin) {
    const index = this.medecins.indexOf(med, 0);
    if (index > -1) {
      this.medecins.splice(index, 1);
    }
  }

  consulterMedecin(id: number): Medecin {
    return this.medecins.find(m => m.idMedecin == id)!;
  }

  updateMedecin(m: Medecin) {
    const index = this.medecins.findIndex(x => x.idMedecin == m.idMedecin);
    this.medecins.splice(index, 1, m);
  }

  rechercherParSpecialite(idSpec: number): Medecin[] {
    return this.medecins.filter(m => m.specialite.idSpec == idSpec);
  }

  rechercherParNom(nom: string): Medecin[] {
    return this.medecins.filter(m =>
      m.nomMedecin.toLowerCase().includes(nom.toLowerCase()));
  }

  listeSpecialites(): Observable<SpecialiteWrapper> {
    return this.http.get<SpecialiteWrapper>(this.apiURLSpec);
  }

  consulterSpecialite(id: number): Specialite {
    return this.specialites.find(s => s.idSpec == id)!;
  }

  ajouterSpecialite(spec: Specialite) {
    spec.idSpec = Math.max(0, ...this.specialites.map(s => s.idSpec)) + 1;
    this.specialites.push(spec);
  }

  updateSpecialite(spec: Specialite) {
    const index = this.specialites.findIndex(s => s.idSpec == spec.idSpec);
    if (index > -1) {
      this.specialites.splice(index, 1, spec);
    }
  }
}