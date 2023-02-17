import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  constructor(private httpClient : HttpClient,private formBuilder : FormBuilder) { }
  private baseUrl = 'http://localhost:8080/produitPharmacetique';
  searchText = '';
  produit: any ;
  formValue !: FormGroup;
  deleteProduit(id: number) {
    let resp = this.httpClient.delete(this.baseUrl+'/DeleteproduitPharmacetique/'+id);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }
  addProduit( produit : { lib_prd : string, description_prd :string, prix_prd : number, datePeremption : Date ,prix_livr:number}) {
    let resp = this.httpClient.post(this.baseUrl+'/AddproduitPharmacetique',produit);
    resp.subscribe((data)=>this.produit=data);
    window.location.reload();
  }
  onedit(prod : any) {
    this.formValue.controls['id_prd'].setValue(prod.id_prd);
    this.formValue.controls['lib_prd'].setValue(prod.lib_prd);
    this.formValue.controls['description_prd'].setValue(prod.description_prd);
    this.formValue.controls['prix_prd'].setValue(prod.prix_prd);
    this.formValue.controls['date_ajout_prd'].setValue(prod.date_ajout_prd);
    this.formValue.controls['prix_livr'].setValue(prod.prix_livr);
    this.formValue.controls['laboratoire'].setValue(prod.laboratoire.id_labo);
    this.formValue.controls['famille'].setValue(prod.famille.id_famille);

  }
  showProd(){
    let resp = this.httpClient.get(this.baseUrl+'/consultAllproduitPharmacetique');
    resp.subscribe((data)=>this.produit=data);
    console.log(this.produit);
  }
  updateProduit (prod : {  id_prd: number,lib_prd: string,description_prd:string,prix_prd:number,date_ajout_prd:Date,prix_livr:number} ) {
    let resp = this.httpClient.put(this.baseUrl+'/updateProduit/'+prod.id_prd ,prod);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();

  }

  ngOnInit(): void {
    this.showProd();
    this.formValue = this.formBuilder.group({
      id_prd : [''],
      lib_prd  : ['',Validators.required],
      description_prd  : ['',Validators.required],
      prix_prd  : ['',Validators.required],
      date_ajout_prd  : ['',Validators.required],
      prix_livr  : ['',Validators.required],
      laboratoire : ['',Validators.required],
      famille : ['',Validators.required],
    })
  }

}
