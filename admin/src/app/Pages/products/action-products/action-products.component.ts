import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-action-products',
  templateUrl: './action-products.component.html',
  styleUrls: ['./action-products.component.css']
})
export class ActionProductsComponent implements OnInit {

  public config: any = { };
  constructor(
    private fb: FormBuilder,
    private productoService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.config = {
      height: 500,
    }
  }
  
  public fileTemp!: File;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public title: string = "";

  public loadingProduct: boolean = true;
  public loading: boolean = false;

  public productUpdate: any;

  public productForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    stock: [0, Validators.required],
    precio: [0, Validators.required],
    categoria: ['', Validators.required],
    descripcion: ['', Validators.required],
    especificaciones: ['', Validators.required]

  })
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {this.cargarProducto(id)})
  }

  cargarProducto(id: string){
    if (id === 'nuevo') {
      this.title = 'Crear';
      this.loadingProduct = false;
      return;
    }

    this.title = 'Editar';
    this.productoService.getProductById(id)
    .subscribe(({product}) => {
      const {titulo, stock, precio, categoria, descripcion, especificaciones, portada } = product;

      this.productUpdate = product;

      this.imgSelected = this.productoService.getImg(portada);
      
      this.productForm.setValue({titulo, stock, precio, categoria, descripcion, especificaciones });
      this.loadingProduct = false; 
    }, ({error}) => {
      this.router.navigateByUrl('/products');
      console.log(error.message);
      
    })
  }


  fileChange(event: any):void{
    let file = null;
    file = <File>event.target.files[0];
    if (!event.target.files && !event.target.files[0]) { 
      $('#iPortada').text('Selecciona una imagen');
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay imagen.'
      })
      return;
    }

    

    if (file.size >= 4000000) {
      $('#iPortada').text('Selecciona una imagen');
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen es muy grande.'
      })
      return;
    }

    // if (file.type !== "image/png" || "image/jpg" || "image/gif" || "image/jpeg" || file.size >= 4000000) {
    //   $('#iPortada').text('Selecciona una imagen');

    //   iziToast.show({
    //     title: 'Error',
    //     titleColor: '#FF0000',
    //     class: 'text-danger',
    //     position: 'topRight',
    //     message: 'Este archivo no es una imagen.'
    //   })
    //   return;
    // }


    const reader = new FileReader();
    reader.onload = e => this.imgSelected = reader.result;
    reader.readAsDataURL(file);

    $('#iPortada').text(file.name);

    this.fileTemp = file;
    
  }

  actionProduct(){

    if (!this.productForm.valid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingresa datos validos.'
      })
      return;
    }




    if (this.productUpdate) {

      this.loading = true;

      this.productoService.actualizarProductAdmin(this.productForm.value, this.fileTemp, this.productUpdate._id)
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
    
    }else{

      if (this.fileTemp === undefined) {
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'Necesitas agregar una portada a tu producto'
        })
        return;
      }
      this.loading = true;
      this.productoService.registerProductAdmin(this.productForm.value, this.fileTemp)
      .subscribe(result => {
        iziToast.show({
          title: 'OK',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'Producto Registrado'
        })
        $('#iPortada').text('Selecciona una imagen');
        this.imgSelected = '/assets/img/01.jpg';
        this.productForm.reset();
        this.loading = false;
      },({ error})=> {
        this.loading = false;
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: '' + error.message
        })
      })

    }
    


    

  }

 
}
