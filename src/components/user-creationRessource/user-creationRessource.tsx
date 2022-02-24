import { Component, h, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import {PATH} from '../../utils/path.js';
import '@teamhive/pdf-viewer/dist/';

@Component({
    tag:'user-creationressource',
    shadow: false,
})

export class UserCreationRessource {
    @Prop() history: RouterHistory;

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
        this.history.push(`/monEspace`, {})
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
            <div class='row mx-3'>
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <form onSubmit={(e) => this.envoiRessource(e)}>
                        <div class="form-group">
                            <h1 class="titre">Création d'une ressource</h1>
                            <label class="mx-2">Type</label>
                            <select name='tags' onInput={(event) => this.alimRessource(event)}>
                                <option value="selectionner la variable"></option>
                                <option value="sante">Santé</option>
                                <option value="education">Education</option>
                                <option value="sport">sport</option>
                                <option value="association">Association</option>
                                <option value="emploi">Emploi</option>
                                <option value="senior">Sénior</option>
                            </select>
                        </div>
                        <div class="form-group mt-2">
                            <label class="mx-2">Titre</label>
                            <input type="text" class="form-control" name='titre' onInput={(event) => this.alimRessource(event)}/>
                        </div>
                        <div class="form-group mt-2">
                            <label class="mx-2">Resumé</label>
                            <textarea name='resume' class="form-control" onInput={(event) => this.alimRessource(event)}/>
                        </div>
                        <div class="form-group mt-2">
                            <label class="mx-2">Fichier</label>
                            <input type="file" name='uploaded_file' class="form-control" onChange={(event) => this.uploadPdf(event)}/>
                        </div>
                        <button type="submit" class="btn mt-2 bg-light border">Valider</button>
                    </form>
                </div>         
                <div class="col-sm-3"></div>
            </div>
        )
    }
}