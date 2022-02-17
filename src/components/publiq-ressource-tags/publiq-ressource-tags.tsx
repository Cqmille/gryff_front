import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Ressources } from '../../utils/Ressources';

@Component({
    tag: 'publiq-ressource-tags',
    shadow: true,
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
        this.history.push(`/ressources${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}

    render(){
        if(this.mesRessources){
            return (
                <div>
                    <h1>{this.match.params.tags}</h1>
                    {this.mesRessources.map((ressource : Ressources) =>
                        <div>
                            <p> {ressource._id} Etat: {ressource.etatRessource} - Date de publication: {ressource.datePublication} - titre: {ressource.titre} - auteur: {ressource.prenomNomUser} - resume: {ressource.resume}</p>
                            <button value='{ressource._id}' onClick={(event) => this.redirect(event)}>Sénior</button>
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