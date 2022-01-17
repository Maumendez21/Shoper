import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../Services/cliente.service';
declare var iziToast: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public clienteService: ClienteService
  ) { }

  public client: any = {};

  public clientForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['',[Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    pais: [''],
    password: [''],
    f_nacimiento: ['', Validators.required],
    dni: [0, Validators.required],
    genero: [0, Validators.required],

  })



  ngOnInit(): void {
    this.cargarCliente();
    this.clientForm.controls['email'].disable();
  }

  public id: string = "";

  cargarCliente(){

    
    
    


    const id = localStorage.getItem("_id");
    this.clienteService.getClientById(id)
    .subscribe(({client}) => {
      
      let { _id, nombres, pais, password, apellidos,email, telefono, f_nacimiento, dni, genero } = client;
      console.log(telefono);
      
      this.id = _id;
      this.clientForm.setValue({ nombres , apellidos, email, telefono, f_nacimiento, dni, genero, password: '', pais });
    })


  }

  updateProfile(){
    
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
    

    this.clienteService.updateClientProfile(this.clientForm.value, this.id)
    .subscribe(res => {
      
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: `Perfil Actualizado`
      })
      // this.cargarCliente();

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
