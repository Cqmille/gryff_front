import { Component, h,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @Prop() history: RouterHistory;

  async _getData(event){
        this.history.push(`/tags-ressources/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}
async _getDataCard(string){
  switch(string){
    case 'senior':
      this.history.push(`/tags-ressources/senior`, {});  // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
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
    return (
      <div class='container'>
        <h1 class='text-center'>Accueil</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2 mb-5">
          <div class="col">
            <div id='sante' class="card h-100 border-primary  " onClick={() => this._getDataCard('sante')}>
              <img src="https://img.freepik.com/vecteurs-libre/personnes-patients-dans-illustration-salle-attente-medecins-dessin-anime-plat-femme-homme-personnages-dans-masques-s-asseoir-attendre-rendez-vous-doctorat-interieur-du-hall-hopital-contexte-sante-medicale_213110-393.jpg?size=626&ext=jpg" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Santé</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='education' class="card h-100 border-primary  " onClick={() => this._getDataCard('education')}>
              <img src="https://media.istockphoto.com/vectors/young-people-group-reading-books-study-learning-knowledge-and-vector-vector-id1207872886?k=20&m=1207872886&s=612x612&w=0&h=ofiu2dykMZGean-wJcFZqu4W4bi0yLgcosOYtOQaJUQ=" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Éducation</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='sport' class="card h-100 border-primary  " onClick={() => this._getDataCard('sport')}>
              <img src="https://image.freepik.com/vecteurs-libre/concept-salle-sport-illustration-design-plat-personnages-personnes-pour-page-destination_9209-4916.jpg" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Sport</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='association' class="card h-100 border-primary  " onClick={() => this._getDataCard('association')}>
              <img src="https://www.legiennois.fr/images/2-Le_territoire/participer/6583.jpg" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Association</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='emploi' class="card h-100 border-primary  " onClick={() => this._getDataCard('emploi')}>
              <img src="https://www.cannes.com/_richText-file/ametys-internal%253Asites/www/ametys-internal%253Acontents/nouvel-article-133/_attribute/content/_data/emploi-recrutement-cannes_326x592.png" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Emploi</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='senior' class="card h-100 border-primary  " onClick={() => this._getDataCard('senior')}>
              <img src="https://us.123rf.com/450wm/aleutie/aleutie1704/aleutie170400042/76929562-divers-groupe-de-personnes-%C3%A2g%C3%A9es-actives-dansant-une-ligne-de-conga-eps-8-illustration-vectorielle-p.jpg?ver=6" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Sénior</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
