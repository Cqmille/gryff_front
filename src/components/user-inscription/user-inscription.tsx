import { Component, Prop, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import {PATH} from '../../utils/path.js';

@Component({
    tag: 'user-inscription',
    styleUrl: 'user-inscription.css',
    shadow: false,
  })

  export class UserInscription {

    @Prop() history: RouterHistory;

    @State() nom: string;
    @State() prenom: string;   
    @State() email: String;
    @State() ville: String;
    @State() profession: String;
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
                ville: this.ville,
                profession: this.profession,
                password: this.password
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });
                
        switch (response.status) {
            case 201:
                this.history.replace('/connexion/"', {});   // Permet de charger une nouvelle page
              break;
            case 403:
                window.alert('adresse mail déjà utilisée');
                break;
            default:
                window.confirm('une erreur est survenue');
                this.history.replace('/connexion', {});
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
            case 'ville': this.ville = event.target.value; break;
            case 'profession': this.profession = event.target.value; break;
            case 'email': this.email = event.target.value; break;
            case 'password': this.password = event.target.value; break;
            case 'confirmPassword': this.confirmPassword = event.target.value; break;
        }
        //console.log('passe: ' + this.password +'email: ' + this.email+ 'nom:' + this.nom + 'prenom:'+ this.prenom + 'confirmPassword'+ this.confirmPassword)
    }

  render() {
    return (
        <form onSubmit={(e) => this.envoiInscription(e)}>
            <div class="row mx-3">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="form-group">
                    <h1 class="titre">Inscription</h1>
                    <label class="mx-2">Nom</label>
                    <input type="text" class="form-control" name='nom' placeholder="Dupond" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Prénom</label>
                    <input type="text" class="form-control" name='prenom' placeholder="Jean-Louis" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Email</label>
                    <input type="email" class="form-control" name='email' placeholder="exemple@mail.fr" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Ville</label>
                    <input type="text" class="form-control" name='ville' placeholder="Brest" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Profession</label>
                    <input type="text" class="form-control" name='profession' placeholder="Boulanger" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Mot de passe</label>
                    <input type="password" class="form-control" name='password' placeholder="*******" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Confirmation mot de passe</label>
                    <input type="password" class="form-control" name='confirmPassword' placeholder="*******" onInput={(event) => this.chargeState(event)}></input>
                    </div>
                    <button type="submit" class="btn mt-2 bg-light border">S'inscrire</button>
                </div>         
                <div class="col-sm-3"></div>
            </div>
      </form>
    );
  }
}