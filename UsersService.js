'use strict';
// klasa ktora zarzadza uzytkownikami korzystajacymi z czatu => konstruktor z iniciacja tablicy : 
// zawiera 4 metody 
class UsersService {
	constructor() {
		this.users = []; //pusta tabl.
	}

	getAllUsers() {
		return this.users; // zwracanie tablicy uzytkownikow
	}

	getUserById(userId) {
		return this.users.find(user => user.id === userId);
	// wyszukanie uzytkownika po ID
	//metoda .finc => wykorzystuje arrow function, wyszukuje identyczne id do wskazanego w argumencie metody - userID
	}

	addUser(user) { // metoda ktora dodaje nowego uzytkownika do listy
		this.users = [user, ...this.users];
	}

	removeUser(userId) { // usuwa przy pomocy array.prototype.filter, odfiltrowuje id ktore nie znajduje sie juz na liscie przez id ktore musi byc wskazane w argumencie metody
		this.users = this.users.filter(user => user.id !== userId);
	}
}
module.exports = UsersService;