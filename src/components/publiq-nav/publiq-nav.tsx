import { Component, h } from '@stencil/core';

@Component({
    tag:'publiq-nav',
    shadow: false,
})

export class PubliqNav {
    render(){
        return (
            <div>
                <stencil-route-link url="/">
                    <button type="button" class="btn btn-primary">accueil</button>
                </stencil-route-link>
                <stencil-route-link url="/connexion">
                    <button type="button" class="btn btn-primary">connexion</button>
                </stencil-route-link>
            </div>
        )
    }
}