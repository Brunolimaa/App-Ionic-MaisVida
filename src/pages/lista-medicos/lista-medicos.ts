import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { MedicoDTO } from '../../models/medico.dto';
import { Subscriber } from 'rxjs/Rx';
import { MedicoService } from '../../services/domain/medico.service';
import { FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-lista-medicos',
  templateUrl: 'lista-medicos.html',
})
export class ListaMedicosPage {

  items : MedicoDTO[];
  formGroup : FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public service : MedicoService,
    public alertCtrl : AlertController,
    public modalCtrl : ModalController
  ) {
  }

  ionViewDidLoad() {
    this.service.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(response)
    }, error => {
      console.log(error)
    })
  }

  listaInformacaoCliente(id : string){
    this.navCtrl.push('DetalhesPage', {id : id});
    return id;
  }

  editar(req){
    let prompt = this.alertCtrl.create({
      title: 'Editar Produto',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
          value: req.nome
        },
        {
          name: 'ultimNome',
          placeholder: 'Ultimo nome',
          value: req.ultimNome
        },
        {
          name: 'email',
          placeholder: 'Email',
          value: req.email
        }
      ],
      buttons :[
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Salvar',
          handler: data =>{
            let params: any={
              id: req.id,
              nome : data.nome,
              ultimNome : data.ultimNome,
              email : data.email
            }
            this.service.update(params.id, params)
            .subscribe(
              data =>{
                console.log(params);
                this.showAlterOk();
              }
            )
          }
        }
      ]
    });

    prompt.present();
    
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
              this.getAll();
          }
        }
      ]
    });
    alert.present();
  }

  getAll(){
    this.service.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(response)
    }, error => {
      console.log(error)
    })
  }

  public openModal(id){
    var data = { message : id };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
}
}
