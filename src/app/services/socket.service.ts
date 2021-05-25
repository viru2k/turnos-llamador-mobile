import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url: string;
  socket: any;
  server = 'http://localhost:4444';
  // solo si no posee valor pre seteado

  constructor( private conexionService: ConexionService) {
    let _url = '';
    console.log('RUTA SOCKET');
    const ruta = (_url) ? this.url['url'] : this.server;
    this.url = this.conexionService.getconfig();
    console.log( ruta);
    this.socket  = io(ruta);
  }

   listen(eventName: string) {
    return new Observable((Subscriber) =>{
        this.socket.on(eventName, (data) => {
          Subscriber.next(data);
        });
    });
  }

   emitir(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

}
