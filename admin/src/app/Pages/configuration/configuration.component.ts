import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/Services/config.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
declare var iziToast: any;
// uuidv4(); 

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder
  ) { }

  public config: any = {};
  public categorias: Array<any> = [];

  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';

  public titulo: string = ''
  public icono: string = ''

  public file!: File;

  public configForm = this.fb.group({
    // categorias: ['', Validators.required],
    titulo: ['', Validators.required],
    serie: ['', Validators.required],
    correolativo: ['', Validators.required]
  })


  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this.configService.getConfig()
    .subscribe(({_config}) => {
      const { titulo, serie, correolativo } = _config;
      console.log(_config.categorias);


      this.categorias = _config.categorias;
      this.config = _config;
      this.configForm.setValue({ titulo, serie, correolativo });
      
    })
  }

  updateConfig(){
    if (!this.configForm.valid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingresa datos validos.'
      })
      return;
    }


    const data =  {
      ...this.configForm.value,
      categorias: this.categorias
    }

    this.configService.updateConfig(data, this.file)
    .subscribe(res =>{
      console.log(res);
      
    })


    







  }

  crearCatego(){

    if (this.titulo === '' || this.icono === '') {
      Swal.fire('Error', 'Es necesario el titulo y el icono de la categoria', 'warning');
      return;
    }

    this.categorias.push({
      titulo: this.titulo,
      icono: this.icono,
      _id: uuidv4()
    })
    this.titulo = '', this.icono = ''
    // console.log(this.categorias);
    
    
  }

  fileChange(event: any):void{
    let file = null;
    file = <File>event.target.files[0];
    if (!event.target.files && !event.target.files[0]) { 
      // $('#iPortada').text('Selecciona una imagen');
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay imagen.'
      })
      return;
    }

    

    if (file.size >= 4000000) {
      // $('#iPortada').text('Selecciona una imagen');
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen es muy grande.'
      })
      return;
    }

    // if (file.type !== "image/png" || "image/jpg" || "image/gif" || "image/jpeg" || file.size >= 4000000) {
    //   $('#iPortada').text('Selecciona una imagen');

    //   iziToast.show({
    //     title: 'Error',
    //     titleColor: '#FF0000',
    //     class: 'text-danger',
    //     position: 'topRight',
    //     message: 'Este archivo no es una imagen.'
    //   })
    //   return;
    // }


    const reader = new FileReader();
    reader.onload = e => this.imgSelected = reader.result;
    reader.readAsDataURL(file);

    // $('#iPortada').text(file.name);

    this.file = file;
    
  }


}
