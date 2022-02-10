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
      this.mesRessources = reponseBack.articles;
      console.log(this.mesRessources);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  render() {
    return (h("div", null, this.mesRessources.map((ressource) => h("div", null, h("p", null, " Etat: ", ressource.etatRessource, " - Date de publication: ", ressource.datePublication, " - titre: ", ressource.titre, " ")))));
  }
};

export { UserMonespace as user_monespace };
