import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
declare var iziToast: any;
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
  public loading = true;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.clientService.getClients('all','all').pipe(delay(100)).subscribe(clients =>{
      this.clients = clients.data;   
      this.loading = false;
    })
  }

  filterClients(tipe: any){
    this.loading = true;
    this.clientService.getClients(tipe,tipe === 'ap' ? this.apellido : tipe === 'email' ? this.correo : 'all').subscribe(clients =>{
      this.clients = clients.data;  
      this.loading = false;
    })  
  }

  deleteClient(cliente: any){

    Swal.fire({
      title: `Eliminar a ${cliente.nombres}?`,
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClientAdmin(cliente._id).subscribe(({message}) =>{
          this.getClients();
          Swal.fire(
            'Elimiando!',
            '' + message,
            'success'
          )
        })
      }
    })
  }

}
