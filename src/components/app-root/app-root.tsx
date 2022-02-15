import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <body>
        <header>
          <publiq-nav></publiq-nav>
        </header>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" />
              <stencil-route url="/connexion" component="user-connexion" />
              <stencil-route url="/monEspace" component="user-monespace" />
              <stencil-route url="/newRessource" component="user-creationressource" />
              <stencil-route url="/afficherRessource" component="publiq-affressource" />
              <stencil-route component="public-not-found" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </body>
    );
  }
}
