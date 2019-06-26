import { Component, OnInit } from '@angular/core';
import { IonicModule, NavParams, ModalController, NavController } from '@ionic/angular';
import { EventService } from '../../providers/event-service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-voter',
  templateUrl: './modal-voter.page.html',
  styleUrls: ['./modal-voter.page.scss'],
})
export class ModalVoterPage implements OnInit {

  public _codigoEvento : string ="";
  public _validar: boolean = true;
  public _mensaje : string = "";
  
  constructor(
    private navparams: NavParams,
    private modalController:ModalController,
    public eventService:EventService,
    private storage: Storage,
    private navController: NavController,
    private router:Router
  ) { }

  ngOnInit() {
   
  }

  buscarEvento()
  {
    var _codigoEvento = this._codigoEvento;
    this.storage.get('idAsignarTipoUsuario').then((val) => 
    {
      this.eventService.getEvent(val, _codigoEvento)
      .then(data => {
        this._validar=data._validar;
        this._mensaje = data._mensaje;
        if(data._validar==true)
        {
          this.enviarEvento(data._objeto);
        }
      });
    });    
  }

 
  enviarEvento(data : any)
  { 
    this.navController.navigateForward('/event'); 
    this.modalController.dismiss();
  }


}
