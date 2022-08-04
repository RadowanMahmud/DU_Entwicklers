import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      var user = JSON.parse( localStorage.getItem('isLoggedIn'));
      if(user){
          this.router.navigateByUrl('dashboard');
      }
    }
  }

}
