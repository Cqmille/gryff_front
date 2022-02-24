import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { Ressources } from '../../utils/Ressources';
@Component({
    tag:'user-affressource',
    styleUrl: 'user-affressource.css',
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

    async favorisRessource(idRessource){
        try{
            let response = await fetch(`http://localhost:3000/users/favorisRessource/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: idRessource
                }),
            });
            document.getElementById('coeurVide').setAttribute('hidden','true')
            document.getElementById('coeurPlein').removeAttribute("hidden")
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }
        async gotoprofile(idUser){
            this.history.push(`/profilSuivi/${idUser}`, {}); 
        }
        async vueplus1(){
            try{
                let response = await fetch(`http://localhost:3000/public/statressource`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: localStorage.getItem('token'),
                        userid: localStorage.getItem('userId')
                    },
                    body: JSON.stringify({
                        ressourceid: this.match.params.id
                    }),
                })
                if(response.status == 401) {this.message = (await response.json()).message}
                console.log(this.message)
            }
            catch (err){
                console.log('fetch failed', err);
            }
        }
        async signalerCommentaires(commentaireid){
            console.log(commentaireid)
            try{
                let response = await fetch(`http://localhost:3000/users/signalerUnCommentaire`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: localStorage.getItem('token'),
                        userid: localStorage.getItem('userId')
                    },
                    body: JSON.stringify({
                        commentaireid: commentaireid
                    }),
                })
                if(response.status == 401) {this.message = (await response.json()).message}
                console.log(this.message)
            }
            catch (err){
                console.log('fetch failed', err);
            }
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
                            <div class="col-sm-6">
                                {this.afficherRessources.commentaires.map((d,idx)=>{
                                return  (
                                <div class="pb-2 commentaire" key={idx}>
                                    <div class="bloc-commentaire py-1 px-2"> <span class="text1">{d.commentaireText}</span>
                                        <div class="d-flex justify-content-between align-items-center pt-2">
                                            <div class="d-flex">
                                                <div><i class="text2">{d.prenomNomUser} </i></div>
                                                <div><i class="date ">, le {d.datePublicationComment.substr(0, 10)}</i></div>
                                            </div>
                                            
                                            <button class="nostyle align-middle" onClick={() => this.signalerCommentaires(d._id)}><img class="icone" src="/bootstrap-files/exclamation-diamond.svg" width="18" height="18"></img></button>
                                        </div>
                                    </div>
                                </div>
                                )})}
                            </div>
                        </div>
                    </div>
                    <style>.hidden{this.vueplus1()}</style> 
                </div>
)
}
                 {/* <div>
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
                 </div> */}
            
        if(this.message){
            return (
                <div>
                    <p>{this.message}</p>
                </div>
            )
        }
    }
}
