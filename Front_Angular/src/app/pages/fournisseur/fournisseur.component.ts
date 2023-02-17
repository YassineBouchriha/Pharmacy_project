import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  searchText = '';
  private baseUrl = 'http://localhost:8080/fournisseur';
  constructor( private httpClient : HttpClient,private formBuilder : FormBuilder) {
  }
  fournisseurs: any ;
  formValue !: FormGroup;
  deletefourn(id: number) {
      let resp = this.httpClient.delete(this.baseUrl+'/DeleteFournisseur/'+id);
      resp.subscribe((data)=>console.log(data));
      window.location.reload();
  }

  addfourn( fourn : { nom_fournisseur: string, adress_fournisseur: string, email_fournisseur: string, tel_fournisseur: string}) {
    let resp = this.httpClient.post(this.baseUrl+'/AddFournisseur',fourn);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }


  showFourn(){
    let resp = this.httpClient.get(this.baseUrl+'/consultAllFournisseur');
    resp.subscribe((data)=>this.fournisseurs=data);
    console.log(this.fournisseurs);
  }
  onedit(fournisseurs : any) {
    this.formValue.controls['id_fournisseur'].setValue(fournisseurs.id_fournisseur);
    this.formValue.controls['nom_fournisseur'].setValue(fournisseurs.nom_fournisseur);
    this.formValue.controls['adress_fournisseur'].setValue(fournisseurs.adress_fournisseur);
    this.formValue.controls['email_fournisseur'].setValue(fournisseurs.email_fournisseur);
    this.formValue.controls['tel_fournisseur'].setValue(fournisseurs.tel_fournisseur);
  }

  updatefourn (fourn : {  id_fournisseur: string,nom_fournisseur: string, adress: string, email: string, tel: string,} ) {
    let resp = this.httpClient.put(this.baseUrl+'/update/'+fourn.id_fournisseur ,fourn);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();

  }


  ngOnInit(): void {

    this.showFourn();
    this.formValue = this.formBuilder.group({
      id_fournisseur : [''],
      nom_fournisseur : ['',Validators.required],
      adress_fournisseur : ['',Validators.required],
      email_fournisseur : ['',Validators.required],
      tel_fournisseur : ['',Validators.required]
    })
  }

}


