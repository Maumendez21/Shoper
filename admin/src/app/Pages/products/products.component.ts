import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var iziToast: any;
const base_url = environment.API_URL;

// import * as Excel from 'exceljs'

import { Workbook } from "exceljs";
import * as fs from 'file-saver';
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
  public _products: Array<any> = [];
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

      this.products.forEach(element => {
        this._products.push({
          titulo: element.titulo,
          stock: element.stock,
          precio: element.precio,
          categoria: element.categoria,
          n_ventas: element.nventas
        })
      });

      console.log(this._products);
      


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

  exportExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this._products){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  

  

}
