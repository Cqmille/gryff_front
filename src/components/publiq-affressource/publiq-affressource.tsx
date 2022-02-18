import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'publiq-affressource',
    styleUrl: 'publiq-affressource.css',
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
                    ressourceid: this.idRessource
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async signalerRessource(){
        try{
            let response = await fetch(`http://localhost:3000/users/signalerUneRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: this.idRessource
                }),
            })
            console.log(response)
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }
    
    async signalerCommentaires(commentaireid){
        try{
            let response = await fetch(`http://localhost:3000/users/signalerUnCommentaire`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    commentaireid: commentaireid.target.value
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async favorisRessource(){
        try{
            let response = await fetch(`http://localhost:3000/users/favorisRessource/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: this.idRessource
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async supprimerFavorisRessource(){
        try{
            let response = await fetch(`http://localhost:3000/users/supprimerFavorisRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: this.idRessource
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async suivreUtilisateur(idUser){
        try{
            let response = await fetch(`http://localhost:3000/users/suivreUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    utilisateursSuivis: idUser.target.value
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
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
                    utilisateursSuivis: idUser.target.value
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async addComment(e){
        e.preventDefault()
        try{
            let response = await fetch(`http://localhost:3000/users/commente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    _id: this.match.params.id,
                    commentaireText: this.commenttext
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
            window.location.reload()
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/public/afficheRessource/` + this.match.params.id, {
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

    async gotoprofile(event){
        this.history.push(`/profilSuivi/${event.target.value}`, {}); 
    }

    render(){
        if(this.afficherRessources){
            const nbrVue=this.afficherRessources.stats.vuesConnecte + this.afficherRessources.stats.vuesnonConnecte
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
                                    <div class="d-flex justify-content-end align-items-start nom-user">
                                        <div><p>de {this.afficherRessources.prenomNomUser}</p></div>
                                        <div class="nostyle mx-1"><img class="icone" src="/bootstrap-files/person-fill.svg" width="25" height="25"></img></div>
                                    </div>
                                    <div class="d-flex justify-content-end mb-3">
                                        <div class="nostyle mx-2"><img class="icone" src="/bootstrap-files/heart.svg" width="35" height="35"></img></div>
                                        <div hidden class="nostyle mx-2"><img class="icone" src="/bootstrap-files/heart-fill.svg" width="35" height="35"></img></div>
                                        <div class="nostyle mx-2"><img class="icone" src="/bootstrap-files/download.svg" width="35" height="35"></img></div>
                                    </div>
                                    <div class="d-flex justify-content-center text-center description mx-2">
                                        <i>{this.afficherRessources.resume}</i>
                                    </div>
                                </div>

                                {/* <div>
                                    Date de publication: {this.afficherRessources.datePublication} <br />
                                    Titre: {this.afficherRessources.titre} <br />
                                    Nombre vues: {nbrVue} <br />
                                    Type: {this.afficherRessources.type} <br />
                                    Tags: {this.afficherRessources.tags} <br />
                                    Auteur: {this.afficherRessources.prenomNomUser} <br />
                                    vers profil utilisateur : <button value={this.afficherRessources.idUser}  onClick={(event) => this.gotoprofile(event)}>profil de l'utilisateur</button> <br />
                                    Resumé: {this.afficherRessources.resume} <br />
                                    Favoris ressource: <button onClick={this.favorisRessource}>ressourcefavoris</button> <br />
                                    Supprimer favoris ressource: <button onClick={this.supprimerFavorisRessource}>suprimer ressourcefavoris</button> <br />
                                    Suivre utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.suivreUtilisateur(idUser)}>suivre utilisateur</button> <br />
                                    Supprimer suivi utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.supprimerSuivreUtilisateur(idUser)}>supprimer suivi utilisateur</button> <br />
                                    Signaler ressource : <button onClick={this.signalerRessource}>signalerRessource</button> <br />

                                    <form onSubmit={(e)=>this.addComment(e)}>
                                            <label>ajouterCommentaire
                                                <input type="text" name='commenttext' onInput={(event) => this.alldata(event)}/>
                                            </label>
                                            <input type='submit' value='submit'> </input> <br />
                                    </form>

                                </div> */}
                            </div>
                            <div class="col-sm-6">
                                {this.afficherRessources.commentaires.map((d,idx)=>{
                                return  (
                                <div class="pb-2 commentaire">
                                    <div class="bloc-commentaire py-1 px-2"> <span class="text1">{d.commentaireText}</span>
                                        <div class="d-flex justify-content-between align-items-center pt-2">
                                            <div class="d-flex">
                                                <div><i class="text2">{d.prenomNomUser} </i></div>
                                                <div><i class="date ">, le {d.datePublicationComment.substr(0, 10)}</i></div>
                                            </div>
                                            
                                            <button class="nostyle align-middle" value={d._id} onClick={commentaireid => this.signalerCommentaires(commentaireid)}><img class="icone" src="/bootstrap-files/exclamation-diamond.svg" width="18" height="18"></img></button>
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
        if(this.message){
            return (
                <div>
                    <p>{this.message}</p>
                </div>
            )
        }
    }
}
