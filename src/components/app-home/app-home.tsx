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

  render() {
    return (
      <div class='container'>
        {/* <div class='row mx-3'>
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <p>
              <h1 class=''>Accueil</h1>
            </p>
            <button value='sante' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>Santé</button>
            
            <button value='education' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>Education</button>
            
            <button value='sport' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>Sports</button>
            
          </div>        
          <div class="col-sm-2"></div>
        </div>

        <div class='row mx-3 mt-5'>
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <button value='association' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>Associations</button>
            <button value='emploi' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>Emploi</button>
            <button value='senior' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>Sénior</button>
          </div>        
          <div class="col-sm-2"></div>
        </div> */}

        <h1 class='text-center'>Accueil</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
          <div class="col">
            <div class="card h-100 border-primary shadow" >
              <img src="https://img.freepik.com/vecteurs-libre/personnes-patients-dans-illustration-salle-attente-medecins-dessin-anime-plat-femme-homme-personnages-dans-masques-s-asseoir-attendre-rendez-vous-doctorat-interieur-du-hall-hopital-contexte-sante-medicale_213110-393.jpg?size=626&ext=jpg" class="card-img-top h-50" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Santé</h5>
                <p class="card-text"><button value='sante' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>En savoir plus</button></p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-primary shadow">
              <img src="https://img.freepik.com/vecteurs-libre/banniere-typographie-horizontale-education-sertie-illustration-plate-symboles-apprentissage-connaissances_1284-29493.jpg?size=626&ext=jpg&ga=GA1.2.1351852037.1639180800" class="card-img-top h-50" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Education</h5>
                <p class="card-text"><button value='education' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>En savoir plus</button></p>
                </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-primary shadow">
              <img src="https://media.istockphoto.com/vectors/color-sport-background-football-basketball-hockey-box-golf-tennis-vector-id1045895494?k=20&m=1045895494&s=612x612&w=0&h=I3iHYU2aTimd92vg-QWPVgHjrlG8I9lZOOfLfj87ABo=" class="card-img-top h-50" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Sport</h5>
                <p class="card-text"><button value='sport' class = "btn btn-primary border btn-bloc " onClick={(event) => this._getData(event)}>En savoir plus</button></p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-primary shadow">
              <img src="https://www.legiennois.fr/images/2-Le_territoire/participer/6583.jpg" class="card-img-top h-50" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Association</h5>
                <p class="card-text"><button value='association' class = "btn btn-primary" onClick={(event) => this._getData(event)}>En savoir plus</button></p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-primary shadow">
              <img src="https://www.cannes.com/_richText-file/ametys-internal%253Asites/www/ametys-internal%253Acontents/nouvel-article-133/_attribute/content/_data/emploi-recrutement-cannes_326x592.png" class="card-img-top h-50" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Emploi</h5>
                <p class="card-text"><button value='emploi' class = "btn btn-primary border" onClick={(event) => this._getData(event)}>En savoir plus</button></p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-primary shadow">
              <img src="https://i0.wp.com/mcr.asso.fr/stock/lib/2012-2017/vivre-sa-retraite/seniors%20(Vecteurs)/groupe-seniors-dessin.jpg" class="card-img-top h-50" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Sénior</h5>
                <p class="card-text"><button value='senior' class = "btn btn-primary border" onClick={(event) => this._getData(event)}>En savoir plus</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
