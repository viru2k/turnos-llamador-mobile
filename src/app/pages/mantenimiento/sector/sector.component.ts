import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { TurnoService } from './../../../services/turno.service';
import { PopupSectorEditarComponent } from './popup-sector-editar/popup-sector-editar.component';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {

   
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;

  constructor(private turnoService: TurnoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'sector_nombre', header: 'Sector',  width: '90%' },
      { field: '', header: 'Acción',  width: '10%' }
      
      
   ];
  }

  ngOnInit() {
    
    this.loadlist();
  }

  loadlist(){

    this.loading = true;
    try {
        this.turnoService.getSector()
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
  const ref = this.dialogService.open(PopupSectorEditarComponent, {
  data,
   header: 'Editar sector',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupSectorEditarComponent: any) => {
    if (PopupSectorEditarComponent) {
      this.loadlist();
    }

  });

}




nuevo() {

  const data: any = null;
  const ref = this.dialogService.open(PopupSectorEditarComponent, {
  data,
   header: 'Crear sector',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupSectorEditarComponent: any) => {
    if (PopupSectorEditarComponent) {
      this.loadlist();
    }
  });

}
}

