import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
declare var iziToast: any;

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {

  constructor(
    private productoService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public loadingProduct: boolean = true;
  public titulo: string = '';
  public product: any;

  public inventarios: Array<any> = [];
  public inventario: any = {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {this.cargarProducto(id)})
  }

  getInventario(id: string){
    this.productoService.getInventarioById(id)
    .subscribe(({data}) => {
      this.inventarios = data;
    })
  }

  cargarProducto(id: string){

    this.productoService.getProductById(id)
    .subscribe(({product}) => {
      const {titulo, stock, precio, categoria, descripcion, especificaciones, portada } = product;
      this.titulo = titulo;
      this.product = product;

      this.getInventario(product._id);
      // this.productForm.setValue({titulo, stock, precio, categoria, descripcion, especificaciones });
      this.loadingProduct = false; 
    }, ({error}) => {
      this.router.navigateByUrl('/products');
    })
  }

  addInventario(inventarioForm: NgForm){

    if (!inventarioForm.valid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los dos campos son requeridos.'
      })
      return;
    }

    const data = {
      producto: this.product._id,
      admin: localStorage.getItem('_id'),
      ...this.inventario,
    }
    
    this.productoService.addInventarioAdmin(data)
    .subscribe(({message}) => {

      // console.log(data.produto);
      

      this.getInventario(this.product._id);

      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: '' + message
      })

      this.inventario = {};


      
    }, ({error})=> {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: '' + error.message
      })
      return;
    })
    
  }

  eliminar(inventario: any) {
    
    Swal.fire({
      title: `Eliminar ${inventario.cantidad} de stock de ${inventario.producto.titulo}?`,
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteInventarioAdmin(inventario._id).subscribe(({message}) =>{
          this.getInventario(this.product._id);
          Swal.fire(
            'Elimiando!',
            '' + message,
            'success'
          )
        })
      }
    })
  }


}
