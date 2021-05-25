import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabLlamadorPage } from './tab-llamador.page';

const routes: Routes = [
  {
    path: '',
    component: TabLlamadorPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabLlamadorPageRoutingModule {}
