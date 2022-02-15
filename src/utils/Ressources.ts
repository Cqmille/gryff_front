export interface Ressources {
    _id: string,
    type:string,
    etatRessource: string,
    titre: string,
    resume:string,
    idUser:string,
    prenomNomUser: string,
    datePublication: string, 
    dateValidation: string,
    dateModif: string,
    tags: string,
    commentaires: [{
        IdUser: string,
        prenomNomUser: string,
        datePublicationComment: string,
        nbrSignalementCom: number,
        commentaireText: string,
        _id: string
    }],
    stats: {
        vuesnonConnecte: number,
        vuesConnecte: number,
        suivis: number
    },
    signalement: {
        nbrSignalementRess: number
    }
}