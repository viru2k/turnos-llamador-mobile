
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';

import { DialogService } from 'primeng/components/common/api';
import { DatePipe } from '@angular/common';
import { AlertServiceService } from './../../../services/alert-service.service';
import { TurnoService } from '../../../services/turno.service';
import { ConexionPath } from '../../../models/conexion-path.model';
import { PopupConexionComponent } from '../popup-conexion/popup-conexion.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService, DialogService, DatePipe]
})
export class NavbarComponent implements OnInit {

  user: User;
  loggedIn = false;
  general: MenuItem[];
  mantenimiento = true;
  llamador  = true;
  videos  = true;
  ajustes = true;
  auditor = true;
 
  


  public username: string;
  public puesto: string;
  elemento: User = null;
  elementoModulo:[] = null;
  loginForm: FormGroup;
  loading = false;
  loading_mensaje: string;
  loading_error;
  submitted = false;
  returnUrl: string;
  error = '';
  notificaciones = 0;
  chats;
  _userData: any;
  turnoData: any;
  displayConexion;

  constructor(
    private alertServiceService: AlertServiceService,
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private miServico: UserService,
    private turnoService: TurnoService) {

  }
 navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit() {

   /*======== JQUERY DEL LOGUIN =========*/
   $(document).ready
   (function ($) {
     "use strict";
 
 
     /*==================================================================
     [ Focus Contact2 ]*/
     $('.input100').each(function() {
         $(this).on('blur', function() {
             if ($(this).val() !== "") {
                 $(this).addClass('has-val');
             }
             else {
                 $(this).removeClass('has-val');
             }
         })    
     })
   
   
     /*==================================================================
     [ Validate ]*/
     var input = $('.validate-input .input100');
 
     $('.validate-form').on('submit',function() {
         var check = true;
 
         for(var i=0; i<input.length; i++) {
          
         }
 
         return check;
     });
 
 
     $('.validate-form .input100').each(function() {
         $(this).focus(function() {
            hideValidate(this);
         });
     });
 

 
     function showValidate(input) {
         var thisAlert = $(input).parent();
 
         $(thisAlert).addClass('alert-validate');
     }
 
     function hideValidate(input) {
         var thisAlert = $(input).parent();
 
         $(thisAlert).removeClass('alert-validate');
     }
     
 
 });

      /*======== FIN JQUERY DEL LOGUIN =========*/


   this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    
   const conexion = JSON.parse(localStorage.getItem('conexion'));
   console.log(conexion);
   if (conexion == null ) {
        console.log('sin ruta de acceso');
        this.configurarRuta();
        // tslint:disable-next-line: max-line-length
      
      } else {
     //   this.configurarRuta();
        console.log('parametros de acceso');
        console.log('URL_SERVICIO: '+ conexion.URL_SERVICIO);
        
   
      console.log(this.f.username.value);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser.access_token !== '') {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const turnoDato = JSON.parse(localStorage.getItem('turnoDato'));
        console.log(userData);
        console.log(turnoDato[0].puesto_defecto);
        console.log('usuario logueado');
        this.loggedIn = true;
        this.username = userData.username;
        this.puesto = turnoDato[0].puesto_defecto;
        console.log(userData.access_list);
        this.asignarModulos(userData.access_list);
        this.menuList();
      } else {
        console.log('sin credenciales');
        
        this.alertServiceService.throwAlert('error', 'Usuario o contraseña incorrectos',  'Verifique el usuario y contraseña, su sesion puede haber expirado', '500');
  } 
      }

  }


  configurarRuta() {

    let data:any; 
    //data = this.selecteditemRegistro;
    const ref = this.dialogService.open(PopupConexionComponent, {
    data,
     header: 'Configurar conexión',
     width: '98%',
     height: '60%'
    });

    ref.onClose.subscribe((popupConexionComponent: PopupConexionComponent) => {
        if (popupConexionComponent) {
          console.log(popupConexionComponent);
          window.location.reload();
        }

  });

  }


asignarModulos(modulos: any) {
  modulos.forEach(element => {
   // console.log(element['modulo_nombre']);
    if (element.modulo_nombre === 'llamador') {
      this.llamador = false;
    }
    if (element.modulo_nombre === 'videos') {
      this.videos = false;
    }
    if (element.modulo_nombre === 'ajustes') {
      this.ajustes = false;
      console.log( element.modulo_nombre);
    }
    if (element.modulo_nombre === 'auditor') {
      this.auditor = false;
    }


  });

  /** DESPUES DE ASIGNAR MODULOS VERIFICO LAS NOTIFICACIONES */

}

