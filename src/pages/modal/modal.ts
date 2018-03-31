import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoDTO } from '../../models/medico.dto';
import { MedicoService } from '../../services/domain/medico.service';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  formGroup : FormGroup;
  items : any;
  registros : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl : ModalController,
    public viewCtrl : ViewController,
    public formBuilder: FormBuilder,
    public service : MedicoService,
    public alertCtrl : AlertController,


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

  onViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
    i
  public closeModal(){    
    this.viewCtrl.dismiss();
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad ModalPage');
  this.items = this.navParams.get('message');

     this.service.findByMedico(this.items.id)
      .subscribe(response => {
        this.registros = response;
        this.formGroup = this.formBuilder.group({
          nome: [this.registros.nome, [Validators.required]],
          ultimNome: [this.registros.ultimNome, [Validators.required]],
          email: [this.registros.email, [Validators.required, Validators.email]],
          especialidade: [this.registros.especialidade, []],
          status: [this.registros.status, []],
          estado: [this.registros.estado, []],
          cidade: [this.registros.cidade, []],
        });

        console.log(this.registros);
      }, error=> {
        console.log(error);

      })
}

alteraRegistro(){
 let params = this.formGroup.value;
  this.service.update(this.items.id, params)
  .subscribe(
    data =>{
      console.log(params);
      this.showAlterOk();
    }
  )
}

showAlterOk(){
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Alterado com sucesso',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
            this.closeModal();
        }
      }
    ]
  });
  alert.present();
}



}
