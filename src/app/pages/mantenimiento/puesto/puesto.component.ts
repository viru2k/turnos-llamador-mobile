import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { TurnoService } from './../../../services/turno.service';
import { PopupPuestoEditarComponent } from './popup-puesto-editar/popup-puesto-editar.component';


@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.scss']
})
export class PuestoComponent implements OnInit {

  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;

  constructor(private turnoService: TurnoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'puesto_nombre', header: 'Puesto',  width: '90%' },
      { field: '', header: 'Acción',  width: '10%' }
      
      
   ];
  }

  ngOnInit() {
    
    this.loadlist();
  }

  loadlist(){

    this.loading = true;
    try {
        this.turnoService.getPuesto()
        .subscribe(resp => {
            this.elementos = resp;
            console.log(this.elementos);
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

buscar(elemento: any) {
  console.log(elemento);  
  const data: any = elemento;
  const ref = this.dialogService.open(PopupPuestoEditarComponent, {
  data,
   header: 'Editar puesto',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupPuestoEditarComponent: any) => {
    if (PopupPuestoEditarComponent) {
      this.loadlist();
    }

  });

}




nuevo() {

  const data: any = null;
  const ref = this.dialogService.open(PopupPuestoEditarComponent, {
  data,
   header: 'Crear puesto',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupPuestoEditarComponent: any) => {
    if (PopupPuestoEditarComponent) {
      this.loadlist();
    }
  });

}
}

