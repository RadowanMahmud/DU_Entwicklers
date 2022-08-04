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
    if (!localStorage.getItem('isLoggedIn')) {
      var user = JSON.parse( localStorage.getItem('isLoggedIn'));
      if(user){
          this.router.navigateByUrl('dashboard');
      }
    }
  }
  SignInformModel = this.formbuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  login(){
    console.log('here')
    var body = {
      "email": this.SignInformModel.value.email,
      "password": this.SignInformModel.value.password,
    }
     this.http.post("http://localhost:8080/signup",body).subscribe(
      (response: any) => {
          if (response) {
              console.log(response)
          }
          else {
              console.log("not succeed");
          }
      },
      error => {                             
          alert('Can not login. Please try again');
      }
    )

  }

}
