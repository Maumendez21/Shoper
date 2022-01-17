import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartService } from '../../Services/cart.service';
import { io } from "socket.io-client";
const base_url = environment.API_URL;
declare var iziToast: any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public urlImg: string = base_url;

  constructor(
    private cartService: CartService
  ) { }

  public cart: Array<any> = [];
  public subTotal = 0;
  public total = 0;

  public socket = io('http://localhost:4201');

  ngOnInit(): void {
    this.getCart(localStorage.getItem('_id') || '');
    this.socket.on('new-carrito', (data) => {
      this.getCart(localStorage.getItem('_id') || '');
    })
  }

  getCart(id: string){
    this.cartService.getCart(id)
    .subscribe(({cart}) => {
      console.log(cart);
      this.cart = cart;
      this.calcTotal();
    })
  }

  calcTotal(){
    this.cart.forEach(element => {
      this.subTotal = this.subTotal + parseInt(element.producto.precio)
    });
    this.total = this.subTotal;
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
