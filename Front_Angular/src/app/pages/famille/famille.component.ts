import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {
  searchText = '';
  private baseUrl = 'http://localhost:8080/famille';

  constructor(private httpClient : HttpClient,private formBuilder : FormBuilder) { }
  famille: any ;
  formValue !: FormGroup;

  deleteFamille(id: number) {
    let resp = this.httpClient.delete(this.baseUrl+'/DeleteFamille/'+id);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();
  }
  addFamille( famille : { lib_famille : string}) {
    let resp = this.httpClient.post(this.baseUrl+'/AddFamille',famille);
    resp.subscribe((data)=>this.famille=data);
    window.location.reload();
  }
  onedit(famille : any) {
    this.formValue.controls['lib_famille'].setValue(famille.lib_famille);
  }
  updatefamille (fam : {  id_famille: string,lib_famille: string} ) {
    let resp = this.httpClient.put(this.baseUrl+'/updateFamille/'+fam.id_famille ,fam);
    resp.subscribe((data)=>console.log(data));
    window.location.reload();

  }
  showFam(){
    let resp = this.httpClient.get(this.baseUrl+'/consultAllFamille');
    resp.subscribe((data)=>this.famille=data);
    console.log(this.famille);
  }
  ngOnInit(): void {
    this.showFam();
    this.formValue = this.formBuilder.group({
      id_famille : [''],
      lib_famille : ['',Validators.required],

    })
  }

}
