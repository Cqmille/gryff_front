import { Component, h, State } from '@stencil/core';
import {PATH} from '../../utils/path.js';

@Component({
    tag:'user-creationressource',
    shadow: false,
})

export class UserCreationRessource {

    @State() formNewRessource: FormData;
    @State() file: File;
    @State() titre: string;
    @State() resume: string;
    @State () response;

    // lancement d'une instance d'un objet de Ressources
    componentWillLoad(){
        this.formNewRessource = new FormData()
    }

    async envoiRessource(e){
        e.preventDefault();
        this.formNewRessource.append('titre',this.titre);
        this.formNewRessource.append('resume',this.resume);
        let response = await fetch(PATH.back +'/users/createRessource',{
            method: 'POST',
            body: this.formNewRessource
        });
        this.response = await response.json();
        console.log(this.formNewRessource)
    }

    alimRessource(event){ 
        switch(event.target.name){
            case 'titre': this.titre = event.target.value; break;
            case 'resume': this.resume = event.target.value; break;
        }
    }

    async uploadPdf(event){ console.log(event)
        this.formNewRessource.append('file', event.target.files[0])
    }


    render(){
        return (
            <div>
                <form onSubmit={(e) => this.envoiRessource(e)}>
                    <label>titre
                        <input type="text" name='titre' onInput={(event) => this.alimRessource(event)}/>
                    </label>
                    <label>resume
                        <input type="text" name='resume' onInput={(event) => this.alimRessource(event)}/>
                    </label>
                    <label>fichier
                        <input type="file" name='uploaded_file' onChange={(event) => this.uploadPdf(event)}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}