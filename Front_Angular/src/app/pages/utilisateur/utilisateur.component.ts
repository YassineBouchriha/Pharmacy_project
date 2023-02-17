import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/utilisateur';
  constructor( private httpClient : HttpClient) { }
  utilisateur: any ;

  deleteutilisateur(id: number) {
    let resp = this.httpClient.delete(this.baseUrl+'/DeleteUtilisateur/'+id);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }
  addutilisateur( utilisateur : { adress_util : string, code_postal_util: string, date_naissance_util: Date, email_util: string,nom_util: string, prenom_util: string}) {
    let resp = this.httpClient.post(this.baseUrl+'/AddUtilisateur',utilisateur);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }
  ngOnInit(): void {
    let resp = this.httpClient.get(this.baseUrl+'/consultAllUtilisateur');
    resp.subscribe((data)=>this.utilisateur=data);
    console.log(this.utilisateur);
  }

}
