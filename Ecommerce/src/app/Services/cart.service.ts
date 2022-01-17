import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
        'Content-Type': 'application/json'
      }
    }
  }

  addCart(data: any): Observable<any>{
    const url = base_url + `add_cart`;
    return this.http.post(url, data,this.headers );
  }
  getCart(id: string): Observable<any>{
    const url = base_url + `cart/${id}`;
    return this.http.get(url,this.headers );
  }
  deleteCart(id: string): Observable<any>{
    const url = base_url + `cart_delete/${id}`;
    return this.http.delete(url,this.headers );
  }




}
