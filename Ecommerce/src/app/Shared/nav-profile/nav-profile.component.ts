import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css']
})
export class NavProfileComponent implements OnInit {

  constructor() { }

  public nombre: string = "";
  public email: string = "";

  ngOnInit(): void {
    let { nombres, email } =  JSON.parse(localStorage.getItem('user_data') || '{}');
    this.nombre = nombres,
    this.email = email;
  }



}
