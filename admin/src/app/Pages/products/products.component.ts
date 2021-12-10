import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var iziToast: any;
const base_url = environment.API_URL;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  public products: Array<any> = [];
  public page = 1;
  public pageSize = 5;
  public loading = true;

  public urlImg: string = base_url;

  ngOnInit(): void {
    this.getProducts("all");
  }

  getProducts(parameter: string){
    this.productService.getProducts(parameter).subscribe(({data}) => {
      
      this.products = data;
      this.loading = false;
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
  }

  deleteProduct(producto: any){
    Swal.fire({
      title: `Eliminar a ${producto.titulo}?`,
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductAdmin(producto._id).subscribe(({message}) =>{
          this.getProducts("all");
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
