import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuponService } from '../../../Services/cupon.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var iziToast: any;
@Component({
  selector: 'app-action-cupons',
  templateUrl: './action-cupons.component.html',
  styleUrls: ['./action-cupons.component.css']
})
export class ActionCuponsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cuponService: CuponService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public loadingCupon: boolean = true;
  public loading: boolean = false;
  public title: string = '';

  public cuponUpdate: any;

  public cuponForm: FormGroup =  this.fb.group({
    codigo: ['', Validators.required],
    tipo: ['0', Validators.required],
    valor: ['', Validators.required],
    limite: ['', Validators.required],
  })

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {this.cargarCupon(id)})
  }

  cargarCupon(id: string) {
    if (id === 'nuevo') {
      this.title = 'Crear';
      this.loadingCupon = false;
      return;
    }

    this.title = 'Editar';
    this.cuponService.getCuponId(id)
    .subscribe(({cupon}) => {

      this.cuponUpdate = cupon;
      const { codigo, tipo, valor, limite } = cupon;
      this.cuponForm.setValue({ codigo, tipo, valor, limite })
      this.loadingCupon = false;
      
    },error => {
      this.router.navigateByUrl('/cupons');
    })

  }

  actionCupon(){

    if (!this.cuponForm.valid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Llena todos los campos.'
      })
      return;
    }

    this.loading = true;

    if (!this.cuponUpdate) {
      
      this.cuponService.createCupon(this.cuponForm.value)
      .subscribe(({message}) => {
        iziToast.show({
          title: 'OK',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `${message}`
        })
        this.loading = false;
        
        this.cuponForm.reset();
      }, ({error}) => {
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: '' + error.message
        })
        return;
      })

      return;
    }



    this.cuponService.updateCupon(this.cuponUpdate._id, this.cuponForm.value)
    .subscribe(({message}) => {

      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: '' + message
      })
      
      
      setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/cupons');
        
      }, 1000);

      
    }, ({error}) =>{
      this.loading = false;
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: '' + error
        })
        return;
    })







  }

}
