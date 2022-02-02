import { r as registerInstance, h } from './index-0bdf7134.js';

let UserConnexion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async envoiConnexion(e) {
    e.preventDefault();
    let response = await fetch('http://localhost:3000/public/connexion', {
      method: 'POST',
      body: JSON.stringify({
        email: this.email,
        password: this.password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.reponseServer = await response.json();
    console.log(this.reponseServer);
    //this.history.replace(`/`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
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
    return (h("div", null, h("form", { onSubmit: (e) => this.envoiConnexion(e) }, h("label", null, "email", h("input", { type: "text", name: 'email', onInput: (event) => this.chargeState(event) })), h("label", null, "password", h("input", { type: "text", name: 'password', onInput: (event) => this.chargeState(event) })), h("input", { type: "submit", value: "Submit" }))));
  }
};

export { UserConnexion as user_connexion };
