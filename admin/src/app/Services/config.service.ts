import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const base_url = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

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

  getConfig(): Observable<any>{
    const url = base_url + `get_config`;
    return this.http.get(url, this.headers);
  }

  updateConfig(data: any, file: File): Observable<any>{

    if (file!==undefined) {
      
      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('categorias', JSON.stringify(data.categorias));
      fd.append('serie', data.serie);
      fd.append('correolativo', data.correolativo);
      fd.append('logo', file);
      const url = base_url + `/update_config`;
      return this.http.put( url, fd, this.headers );
    }
    
    const url = base_url + `/update_config`;
    return this.http.put(url, data, this.headers );
  }

  getImg(id: string): string{
    return `${base_url}/logo_img/${id}`;
  }

  getCat(): Observable<any>{
    const url = base_url + `get_cat`;
    return this.http.get(url, this.headers);
  }


}
