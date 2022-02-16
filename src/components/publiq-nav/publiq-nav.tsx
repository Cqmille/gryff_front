import { Component, h } from '@stencil/core';

@Component({
    tag:'publiq-nav',
    styleUrl: 'publiq-nav.css',
    shadow: false,
})

export class PubliqNav {
    render(){
        return (
            <header>
                <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary d-flex flex-row">
                    <div class="container-fluid">
                        <a class="navbar-brand abs" href="#">(Re)ssources Relationnelles</a>
                        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse collapse" id="collapseNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Accueil</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Catégories </a>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                                        <li><a class="dropdown-item" href="#">Santé</a></li>
                                        <li><a class="dropdown-item" href="#">Éducation</a></li>
                                        <li><a class="dropdown-item" href="#">Sports</a></li>
                                        <li><a class="dropdown-item" href="#">Associations</a></li>
                                        <li><a class="dropdown-item" href="#">Emploi</a></li>
                                        <li><a class="dropdown-item" href="#">Senior</a></li>
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
                            <ul class="navbar-nav ms-auto">
                            <stencil-route-link url="/connexion">
                                <li class="nav-item">
                                    <a class="nav-link nolink" href="" data-bs-target="#myModal" data-bs-toggle="modal">Connexion</a>
                                </li>
                            </stencil-route-link>
                            <stencil-route-link url="/inscription">				
                                <li class="nav-item">
                                    <a class="nav-link" href="" data-bs-target="#myModal" data-bs-toggle="modal">Inscription</a>
                                </li>
                            </stencil-route-link>	
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}