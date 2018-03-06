export class Favorite {
    idFavorite: number;
	idUsers: number;
    idUserFavorite: number;
    status: string;
    constructor(idUserFavorite, idUsers, status) {
        this.idUserFavorite = idUserFavorite;
        this.idUsers = idUsers;
        this.status = status;
    }
}