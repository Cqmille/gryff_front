import { Component, h, State } from '@stencil/core';

import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'user-monespace',
    shadow: false,
})

export class UserMonespace {

    @State() mesRessources:Ressources[];
    @State() message: string;

    async componentWillLoad() {
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
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.mesRessources = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.mesRessources){
            return (
                <div>
                    {this.mesRessources.map((ressource : Ressources) =>
                        <div>
                            <p> Etat: {ressource.etatRessource} - Date de publication: {ressource.datePublication} - titre: {ressource.titre} </p>
                        </div>)}
                </div>
            )
        }
        if(this.message){
            return (
                <div>
                    <p>{this.message}</p>
                </div>
            )
        }
    }
}
