import { r as registerInstance, h } from './index-25b9a15f.js';
import { P as PATH } from './path-5d0f272b.js';

const userConnexionCss = ".titre{font-size:25px}";

let UserConnexion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillRender() {
    console.log(this.match.params.message);
  }
  async envoiConnexion(e) {
    e.preventDefault();
    let response = await fetch(PATH.back + '/public/connexion', {
      method: 'POST',
      body: JSON.stringify({
        email: this.email,
        password: this.password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.user = await response.json();
    if (response.status == 200) {
      localStorage.setItem("userId", this.user.userId);
      localStorage.setItem("token", this.user.token);
      localStorage.setItem('habilitation', this.user.habilitation);
      const navBar = window.document.querySelector('publiq-nav');
      navBar.setAttribute('connected', 'true');
      if (this.user.habilitation == "mod") {
        this.history.replace(`/monEspace2`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
      }
      else {
        this.history.replace(`/monEspace`, {});
      }
    }
    else {
      this.messageErr = this.user.message;
    }
  }
  chargeState(event) {
    switch (event.target.name) {
      case 'email':
        this.email = event.target.value;
        break;
      case 'password':
        this.password = event.target.value;
        break;
    }
    console.log('passe: ' + this.password + 'email: ' + this.email);
  }
  render() {
    return (h("div", null, h("form", { onSubmit: (e) => this.envoiConnexion(e) }, h("div", { class: "row mx-3" }, h("div", { class: "col-sm-3" }), h("div", { class: "col-sm-6" }, h("div", { class: "form-group" }, h("h1", { class: "titre" }, "Connexion \u00E0 mon espace"), h("label", { class: "mx-2" }, "Adresse e-mail"), h("input", { type: "email", class: "form-control", name: 'email', placeholder: "exemple@mail.fr", onInput: (event) => this.chargeState(event) })), h("div", { class: "form-group mt-2" }, h("label", { class: "mx-2" }, "Mot de passe"), h("input", { type: "password", class: "form-control", name: 'password', placeholder: "Mon mot de passe", onInput: (event) => this.chargeState(event) })), h("button", { type: "submit", class: "btn mt-2 bg-secondary border" }, "Se connecter")), h("div", { class: "col-sm-3" }))), (this.messageErr) ?
      h("p", null, this.messageErr) : null, (this.match.params.message) ?
      h("p", null, this.match.params.message) : null));
  }
};
UserConnexion.style = userConnexionCss;

export { UserConnexion as user_connexion };
