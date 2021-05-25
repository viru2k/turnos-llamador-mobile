import { Component, OnInit } from '@angular/core';
import { MessageService, DynamicDialogConfig } from 'primeng/api';
import { DialogService } from 'primeng/components/common/api';
import { AlertServiceService } from './../../../services/alert-service.service';
import { UserService } from './../../../services/user.service';
import { PopupReglasEditarComponent } from './popup-reglas-editar/popup-reglas-editar.component';
import { TurnoService } from './../../../services/turno.service';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.scss']
})
export class ReglasComponent implements OnInit {


  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;

  constructor(private turnoService: TurnoService, private alertServiceService: AlertServiceService, public config: DynamicDialogConfig, public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'puesto_defecto', header: 'Puesto',  width: '16%' },
      { field: 'sector_nombre', header: 'Sector',  width: '30%' },
      { field: 'estado', header: 'Estado',  width: '26%' },
      { field: 'usuario_previo', header: 'Llama previo',  width: '20%' },      
      { field: '', header: 'Editar',  width: '10%' }
      
      
   ];
  }

  ngOnInit() {
    console.log('cargando insumo');
    this.loadlist();
  }

  loadlist() {

    this.loading = true;
    try {
        this.turnoService.getSectorRegla()
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






editarReglas(elemento: any) {
  console.log(elemento);  
  const data: any = elemento;
  const ref = this.dialogService.open(PopupReglasEditarComponent, {
  data,
   header: 'Editar regla',
   width: '75%',
   height: '60%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupReglasEditarComponent: any) => {
    if (PopupReglasEditarComponent) {
      this.loadlist();
    }
  });
}

nuevo() {

  const data: any = null;
  const ref = this.dialogService.open(PopupReglasEditarComponent, {
  data,
   header: 'editar reglar',
   width: '75%',
   height: '60%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupReglasEditarComponent: any) => {
    if (PopupReglasEditarComponent) {
      this.loadlist();
    }
  });

}
}

