import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { AlertServiceService } from './../../../services/alert-service.service';
import { UserService } from '../../../services/user.service';
import { TurnoService } from './../../../services/turno.service';

@Component({
  selector: 'app-usuario-sector',
  templateUrl: './usuario-sector.component.html',
  styleUrls: ['./usuario-sector.component.scss']
})
export class UsuarioSectorComponent implements OnInit {

 
  cols: any[];
  columns: any[];
  elementosSector: any[] = [];
  elementosPuesto: any[] = [];
  elementosUsuario: any = null;
  selecteditems: any;
  loading;
  userData: any;
  selectedSector: any;
  selectedPuesto: any;
  selectedModulos: any[];
  mensaje: string;

  // tslint:disable-next-line: max-line-length
  constructor(public config: DynamicDialogConfig, private turnoService: TurnoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService , public ref: DynamicDialogRef) { }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.config.data);
    this.loadSector();
  }

 
  loadSector() {

    this.loading = true;
    this.mensaje = 'Cargando sectores ...';
    try {
        this.turnoService.getSector()
        .subscribe(resp => {
            this.elementosSector = resp;
            console.log(this.elementosSector);
            this.loading = false;
            console.log(resp);
            this.loadPuesto();
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}

loadPuesto() {

  this.loading = true;
  this.mensaje = 'Cargando puesto ...';
  try {
      this.turnoService.getPuesto()
      .subscribe(resp => {
          this.elementosPuesto = resp;
          console.log(this.elementosPuesto);
          this.loading = false;
          console.log(resp);
          this.loadlist();
      },
      error => { // error path
          console.log(error);
          this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
       });
  } catch (error) {
    this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
  }
}


  loadlist() {

    this.loading = true;
    this.mensaje = 'Cargando sectores ...';
    try {
        this.turnoService.getSectorByUsuario(this.config.data.id)
        .subscribe(resp => {
            this.elementosUsuario = resp;
            console.log(this.elementosUsuario);
            this.loading = false;
            console.log(resp);
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}



guardarSector() {  

  this.loading = true;
  this.mensaje = 'Guardando sectores...';
  console.log(this.selectedPuesto);
  console.log(this.selectedSector);
  if((this.selectedPuesto !== undefined) && (this.selectedSector !== undefined)) {
    try {
      this.turnoService.setUsuarioSector(this.selectedPuesto.puesto_nombre, this.selectedSector.id,  this.config.data.id)
      .subscribe(resp => {
          console.log(resp);
          this.ref.close(resp);
      },
      error => { // error path
          console.log(error);
          this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
       });
  } catch (error) {
    this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
  } 

  } else {
    this.alertServiceService.throwAlert('warning','', '', '500');
  }
 /*  try {
      this.turnoService.setUsuarioSector(this.selectedModulos, this.config.data.id)
      .subscribe(resp => {
          console.log(resp);
      },
      error => { // error path
          console.log(error);
          this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
       });
  } catch (error) {
    this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
  } */

}
}
