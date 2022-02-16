import { Component, h,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @Prop() history: RouterHistory;

  async _getData(event){
        this.history.push(`/tags-ressources/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}

  render() {
    return (
      <div class="app-home">
        <p>
          <h1>Accueil</h1>
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
        <button value='sante' onClick={(event) => this._getData(event)}>Santé</button>
        <br></br>
        <button value='education' onClick={(event) => this._getData(event)}>Education</button>
        <br></br>
        <button value='sport' onClick={(event) => this._getData(event)}>Sports</button>
        <br></br>
        <button value='association' onClick={(event) => this._getData(event)}>Associations</button>
        <br></br>
        <button value='emploi' onClick={(event) => this._getData(event)}>Emploi</button>
        <br></br>
        <button value='senior' onClick={(event) => this._getData(event)}>Sénior</button>
        <br></br>
        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
