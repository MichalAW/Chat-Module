'use strict'
// moduly :
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersService = require('./UsersService');
const app = express();
const server = http.createServer(app);
// dodaje modul userservice + instacje klasy UsersSerive
const io = socketIo(server);

const usersService = new UsersService();
// tworzenie aplikacji => tworzenie serweru http i podpinanie socketu.io: 
// serwowane pliki => public
app.use(express.static(`${__dirname}/public`));

//konfiguracja routingunasluchujacego '/' ktory w odp. wysyla plik index.html
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
// funkcja ktora nasluchuje na podlaczenie nowego uzytkownika do czatu
// jesli polaczenie nastapi nastapi callback dla ( drugi arg. metody => .on(socket))
// funkcja rejestruje zdarzenie ktora w odpowiedzi klient moze zobaczyc 
//arg socket = to nowa osoba na czacie
io.on('connection', (socket) => {
    //  wewnatrz funkcji tworzymy funkcje na rozne zdarzenia : 
    // nasluchiwanie klienta na wiadomosc wejscia do czatu 
    socket.on('join', (name) => {
        //zapisanie nowego uzytkownika do listy czatowej 
        usersService.addUser({
            id: socket.id,
            name
        });
        //aktualizacja czata dla wszystkich uzytkownikow, po wyjsciu jednego uzytkownika z czata
        io.emit('update', { // klasa emit => tworzenie wlasnych zdarzen i przypisywanie akcji ktore wykonaja sie gdy akcja sie pojawia , nie rejestruje callbackow,moze byc if/else + funkcja wewnatrz jednej funkcji, jesli nie odnajdzie zdarzenie to przeskakuje na kolejne
            // CALLBACK - przekazywanie innej funkcji jako argument do drugiej funkcji , jest to funkcja wyzszego rzedu
            users: usersService.getAllUsers()
        });
    });
    // utrata polaczenia z klientem => zamkniecie czata 
    //funkcja disconnect => usuwa uzytkownika z listy,i informacja wedruje do poprzedniej funkcji uptdate, ktora odswieza liste.
    socket.on('disconnect', () => {
        usersService.removeUser(socket.id);
        socket.broadcast.emit('update', { // metoda socket pozwala na wysylanie info od uzytkownika,i na calego czata 
            users: usersService.getAllUsers()
        });
    });
    //wysylanie wiadomosci : 
    // socket => arg. => uzytkownik 
    socket.on('message', (message) => {
        const {name} = usersService.getUserById(socket.id); //wyszukuje uzytkownika chcacego wyslac wiadomosc po id
        socket.broadcast.emit('message', {
            text: message.text,  // wysylanie tekstu from => nazwa uzytkownika 
            from: name // wyszukiwanie imienia uzytkownika przez destrukturyzacje (const {name} = …), 
        });
    });
});

//nasluchiwanie
server.listen(3000, () => {
    console.log('listening on *:3000');
});