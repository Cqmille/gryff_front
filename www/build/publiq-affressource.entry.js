import { r as registerInstance, h } from './index-25b9a15f.js';

let affressource = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    this._getData();
  }
  async vueplus1() {
    try {
      let response = await fetch(`http://localhost:3000/public/statressource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: "620caeb3cf2c433f424fb471"
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async signalerRessource() {
    try {
      let response = await fetch(`http://localhost:3000/users/signalerUneRessource/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: "620caeb3cf2c433f424fb471"
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async signalerCommentaires(commentaireid) {
    try {
      let response = await fetch(`http://localhost:3000/users/signalerUnCommentaire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          commentaireid: commentaireid.target.value
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async favorisRessource() {
    try {
      let response = await fetch(`http://localhost:3000/users/favorisRessource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: "620caeb3cf2c433f424fb471"
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async supprimerFavorisRessource() {
    try {
      let response = await fetch(`http://localhost:3000/users/supprimerFavorisRessource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: "620caeb3cf2c433f424fb471"
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async suivreUtilisateur(idUser) {
    try {
      let response = await fetch(`http://localhost:3000/users/suivreUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          utilisateursSuivis: idUser.target.value
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async supprimerSuivreUtilisateur(idUser) {
    try {
      let response = await fetch(`http://localhost:3000/users/supprimerSuivieUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          utilisateursSuivis: idUser.target.value
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async addComment(e) {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3000/users/commente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          _id: "620caeb3cf2c433f424fb471",
          commentaireText: this.commenttext
        }),
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      console.log(this.message);
      window.location.reload();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async _getData() {
    try {
      let response = await fetch(`http://localhost:3000/public/afficheRessource/` + "620caeb3cf2c433f424fb471", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status == 401) {
        this.message = (await response.json()).message;
      }
      this.afficherRessources = await response.json();
      console.log(this.message);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
  async alldata(event) {
    this.commenttext = (event.target.value);
  }
  render() {
    if (this.afficherRessources) {
      const nbrVue = this.afficherRessources.stats.vuesConnecte + this.afficherRessources.stats.vuesnonConnecte;
      return (h("div", null, h("p", null, "Resumer: ", this.afficherRessources.resume, " ", h("br", null), "- Date de publication: ", this.afficherRessources.datePublication, " ", h("br", null), "- titre: ", this.afficherRessources.titre, " ", h("br", null), "- type: ", this.afficherRessources.type, " ", h("br", null), "- tags: ", this.afficherRessources.tags, " ", h("br", null), "- auteur: ", this.afficherRessources.prenomNomUser, " ", h("br", null), "- PDF:", h("hive-pdf-viewer", { src: "http://localhost:3000/file/" + this.afficherRessources.fileName }), "- stats (nombre de vue): ", nbrVue, " ", h("br", null), "- favoris ressource: ", h("button", { onClick: this.favorisRessource }, "ressourcefavoris"), " ", h("br", null), "- supprimer favoris ressource: ", h("button", { onClick: this.supprimerFavorisRessource }, "suprimer ressourcefavoris"), " ", h("br", null), "- suivre utilisateur : ", h("button", { value: this.afficherRessources.idUser, onClick: idUser => this.suivreUtilisateur(idUser) }, "suivre utilisateur"), " ", h("br", null), "- supprimer suivi utilisateur : ", h("button", { value: this.afficherRessources.idUser, onClick: idUser => this.supprimerSuivreUtilisateur(idUser) }, "supprimer suivi utilisateur"), " ", h("br", null), "- signaler ressource : ", h("button", { onClick: this.signalerRessource }, "signalerRessource"), " ", h("br", null), h("form", { onSubmit: (e) => this.addComment(e) }, h("label", null, "ajouterCommentaire", h("input", { type: "text", name: 'commenttext', onInput: (event) => this.alldata(event) })), h("input", { type: 'submit', value: 'submit' }, " "), " ", h("br", null)), "- commentaires  ", this.afficherRessources.commentaires.map((d, idx) => {
        return (h("li", { key: idx }, "- Prenom, Nom : ", d.prenomNomUser, " ", h("br", null), "- texte: ", d.commentaireText, " ", h("br", null), "- date de publication: ", d.datePublicationComment, " ", h("br", null), "- signaler commentaires : ", h("button", { value: d._id, onClick: commentaireid => this.signalerCommentaires(commentaireid) }, " signalerCommentaires"), " ", h("br", null), " "));
      })), this.vueplus1()));
    }
    if (this.message) {
      return (h("div", null, h("p", null, this.message)));
    }
  }
};

export { affressource as publiq_affressource };
