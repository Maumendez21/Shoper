import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CuponService } from '../../Services/cupon.service';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {

  constructor(
    private cuponService: CuponService
  ) { }

  public cupons: Array<any> = [];
  public page = 1;
  public pageSize = 5;

  ngOnInit(): void {
    this.getCupons("all");
  }

  getCupons(filter: string){
    this.cuponService.getCupons(filter)
    .subscribe(({data}) => {
      this.cupons = data;
    })
  }

  deleteProduct(cupon: any){
    Swal.fire({
      title: `Eliminar cupón ${cupon.codigo}?`,
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.cuponService.cuponDelete(cupon._id)
        .subscribe(({message}) =>{
          this.getCupons("all");
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
