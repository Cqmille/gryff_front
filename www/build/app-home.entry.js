import { r as registerInstance, h } from './index-25b9a15f.js';

const appHomeCss = ".card{max-height:15.5rem;box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;cursor:pointer}img{object-fit:cover}.card:hover{transition-duration:500ms;transform:scale(1.05);box-shadow:0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)}.card h3{font-weight:600}";

let AppHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async _getData(event) {
    this.history.push(`/tags-ressources/${event.target.value}`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
  }
  async _getDataCard(string) {
    switch (string) {
      case 'senior':
        this.history.push(`/tags-ressources/senior`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
        break;
      case 'sante':
        this.history.push(`/tags-ressources/sante`, {});
        break;
      case 'education':
        this.history.push(`/tags-ressources/education`, {});
        break;
      case 'sport':
        this.history.push(`/tags-ressources/sport`, {});
        break;
      case 'association':
        this.history.push(`/tags-ressources/association`, {});
        break;
      case 'emploi':
        this.history.push(`/tags-ressources/emploi`, {});
        break;
    }
  }
  render() {
    return (h("div", { class: 'container' }, h("h1", { class: 'text-center' }, "Accueil"), h("div", { class: "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2 mb-5" }, h("div", { class: "col" }, h("div", { id: 'sante', class: "card h-100 border-primary  ", onClick: () => this._getDataCard('sante') }, h("img", { src: "https://img.freepik.com/vecteurs-libre/personnes-patients-dans-illustration-salle-attente-medecins-dessin-anime-plat-femme-homme-personnages-dans-masques-s-asseoir-attendre-rendez-vous-doctorat-interieur-du-hall-hopital-contexte-sante-medicale_213110-393.jpg?size=626&ext=jpg", class: "card-img-top h-75", alt: "..." }), h("div", { class: "card-body" }, h("h3", { class: "card-title text-center text-primary" }, "Sant\u00E9")))), h("div", { class: "col" }, h("div", { id: 'education', class: "card h-100 border-primary  ", onClick: () => this._getDataCard('education') }, h("img", { src: "https://media.istockphoto.com/vectors/young-people-group-reading-books-study-learning-knowledge-and-vector-vector-id1207872886?k=20&m=1207872886&s=612x612&w=0&h=ofiu2dykMZGean-wJcFZqu4W4bi0yLgcosOYtOQaJUQ=", class: "card-img-top h-75", alt: "..." }), h("div", { class: "card-body" }, h("h3", { class: "card-title text-center text-primary" }, "\u00C9ducation")))), h("div", { class: "col" }, h("div", { id: 'sport', class: "card h-100 border-primary  ", onClick: () => this._getDataCard('sport') }, h("img", { src: "https://image.freepik.com/vecteurs-libre/concept-salle-sport-illustration-design-plat-personnages-personnes-pour-page-destination_9209-4916.jpg", class: "card-img-top h-75", alt: "..." }), h("div", { class: "card-body" }, h("h3", { class: "card-title text-center text-primary" }, "Sport")))), h("div", { class: "col" }, h("div", { id: 'association', class: "card h-100 border-primary  ", onClick: () => this._getDataCard('association') }, h("img", { src: "https://www.legiennois.fr/images/2-Le_territoire/participer/6583.jpg", class: "card-img-top h-75", alt: "..." }), h("div", { class: "card-body" }, h("h3", { class: "card-title text-center text-primary" }, "Association")))), h("div", { class: "col" }, h("div", { id: 'emploi', class: "card h-100 border-primary  ", onClick: () => this._getDataCard('emploi') }, h("img", { src: "https://www.cannes.com/_richText-file/ametys-internal%253Asites/www/ametys-internal%253Acontents/nouvel-article-133/_attribute/content/_data/emploi-recrutement-cannes_326x592.png", class: "card-img-top h-75", alt: "..." }), h("div", { class: "card-body" }, h("h3", { class: "card-title text-center text-primary" }, "Emploi")))), h("div", { class: "col" }, h("div", { id: 'senior', class: "card h-100 border-primary  ", onClick: () => this._getDataCard('senior') }, h("img", { src: "https://us.123rf.com/450wm/aleutie/aleutie1704/aleutie170400042/76929562-divers-groupe-de-personnes-%C3%A2g%C3%A9es-actives-dansant-une-ligne-de-conga-eps-8-illustration-vectorielle-p.jpg?ver=6", class: "card-img-top h-75", alt: "..." }), h("div", { class: "card-body" }, h("h3", { class: "card-title text-center text-primary" }, "S\u00E9nior")))))));
  }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };
