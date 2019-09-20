// importujemy moduly 
import React, { Component } from 'react';
import styles from './UserForm.css';

// komponent 
class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserSubmit(this.state.name);
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    //  formularz z polem input do wpisywania nazwy uzytkownika
    // do propsa onSubmit podpieta jest metoda handleSubmit, zatwierdza formularz i zmienia stan w App
    //(this.state = {name: ''})  w App to jest stanem 
    render() {
        return (
            <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
                <input
                    className={styles.UserInput}
                    placeholder='Write your name and press enter'
                    onChange={e => this.handleChange(e)}
                    value={this.state.name}
                // w App wartosc z propsu value jest wyswietlany dzieki input
                // this.state.name to puste pole poczatkowo
                // props onchange to props do ktorego podpieta jest metoda handlechange
                // dzieki temu mozemy modyfikowac stan 
                //metoda handleChange odbiera wartosc ktora zostanie wpisana do input, ktory jest podlaczony z eventem
                // ... eventem wpisywania, a nastepnie modyfikuje stan zmieniajac tym samym tekst zawarty w inpucie
                />
            </form>
        );
    }
}

// eksportujemy 
export default UserForm;