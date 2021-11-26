import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.adminService.token !== '') {
      this.router.navigateByUrl('/home');
    }
  }

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  user: any = {};

  

  login(){

    if (!this.loginForm.valid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: 'Ingresa datos validos.'
      })
      
      return;
    }

    this.adminService.loginAdmin(this.loginForm.value)
    .subscribe(response => {
      this.user = response.data;
      localStorage.setItem('token', response.token);
      localStorage.setItem('_id', this.user._id);
      this.router.navigateByUrl('/home');
    },
    error => {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: '' + error.error.message
      })
    })
   
    
  }
}
