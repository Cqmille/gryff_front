import { Component, Prop, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import {PATH} from '../../utils/path.js';

import { UserConnected } from '../../utils/UserConnected';

@Component({
  tag: 'user-connexion',
  shadow: false,
})
export class UserConnexion {

    @Prop() history: RouterHistory;

    @State() email: String;
    @State() password: String;
    @State() reponseServer: JSON;
    @State() user: UserConnected;

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
        localStorage.setItem("userId", this.user.userId);
        localStorage.setItem("token", this.user.token);
        this.history.replace(`/monEspace`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
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
              <label>email
                  <input type="text" name='email' onInput={(event) => this.chargeState(event)}/>
              </label>
              <label>password
                  <input type="text" name='password' onInput={(event) => this.chargeState(event)}/>
              </label>
              <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}
