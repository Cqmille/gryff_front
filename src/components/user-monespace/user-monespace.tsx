import { Component, h, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'user-monespace',
    shadow: false,
})

export class UserMonespace {
    @Prop() history: RouterHistory;

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
            window.document.querySelector('publiq-nav').setAttribute('connected', 'false')

            this.history.push(`/connexion/la connexion n'est plus valide. Veuillez vous reconnecter`, {});
        }
    }
    async redirect(event){
        this.history.push(`/afficherressourceUser/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}
    async redirectmodif(event){
    this.history.push(`/modifierRessource/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}
    render(){
        if(this.mesRessources){
            return (
                <div class='container'>
                    <h1 class='uppercase text-center'>Vos ressources</h1>
                    <div class="row mx-3 mt-5">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 ">
                            {this.mesRessources.map((ressource : Ressources) =>
                            <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                <div class='row mt-1'><div class='col-7 col-lg-9'><h2 class='ms-3'>{ressource.titre}</h2></div><div class='col-2 fw-bold fs-4'>{ressource.etatRessource}</div></div>
                                
                                <div class='row ms-5 mt-3 mb-3 fs-5 '><div class='col-11'> Catégorie : {ressource.tags}</div></div>
                                <div class='row mt-1'><div class='col-5 col-sm-6'><button class="btn btn-primary border text-light ms-1 mb-2" value={ressource._id} onClick={(event) => this.redirect(event)}>Accéder</button></div><div class='col-8'>Publié:{ressource.datePublication}</div></div>
                                <button class="btn btn-primary border text-light ms-3 mb-3" value={ressource._id} onClick={(event) => this.redirectmodif(event)}>modifierRessource</button>
                            </div>)}
                        </div>     
                        <div class="col-sm-2"></div>
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
