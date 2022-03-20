import { r as registerInstance, h } from './index-25b9a15f.js';
import { P as PATH } from './path-5d0f272b.js';

let UserCreationRessource = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  // lancement d'une instance d'un objet de Ressources
  componentWillLoad() {
    this.formNewRessource = new FormData();
  }
  async envoiRessource(e) {
    e.preventDefault();
    this.formNewRessource.append('titre', this.titre);
    this.formNewRessource.append('resume', this.resume);
    this.formNewRessource.append('tags', this.tags);
    let response = await fetch(PATH.back + '/users/createRessource', {
      method: 'POST',
      body: this.formNewRessource,
      headers: {
        authorization: localStorage.getItem('token'),
        userid: localStorage.getItem('userId')
      }
    });
    this.response = await response.json();
    this.history.push(`/monEspace`, {});
  }
  alimRessource(event) {
    switch (event.target.name) {
      case 'titre':
        this.titre = event.target.value;
        break;
      case 'resume':
        this.resume = event.target.value;
        break;
      case 'tags':
        this.tags = event.target.value;
        break;
    }
  }
  async uploadPdf(event) {
    console.log(event);
    this.formNewRessource.append('file', event.target.files[0]);
  }
  // url pour tester affichage pdf : http://localhost:3000/file/doc-1644917417087.pdf
  render() {
    return (h("div", { class: 'row mx-3' }, h("div", { class: "col-sm-3" }), h("div", { class: "col-sm-6" }, h("form", { onSubmit: (e) => this.envoiRessource(e) }, h("div", { class: "form-group" }, h("h1", { class: "titre" }, "Cr\u00E9ation d'une ressource")), h("div", { class: "form-group mt-2" }, h("label", { class: "mx-2" }, "Titre"), h("input", { type: "text", class: "form-control", name: 'titre', onInput: (event) => this.alimRessource(event) })), h("div", { class: "form-group mt-2" }, h("label", { class: "mx-2" }, "R\u00E9sum\u00E9"), h("textarea", { name: 'resume', class: "form-control", onInput: (event) => this.alimRessource(event) })), h("label", { class: "mx-2 mt-2" }, "Cat\u00E9gorie"), h("select", { class: "form-select", onInput: (event) => this.alimRessource(event) }, h("option", { value: "sante" }, "Sant\u00E9"), h("option", { value: "education" }, "\u00C9ducation"), h("option", { value: "sport" }, "Sport"), h("option", { value: "association" }, "Association"), h("option", { value: "emploi" }, "Emploi"), h("option", { value: "senior" }, "S\u00E9nior")), h("div", { class: "form-group mt-2" }, h("label", { class: "mx-2" }, "Fichier"), h("input", { type: "file", name: 'uploaded_file', class: "form-control", onChange: (event) => this.uploadPdf(event) })), h("button", { type: "submit", class: "btn mt-4 bg-light border" }, "Valider"))), h("div", { class: "col-sm-3" })));
  }
};

export { UserCreationRessource as user_creationressource };
