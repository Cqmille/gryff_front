import { Component, h, State } from '@stencil/core';

import { Ressources } from '../../utils/Ressources';

import { UserConnected } from '../../utils/UserConnected';

@Component({
    tag:'publiq-affressource',
    shadow: false,
})

export class affressource {

    @State() afficherRessources:Ressources;
    @State() afficherprofile:UserConnected;
    @State() message: string;

    async componentWillLoad() {
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
                    ressourceid: "620b95d1e1c6a6ec68548fed"
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
            let response = await fetch(`http://localhost:3000/users/signalerUneRessource/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: "620b95d1e1c6a6ec68548fed"
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
            let response = await fetch(`http://localhost:3000/users/favorisRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: "620b95d1e1c6a6ec68548fed"
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
                    ressourceid: "620b95d1e1c6a6ec68548fed"
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

    async addComment(event){
        try{
            let response = await fetch(`http://localhost:3000/users/commente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    _id: "620b95d1e1c6a6ec68548fed",
                    commentaireText: event.target.value
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/public/afficheRessource/`+"620b95d1e1c6a6ec68548fed", {
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

    render(){
        if(this.afficherRessources){
            const nbrVue=this.afficherRessources.stats.vuesConnecte + this.afficherRessources.stats.vuesnonConnecte
            return (
                <div>
                    <p> 
                    Resumer: {this.afficherRessources.resume} <br />
                    - Date de publication: {this.afficherRessources.datePublication} <br />
                    - titre: {this.afficherRessources.titre} <br />
                    - type: {this.afficherRessources.type} <br />
                    - tags: {this.afficherRessources.tags} <br />
                    - auteur: {this.afficherRessources.prenomNomUser} <br />
                    - PDF:<hive-pdf-viewer src="http://localhost:3000/file/doc-1644917417087.pdf"></hive-pdf-viewer>
                    - stats (nombre de vue): {nbrVue} <br />
                    - favoris ressource: <button onClick={this.favorisRessource}>ressourcefavoris</button> <br />
                    - supprimer favoris ressource: <button onClick={this.supprimerFavorisRessource}>suprimer ressourcefavoris</button> <br />
                    - suivre utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.suivreUtilisateur(idUser)}>suivre utilisateur</button> <br />
                    - supprimer suivi utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.supprimerSuivreUtilisateur(idUser)}>supprimer suivi utilisateur</button> <br />
                    - signaler ressource : <button onClick={this.signalerRessource}>signalerRessource</button> <br />
                    <form>
                        <label>ajouterCommentaire
                            <input type="text" name='commenttext' onInput={(event) => this.addComment(event)}/>
                        </label>
                            <input type='submit' value='submit'> </input> <br />
                    </form>
                    - commentaires  {this.afficherRessources.commentaires.map((d,idx)=>{
                        return  (<li key={idx}>
                            - Prenom, Nom : {d.prenomNomUser} <br /> 
                            - texte: {d.commentaireText} <br /> 
                            - date de publication: {d.datePublicationComment} <br />
                            - signaler commentaires : <button value={d._id} onClick={commentaireid => this.signalerCommentaires(commentaireid)}> signalerCommentaires</button> <br /> </li>)
                    })}
                    </p>
                    {this.vueplus1()}
                </div>
            )
        }
        if(this.afficherprofile){
            return(
                <div>
                    <p>
                    - afficher profil de l'auteur de la ressource: 
                    - Nom {this.afficherprofile.nom} <br />
                    - Prenom {this.afficherprofile.prenom} <br />
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
