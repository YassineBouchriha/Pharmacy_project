import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  private baseUrl = 'http://localhost:8080/factureAchat';
  constructor(private httpClient : HttpClient, private formBuilder : FormBuilder ) { }
  facture: any ;
  fourn: any ;
  formValue !: FormGroup;
  deleteFacture(id: number) {
    let resp = this.httpClient.delete(this.baseUrl+'/DeleteFactureAchat/'+id);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }
  addFacture( facture : { date : Date, total_ht :string, total_tva : string,total_ttc:string, fourn : any}) {

    let resp1 = this.httpClient.get('http://localhost:8080/fournisseur/consultFournisseur/'+this.formValue.controls['id_fournisseur'].value);
    resp1.subscribe((data)=>this.fourn=data);
    console.log(this.fourn);

    let resp = this.httpClient.post(this.baseUrl+'/AddFactureAchat',facture);
    resp.subscribe((data)=>this.facture=data);
    console.log(this.facture);
    //window.location.reload();
  }

  ngOnInit(): void {
   this.formValue = this.formBuilder.group({
      date : ['',Validators.required],
      total_ht : ['',Validators.required],
      total_tva : ['',Validators.required],
      total_ttc : ['',Validators.required],
      id_fournisseur : ['',Validators.required]
    })

    let resp = this.httpClient.get(this.baseUrl+'/findALLFactureAchat');
    resp.subscribe((data)=>this.facture=data);
    console.log(this.facture);
  }

}
