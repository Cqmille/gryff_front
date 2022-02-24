import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { Ressources } from '../../utils/Ressources';
@Component({
    tag:'mod-affressource',
    styleUrl: 'mod-affressource.css',
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
            let response = await fetch(`http://localhost:3000/moder/afficheRessource/` + this.match.params.id, {
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
                    <div class="container pb-3">
                        <hive-pdf-viewer class="mx-auto pdf-frame " src={"http://localhost:3000/file/"+this.afficherRessources.fileName}></hive-pdf-viewer>
                    </div>

                    <div class="container bottom-page-ressource pb-2">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="bloc-commentaire pb-2 mb-3">
                                    <div class="d-flex justify-content-center pt-3 mx-3">
                                        <p class="titre">{this.afficherRessources.titre}</p>
                                    </div>
                                    <div class="d-flex justify-content-center text-center description mx-2">
                                        <i>{this.afficherRessources.resume}</i>
                                    </div>
                                </div>
                                </div>
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
