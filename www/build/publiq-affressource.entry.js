import { r as registerInstance, h } from './index-25b9a15f.js';

const publiqAffressourceCss = ".pdf-frame{Width:100%;height:700px;box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;border-radius:6px}.addtxt{padding-top:10px;padding-bottom:10px;text-align:center;font-size:13px;background-color:#e5e8ed}.date{font-size:13px;font-weight:500;margin-right:4px;color:#828386;}.bouton1{width:40px;height:40px}.nostyle{border:none;background-color:transparent}.icone{opacity:35%}.icone:hover{opacity:80%;cursor:pointer}.btncomment{padding-top:10px;padding-bottom:10px;text-align:center;font-size:13px;color:#56575b;background-color:white;border-radius:6px;box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px}.bloc-description{background-color:white;border-radius:6px;box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px}.bloc-commentaire{width:100%;background-color:white;border-radius:6px;box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px}.titre{font-size:24px;color:#56575b}.nom-user{font-size:17px;font-weight:500;color:#56575b}.description{font-size:15px;font-weight:500;color:#56575b}.text2{font-size:13px;font-weight:500;margin-left:6px;color:#56575b}.text3o{color:#00a5f4}.text4{font-size:13px;font-weight:500;color:#828386}.text4i{color:#00a5f4}.text4o{color:white}.thumbup{font-size:13px;font-weight:500;margin-right:5px}.thumbupo{color:#17a2b8}.nopadding{padding:0 !important;margin:0 !important}.circle{border-radius:50%;box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px}";

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
          ressourceid: this.match.params.id
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
  async signalerRessource(idRessource) {
    try {
      let response = await fetch(`http://localhost:3000/users/signalerUneRessource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: idRessource.target.value
        }),
      });
      console.log(response);
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
  async favorisRessource(idRessource) {
    try {
      let response = await fetch(`http://localhost:3000/users/favorisRessource/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: idRessource.target.value
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
  async supprimerFavorisRessource(idRessource) {
    try {
      let response = await fetch(`http://localhost:3000/users/supprimerFavorisRessource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
          userid: localStorage.getItem('userId')
        },
        body: JSON.stringify({
          ressourceid: idRessource.target.value
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
          _id: this.match.params.id,
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
      let response = await fetch(`http://localhost:3000/public/afficheRessource/` + this.match.params.id, {
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
  async gotoprofile(event) {
    this.history.push(`/profilSuivi/${event.target.value}`, {});
  }
  render() {
    if (this.afficherRessources) {
      const nbrVue = this.afficherRessources.stats.vuesConnecte + this.afficherRessources.stats.vuesnonConnecte;
      return (h("div", null, h("div", { class: "container pb-3" }, h("hive-pdf-viewer", { class: "mx-auto pdf-frame ", src: "http://localhost:3000/file/" + this.afficherRessources.fileName })), h("div", { class: "container bottom-page-ressource pb-2" }, h("div", { class: "row" }, h("div", { class: "col-sm-6" }, h("div", { class: "bloc-commentaire pb-2 mb-3" }, h("div", { class: "d-flex justify-content-center pt-3 mx-3" }, h("p", { class: "titre" }, this.afficherRessources.titre)), h("div", { class: "d-flex justify-content-end align-items-start nom-user" }, h("div", null, h("p", null, "de ", this.afficherRessources.prenomNomUser)), h("div", { class: "nostyle mx-1" }, h("img", { class: "icone", src: "/bootstrap-files/person-fill.svg", width: "25", height: "25" }))), h("div", { class: "d-flex justify-content-end mb-3" }, h("div", { class: "nostyle mx-2" }, h("img", { class: "icone", src: "/bootstrap-files/heart.svg", width: "35", height: "35" })), h("div", { hidden: true, class: "nostyle mx-2" }, h("img", { class: "icone", src: "/bootstrap-files/heart-fill.svg", width: "35", height: "35" })), h("div", { class: "nostyle mx-2" }, h("img", { class: "icone", src: "/bootstrap-files/download.svg", width: "35", height: "35" }))), h("div", { class: "d-flex justify-content-center text-center description mx-2" }, h("i", null, this.afficherRessources.resume)))), h("div", { class: "col-sm-6" }, this.afficherRessources.commentaires.map((d, idx) => {
        return (h("div", { class: "pb-2 commentaire" }, h("div", { class: "bloc-commentaire py-1 px-2" }, " ", h("span", { class: "text1" }, d.commentaireText), h("div", { class: "d-flex justify-content-between align-items-center pt-2" }, h("div", { class: "d-flex" }, h("div", null, h("i", { class: "text2" }, d.prenomNomUser, " ")), h("div", null, h("i", { class: "date " }, ", le ", d.datePublicationComment.substr(0, 10)))), h("button", { class: "nostyle align-middle", value: d._id, onClick: commentaireid => this.signalerCommentaires(commentaireid) }, h("img", { class: "icone", src: "/bootstrap-files/exclamation-diamond.svg", width: "18", height: "18" }))))));
      })))), h("style", null, ".hidden", this.vueplus1())));
    }
    if (this.message) {
      return (h("div", null, h("p", null, this.message)));
    }
  }
};
affressource.style = publiqAffressourceCss;

export { affressource as publiq_affressource };
