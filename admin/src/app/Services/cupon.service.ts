import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const base_url = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CuponService {

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

  createCupon(data:  any): Observable<any>{
    const url = base_url + `registro_cupon`;
    return this.http.post(url, data, this.headers);
  }
  updateCupon(id: string,data:  any): Observable<any>{
    const url = base_url + `update_cupon/${id}`;
    return this.http.put(url, data, this.headers);
  }
  getCupons(filter: string): Observable<any>{
    const url = base_url + `cupon_list/${filter}`;
    return this.http.get(url, this.headers);
  }
  getCuponId(id: string): Observable<any>{
    const url = base_url + `cupon/${id}`;
    return this.http.get(url, this.headers);
  }
  cuponDelete(id: string): Observable<any>{
    const url = base_url + `cupon_delete/${id}`;
    return this.http.delete(url, this.headers);
  }



}
