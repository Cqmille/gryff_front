import { Component, h, State,Prop } from '@stencil/core';
import { UserConnected } from '../../utils/UserConnected';

@Component({
    tag:'user-profile',
    shadow: false,
})

export class userFavoris {

    @Prop() match:any;
    @State() utilidateurfavoris:UserConnected[];
    @State() message: string;

    async componentWillLoad() {
        this._getData();
    }

    async _getData(){
        try{
            let response = await fetch(`http://localhost:3000/users/profilUtilisateur/`+this.match.params.userid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                }
            })
            console.log()
            if(response.status == 401) {this.message = (await response.json()).message}
            this.utilidateurfavoris = await response.json();
            console.log(this.utilidateurfavoris)
            // console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    render(){
        if(this.utilidateurfavoris){
            return (
                <div>
                    {this.utilidateurfavoris.map((suivre : UserConnected) =>
                        <div>
                            <p> - prenom: {suivre.prenom} - nom: {suivre.nom}</p>
                        </div>)}
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
