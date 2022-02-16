import { Component, h, State } from '@stencil/core';

import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'mod-monespace',
    shadow: false,
})

export class ModMonespace {

    @State() modRessource:Ressources[];
    @State() message: string;
    @State() ressourceid: string;

    async componentWillLoad() {
        this._getData();
    }

    async validate(event) {
        console.log(event.target.value)
        try{
            let response = await fetch(`http://localhost:3000/moder/moderationComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: this.ressourceid,
                    etatRessource: event.target.value
                }),
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.modRessource = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/moder/afficheRessourceModer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.modRessource = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.modRessource){
            return (
                <div>
                    {this.modRessource.map((ressource : Ressources) =>
                        <div>
                            <p> 
                            - Etat: {ressource.etatRessource} 
                            - Date de publication: {ressource.datePublication} 
                            - titre: {ressource.titre} 
                            - resume: {ressource.resume}
                            - Prenom Nom {ressource.prenomNomUser}
                            {this.ressourceid=ressource._id}
                            <form>
                            <label>validerchoix
                            <input type="text" name='valide' onInput={(event) => this.validate(event)}/>
                            </label>
                            <input type='submit' value='submit'> </input> <br />
                            </form>
                            </p>
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