cerrarSesion() {

  swal({
  title: 'Cerrando sesión',
  text: '¿Desea finalizar la sesión actual?',
  showCancelButton: true,
  confirmButtonColor: '#E53935',
  cancelButtonColor: '#42A5F5',
  cancelButtonText: 'Permanecer',
  confirmButtonText: 'Cerrar sesión',
  imageUrl: 'https://img.icons8.com/clouds/100/000000/imac-exit.png',
  imageHeight: 128,
  imageWidth: 128,
}).then((result) => {
  if (result.value) {

  console.log('sesion terminada');
  this.authenticationService.logout();
  localStorage.removeItem('turnoDato');
  this.loggedIn = false;
  this.mantenimiento = true;
  this.llamador = true;
  this.videos = true;
  this.ajustes = true;
  this.auditor = true;
  this.user = null;
  this.elemento = null;
  this.elementoModulo = [];
  window.location.reload();
  }
});
}


get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.loading_mensaje = 'Validando usuario';
  this.authenticationService.login(this.f.username.value, this.f.password.value)
     // .pipe(first())
      .subscribe(
          data => {
            console.log(data);
            this.user = data;
            const us = new User('', '', '', '', '', this.f.username.value, this.f.password.value, []);
            localStorage.setItem('userData', JSON.stringify(us));
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            //  this.router.navigate([this.returnUrl]);
            this.loadUser();
          },
          error => {
            console.log(error);
            if (error === 'Las credenciales del usuario son incorrectas') {
              this.loading_error = true;
              this.loading = false;
              this.loading_mensaje = '';
             } else {
              this.loading = false;
              this.loading_mensaje = '';
            }
            this.error = error;
          });
}

ver() {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser.access_token);
}

loadUser() {

this.loading = true;
try {
  this.loading_mensaje = 'Obteniendo modulos del usuario';
  this.miServico.getItemInfoAndMenu(this.f.username.value)
    .subscribe(resp => {
    this.elemento = resp;
    const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
    console.log('usuario ');
    console.log(currentUser);
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    this._userData =  userData;
    console.log(this.elemento);
    this.elementoModulo = <any>this.elemento;
    this.user = new User(this.elemento[0].id , this.elemento[0].email, this.elemento[0].nombreyapellido,
    this.elemento[0].name, this.elemento[0].admin, this.elemento[0].email, currentUser.access_token, this.elementoModulo);
    this.username = userData['username'];
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(this.user));
    this.asignarModulos(this.elementoModulo);
    this.loading = false;
    this.loading_mensaje = '';
    console.log('logueado');
    this.loggedIn = true;
    this.menuList();
    this.obtenerDatosPuestos();
    },
    error => {
        console.log(error.message);
        console.log(error.status);
        localStorage.removeItem('error');
        localStorage.setItem('error', JSON.stringify(error));
        this.loading_mensaje = '';

     });
} catch (error) {
}
}


menuList() {

  this.general = [
    {label: 'Llamador', visible: !this.llamador, routerLink: 'llamador'},
    {label: 'Videos', visible: !this.videos, routerLink: 'video'},
    {label: 'Números', visible: !this.auditor, routerLink: 'atencion'},
    {

    label: 'Mantenimiento',
    visible: !this.ajustes,
    items: [

              {label: 'Usuario', routerLink: 'usuario'},
              {label: 'Puesto', routerLink: 'puesto'},
              {label: 'Sector', routerLink: 'sector'},
              {label: 'Reglas de llamado', routerLink: 'reglas'},
              {label: 'Gestión de números', routerLink: 'numero'},
              {label: 'Gestión de anfitrión', routerLink: 'anfitrion'},
              {label: 'Gestión de pantalla', routerLink: 'pantalla'},
      
    ]
  }

];


}



obtenerDatosPuestos() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  this.loading_mensaje = 'Obteniendo sector asociado';
  this.turnoService.getSectorByUsuario(userData.id)
    .subscribe(resp => {
    console.log(resp);
    localStorage.removeItem('turnoDato');
    localStorage.setItem('turnoDato', JSON.stringify(resp));
    this.loading = false;
    this.loading_mensaje = '';
    console.log('logueado');
    this.turnoData =  JSON.parse(localStorage.getItem('turnoDato'));
    console.log(this.turnoData);

    },
    error => {
        console.log(error.message);
        console.log(error.status);
        localStorage.removeItem('error');
        localStorage.setItem('error', JSON.stringify(error));
        this.loading_mensaje = '';

     });
} catch (error) {
}


}






