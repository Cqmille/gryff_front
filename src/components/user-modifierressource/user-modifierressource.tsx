import { Component, h, Prop, State } from '@stencil/core';
import { Ressources } from '../../utils/Ressources';
import { RouterHistory } from '@stencil/router';
@Component({
    tag:'user-modifierressource',
    shadow: false,
})

export class userModifierRessource {

    @State() modifierRessource:Ressources;
    @State() mesressource:Ressources;
    @State() message: string;
    @State() type: string;
    @State() titre: string;
    @State() resume: string;
    @Prop() match: any;
    @Prop() history: RouterHistory;
    
    async componentWillLoad() {
        this.ressource();
    }
    async alldata(event){
        switch(event.target.name){
            case 'type': this.type = event.target.value; break;
            case 'titre': this.titre = event.target.value; break;
            case 'resume': this.resume = event.target.value; break;
        }
    }

    async sendModif(e){
        e.preventDefault()
        try{
            let response = await fetch(`http://localhost:3000/users/modifRessource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    type: this.type,
                    titre: this.titre,
                    resume: this.resume,
                    ressourceid: this.match.params.id
                }),
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.modifierRessource = await response.json();
            this.history.push(`/monEspace`, {})
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async ressource(){
        try{
            let response = await fetch(`http://localhost:3000/users/afficheOneRessourceUser/` + this.match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            this.mesressource = await response.json();
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.mesressource){
        return(
        <div class='container'>
            <p>
            <form onSubmit={(e)=>this.sendModif(e)}>
            <div class="row mx-3">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="form-group">
                    <h1 class="titre">Modifier la ressource</h1>
                    <label class="mx-2">Titre</label>
                    <input type="text" class="form-control" name='titre' value={this.mesressource.titre}  onInput={(event) => this.alldata(event)}/> <br />
                    </div>
                    <div class="form-group mt-2">
                    <label class="mx-2">Resumer</label>
                    <input type="text" class="form-control" name='resume' value={this.mesressource.resume} onInput={(event) => this.alldata(event)}/> <br />
                    </div>
                    <button type="submit" class="btn mt-2 bg-light border">Modifier</button>
                </div>         
                <div class="col-sm-3"></div>
            </div>
            </form>
            </p>
        </div>
        )}}}
