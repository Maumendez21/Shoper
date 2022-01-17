import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) { 
    if (localStorage.getItem('token')) {
      router.navigateByUrl('/home');
      return;
    }
  }

  public client: any = {};


  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

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

    this.clienteService.loginClient(this.loginForm.value)
    .subscribe(({data, token}) => {
      
      localStorage.setItem('token', token);
      localStorage.setItem('_id', data._id);

      this.client = data;

      

      this.router.navigateByUrl('/home');


      
    }, ({error}) => {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: '' + error.message
      })
    })

    
  }

}
