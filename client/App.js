import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import styles from './App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], messages: [], text: '', name: ''};
    }
    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
        // <warunek_do_sprawdzenia> ? <przypadek_true> : <przypadek_false>
    }
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
                    users={this.state.users}
                />
                <div className={styles.MessageWrapper}>
                    <MessageList
                    messages={this.state.messages}
                    />
                    <MessageForm
                    onMessageSubmit={message => this.handleMessageSubmit(message)}
                    name={this.state.name}
                    />
                </div>
                </div>
            </div>
        );
    }
    renderUserForm() {
        return (
            <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />
        )
    }
};

export default hot(module)(App);