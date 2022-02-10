import { Component, h, State } from '@stencil/core';

import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'user-monespace',
    shadow: false,
})

export class UserMonespace {

    @State() ressources:Ressources[];

    connectedCallback() {
        console.log('Connected Callback');
        this._getData();
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/users/afficheRessourceUser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            });
            let reponseBack = await response.json();
            this.ressources = reponseBack.articles;
            console.log(this.ressources)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        return (
            <div>
                {this.ressources.map((ressource : Ressources) =>
                    <div>
                        <p> Etat: {ressource.etatRessource} - Date de publication: {ressource.datePublication} - titre: {ressource.titre} </p>
                    </div>
                        )}
            </div>
        )
    }
}