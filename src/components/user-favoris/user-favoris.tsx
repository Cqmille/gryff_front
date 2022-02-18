import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { UserConnected } from '../../utils/UserConnected';
import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'user-favoris',
    shadow: false,
})

export class userFavoris {

    @State() utilidateurfavoris:UserConnected[];
    @State() favorisressource:Ressources[];
    @State() message: string;
    @Prop() history: RouterHistory;

    async componentWillLoad() {
        this._getData();
        this.suivreUtilisateur();
    }

    async goto(event){
        this.history.push(`/afficherRessource/${event.target.value}`, {}); 
    }

    async gotoprofile(event){
        this.history.push(`/profilSuivi/${event.target.value}`, {}); 
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/users/afficherFavorisRessource`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.favorisressource = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async suivreUtilisateur(){
        try{
            let response = await fetch(`http://localhost:3000/users/afficherSuivreUtilisateur`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.utilidateurfavoris = await response.json();
            console.log(this.utilidateurfavoris)
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.favorisressource && this.utilidateurfavoris){
            return (
                <div>
                    {this.favorisressource.map((favoris : Ressources) =>
                        <div>
                            <p> - Date de publication: {favoris.datePublication} - titre: {favoris.titre} resume: {favoris.resume}</p>
                            <button value={favoris._id}  onClick={(event) => this.goto(event)}>detail de la ressource</button> <br />
                        </div>)}

                        {this.utilidateurfavoris.map((suivre : UserConnected) =>
                        <div>
                            <p> - prenom: {suivre.prenom} - nom: {suivre.nom}</p>
                             <button value={suivre._id}  onClick={(event) => this.gotoprofile(event)}>profil de l'utilisateur</button> <br />
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
