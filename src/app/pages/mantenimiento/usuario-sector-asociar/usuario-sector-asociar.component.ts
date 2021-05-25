import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { AlertServiceService } from './../../../services/alert-service.service';
import { UserService } from '../../../services/user.service';
import { TurnoService } from './../../../services/turno.service';

@Component({
  selector: 'app-usuario-sector-asociar',
  templateUrl: './usuario-sector-asociar.component.html',
  styleUrls: ['./usuario-sector-asociar.component.scss']
})
export class UsuarioSectorAsociarComponent implements OnInit {



  cols: any[];
  columns: any[];
  elementosSector: any[] = [];
  elementosAsociados: any[] = [];
  elementosUsuario: any = null;
  selecteditems: any;
  loading;
  userData: any;
  selectedSector: any;
  selectedAsociados: any;
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
        this.turnoService.getSectorUsuarioAsociado(this.config.data.id)
        .subscribe(resp => {
            this.elementosAsociados = resp;
            console.log(this.elementosAsociados);
            this.loading = false;
            console.log(resp);
            this.loadSecor();
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}

loadSecor() {

  this.loading = true;
  this.mensaje = 'Cargando puesto ...';
  try {
      this.turnoService.getSector()
      .subscribe(resp => {
          this.elementosSector = resp;
          console.log(this.elementosSector);
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
  console.log(this.selectedSector);
  this.loading = true;
  this.mensaje = 'Guardando sectores...';

  try {
      this.turnoService.setSectorUsuarioAsociado(this.selectedSector, this.config.data.id)
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


}

borrar(e: any) {
  console.log(e.value);

  this.loading = true;
  try {
      this.turnoService.delSectorAsociado(e.value.sector_usuario_asociado_id)
      .subscribe(resp => {
        this.loadSector();
      },
      error => { // error path
          console.log(error);
          this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
       });
  } catch (error) {
    this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
  }


}


}
