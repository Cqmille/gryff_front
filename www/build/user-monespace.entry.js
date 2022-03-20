import { r as registerInstance, h } from './index-25b9a15f.js';

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
      this.history.push(`/connexion/la connexion n'est plus valide. Veuillez vous reconnecter`, {});
    }
  }
  async redirect(event) {
    this.history.push(`/afficherressourceUser/${event.target.value}`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
  }
  async redirectmodif(event) {
    this.history.push(`/modifierRessource/${event.target.value}`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
  }
  render() {
    if (this.mesRessources) {
      return (h("div", { class: 'container' }, h("h1", { class: 'uppercase text-center' }, "Vos ressources"), h("div", { class: "row mx-3 mt-5" }, h("div", { class: "col-sm-2" }), h("div", { class: "col-sm-8 " }, this.mesRessources.map((ressource) => h("div", { class: 'border border-primary bg-light rounded mb-3 listshadow' }, h("div", { class: 'row mt-1' }, h("div", { class: 'col-7 col-lg-9' }, h("h2", { class: 'ms-3' }, ressource.titre)), h("div", { class: 'col-2 fw-bold fs-4' }, ressource.etatRessource, h("style", null, ".hiden", this.nbrVue = ressource.stats.vuesConnecte + ressource.stats.vuesnonConnecte), h("div", { class: "h4 text-muted" }, this.nbrVue, "  \uD83D\uDC41"), " ")), h("div", { class: 'row ms-5 mt-3 mb-3 fs-5 ' }, h("div", { class: 'col-11' }, " Cat\u00E9gorie : ", ressource.tags)), h("button", { class: "btn btn-primary border text-light ms-1 mb-1", value: ressource._id, onClick: (event) => this.redirectmodif(event) }, "Modifier"), h("div", { class: 'row mt-1' }, h("div", { class: 'col-5 col-sm-6' }, h("button", { class: "btn btn-primary border text-light ms-1 mb-2", value: ressource._id, onClick: (event) => this.redirect(event) }, "Acc\u00E9der")), h("div", { class: 'col-8 col-lg-6' }, "Publi\u00E9:", ressource.datePublication))))), h("div", { class: "col-sm-2" }))));
    }
    if (this.message) {
      return (h("div", null, h("p", null, this.message)));
    }
  }
};

export { UserMonespace as user_monespace };
