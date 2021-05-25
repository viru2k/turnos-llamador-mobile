import { Component, OnInit } from '@angular/core';
import { MessageService, DynamicDialogConfig } from 'primeng/api';
import { DialogService } from 'primeng/components/common/api';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { TurnoService } from './../../../../services/turno.service';

@Component({
  selector: 'app-popup-reglas-editar',
  templateUrl: './popup-reglas-editar.component.html',
  styleUrls: ['./popup-reglas-editar.component.scss']
})
export class PopupReglasEditarComponent implements OnInit {

  constructor(private turnoService: TurnoService, public config: DynamicDialogConfig, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) {
    console.log(this.config.data);
   }

  ngOnInit() {
  }

}
