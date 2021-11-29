import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { environment } from 'src/environments/environment';
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

  

  

}
