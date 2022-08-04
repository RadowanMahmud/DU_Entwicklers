import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private formbuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      var user = JSON.parse( localStorage.getItem('isLoggedIn'));
      if(user){
          this.router.navigateByUrl('dashboard');
      }
    }
  }
  SignUpformModel = this.formbuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  signIn(){
    console.log('here')
    var body = {
      "email": this.SignUpformModel.value.email,
      "password": this.SignUpformModel.value.password,
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
