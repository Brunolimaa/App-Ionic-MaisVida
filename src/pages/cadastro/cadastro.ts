import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MedicoService } from '../../services/domain/medico.service';
import { MedicoDTO } from '../../models/medico.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs/Rx';


/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

id : string;
formGroup : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public medicoService : MedicoService,
    public alertCtrl : AlertController

  ) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      ultimNome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      especialidade: ['', []],
      status: ['', []],
      estado: ['', []],
      cidade: ['', []],
    });

  }

  signupUser(){
    this.medicoService.insert(this.formGroup.value)
      .subscribe( response => {
        this.showInsertOk();
      }, error => { });
    console.log(this.formGroup.value);
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }
}
