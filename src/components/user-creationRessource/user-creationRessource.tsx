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
    @State() tags: string;
    @State () response;

    // lancement d'une instance d'un objet de Ressources
    componentWillLoad(){
        this.formNewRessource = new FormData()
    }

    async envoiRessource(e){
        e.preventDefault();
        this.formNewRessource.append('titre',this.titre);
        this.formNewRessource.append('resume',this.resume);
        this.formNewRessource.append('tags',this.tags);
        let response = await fetch(PATH.back +'/users/createRessource',{
            method: 'POST',
            body: this.formNewRessource,
            headers: {
                authorization: localStorage.getItem('token'),
                userid: localStorage.getItem('userId')
            }
        });
        this.response = await response.json();
        console.log(this.formNewRessource)
    }

    alimRessource(event){ 
        switch(event.target.name){
            case 'titre': this.titre = event.target.value; break;
            case 'resume': this.resume = event.target.value; break;
            case 'tags': this.tags = event.target.value; break;
        }
    }

    async uploadPdf(event){ console.log(event)
        this.formNewRessource.append('file', event.target.files[0])
    }
// url pour tester affichage pdf : http://localhost:3000/file/doc-1644917417087.pdf

    render(){
        return (
            <div>
                <form onSubmit={(e) => this.envoiRessource(e)}>
                    <label>type
                        <select name='tags' onInput={(event) => this.alimRessource(event)}>
                            <option value="sante">Santé</option>
                            <option value="education">Education</option>
                            <option value="Sport">sport</option>
                            <option value="Association">Association</option>
                            <option value="Emploi">Emploi</option>
                            <option value="Senior">Sénior</option>
                        </select>
                    </label>
                    <label>titre
                        <input type="text" name='titre' onInput={(event) => this.alimRessource(event)}/>
                    </label>
                    <label>resume
                        <textarea name='resume' onInput={(event) => this.alimRessource(event)}/>
                    </label>
                    <label>fichier
                        <input type="file" name='uploaded_file' onChange={(event) => this.uploadPdf(event)}/>
                    </label>
                    <input type="submit" value="Submit" />
                    <hive-pdf-viewer src="http://localhost:3000/file/doc-1644917417087.pdf"></hive-pdf-viewer>
                </form>

            </div>
        )
    }
}