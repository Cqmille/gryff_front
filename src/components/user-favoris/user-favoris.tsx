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
    
    async supprimerFavorisRessource(idRessource){
        try{
            let response = await fetch(`http://localhost:3000/users/supprimerFavorisRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: idRessource
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            window.location.reload()
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async supprimerSuivreUtilisateur(idUser){
        try{
            let response = await fetch(`http://localhost:3000/users/supprimerSuivieUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    utilisateursSuivis: idUser
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            window.location.reload()
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.favorisressource && this.utilidateurfavoris){
            return (
                <div class='container'>
                     <h1 class=' text-center'>Mes ressources favoris</h1>
                    <div class="row mx-3 mt-5">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 ">
                            {this.favorisressource.map((favoris : Ressources) =>
                            <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                <div class='row mt-1'><div class='col-7 col-md-9 col-sm-3'><h2 class='ms-1'>{favoris.titre}</h2></div><div class='col-2'>{favoris.prenomNomUser}</div></div>

                                <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'>{favoris.resume}</p></div></div>
                            
                                <div class='row mt-1'><div class='col-8 col-sm-3 col-md-6'><button class="btn btn-primary border text-light ms-1 mb-1" value={favoris._id} onClick={(event) => this.goto(event)}>Accéder</button></div><div class='col-8 col-lg-6'>Publié:{favoris.datePublication}</div></div>
                                <button class="btn btn-primary text-light btn-danger mb-2 mx-1" onClick={()=>this.supprimerFavorisRessource(favoris._id)}>suprimer</button>
                            </div>)}
                        </div>     
                        <div class="col-sm-2"></div>
                    </div>
                    <h1 class=' text-center'>Mes utilisateurs favoris</h1>
                    <div class="row mx-3 mt-5">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 ">
                            {this.utilidateurfavoris.map((suivre : UserConnected) =>
                            <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                <div class='row mt-1'><div class='col-7 col-md-9 col-sm-3'><h2 class='ms-1'>{suivre.prenom} {suivre.nom}</h2></div></div>

                                <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'> Ville : {suivre.ville}</p> Profession : {suivre.profession}</div></div>
                            
                                <div class='row mt-1'><div class='col-8 col-sm-3 col-md-6'><button class="btn btn-primary border text-light ms-1 mb-1" value={suivre._id} onClick={(event) => this.gotoprofile(event)}>Profile</button></div></div>
                                <button class="btn btn-primary text-light btn-danger mb-2 mx-1" onClick={()=>this.supprimerSuivreUtilisateur(suivre._id)}>supprimer</button>
                            </div>)}
                        </div>     
                        <div class="col-sm-2"></div>
                    </div>

                        {/* {this.utilidateurfavoris.map((suivre : UserConnected) =>
                        <div>
                            <p> - prenom: {suivre.prenom} - nom: {suivre.nom}</p>
                             <button value={suivre._id}  onClick={(event) => this.gotoprofile(event)}>profil de l'utilisateur</button> <br />
                        </div>)} */}
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
