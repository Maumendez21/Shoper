import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';
import { CartService } from '../../Services/cart.service';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";


declare var $: any;
const base_url = environment.API_URL;
declare var iziToast: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.getClientId();
    this.getCategorias();

    this.socket.on('new-carrito', (data) => {
      this.getCart(this.client_ls._id);
    })

    this.socket.on('new-carrito-add', (data) => {
      this.getCart(this.client_ls._id);
    })


  }

  public client: any;
  public client_ls: any;
  public categorias: any[] = [];
  public cart: Array<any> = [];
  public subTotal = 0;
  public socket = io('http://localhost:4201');

  public urlImg: string = base_url;

  public openCart = false;

  getCategorias(){
    this.clienteService.getCat()
    .subscribe(({_config}) => {
      this.categorias =  _config.categorias;
    })
  }

  getClientId(){
    const id = localStorage.getItem("_id");
    this.clienteService.getClientById(id)
    .subscribe(({client}) => {
      this.client = client;
      localStorage.setItem('user_data', JSON.stringify(client));
      if (localStorage.getItem('user_data')) {
        this.client_ls = JSON.parse(localStorage.getItem('user_data') || '{}')
        this.getCart(this.client_ls._id);
      }else {
        this.client_ls = undefined;
      }
    })
  }

  getCart(id: string){
    this.cartService.getCart(id)
    .subscribe(({cart}) => {
      this.cart = cart;
      this.calcTotal();
    })
  }

  calcTotal(){
    this.cart.forEach(element => {
      this.subTotal = this.subTotal + parseInt(element.producto.precio)
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  openModalCart(){
    if (!this.openCart) {
      this.openCart = true;
      $('#cart').addClass('show');
    }else {
      this.openCart = false;
      $('#cart').removeClass('show');

    }
  }

  delete(id: string){
    this.cartService.deleteCart(id)
    .subscribe(({message, data}) => {
      iziToast.show({title: 'OK',titleColor: '#1DC74C',class: 'text-success',position: 'topRight',message: '' + message})
      this.socket.emit('delete-carrito', {data});
      
    }, ({error})=>{
      iziToast.show({title: 'Error',titleColor: '#FF0000',class: 'text-danger',position: 'topLeft',message: '' + error.message})
    })
  }

}
