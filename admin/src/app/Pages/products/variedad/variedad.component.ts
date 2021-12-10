import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var iziToast: any;

@Component({
  selector: 'app-variedad',
  templateUrl: './variedad.component.html',
  styleUrls: ['./variedad.component.css']
})
export class VariedadComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductService,
    private router : Router

  ) { }

 

  public variedad: string = "";
  public producto: string = "";

  public id: string = "";
  public titulo_variedad: string = "";
  public loading: Boolean = false;

  public variedades: Array<any> = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {this.cargarProducto(id)})
  }


  cargarProducto(id: string){

    this.productoService.getProductById(id)
    .subscribe(({product}) => {
      const {_id, titulo_variedad,titulo, variedades } = product;

      this.producto = titulo;
      this.id = _id;
      this.titulo_variedad = titulo_variedad;
      this.variedades = variedades;

    }, ({error}) => {
      this.router.navigateByUrl('/products');
    })
  }


  crearVariedad(){
    
    if (this.variedad === '') {
      Swal.fire('Error', 'Es necesario el nombre de la variedad', 'warning');
      return;
    }

    this.variedades.push({
      titulo: this.variedad
    })
    this.variedad = '';

    

  }

  updateVariedad(){

    if (this.variedades.length === 0) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe haber al menos una variedad'
      })
      return;
    }

    const data = {
      variedades: this.variedades,
      titulo_variedad: this.titulo_variedad 
    }

    this.loading = true;

    this.productoService.actualizarProductVariedadAdmin(data, this.id)
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
        this.router.navigateByUrl('/products');
        
      }, 1000);
      
    }, ({error}) => {
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

  eliminarVariedad(id: any){
    this.variedades.splice(id, 1);
  }
}
