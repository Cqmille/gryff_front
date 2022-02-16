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
    @Prop() connected: boolean;

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
                    <stencil-route-link url="/"><a class="navbar-brand abs" href="#">(Re)ssources Relationnelles</a></stencil-route-link>
                        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse collapse" id="collapseNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                <stencil-route-link url="/"><a class="nav-link" href="#">Accueil</a></stencil-route-link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Catégories </a>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                                        <li><stencil-route-link url="/tags-ressources/sante"><a class="dropdown-item" >Santé</a></stencil-route-link></li>
                                        <li><stencil-route-link url="/tags-ressources/education"><a class="dropdown-item" >Éducation</a></stencil-route-link></li>
                                        <li><stencil-route-link url="/tags-ressources/sport"><a class="dropdown-item" >Sports</a></stencil-route-link></li>
                                        <li><stencil-route-link url="/tags-ressources/association"><a class="dropdown-item" >Associations</a></stencil-route-link></li>
                                        <li><stencil-route-link url="/tags-ressources/emploi"><a class="dropdown-item" >Emploi</a></stencil-route-link></li>
                                        <li><stencil-route-link url="/tags-ressources/senior"><a class="dropdown-item" >Sénior</a></stencil-route-link></li>
                                        <li>
                                            <hr class="dropdown-divider"></hr>
                                        </li>
                                        <li><a class="dropdown-item" href="#">Au hasard</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Rechercher</a>
                                </li>
                            </ul>
                            {this.connected?
                                <ul class="navbar-nav ms-auto">
                                    <stencil-route-link url="/monEspace">
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-target="#myModal" data-bs-toggle="modal">Mon espace</a>
                                    </li>
                                </stencil-route-link>
                                </ul>

                                :<ul class="navbar-nav ms-auto">
                                <stencil-route-link url="/connexion">
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-target="#myModal" data-bs-toggle="modal">Connexion</a>
                                    </li>
                                </stencil-route-link>
                                <stencil-route-link url="/inscription">				
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-target="#myModal" data-bs-toggle="modal">Inscription</a>
                                    </li>
                                </stencil-route-link>	
                                </ul>}
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}