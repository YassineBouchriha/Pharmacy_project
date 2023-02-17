import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.component.html',
  styleUrls: ['./laboratoire.component.css']
})
export class LaboratoireComponent implements OnInit {
  searchText = '';
  private baseUrl = 'http://localhost:8080/laboratoire';

  constructor(private httpClient : HttpClient,private formBuilder : FormBuilder) { }
  laboratoire: any ;
  formValue !: FormGroup;
  deleteLaboratoire(id: number) {
    let resp = this.httpClient.delete(this.baseUrl+'/DeleteLaboratoire/'+id);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }
  addLaboratoire( laboratoire : { lib_labo : string}) {
    let resp = this.httpClient.post(this.baseUrl+'/AddLaboratoire',laboratoire);
    resp.subscribe((data)=>this.laboratoire=data);
    window.location.reload();
  }
  onedit(labo : any) {
    this.formValue.controls['id_labo'].setValue(labo.id_labo);
    this.formValue.controls['lib_labo'].setValue(labo.lib_labo);
  }
  showLab(){
    let resp = this.httpClient.get(this.baseUrl+'/getAllLaboratoire');
    resp.subscribe((data)=>this.laboratoire=data);
    console.log(this.laboratoire);
  }
  updateLaboratoire (lab : {  id_labo: number,lib_labo: string} ) {
    let resp = this.httpClient.put(this.baseUrl+'/update/'+lab.id_labo ,lab);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();

  }
  ngOnInit(): void {
    this.showLab();
    this.formValue = this.formBuilder.group({
      id_labo : [''],
      lib_labo : ['',Validators.required],
    })
  }

}
