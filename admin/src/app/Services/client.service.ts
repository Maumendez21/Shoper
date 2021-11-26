import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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

  getClients(tipo: string, filter: string): Observable<any>{
    const url = base_url + `client_list/${tipo}/${filter}`;
    return this.http.get(url, this.headers );
  }

  registerClientAdmin(data: any): Observable<any>{
    const url = base_url + `registro_cliente_admin`;
    return this.http.post( url, data, this.headers );
  }


}
