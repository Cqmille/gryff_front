import { r as registerInstance, h } from './index-156de0d2.js';

let UserMonespace = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
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
      console.log();
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      this.mesRessources = await response.json();
      // console.log(this.message)
    }
    catch (err) {
      console.log('fetch failed', err);
      window.document.querySelector('publiq-nav').setAttribute('connected', 'false');
      this.history.push(`/connexion`, {});
    }
  }
  render() {
    if (this.mesRessources) {
      return (h("div", null, this.mesRessources.map((ressource) => h("div", null, h("p", null, " Etat: ", ressource.etatRessource, " - Date de publication: ", ressource.datePublication, " - titre: ", ressource.titre, " ")))));
    }
    if (this.message) {
      return (h("div", null, h("p", null, this.message)));
    }
  }
};

export { UserMonespace as user_monespace };
