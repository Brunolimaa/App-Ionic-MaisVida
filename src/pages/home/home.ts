import { Component } from '@angular/core';
import { NavController, MenuController, ModalController } from 'ionic-angular';
import { CredenciaTDO } from '../../models/credenciais.dto';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    creds : CredenciaTDO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public modalCtrl : ModalController) {

  }

  login(){
    console.log(this.creds);
    this.navCtrl.push('ListaMedicosPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  cadastrar(){
    this.navCtrl.push('CadastroPage')
  }

  public openModal () {var modalPage = this.modalCtrl.create ('ModalPage'); modalPage.present (); }


}
