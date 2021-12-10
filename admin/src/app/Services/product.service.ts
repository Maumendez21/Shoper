import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  registerProductAdmin(data: any, file: File): Observable<any>{

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('categoria', data.categoria);
    fd.append('descripcion', data.descripcion);
    fd.append('especificaciones', data.especificaciones);
    fd.append('portada', file);

    const url = base_url + `registro_producto`;
    return this.http.post( url, fd, this.headers );
  }

  actualizarProductAdmin(data: any, file: File, id: string): Observable<any>{

    

    if (file!==undefined) {
      
      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('stock', data.stock);
      fd.append('precio', data.precio);
      fd.append('categoria', data.categoria);
      fd.append('descripcion', data.descripcion);
      fd.append('especificaciones', data.especificaciones);
      fd.append('portada', file);
      const url = base_url + `actualizar_producto/${id}`;
      return this.http.put( url, fd, this.headers );
    }

    const url = base_url + `actualizar_producto/${id}`;
    return this.http.put(url, data, this.headers );

  }
  actualizarProductVariedadAdmin(data: any, id: string): Observable<any>{
    const url = base_url + `actualizar_variedad/${id}`;
    return this.http.put(url, data, this.headers );

  }

  getProducts(filter: string): Observable<any>{
    const url = base_url + `product_list/${filter}`;
    return this.http.get(url, this.headers );
  }

  getProductById(id: string): Observable<any>{
    const url = base_url + `product/${id}`;
    return this.http.get(url, this.headers );
  }

  

  getImg(id: string): string{
    return `${base_url}/product_img/${id}`;
  }

  deleteProductAdmin(id: string): Observable<any>{
    const url = base_url + `eliminar_producto/${id}`;
    return this.http.delete( url, this.headers );
  }
  
  // Inventario
  getInventarioById(id: string): Observable<any>{
    const url = base_url + `inventario/${id}`;
    return this.http.get(url, this.headers );
  }
  deleteInventarioAdmin(id: string): Observable<any>{
    const url = base_url + `eliminar_inventario/${id}`;
    return this.http.delete( url, this.headers );
  }
  addInventarioAdmin(data: any): Observable<any>{
    const url = base_url + `add_inventario`;
    return this.http.post(url, data, this.headers );
  }


}
