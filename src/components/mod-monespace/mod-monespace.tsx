import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Ressources } from '../../utils/Ressources';

@Component({
    tag:'mod-monespace',
    shadow: false,
})

export class ModMonespace {

    @State() modRessource:Ressources[];
    @State() modComment:Ressources[];
    @State() modsignale:Ressources[];
    @State() message: string;
    @State() ressourceId: string;
    @State() etatRE: string;
    @Prop() history: RouterHistory;

    async componentWillLoad() {
        this._getData();
        this.affcomment();
        this.affress();
    }

    async goto(event){
        this.history.push(`/afficherRessource/${event.target.value}`, {}); 
    }

    async validate(e) {
        e.preventDefault()
        console.log(this.etatRE)
        try{
            let response = await fetch(`http://localhost:3000/moder/moderationRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: this.ressourceId,
                    etatRessource: this.etatRE
                }),
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            window.location.reload()
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async supprimerComment(commentaireid) {
        try{
            let response = await fetch(`http://localhost:3000/moder/moderationComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    commentaireid: commentaireid.target.value,
                }),
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            window.location.reload()
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/moder/afficheRessourceModer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.modRessource = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async affcomment(){
        try{
            let response = await fetch(`http://localhost:3000/moder/afficheCommentaireSignale`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.modComment = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async affress(){
        try{
            let response = await fetch(`http://localhost:3000/moder/afficheRessourceSignale`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.modsignale = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async alldata(event){
        console.log(this.etatRE)
        this.etatRE=event.target.value
    }

    async redirect(event){
        this.history.push(`/afficherressourceMod/${event.target.value}`, {});
    }

    render(){
        if(this.modRessource && this.modComment && this.modsignale ){
            return (
                <div>
                    {this.modRessource.map((ressource : Ressources) =>
                        <div>
                            <p> 
                            - Etat: {ressource.etatRessource} 
                            - Date de publication: {ressource.datePublication} 
                            - titre: {ressource.titre} 
                            - resume: {ressource.resume}
                            - Prenom Nom {ressource.prenomNomUser}
                            <style>.hiden{this.ressourceId=ressource._id}</style>
                            <form onSubmit={(e)=>this.validate(e)}>
                            <label>validerchoix
                            <select name='valider' onInput={(event) => this.alldata(event)}>
                                <option value="selectionner la variable"></option>
                                <option value="valide" >valider</option>
                                <option value="archive">Archiver</option>
                                <option value="refuse">Refuser</option>
                            </select>
                            </label>
                            <input type='submit' value='submit'> </input> <br />
                            </form>
                            <button class="btn btn-primary border text-light ms-3 mb-3" value={ressource._id} onClick={(event) => this.redirect(event)}>En savoir plus</button>
                            </p>
                        </div>)}
                        <div>
                    {this.modComment.map((comment : Ressources) =>
                        <div>
                            <p>
                                
                            {comment.commentaires.map((d,idx)=>{
                            return  (<li key={idx}>
                            - Prenom, Nom : {d.prenomNomUser} <br /> 
                            - texte: {d.commentaireText} <br /> 
                            - date de publication: {d.datePublicationComment}
                            <button value={d._id} onClick={commentaireid=>this.supprimerComment(commentaireid)}>supprimer commentaire</button> <br />
                            <button value={comment._id}  onClick={(event) => this.goto(event)}>detail de la ressource</button> <br />
                            </li>)
                            })}
                            </p>
                        </div>)}
                        {this.modsignale.map((signale : Ressources) =>
                        <div>
                            <p>
                            Ressource signaler <br />
                            - Prenom, Nom : {signale.prenomNomUser} <br /> 
                            - resume: {signale.resume} <br /> 
                            - titre: {signale.titre}
                            <button value={signale._id}  onClick={(event) => this.goto(event)}>detail de la ressource</button> <br />
                            <style>.hiden{this.ressourceId=signale._id}</style>
                            <form onSubmit={(e)=>this.validate(e)}>
                            <label>validerchoix
                            <select name='valider' onInput={(event) => this.alldata(event)}>
                                <option value="selectionner la variable"></option>
                                <option value="annulerSignalement" >annulerSignalement</option>
                                <option value="archive">Archiver</option>
                            </select>
                            </label>
                            <input type='submit' value='submit'> </input> <br />
                            </form>
                            </p>
                        </div>)}
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
