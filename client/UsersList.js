import React from 'react';
import styles from './UsersList.css';
// wyswietlanie listy uzytkownikow 
// kompon. reprezentacyjne nie maja metody render, sa to funkcje, ktore przyjmuja propsy

const UsersList = props => (
    <div className={styles.Users}>
        <div className={styles.UsersOnline}>
            {props.users.length} people online
    </div>
        <ul className={styles.UsersList}>
            {
                // lista uzytkownikow user to tablica, wiec zamieniamy na komponenty uzywajac metody .map 
                props.users.map((user) => {
                    return ( // key iteruje po liscie uzytkownikow 
                        <li key={user.id} className={styles.UserItem}>
                            {user.name}
                        </li>
                    );
                })
            }
        </ul>
    </div>
);


export default UsersList;