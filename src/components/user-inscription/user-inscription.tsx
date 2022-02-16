import { Component, Prop, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import {PATH} from '../../utils/path.js';

@Component({
    tag: 'user-inscription',
    shadow: false,
  })

  export class UserInscription {

    @Prop() history: RouterHistory;

    @State() nom: string;
    @State() prenom: string;   
    @State() email: String;
    @State() password: String;
    @State() confirmPassword: String;
    @State() reponseServer: JSON;

    async envoiInscription(e){
        e.preventDefault();
        if(this.password == this.confirmPassword){

        let response = await fetch(PATH.back +'/public/inscription', {
            method: 'POST',
            body: JSON.stringify({
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                password: this.password
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });
                
        switch (response.status) {
            case 201:
                this.history.replace('/inscriptionValide', {});   // Permet de charger une nouvelle page
              break;
            case 403:
                window.alert('cette adresse mail est déjà utilisée.');
                break;
            default:
                window.alert('une erreur est survenue');
          }

    }
    else{
        window.alert("mot de passe différent");
    }
    }

    chargeState(event){
        switch(event.target.name){
            case 'nom': this.nom = event.target.value; break;
            case 'prenom': this.prenom = event.target.value; break;
            case 'email': this.email = event.target.value; break;
            case 'password': this.password = event.target.value; break;
            case 'confirmPassword': this.confirmPassword = event.target.value; break;
        }
        console.log('passe: ' + this.password +'email: ' + this.email+ 'nom:' + this.nom + 'prenom:'+ this.prenom + 'confirmPassword'+ this.confirmPassword)
    }

  render() {
    return (
      <div>
          <form onSubmit={(e) => this.envoiInscription(e)}>
              <label>Nom
                  <input type="text" name='nom' onInput={(event) => this.chargeState(event)}/>
              </label>
              <label>Prenom
                  <input type="text" name='prenom' onInput={(event) => this.chargeState(event)}/>
              </label>
              <label>email
                  <input type="text" name='email' onInput={(event) => this.chargeState(event)}/>
              </label>
              <label>Mot de passe
                  <input type="text" name='password' onInput={(event) => this.chargeState(event)}/>
              </label>
              <label>Confirmation du mot de passe
                  <input type="text" name='confirmPassword' onInput={(event) => this.chargeState(event)}/>
              </label>
              <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}