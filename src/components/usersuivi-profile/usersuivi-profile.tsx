import { Component, h, State,Prop } from '@stencil/core';
import { UserConnected } from '../../utils/UserConnected';
import { RouterHistory } from '@stencil/router';
import { Ressources } from '../../utils/Ressources';
@Component({
    tag:'usersuivi-profile',
    shadow: false,
})

export class userFavorisProfil {

    @Prop() match:any;
    @Prop() history: RouterHistory;

    @State() profilRessources:Ressources[];
    @State() profil:UserConnected;
    @State() message: string;

    async componentWillLoad() {
        this._getData();
        this.getressource();
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/users/profilUtilisateur/`+this.match.params.userid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.profil = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async getressource(){
        try{
            let response = await fetch(`http://localhost:3000/public/afficheRessourceDeUtilisateur/`+this.match.params.userid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.profilRessources = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async goto(event){
        this.history.push(`/afficherRessource/${event.target.value}`, {}); 
    }

    render(){
        if(this.profil && this.profilRessources){
            return (
                <div>
                    <div>
                        <p> 
                        - prenom: {this.profil.prenom} 
                        - nom: {this.profil.nom} 
                        - dateNaissance: {this.profil.dateNaissance} 
                        - ville:{this.profil.ville}
                        - profession:{this.profil.profession}
                        </p>
                        {this.profilRessources.map((ressource : Ressources) =>
                        <div>
                            <p>
                                titre:{ressource.titre} resume:{ressource.resume} datePublication:{ressource.datePublication} tags:{ressource.tags}
                                <button value={ressource._id}  onClick={(event) => this.goto(event)}>detail de la ressource</button> <br />
                            </p>
                        </div>)}
                    </div>
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
