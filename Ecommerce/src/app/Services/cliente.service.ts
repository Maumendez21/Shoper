import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
const base_url = environment.API_URL;


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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

  loginClient(data: any): Observable<any>{
    const url = base_url + `login_cliente`;
    return this.http.post( url, data, this.headers);
  }

  getClientById(id: any): Observable<any>{
    const url = base_url + `client/${id}`;
    return this.http.get(url, this.headers );
  }

  updateClientProfile(data: any, id: string): Observable<any>{
    const url = base_url + `update_client_guest/${id}`;
    return this.http.put( url, data, this.headers );
  }

  getCat(): Observable<any>{
    const url = base_url + `get_cat`;
    return this.http.get(url, this.headers);
  }

  getProducts(filter: string): Observable<any>{
    const url = base_url + `product_list_p/${filter}`;
    return this.http.get(url );
  }
  getProductsRecomend(catego: string): Observable<any>{
    const url = base_url + `product_list_recomend/${catego}`;
    return this.http.get(url);
  }

  getProductBySlug(slug: string): Observable<any>{
    const url = base_url + `product_p/${slug}`;
    return this.http.get(url);
  }

  public isAutenticate(): boolean{

    if (this.token==='') {
      return false;
    }
    

    if (helper.isTokenExpired(this.token)) {
      localStorage.clear();
      return false;
    }

    try {
      var decodedToken = helper.decodeToken(this.token)
      
      if (!decodedToken) {
        localStorage.clear();
        return false;
      }      
    } catch (error) {
      localStorage.clear();
      return false;
      
    }

    return true;

  }


}
