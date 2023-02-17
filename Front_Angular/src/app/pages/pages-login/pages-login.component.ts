import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  formValue !: FormGroup;
  login_data: any;

  check_login(login_data: { username_util : string; password_util: string; }) {
    let login = this.formValue.controls['username_util'].value
    let resp = this.httpClient.get('http://localhost:8080/utilisateur/findByUsername/'+ login);
    resp.subscribe((data) =>{ this.login_data = data
      if (this.login_data.length == 0) {
        alert("login incorrect");
      } else if (!(this.login_data[0].password_util.match(this.formValue.controls['password_util'].value))) {
        alert("password incorrect");
      } else {
        this.router.navigate(['/dashboard']);
      }
    });

  }
    ngOnInit() : void {
      this.formValue = this.formBuilder.group({
        username_util: ['',Validators.required],
        password_util: ['', Validators.required],
      })
    }

}
