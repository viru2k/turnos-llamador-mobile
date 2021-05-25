import { Component, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TurnoService } from '../../../services/turno.service';
import { LlamadorColaComponent } from './../llamador-cola/llamador-cola.component';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { Filter } from './../../../shared/filter';

import { SocketService } from './../../../services/socket.service';



@Component({
  selector: 'app-llamador-sector',
  templateUrl: './llamador-sector.component.html',
  styleUrls: ['./llamador-sector.component.scss']
})
export class LlamadorSectorComponent implements OnInit {

  selectedItem: any;
  loading;
  puesto: any = null;
  tieneNotificacion = 'NO';

  constructor(private turnoService: TurnoService, private alertServiceService: AlertServiceService,
              private socketService: SocketService,
              private messageService: MessageService, public filter: Filter) { }

  ngOnInit() {

    this.socketService.listen('datos')
    .subscribe((data: any) => {
      console.log(data);
      if (data === 'llamando-nuevo-cliente') {
          console.log(data);
          // evaluo si hay nuevo cliente
      }
    });


    this.getProximoNumero();
  }


  accion(event: any, overlaypanel: OverlayPanel) {

    console.log(event);
    this.selectedItem = event;
    overlaypanel.toggle(event);
  }


/* -------------------------------------------------------------------------- */
/*                           OBTENER PROXIMO NUMERO                           */
/* -------------------------------------------------------------------------- */


getProximoNumero() {
  console.log('llamando proximo');
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  this.turnoService.getProximoNumero(userData.id)
    .subscribe(resp => {
      if (resp) {
        console.log(resp);
        this.puesto = [];
        this.puesto = resp;
      }

      this.loading = false;

    },
    error => {
        console.log(error.message);
        console.log(error.status);
        localStorage.removeItem('error');
        localStorage.setItem('error', JSON.stringify(error));
      //  this.loading_mensaje = '';

     });

}



/* -------------------------------------------------------------------------- */
/*                           LLAMAR PROXIMO CLIENTE                           */
/* -------------------------------------------------------------------------- */


  llamar() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    this.turnoService.Llamar(userData.id)
      .subscribe(resp => {

        if (resp) {
          console.log(resp);
          this.puesto = [];
          this.loading = false;
          this.puesto = resp;
          this.socketService.emitir('send-message', 'llamando-pantalla');
        }
      console.log(resp);
      //NO DEBERIA IR ACA

   //   localStorage.removeItem('turnoDato');
   //   localStorage.setItem('turnoDato', JSON.stringify(resp));

      },
      error => {
          console.log(error.message);
          console.log(error.status);
          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
        //  this.loading_mensaje = '';

       });

  }

obtenerDatosPuestos() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  this.turnoService.getProximoNumero(userData.id)
    .subscribe(resp => {
    console.log(resp);
    localStorage.removeItem('turnoDato');
    localStorage.setItem('turnoDato', JSON.stringify(resp));
    this.loading = false;
    },
    error => {
        console.log(error.message);
        console.log(error.status);
        localStorage.removeItem('error');
        localStorage.setItem('error', JSON.stringify(error));


     });
}

/*
listadoAtendidos(elemento: any) {
  console.log(elemento);
  const data: any = elemento;
  const ref = this.dialogService.open(LlamadorColaComponent, {
  data,

   width: '100%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((LlamadorColaComponent: any) => {
    if (LlamadorColaComponent) {
     // this.loadlist();
    }

  });

} */

validarNotificacion( ){

  if ((this.puesto.length === 0) && (this.tieneNotificacion === 'NO')) {
    this.tieneNotificacion = 'SI';
  } else {
    this.tieneNotificacion = 'NO';
  }
}


}
