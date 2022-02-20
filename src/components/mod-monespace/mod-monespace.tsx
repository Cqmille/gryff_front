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
                <div class='container'>
                    <h1 class='uppercase text-center mb-2'>Ressources en attentes</h1>
                    {this.modRessource.map((ressource : Ressources) =>
                        <div class="row mx-3">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-8 ">
                                <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                    <div class='row mt-1'><div class='col-7 col-lg-9'><h2 class='ms-3'>{ressource.titre}</h2></div><div class='col-2 fw-bold fs-4'>{ressource.etatRessource}</div></div>
                                    
                                    <div class='row ms-2 mt-3 mb-3 fs-5 '><div class='col-11'> Catégorie : {ressource.tags}</div></div>
                                    <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'>{ressource.resume}</p></div></div>
                                    <style>.hiden{this.ressourceId=ressource._id}</style>
                                        <form class='ms-3' onSubmit={(e)=>this.validate(e)}>
                                        <label>validerchoix
                                        <select name='valider' class='ms-3' onInput={(event) => this.alldata(event)}>
                                            <option value="selectionner la variable"></option>
                                            <option value="valide" >valider</option>
                                            <option value="archive">Archiver</option>
                                            <option value="refuse">Refuser</option>
                                        </select>
                                        </label>
                                        <input class='ms-2' type='submit' value='Envoyer'> </input> <br />
                                        </form>
                                    <div class='row mt-1'><div class='col-5 col-sm-6'><button class="btn btn-primary border text-light ms-1 mb-2" value={ressource._id} onClick={(event) => this.redirect(event)}>Accéder</button></div><div class='col-8 col-lg-6'>Publié:{ressource.datePublication}</div></div>
                                
                                </div>
                            </div>     
                            <div class="col-sm-2"></div>
                        </div>)}
                        <h1 class='uppercase text-center mb-2'>Commentaires signaler</h1>
                        {this.modComment.map((comment : Ressources) =>
                        <div>
                            <div class="row mx-3">
                                <div class="col-sm-2"></div>
                                <div class="col-sm-8 ">
                                {comment.commentaires.map((d)=>{
                                    return(
                                    <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                        <div class='row mt-1'><div class='col-7 col-lg-9'><h2 class='ms-3'>{d.prenomNomUser}</h2></div><div class='col-2 fw-bold fs-4'>{d.datePublicationComment}</div></div>
                                        
                                        {/* <div class='row ms-2 mt-3 mb-3 fs-5 '><div class='col-11'> Catégorie : {ressource.tags}</div></div> */}
                                        <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'>{d.commentaireText}</p></div></div>
                                        <div class='row mt-1'><div class='col-5 col-sm-6'><button class="btn btn-primary border text-light ms-1 mb-2" value={comment._id} onClick={commentaireid=>this.supprimerComment(commentaireid)}>supprimer commentaire</button> <br />
                                        <button class="btn btn-primary border text-light ms-1 mb-2" value={comment._id}  onClick={(event) => this.goto(event)}>detail de la ressource</button> <br /></div></div>
                                    </div>)})} 
                                <div class="col-sm-2"></div>
                                </div>  
                            </div>
                        </div> )}


                        <h1 class='uppercase text-center mb-2'>Ressources signaler</h1>
                    {this.modsignale.map((signale : Ressources) =>
                        <div class="row mx-3">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-8 ">
                                <div class='border border-primary bg-light rounded mb-3 listshadow'>
                                    <div class='row mt-1'><div class='col-7 col-lg-9'><h2 class='ms-3'>{signale.titre}</h2></div><div class='col-2 fw-bold fs-4'>{signale.etatRessource}</div></div>
                                    
                                    <div class='row ms-2 mt-3 mb-3 fs-5 '><div class='col-11'> Catégorie : {signale.tags}</div></div>
                                    <div class='row ms-5 mt-1 mb-1 fs-5 '><div class='col-11'><p class='truncate'>{signale.resume}</p></div></div>
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
                                    <div class='row mt-1'><div class='col-5 col-sm-6'><button class="btn btn-primary border text-light ms-1 mb-2" value={signale._id} onClick={(event) => this.redirect(event)}>Accéder</button></div><div class='col-8 col-lg-6'>Publié:{signale.datePublication}</div></div>
                                
                                </div>
                            </div>     
                            <div class="col-sm-2"></div>
                        </div>)}
{/* 
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
                        </div>
                        )} */}
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
