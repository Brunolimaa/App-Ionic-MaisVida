import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaMedicosPage } from './lista-medicos';

@NgModule({
  declarations: [
    ListaMedicosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaMedicosPage),
  ],
})
export class ListaMedicosPageModule {}
