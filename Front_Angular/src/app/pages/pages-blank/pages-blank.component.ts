import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pages-blank',
  templateUrl: './pages-blank.component.html',
  styleUrls: ['./pages-blank.component.css']
})
export class PagesBlankComponent implements OnInit {

  private baseUrl = '';
  constructor( private httpClient : HttpClient ) {
  }
  fournisseurs: any ;

  ngOnInit(): void {
    let resp = this.httpClient.get(this.baseUrl);
    resp.subscribe((data)=>this.fournisseurs=data);

  }


}
