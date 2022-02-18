import { Component, h, State,Prop } from '@stencil/core';

import { Ressources } from '../../utils/Ressources';
@Component({
    tag:'publiq-affressource',
    shadow: false,
})

export class affressource {
    @Prop() match:any;
    @State() afficherRessources:Ressources;
    @State() commenttext:string;
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

    async signalerRessource(idRessource){
        try{
            let response = await fetch(`http://localhost:3000/users/signalerUneRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: idRessource.target.value
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
                    ressourceid: idRessource.target.value
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async supprimerFavorisRessource(idRessource){
        try{
            let response = await fetch(`http://localhost:3000/users/supprimerFavorisRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: idRessource.target.value
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
                    - PDF:<hive-pdf-viewer src={"http://localhost:3000/file/"+this.afficherRessources.fileName}></hive-pdf-viewer>
                    - stats (nombre de vue): {nbrVue} <br />
                    - favoris ressource: <button value={this.afficherRessources._id} onClick={idRessource=>this.favorisRessource(idRessource)}>ressourcefavoris</button> <br />
                    - supprimer favoris ressource: <button value={this.afficherRessources._id} onClick={idRessource=>this.supprimerFavorisRessource(idRessource)}>suprimer ressourcefavoris</button> <br />
                    - suivre utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.suivreUtilisateur(idUser)}>suivre utilisateur</button> <br />
                    - supprimer suivi utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.supprimerSuivreUtilisateur(idUser)}>supprimer suivi utilisateur</button> <br />
                    - signaler ressource : <button value={this.afficherRessources._id} onClick={idRessource=>this.signalerRessource(idRessource)}>signalerRessource</button> <br />
                    <form onSubmit={(e)=>this.addComment(e)}>
                        <label>ajouterCommentaire
                            <input type="text" name='commenttext' onInput={(event) => this.alldata(event)}/>
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
