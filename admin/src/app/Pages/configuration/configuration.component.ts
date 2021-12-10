import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;
// uuidv4(); 

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private router: Router
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
      const { titulo, serie, correolativo, logo } = _config;

      this.imgSelected = this.configService.getImg(logo);
      // $('.cs-file-drop-preview').html("<img src="+this.imgSelected+">");
      

      this.categorias = _config.categorias;
      this.config = _config;
      this.configForm.setValue({ titulo, serie, correolativo });
      
    })
  }
  public loading: boolean = false;

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

    this.loading = true;
    
    
    this.configService.updateConfig(data, this.file)
    .subscribe(({message}) =>{
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: '' + message
      })
      
      setTimeout(() => {
        this.loading = false;
        // this.router.navigateByUrl('/products');
        
      }, 1000);
      
    }, ({error}) => {
      this.loading = false;
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: '' + error
        })
        return;
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

  elimarcatego(id: any){
    this.categorias.splice(id, 1);
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
    $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
    $('.cs-file-drop-icon').addClass('cs-file-drop-icon cxi-upload');
    reader.readAsDataURL(file);

    // $('#iPortada').text(file.name);

    this.file = file;
    
    
  }

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelected+">");
  }


}
