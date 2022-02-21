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
                <div class='container'>
                        <h1 class="text-center">Utilisateur</h1>
                        <div class="row mx-3 mt-5">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 ">
                            <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                <div class='row mt-1'><div class='col-7 col-md-12 col-sm-3 text-center'><h2 class='ms-1 h4'> {this.profil.prenom}  {this.profil.nom} </h2></div></div>

                                <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'><p>Date de naissance: {this.profil.dateNaissance} </p> Ville : {this.profil.ville} <p>Profession : {this.profil.profession}</p></p></div></div>
                            
                            </div>
                        </div>     
                        <div class="col-sm-2"></div>
                    </div>
                    <h1 class=' text-center'>Ressources</h1>
                    <div class="row mx-3 mt-5">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 ">
                            {this.profilRessources.map((ressource : Ressources) =>
                            <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                <div class='row mt-1'><div class='col-7 col-md-9 col-sm-3'><h2 class='ms-1'>{ressource.titre}</h2></div><div class='col-2'>{ressource.prenomNomUser}</div></div>

                                <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'>{ressource.resume}</p></div></div>
                            
                                <div class='row mt-1'><div class='col-8 col-sm-3 col-md-6'><button class="btn btn-primary border text-light ms-1 mb-1" value={ressource._id} onClick={(event) => this.goto(event)}>En savoir plus</button></div><div class='col-8 col-lg-6'>Publié:{ressource.datePublication}</div></div>
                            </div>)}
                        </div>     
                        <div class="col-sm-2"></div>
                    </div>
                        {/* {this.profilRessources.map((ressource : Ressources) => 
                        // <div>
                        //     <p>
                        //         titre:{ressource.titre} resume:{ressource.resume} datePublication:{ressource.datePublication} tags:{ressource.tags}
                        //         <button value={ressource._id}  onClick={(event) => this.goto(event)}>detail de la ressource</button> <br />
                        //     </p>
                        // </div>)}*/}
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
