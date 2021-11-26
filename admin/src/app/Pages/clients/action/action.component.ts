import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/Services/client.service';
declare var iziToast: any;

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    
  ) { }

  public clientForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    f_nacimiento: ['', Validators.required],
    dni: [0, Validators.required],
    genero: [0, Validators.required],

  })
  ngOnInit(): void {

    
  }
  
  register(){

    if (!this.clientForm.valid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingresa datos validos.'
      })
      return;
    }

    this.clientService.registerClientAdmin(this.clientForm.value)
    .subscribe(response => {
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: 'Cliente Registrado'
      })
      this.clientForm.reset();
    }, error => {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: error.error.message + ''
      })
    })
  }

}
