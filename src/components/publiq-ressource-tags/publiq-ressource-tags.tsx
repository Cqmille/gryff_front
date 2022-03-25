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
                    <div class="d-flex justify-content-center">
                        <p class="titre">{this.match.params.tags.charAt(0).toUpperCase() + this.match.params.tags.slice(1)}</p>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-sm-8">
                            {this.mesRessources.map((ressource : Ressources) =>
                            <div class='bloc-ressource p-2'>
                                <div class="row d-flex align-items-baseline">
                                    <div class="d-flex justify-content-between">
                                        <h2 class=''>{ressource.titre}</h2>
                                        <div class=''><button class="btn btn-primary text-light" value={ressource._id} onClick={(event) => this.redirect(event)}>Voir la ressource</button></div>
                                    </div>
                                    <div class=''><p>par {ressource.prenomNomUser}, le {ressource.datePublication.substring(0,10)}</p></div>
                                </div>
                                <div class=''><p class='truncate'>{ressource.resume}</p></div>
                                <div class="row">
                                </div>
                            </div>)}
                        </div>     
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