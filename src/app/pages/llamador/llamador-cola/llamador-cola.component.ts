import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { TurnoService } from './../../../services/turno.service';


@Component({
  selector: 'app-llamador-cola',
  templateUrl: './llamador-cola.component.html',
  styleUrls: ['./llamador-cola.component.scss']
})
export class LlamadorColaComponent implements OnInit {

 
   
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;
  turnoDato: any;
  constructor(private turnoService: TurnoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'sector_nombre', header: 'Sector',  width: '60%' },
      { field: 'numero', header: 'Número',  width: '30%' },
      { field: '', header: 'Acción',  width: '10%' }
      
      
   ];
  }

  ngOnInit() {
    this.turnoDato = JSON.parse(localStorage.getItem('turnoDato'));
    console.log(this.turnoDato);
    //console.log(this.turnoDato[0].usuario_id);
    this.loadTodosPendientes();
  }


loadMiPuesto(){

  this.loading = true;
  try {
      this.turnoService.getListadoSectorCondicion('atendido', 'usuario', this.turnoDato[0].usuario_id, '')
      .subscribe(resp => {
          let i = 0;
          resp.forEach(element => {
           resp[i].numero = element.sector_abreviado + element.numero;
           i++;
          });
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

loadSector(){

  this.loading = true;
  try {
      this.turnoService.getListadoSectorCondicion('pendiente', 'sector', '', this.turnoDato[0].sector_id)
      .subscribe(resp => {
          let i = 0;
          resp.forEach(element => {
           resp[i].numero = element.sector_abreviado + element.numero;
           i++;
          });
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

loadTodosPendientes(){

  this.loading = true;
  try {
      this.turnoService.getListadoSectorCondicion('pendiente', 'todos', '', '')
      .subscribe(resp => {
        let i = 0;
        resp.forEach(element => {
         resp[i].numero = element.sector_abreviado + element.numero;
         i++;
        });
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

loadTodosAtendidos(){

  this.loading = true;
  try {
      this.turnoService.getListadoSectorCondicion('atendido', 'todos', '', '')
      .subscribe(resp => {
        let i = 0;
        resp.forEach(element => {
         resp[i].numero = element.sector_abreviado + element.numero;
         i++;
        });
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

llamar(element:any){
  console.log(element);
}

}
