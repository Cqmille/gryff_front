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

    async _getData(e){
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
            let response = await fetch(`http://localhost:3000/public/afficheRessource/` + this.match.params.id, {
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
        <div>
            <p>
            <form onSubmit={(e)=>this._getData(e)}>
                        <label>Modifier Ressource <br />
                        type:
                            <input type="text" name='type' value={this.mesressource.type} onInput={(event) => this.alldata(event)}/> <br />
                        titre :
                            <input type="text" name='titre' value={this.mesressource.titre}  onInput={(event) => this.alldata(event)}/> <br />
                        resume :
                            <input type="text" name='resume' value={this.mesressource.resume} onInput={(event) => this.alldata(event)}/> <br />
                        </label>
                        <br />
                            <input type='submit' value='submit'> </input> <br />
            </form>
            </p>
        </div>
        )}}}
