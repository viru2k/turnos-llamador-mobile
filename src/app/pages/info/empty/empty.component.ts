import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from './../../../services/alert-service.service';


@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  loading;
  mensajeCarga: string;

/* ------------------------------- INDICADORES ------------------------------ */

procesosActivos: number;

  constructor(private alertServiceService: AlertServiceService) {

  }

  ngOnInit() {    
  }


}
