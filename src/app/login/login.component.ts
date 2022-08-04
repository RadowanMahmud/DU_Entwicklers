import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient,private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      var user = JSON.parse( localStorage.getItem('isLoggedIn'));
      if(user){
          this.router.navigateByUrl('dashboard');
      }
    }
  }


}
