import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class IonLoaderService {

  constructor(public loadingController: LoadingController) { }


  // Simple loader
  showLoader() {
    this.loadingController.create({
      showBackdrop: true,
      translucent: true,
      backdropDismiss: true,
      message: '',
      spinner: 'crescent',
      cssClass:'loader-css-class',
    }).then((res) => {
      res.present();
    });
  }

  // Dismiss loader
  dismissLoader() {
    setTimeout(() => {
      this.callDismiss();
    }, 1000);
  }

  callDismiss() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }



  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: 'Loader hides after 4 seconds',
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }

  // Custom style + hide on tap loader
  customLoader() {
    this.loadingController.create({
      message: '',
      duration: 4000,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }

}
