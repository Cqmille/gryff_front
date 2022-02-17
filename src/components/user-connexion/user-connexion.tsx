import { Component, Prop, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import {PATH} from '../../utils/path.js';

import { UserConnected } from '../../utils/UserConnected';

@Component({
  tag: 'user-connexion',
  styleUrl: 'user-connexion.css',
  shadow: false,
})
export class UserConnexion {

    @Prop() history: RouterHistory;
    @Prop() match:any;
    @Prop() messageExt: string;

    @State() email: String;
    @State() password: String;
    @State() reponseServer: JSON;
    @State() user: UserConnected;
    @State() habilitation: string;
    @State() messageErr: string;

    componentWillRender(){
      console.log(this.match.params.message)
    }

    async envoiConnexion(e){
        e.preventDefault();
        let response = await fetch(PATH.back +'/public/connexion', {
            method: 'POST',
            body: JSON.stringify({
                email: this.email,
                password: this.password
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });
        this.user = await response.json();
        if(response.status == 200 ){
          localStorage.setItem("userId", this.user.userId);
          localStorage.setItem("token", this.user.token);
          localStorage.setItem('habilitation',this.user.habilitation)

          const navBar = window.document.querySelector('publiq-nav')
          navBar.setAttribute('connected', 'true')

          this.history.replace(`/monEspace`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
        } else {
          this.messageErr = this.user.message
        }
    }

    chargeState(event){
        switch(event.target.name){
            case 'email': this.email = event.target.value; break;
            case 'password': this.password = event.target.value; break;
        }
        console.log('passe: ' + this.password +'email: ' + this.email)
    }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.envoiConnexion(e)}>
          <div class="row mx-3">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <div class="form-group">
                <h1 class="titre">Connexion à mon espace</h1>
                <label class="mx-2">Adresse e-mail</label>
                <input type="email" class="form-control" name='email' placeholder="exemple@mail.fr" onInput={(event) => this.chargeState(event)}></input>
              </div>
              <div class="form-group mt-2">
                <label class="mx-2">Mot de passe</label>
                <input type="password" class="form-control" name='password' placeholder="Mon mot de passe" onInput={(event) => this.chargeState(event)}></input>
              </div>
              <button type="submit" class="btn mt-2 bg-secondary border">Se connecter</button>
            </div>         
            <div class="col-sm-3"></div>
          </div>
        </form>
        {(this.messageErr)?
          <p>{this.messageErr}</p>:null}
        {(this.match.params.message)?
          <p>{this.match.params.message}</p>:null}
      </div>
    );
  }
}
