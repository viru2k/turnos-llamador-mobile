import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TurnoService } from './../../../../services/turno.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { Multimedia } from './../../../../models/multimedia.model';
import { calendarioIdioma } from './../../../../config/config';
import { ConexionService } from './../../../../services/conexion.service';
import { formatDate } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';


@Component({
  selector: 'app-popup-video',
  templateUrl: './popup-video.component.html',
  styleUrls: ['./popup-video.component.scss']
})
export class PopupVideoComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: FileUpload;

  updateDataForm: FormGroup;
  es: any;
  userData: any;
  esNuevo;
  loading;
  tiene_vencimiento = false;

  multimendia: Multimedia = null;
  constructor(public config: DynamicDialogConfig, private turnoService: TurnoService,
              private alertServiceService: AlertServiceService, public ref: DynamicDialogRef, public conexionService: ConexionService) {
      this.updateDataForm = new FormGroup({
        'id': new FormControl(''),
        'archivo_nombre': new FormControl(''),
        'archivo_nombre_original': new FormControl(''),
        'archivo_descripcion': new FormControl('', Validators.required),
        'orden': new FormControl(''),
        'fecha_carga': new FormControl(new Date()),
        'fecha_vencimiento': new FormControl(new Date(2050, 0O0, 0O1)),
        'tiene_vencimiento': new FormControl(),
    });
    }

    ngOnInit() {
      this.es = calendarioIdioma;
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log(this.config.data);
      console.log(this.config.data.tiene_vencimiento);
      
      if (this.config.data.es_nuevo === 'NO') {
        console.log('es editable');
        this.esNuevo = false;
        console.log(this.config.data.fecha_carga);
        //this.updateDataForm.patchValue(this.config.data);
        this.updateDataForm.patchValue({archivo_descripcion: this.config.data.archivo_descripcion});
        this.updateDataForm.patchValue({archivo_nombre: this.config.data.archivo_nombre});
        this.updateDataForm.patchValue({archivo_nombre_original: this.config.data.archivo_nombre_original});
        this.updateDataForm.patchValue({fecha_carga: new Date(this.config.data.fecha_carga)});
        this.updateDataForm.patchValue({fecha_vencimiento: new Date(this.config.data.fecha_vencimiento)});
        this.updateDataForm.patchValue({orden: this.config.data.orden});
        this.updateDataForm.patchValue({id: this.config.data.id});        
        if(this.config.data.tiene_vencimiento === '0'){
          this.updateDataForm.patchValue({tiene_vencimiento: false});
          this.tiene_vencimiento = false;
        } else {
          this.updateDataForm.patchValue({tiene_vencimiento: true});
          this.tiene_vencimiento = true;
        }
        
      } else {
        this.esNuevo = true;
        console.log('es nuevo');
      }
    }

    vencimientoStatus(event) {
      console.log(event);
      this.tiene_vencimiento = event.checked;

    }
    onUpload(event) {
      //console.log(event.files[0].name);
      //console.log(event.originalEvent.body);
      if(this.updateDataForm.value.tiene_vencimiento) {
        }
      const _fecha_carga = formatDate(new Date(this.updateDataForm.value.fecha_carga), 'yyyy-MM-dd HH :mm', 'en');
      const _fecha_creacion = formatDate(new Date(this.updateDataForm.value.fecha_carga), 'yyyy-MM-dd-HH-mm', 'en');
      const fecha_vencimiento = formatDate(new Date(this.updateDataForm.value.fecha_vencimiento), 'yyyy-MM-dd', 'en');
      // tslint:disable-next-line: max-line-length
      this.multimendia = new Multimedia('0', event.originalEvent.body, event.files[0].name,
      this.updateDataForm.value.archivo_descripcion, this.config.data.orden_total, _fecha_carga, fecha_vencimiento , this.updateDataForm.value.tiene_vencimiento );
      //console.log(this.multimendia);
      this.guardarDatos(this.multimendia);

    
    }

    guardarDatos(multimendia: any) {
      if (this.config.data.es_nuevo === 'SI') {
      try {
        this.turnoService.UploadFileDatos(multimendia)
         .subscribe(resp => {
         console.log(resp);
         this.loading = false;
         },
         error => { // error path
          this.alertServiceService.throwAlert('error', error, error, '404');
           });
     } catch (error) {
      this.alertServiceService.throwAlert('error', error, error, '404');
     }
    } else {
      try {
        this.turnoService.UploadFileDatosUpdate(multimendia, multimendia.id)
         .subscribe(resp => {
         console.log(resp);
         this.loading = false;
         },
         error => { // error path
          this.alertServiceService.throwAlert('error', error, error, '404');
           });
     } catch (error) {
      this.alertServiceService.throwAlert('error', error, error, '404');
     }
      
    }
    console.log('guardando');
      this.ref.close(multimendia);
    }

    borrarArchivo() {
      this.fileInput.clear();
    }


    guardar() {
      if (this.config.data.es_nuevo === 'SI') {
      this.fileInput.upload();
    } else {
      
      const _fecha_carga = formatDate(new Date(this.updateDataForm.value.fecha_carga), 'yyyy-MM-dd HH :mm', 'en');
      const _fecha_creacion = formatDate(new Date(this.updateDataForm.value.fecha_carga), 'yyyy-MM-dd-HH-mm', 'en');
      const fecha_vencimiento = formatDate(new Date(this.updateDataForm.value.fecha_vencimiento), 'yyyy-MM-dd', 'en');
      // tslint:disable-next-line: max-line-length
      this.multimendia = new Multimedia(this.updateDataForm.value.id, this.updateDataForm.value.archivo_nombre, this.updateDataForm.value.archivo_nombre_original, this.updateDataForm.value.archivo_descripcion, this.config.data.orden_total, _fecha_carga, fecha_vencimiento , this.updateDataForm.value.tiene_vencimiento );
      this.guardarDatos(this.multimendia);
    }
    }

    uploadresponse(event) {
      console.log(event.originalEvent.body);
    }
  }