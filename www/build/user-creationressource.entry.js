import { r as registerInstance, h } from './index-15e5713e.js';
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
    console.log(this.formNewRessource);
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
    return (h("div", null, h("form", { onSubmit: (e) => this.envoiRessource(e) }, h("label", null, "type", h("select", { name: 'tags', onInput: (event) => this.alimRessource(event) }, h("option", { value: "sante" }, "Sant\u00E9"), h("option", { value: "education" }, "Education"), h("option", { value: "sport" }, "sport"), h("option", { value: "association" }, "Association"), h("option", { value: "emploi" }, "Emploi"), h("option", { value: "senior" }, "S\u00E9nior"))), h("label", null, "titre", h("input", { type: "text", name: 'titre', onInput: (event) => this.alimRessource(event) })), h("label", null, "resume", h("textarea", { name: 'resume', onInput: (event) => this.alimRessource(event) })), h("label", null, "fichier", h("input", { type: "file", name: 'uploaded_file', onChange: (event) => this.uploadPdf(event) })), h("input", { type: "submit", value: "Submit" }), h("hive-pdf-viewer", { src: "http://localhost:3000/file/doc-1644917417087.pdf" }))));
  }
};

export { UserCreationRessource as user_creationressource };
