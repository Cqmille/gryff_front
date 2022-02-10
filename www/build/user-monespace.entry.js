import { r as registerInstance, h } from './index-0bdf7134.js';

let UserMonespace = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  connectedCallback() {
    console.log('Connected Callback');
    this._getData();
  }
  async _getData() {
    try {
      let response = await fetch(`http://localhost:3000/users/afficheRessourceUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        }
      });
      let reponseBack = await response.json();
      this.ressources = reponseBack.articles;
      this.uneRessource = this.ressources[0];
      console.log(this.ressources);
      console.log(this.uneRessource);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  render() {
    return (h("div", null, this.ressources.map((ressource) => h("div", null, h("p", null, " Etat: ", ressource.EtatRessource, " - Date de publication: ", ressource.date_publication, " - titre: ", ressource.titre, "  - auteur: ", ressource.auteur, " ")))));
  }
};

export { UserMonespace as user_monespace };
