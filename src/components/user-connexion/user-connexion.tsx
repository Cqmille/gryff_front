import { Component, Prop, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'user-connexion',
  shadow: false,
})
export class UserConnexion {

    @Prop() history: RouterHistory;

    @State() email: String;
    @State() password: String;
    @State() reponseServer: JSON;

    async envoiConnexion(e){
        e.preventDefault();
        let response = await fetch('http://localhost:3000/public/connexion', {
            method: 'POST',
            body: JSON.stringify({
                email: this.email,
                password: this.password
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });
        this.reponseServer = await response.json();
        console.log(this.reponseServer)
        //this.history.replace(`/`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
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
