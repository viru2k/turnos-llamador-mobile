import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabLlamadorPage } from './tab-llamador.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabLlamadorPageRoutingModule } from './tab-llamador-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabLlamadorPageRoutingModule
  ],
  declarations: [TabLlamadorPage]
})
export class TabLlamadorPageModule {}
