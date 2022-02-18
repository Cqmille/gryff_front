import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { Ressources } from '../../utils/Ressources';
@Component({
    tag:'user-affressource',
    shadow: false,
})

export class affressource {
    @Prop() match:any;
    @Prop() history: RouterHistory;

    @State() idRessource:string;
    @State() afficherRessources:Ressources;
    @State() commenttext:string;
    @State() message: string;

    

    async componentWillLoad() {
        this.idRessource= this.match.params.id;
        this._getData();
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/users/afficheOneRessourceUser/` + this.match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            this.afficherRessources = await response.json();
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async alldata(event){
        this.commenttext=(event.target.value)
    }

    render(){
        if(this.afficherRessources){
            return (
                <div>
                    <button class="btn btn-primary border text-light ms-3 mb-3" onClick={() => this.history.goBack()}> retour à la liste</button>
                    <p> 
                    Resumer: {this.afficherRessources.resume} <br />
                    - Date de publication: {this.afficherRessources.datePublication} <br />
                    - titre: {this.afficherRessources.titre} <br />
                    - type: {this.afficherRessources.type} <br />
                    - tags: {this.afficherRessources.tags} <br />
                    - auteur: {this.afficherRessources.prenomNomUser} <br />
                    - PDF:<hive-pdf-viewer src={"http://localhost:3000/file/"+this.afficherRessources.fileName}></hive-pdf-viewer>
                    </p>
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
