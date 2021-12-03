import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/Services/config.service';

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

  public configForm = this.fb.group({
    categorias: ['', Validators.required],
    titulo: ['', Validators.required],
  })


  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this.configService.getConfig()
    .subscribe(({_config}) => {
      this.config = _config;
      
    })
  }

}
