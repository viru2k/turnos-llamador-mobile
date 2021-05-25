

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonLoaderService } from '../services/ion-loader.service';
import { TurnoService } from '../services/turno.service';
import { SocketService } from '../services/socket.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertServiceService } from '../services/alert-service.service';
import { Filter } from './../shared/filter';

@Component({
  selector: 'app-tab-llamador',
  templateUrl: 'tab-llamador.page.html',
  styleUrls: ['tab-llamador.page.scss']
})
export class TabLlamadorPage  implements OnInit, OnDestroy{
  destroyed:  Subject <boolean>;
  selectedItem: any;
  loading;
  puesto: any = null;
  tieneNotificacion = 'NO';

  constructor(public ionLoaderService: IonLoaderService,
    private turnoService: TurnoService,
    private alertServiceService: AlertServiceService,
    private socketService: SocketService,
    public filter: Filter ) {}

ngOnInit() {
  //this.alertServiceService.showToastSuccess('Exito en la operacion');
  this.alertServiceService.showToastFail('Fallo en la operacion');
  this.getProximoNumero();
}

ngOnDestroy() {
  this.destroyed.next(true);
}

initSubscription() :void{
  this.socketService.listen('datos')
  .pipe(takeUntil(this.destroyed))
  .subscribe((data: any) => {
    console.log(data);
    console.log('socket destroyed');
    if (data === 'llamando-nuevo-cliente') {
        console.log(data);
    }
  });
}


/* -------------------------------------------------------------------------- */
/*                           OBTENER PROXIMO NUMERO                           */
/* -------------------------------------------------------------------------- */


getProximoNumero() {
  console.log('llamando proximo');
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  this.ionLoaderService.showLoader();
  this.turnoService.getProximoNumero(userData.id)
    .subscribe(resp => {

      if (resp) {
        console.log(resp);
        this.puesto = [];
        this.puesto = resp;
      }
      this.ionLoaderService.dismissLoader();

    },
    error => {
      this.ionLoaderService.dismissLoader();
      this.alertServiceService.showToastFail(error);

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
  this.ionLoaderService.showLoader();
  this.turnoService.Llamar(userData.id)
    .subscribe(resp => {

      if (resp) {
        console.log(resp);
        this.puesto = [];
        this.puesto = resp;
        this.socketService.emitir('send-message', 'llamando-pantalla');
        this.ionLoaderService.dismissLoader();
      }
    console.log(resp);
    //NO DEBERIA IR ACA

 //   localStorage.removeItem('turnoDato');
 //   localStorage.setItem('turnoDato', JSON.stringify(resp));

    },
    error => {
      this.ionLoaderService.dismissLoader();
      this.alertServiceService.showToastFail(error);
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


validarNotificacion( ){

  if ((this.puesto.length === 0) && (this.tieneNotificacion === 'NO')) {
    this.tieneNotificacion = 'SI';
  } else {
    this.tieneNotificacion = 'NO';
  }
}

}
