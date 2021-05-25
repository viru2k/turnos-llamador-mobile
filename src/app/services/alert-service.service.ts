import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  private myToast: any;
  constructor(private toastController: ToastController) { }

  showToastNotification(){

    let  toast  = this.toastController.create({
      message: 'Ionic 4 Auto Hide Toast on Bottom',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
     // toast.present();
    });

    }

    showToastSuccess(message: string) {
      const toast= this.toastController.create({
        message:  message,
        duration: 5000,
        position: 'bottom',
        cssClass: 'toast-success-css-class',
        buttons: [
          {
            side: 'start',
            icon: 'checkmark-circle-outline',
            handler: () => {
              console.log('Favorite clicked');
            }
          }]
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
    }

    showToastFail(message: string) {
      const toast= this.toastController.create({
        message:  message,
        position: 'bottom',
        cssClass: 'toast-fail-css-class',
        buttons: [
          {
            side: 'start',
            icon: 'close',
            handler: () => {
              this.closeToast();
            }
          }]
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
    }

    closeToast(){
      console.log('dismiss toast');
    }

}


