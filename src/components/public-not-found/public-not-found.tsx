import { Component, h } from '@stencil/core';

@Component({
    tag:'public-not-found',
    styleUrl: 'public-not-found.css',
    shadow: false,
})

export class PublicNotFound {
    render(){
        return (
            <div class="erreur text-center">
                <p>Erreur 404</p>
                <p>Ressource non trouvée</p>
            </div>
        )
    }
}