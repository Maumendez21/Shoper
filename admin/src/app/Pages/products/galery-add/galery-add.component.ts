import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';  
import { environment } from 'src/environments/environment';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

const base_url = environment.API_URL;

@Component({
  selector: 'app-galery-add',
  templateUrl: './galery-add.component.html',
  styleUrls: ['./galery-add.component.css']
})
export class GaleryAddComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductService,
    private router: Router
  ) { }

  public urlImg: string = base_url;

  public file!: File;

  public producto: string = "";
  public id: string = "";
  public loading: boolean = false;
  public galeria: Array<any> = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {this.cargarProducto(id)})
  }

  cargarProducto(id: string){

    this.productoService.getProductById(id)
    .subscribe(({product}) => {
      const {_id, titulo_variedad,titulo, galeria } = product;

      this.producto = titulo;
      this.id = _id;
      this.galeria = galeria;

      
      // this.titulo_variedad = titulo_variedad;
      // this.variedades = variedades;

    }, ({error}) => {
      this.router.navigateByUrl('/products');
    })
  }


  eliminarFoto(img: any){



    this.productoService.eliminarGaaleria(img, this.id)
    .subscribe(({message}) => {
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: '' + message
      })
      

      this.activatedRoute.params.subscribe(({id}) => {this.cargarProducto(id)})
      
    })
  }

  updateVariedad(){

  }

  addImg(){

    if (this.file === undefined) {
      Swal.fire('Error', 'Es necesario seleccionar una imagén', 'warning');
      return;
    }

    const data = {
      img: this.file,
      _id: uuidv4()
    }


    this.productoService.actualizarGaaleria(data, this.id)
    .subscribe(({message}) => {
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: '' + message
      })

      

      $('#iPortada').text('Selecciona una imagen');
      
      

      this.activatedRoute.params.subscribe(({id}) => {this.cargarProducto(id)})

      
    }, ({error}) => {
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
    // reader.onload = e => this.imgSelected = reader.result;
    
    reader.readAsDataURL(file);

    $('#iPortada').text(file.name);

    this.file = file;
    
    
  }

}
