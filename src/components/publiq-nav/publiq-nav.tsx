import { Component, h,Prop, Watch } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import {PATH} from '../../utils/path.js';
@Component({
    tag:'publiq-nav',
    styleUrl: 'publiq-nav.css',
    shadow: false,
    
})

export class PubliqNav {
    @Prop() history: RouterHistory;
    @Prop() test: string = 'testProps'
    @Prop() connected: boolean = false;

    async checkConnexion(){
        let response = await fetch(PATH.back+'/users/testAuth',{
            method:'POST',
            headers: {
                authorization: localStorage.getItem('token'),
                userid: localStorage.getItem('userId')
            }
        });
        if(response.status == 201){
            this.connected = true
        }
    }

    async componentWillLoad(){
        this.checkConnexion()
    }

    async _getData(event){
            this.history.push(`/tags-ressources/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
    }
    render(){
        return (
            <header>
                <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary d-flex flex-row">
                    <div class="container-fluid">
                    <stencil-route-link url="/" class="navbar-brand abs">(Re)ssources Relationnelles</stencil-route-link>
                        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse collapse" id="collapseNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                <stencil-route-link url="/" class="nav-link">Accueil</stencil-route-link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Catégories </a>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                                        <li><stencil-route-link class="dropdown-item" url="/tags-ressources/sante"><p>Santé</p></stencil-route-link></li>
                                        <li><stencil-route-link class="dropdown-item" url="/tags-ressources/education"><p>Éducation</p></stencil-route-link></li>
                                        <li><stencil-route-link class="dropdown-item" url="/tags-ressources/sport"><p>Sports</p></stencil-route-link></li>
                                        <li><stencil-route-link class="dropdown-item" url="/tags-ressources/association"><p>Associations</p></stencil-route-link></li>
                                        <li><stencil-route-link class="dropdown-item" url="/tags-ressources/emploi"><p>Emploi</p></stencil-route-link></li>
                                        <li><stencil-route-link class="dropdown-item" url="/tags-ressources/senior"><p>Sénior</p></stencil-route-link></li>
                                        <li>
                                            <hr class="dropdown-divider"></hr>
                                        </li>
                                        <li><a class="dropdown-item">Au hasard</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Rechercher</a>
                                </li>
                            </ul>
                            {this.connected?
                                <ul class="navbar-nav ms-auto">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> mon compte </a>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                                        <li><stencil-route-link url="/monEspace" class="nav-link">mes ressources</stencil-route-link></li>
                                        <li><stencil-route-link url="/newRessource" class="nav-link">créer ressource</stencil-route-link></li>
                                    </ul>
                                </li>
                                </ul>

                                :<ul class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <stencil-route-link url="/connexion" class="nav-link">Connexion</stencil-route-link>	
                                    </li> 
                                    <li class="nav-item">
                                        <stencil-route-link url="/inscription" class="nav-link">Inscription</stencil-route-link>	
                                    </li>
                                </ul>}
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}