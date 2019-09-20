'use strict';
//tworzenie czatu public, importowanie wszystkich modulow
// zaimportowanie react, i modul socket.io, dzieki niemu laczymy server pracujacy w czasie rzeczywistym
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/'); // nawiazanie polaczenie przez arg. (io)  zaimportowanie modulu u gory, => jesli wstawimy id => arg. dla prywatnych wiadomosci
// definiowanie klasy i wyeksportowanie na zewnatrz modulu dla komponentow

// konstruktor dla poczatkowego stanu aplikacji :
class App extends Component {
    constructor(props) {
        super(props); // ?????????????????
        this.state = { users: [], messages: [], text: '', name: '' };
    } // users - komponent UserList // messages => dla komponentu MessagesList,  text => nasza wiadomosc, name => imie ktore zostanie wpisane w czacie 

    // implementacja funkcji nasluchujacej na wiadomosci : zwraca metody messageReceive, i chatUpdate,
    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({ users }) => this.chatUpdate(users));
    }
    // implemetacja funkcji obslugi formularza i wysylania wiadomosci 
    //  metoda odbiera wiadomość, a następnie aktualizuje stan wiadomości.
    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
    }
    //  Skorzystaliśmy tutaj z operatora spread (...), a następnie na podstawie istniejącej już tablicy (this.state.messages) 
    //mamy nowa tablice, z kolejną wiadomościa. Metoda this.setState aktualizuje stan aplikacji, i metode render.

    // metoda wykonuje to samo, co poprzednia, tylko bez modyfikowania danych, tu nie dodajemy jedynie usera do stanu 
    // metoda każdorazowo wysyla tablice z aktualizacja listy uzytkownikow 
    chatUpdate(users) {
        this.setState({ users });
    }

    // Metoda ta wysyla wiadomosci do serwera, Przed wyslaniem, aktualizuje stan aplikacji, i emituje wiadomosc,ktora wyswietli sie uzytkownikom

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
        socket.emit('message', message);
    }

    // Metoda tworzy nowego uzytkownika czatu,i wysyla informacje do serwera, ktory powiadomi uzytkownikow ze dolaczylismy do czata
    handleUserSubmit(name) {
        this.setState({ name });
        socket.emit('join', name);
    }

    render() { // renderowanie zwraca =>  
        return this.state.name !== '' ?  (//(warunek do sprawdzenia) 
            this.renderLayout() 
            ) : this.renderUserForm();  //przypadek prawdziwy i falszywy 
    } // w zaleznosci od tego jaka wartosc przechowuje this.state.name to taka renderuje aplikacje, lub jesli nie ma zadnego imienia wpisanego w '' 
    // zwroci UserForm zeby mozna bylo jeszcze raz wpisac swoje imie 


    // za renderowanie odpowiadaja metody renderLayout, i renderUserForm,
    // implementacja dla utworzenia formularza 
    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
           </div>
                    <div className={styles.AppRoom}>
                        App room
           </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.state.users} // props users zawiera dane na temat uzytkownikow, ich wyswietleniem zajmuje sie userList
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.state.messages} // przyjmuje liste wiadomosci message
                        />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            // dwa propsy : onMessageSubmit — metoda która ma zostać wywołana po zatwierdzeniu wiadomości. 
                            // W tym miejscu od razu przypisujemy wywolanie (jeszcze nie stworzonej) metody handleMessageSubmit, ktora przyjmuje wiadomosc, ktora trzeba wysłac
                            //name — props trzyma informacje na temat nazwy użytkownika, ktory wysyla wiadomosc
                            name={this.state.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // druga implementacja : wyswietlanie formularza uzytkownika : 
    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />);
        // Komponent UserForm => zwraca props onUserSubmit, który ma za zadanie obsłużyć potwierdzenie wejścia użytkownika do czatu.
        // oraz przekazujemy handleUserSubmit, nie zaimplementowanej metody jeszcze, ktora przyjmuje imie uzytkownika ktora zostanie wpisana
    }
};

export default hot(module)(App); // App opakowane jest w funkcje hot => react-hot-loader 