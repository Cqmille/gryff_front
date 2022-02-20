import { Component, h,Prop} from '@stencil/core';

@Component({
    tag:'connexion-nav',
    styleUrl: 'publiq-nav.css',
    shadow: false, 
})

export class ConnexionNav {
    @Prop() habilitation: string

    deconnexion(){
        window.document.querySelector('publiq-nav').setAttribute('connected', 'false')
        localStorage.setItem("userId",null);
        localStorage.setItem("token", null);
        localStorage.setItem('habilitation',null)
    }

    render(){
        if(this.habilitation == 'user'){
            return (
                <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> mon compte </a>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                        <li><stencil-route-link url="/monEspace" class="nav-link"><p>Mes ressources</p></stencil-route-link></li>
                        <li><stencil-route-link url="/favorisuser" class="nav-link"><p>mes favoris</p></stencil-route-link></li>
                        <li><stencil-route-link url="/newRessource" class="nav-link"><p>Créer ressource</p></stencil-route-link></li>
                        <li><stencil-route-link url="/profil" class="nav-link"><p>profile</p></stencil-route-link></li>
                        <li><stencil-route-link onClick={() => this.deconnexion()} url="/" class="nav-link"><p>Déconnexion</p></stencil-route-link></li>
                    </ul>
                </li>
                </ul>
            )
        } else if(this.habilitation == 'mod'){
            return(
                <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> mon compte </a>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                        <li><stencil-route-link url="/monEspace2" class="nav-link"><p>Modération</p></stencil-route-link></li>
                        <li><stencil-route-link onClick={() => this.deconnexion()} url="/" class="nav-link"><p>Déconnexion</p></stencil-route-link></li>
                    </ul>
                </li>
                </ul>
            )
        }
    }
}