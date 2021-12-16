import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
const base_url = environment.API_URL;
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  public isAutenticate(allowed: string[]): boolean{

    if (this.token==='') {
      return false;
    }
    
    console.log(helper.isTokenExpired(this.token) );

    if (helper.isTokenExpired(this.token)) {
      localStorage.removeItem('token')
      return false;
    }

    try {
      var decodedToken = helper.decodeToken(this.token)
      
      if (!decodedToken) {
        localStorage.removeItem('token')
        return false;
      }      
    } catch (error) {
      localStorage.removeItem('token')
      return false;
      
    }

    return allowed.includes(decodedToken['role']);

  }
  
  loginAdmin(data: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(base_url + 'login_admin', data, {headers: headers});
  }

}
