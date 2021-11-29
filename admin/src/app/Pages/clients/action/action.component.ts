import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public title: string = '';
  public clientUpdate:any;
  public loading: boolean = false;
  public loadingClient: boolean = true;

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

    this.activatedRoute.params.subscribe(({id}) => {this.cargarCliente(id)})
    
  }

  cargarCliente(id: string){


    if (id === 'nuevo') {
      this.title = 'Registrar';
      this.loadingClient = false;
      return;
    }

    this.title = 'Editar';
    this.clientService.getClientById(id).subscribe(({client}) => {

      let { nombres, apellidos, email, telefono, f_nacimiento, dni, genero } = client;

      if (!telefono ) {
        telefono = '';
      }
      if (!f_nacimiento) {
        f_nacimiento = '';
      }
      if (!dni) {
        dni = 0;
      }
      if (!genero) {
        genero = 0;
      }

      this.clientUpdate = client;
      this.clientForm.setValue({ nombres , apellidos, email, telefono, f_nacimiento, dni, genero });
      this.loadingClient = false;
    }, ({error}) => {
      this.router.navigateByUrl('/clients');
      return;
    })
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

    if (this.clientUpdate) {

      this.loading = true;

      this.clientService.updateClientAdmin(this.clientForm.value, this.clientUpdate._id)
      .subscribe(response => {
        iziToast.show({
          title: 'OK',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `${this.clientUpdate.nombres} Actualizado`
        })
        this.loading = false;
        this.router.navigateByUrl('/clients');
      }, error => {
        this.loading = false;
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: error.error.message + ''
        })
      })
    }else {

      this.loading = true;
      this.clientService.registerClientAdmin(this.clientForm.value)
      .subscribe(response => {
        iziToast.show({
          title: 'OK',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'Cliente Registrado'
        })
        this.loading = false;
        this.clientForm.reset();
      }, error => {
        this.loading = false;
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

}
