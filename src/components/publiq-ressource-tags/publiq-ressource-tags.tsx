import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Ressources } from '../../utils/Ressources';

@Component({
    tag: 'publiq-ressource-tags',
    styleUrl: 'publiq-ressource-tags.css',
    shadow: false,
  })
  export class publiqRessourceTags {
    @Prop() match:any;
    @State() mesRessources:Ressources[];
    @State() message: string;
    @Prop() history: RouterHistory;

    async componentWillLoad() {
        this._getData();
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/public/ressourceFiltreTags/` + this.match.params.tags, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log();
            if(response.status == 401) {this.message = (await response.json()).message}
            this.mesRessources = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }
    async redirect(event){
        this.history.push(`/afficherRessource/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}

    render(){
        if(this.mesRessources){
            return (
                <div class='container'>
                    <h1 class='uppercase text-center'>{this.match.params.tags}</h1>
                    <div class="row mx-3 mt-5">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 ">
                            {this.mesRessources.map((ressource : Ressources) =>
                            <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                <div class='row mt-1'><div class='col-7 col-md-9 col-lg-10 '><h2 class='ms-3'>{ressource.titre}</h2></div><div class='col-2'>{ressource.prenomNomUser}</div></div>

                                <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'>{ressource.resume}</p></div></div>
                            
                                <div class='row mt-1'><div class='col-8 col-sm-3 col-md-7'><button class="btn btn-primary border text-light ms-3 mb-1" value={ressource._id} onClick={(event) => this.redirect(event)}>En savoir plus</button></div><div class='col-8 col-md-5'>Publié:{ressource.datePublication}</div></div>
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