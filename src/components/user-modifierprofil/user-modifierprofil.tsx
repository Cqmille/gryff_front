import { Component, h, State,Prop } from '@stencil/core';
import { UserConnected } from '../../utils/UserConnected';
import { RouterHistory } from '@stencil/router';
@Component({
    tag:'user-modifierprofil',
    shadow: false,
})

export class userModifierProfil {

    @State() profil:UserConnected;
    @State() message: string;
    @State() ville: string;
    @State() profession: string;
    @Prop() history: RouterHistory;

    async alldata(event){
        switch(event.target.name){
            case 'ville': this.ville = event.target.value; break;
            case 'profession': this.profession = event.target.value; break;
        }
    }

    async componentWillLoad() {
        this.getprofil();
    }

    async modifProfile(e){
        e.preventDefault()
        try{
            let response = await fetch(`http://localhost:3000/users/modifierMonProfil`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ville: this.ville,
                    profession: this.profession
                }),
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.profil = await response.json();
            this.history.push(`/profil`, {})
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async getprofil(){
        try{
            let response = await fetch(`http://localhost:3000/users/monProfil`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.profil = await response.json();
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.profil)
        return(
        <div>
            <p>
            <form onSubmit={(e)=>this.modifProfile(e)}>
                        <label>Modifier Profil <br />
                        Ville:
                            <input type="text" name='ville' value={this.profil.ville} onInput={(event) => this.alldata(event)}/> <br />
                            <label>
                        Proffession :
                            <input type="text" name='profession' value={this.profil.profession} onInput={(event) => this.alldata(event)}/> <br />
                            </label>
                        </label>
                        <br />
                            <input type='submit' value='submit'> </input> <br />
            </form>
            </p>
        </div>
        )}}
