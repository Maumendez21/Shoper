import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../../../Services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { io } from "socket.io-client";
// var slider = document.getElementById('slider');
// var slider = document.getElementById('slider');
declare var $: any;
declare var noUiSlider: any;
declare var iziToast: any;
const base_url = environment.API_URL;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public page = 1;
  public pageSize = 10;

  
  public categorias: any[] = [];
  public products: Array<any> = [];
  public _products: Array<any> = [];
  public search: string = '';
  public filter: string = '';
  public loading = true;
  public urlImg: string = base_url;

  public filterCatego: string = 'todos';
  public idCatego: string = '';


  public sort_bite: string = 'defecto';

  public loadCart: boolean = false;

  public socket = io('http://localhost:4201');

  public carritoData: any = {
    cantidad: 1
  };


  constructor(
    private clientService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  getCategorias(){
    this.clientService.getCat()
    .subscribe(({_config}) => {
      this.categorias =  _config.categorias;
    })
  }

  searchCat(){
    if (this.search === '') {
      this.getCategorias();
      return;
    }
    var search = new RegExp(this.search, 'i');
    this.categorias = this.categorias.filter(item => search.test(item.titulo))
  }

  getProducts(parameter: string){
    this.clientService.getProducts(parameter).subscribe(({data}) => {
      this.products = data;
      this.filterCatego = 'todos';
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

  filterProducts(){
    this.getProducts(this.filter);
  }

  filterPrice(){
    let min =  parseInt($('.cs-range-slider-value-min').val());
    let max = parseInt($('.cs-range-slider-value-max').val());


    this.products = this.products.filter((item)=>{
      return item.precio >= min && item.precio <= max
    })
    
  }

  filterCategories(){
    if (this.filterCatego === 'todos') {
      this.getProducts('all');
      return;
    }
    
    this.clientService.getProducts('all').subscribe(({data}) => {
      this.products = data;
      this.loading = false;
      this.products = this.products.filter(item => item.categoria == this.filterCatego);
    })
  }

  cargarParams(){
    this.activatedRoute.params.subscribe(({id}) => {
      if (id === 'all') {
        this.filterCatego = 'todos';
        this.getProducts('all');
        return;
      }
      
      this.filterCatego = id;
      this.clientService.getProducts('all').subscribe(({data}) => {
        
        this.products = data;
        this.loading = false;
        this.products = this.products.filter(item => item.categoria == id);
  
      })
    })
  }

  sortProducts(tipe: any){
    this.products.sort((a, b)=>{
      if (a.tipe < b.tipe) {
        return 1
      }
      if (a.tipe > b.tipe) {
        return -1;
      }
      return 0;
    });
  }

  ordenProd(){
    switch (this.sort_bite) {
      case 'defecto':
        this.getProducts('all');
        break;
      case 'popularidad':
        
        this.products.sort((a, b)=>{
          if (a.nventas < b.nventas) {
            return 1
          }
          if (a.nventas > b.nventas) {
            return -1;
          }
          return 0;
        });

        
        break;
      case 'mayor':

        this.products.sort((a, b)=>{
          if (a.precio < b.precio) {
            return 1
          }
          if (a.precio > b.precio) {
            return -1;
          }
          return 0;
        });

        break;
      case 'menor':
        this.products.sort((a, b)=>{
          if (a.precio > b.precio) {
            return 1
          }
          if (a.precio < b.precio) {
            return -1;
          }
          return 0;
        });


        break;
      case 'az':
        this.products.sort((a, b)=>{
          if (a.titulo < b.titulo) {
            return 1
          }
          if (a.titulo > b.titulo) {
            return -1;
          }
          return 0;
        });

        break;
      case 'za':

        this.products.sort((a, b)=>{
          if (a.titulo > b.titulo) {
            return 1
          }
          if (a.titulo < b.titulo) {
            return -1;
          }
          return 0;
        });
        break;
    
      default:
        this.getProducts('all');
        break;
    }
  }

  ngOnInit(): void {

    this.cargarParams();
    this.getProducts('all');
    this.getCategorias();

    var slider : any = document.getElementById('price');
    noUiSlider.create(slider, {
        start: [0, 100000],
        connect: true,
        range: {
            'min': 0,
            'max': 100000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 5,
        }
    })

    slider.noUiSlider.on('update', function (values: any[]) {
      
      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');
  }

  addCart(product: any){
    

    if (this.carritoData.cantidad > product.stock) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: 'Solo existen ' + product.stock
      })
      return;
    }

    const data = {
      cantidad: this.carritoData.cantidad,
      variedad: product.variedades[0].titulo,
      producto: product._id,
      cliente: localStorage.getItem('_id')
    }

    this.loadCart = true;
    this.cartService.addCart(data)
    .subscribe(({message}) => {
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: '' + message
      })

      this.socket.emit('add-carrito', {data:true});

      this.loadCart=false;
    }, ({error})=> {
      this.loadCart=false;
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: '' + error.message
      })
      return;
    })
  }


}
