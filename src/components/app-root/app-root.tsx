import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <div>
        <publiq-nav></publiq-nav>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" />
              <stencil-route url="/connexion" component="user-connexion" />
              <stencil-route url="/monEspace" component="user-monespace" />

              <stencil-route component="public-not-found" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <publiq-footer></publiq-footer>
      </div>
    );
  }
}
