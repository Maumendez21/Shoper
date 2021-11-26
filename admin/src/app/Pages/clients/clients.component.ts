import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Array<any> = [];

  public apellido: string = '';
  public correo: string = '';

  public page = 1;
  public pageSize = 5;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.clientService.getClients('all','all').subscribe(clients =>{
      this.clients = clients.data;   
    })
  }

  filterClients(tipe: any){
    this.clientService.getClients(tipe,tipe === 'ap' ? this.apellido : tipe === 'email' ? this.correo : 'all').subscribe(clients =>{
      this.clients = clients.data;   
    })  
  }

}
