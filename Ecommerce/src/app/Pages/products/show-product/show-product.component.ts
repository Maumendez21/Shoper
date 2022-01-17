import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../../../Services/cliente.service';
import { CartService } from '../../../Services/cart.service';
import { io } from "socket.io-client";
declare var tns: any;
declare var lightGallery: any;

declare var iziToast: any;


const base_url = environment.API_URL;

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  public product: any = {};
  public urlImg: string = base_url;
  public recomended: Array<any> = [];

  public loadCart: boolean = false;

  public socket = io('http://localhost:4201');

  public carritoData: any = {
    variedad: "",
    cantidad: 1
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClienteService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initGallery();
    this.activatedRoute.params.subscribe(({slug}) => {this.cargarProducto(slug)})
    
  }

  cargarProducto(slug: string){
    this.clientService.getProductBySlug(slug)
    .subscribe(({product}) => {
      this.product = product;
      this.listRecomend(product.categoria);
    }, ({error})=> {
      this.router.navigateByUrl('/products');
      console.log(error.message);
    })
  }

  listRecomend(catego: string){
    this.clientService.getProductsRecomend(catego)
    .subscribe(({data}) => {
      this.recomended = data;
    })
  }

  addCart(){
    if (this.carritoData.variedad === "") {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: 'Selecciona un ' + this.product.titulo_variedad
      })
      return;
    }

    if (this.carritoData.cantidad > this.product.stock) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topLeft',
        message: 'Solo existen ' + this.product.stock
      })
      return;
    }

    const data = {
      ...this.carritoData,
      producto: this.product._id,
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


  initGallery(){

    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });
      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }
      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });
    }, 500);

   

    
  }




}
