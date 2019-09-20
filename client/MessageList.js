import React from 'react';
import styles from './MessageList.css';

// komponent => wyswietlanie wiadomosci : 

const Message = props => (
    <div className={styles.Message}>
        <strong>{props.from} :</strong>
        <span>{props.text}</span>
    </div>
);

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message
                        key={i}
                        from={message.from}
                        text={message.text}
                    />
                );
            })
        }
    </div>
);

export default MessageList;

// W tym miejscu mapujemy po liście wiadomości, 
// korzystając przy tym z komponentu Message (którego jeszcze nie opisaliśmy), 
// a który przyjmuje dwa propsy (poza propsem key): from i text. 
// Jest to również komponent prezentacyjny. 
// komponenty App, UserForm, MessageForm to komponenty-kontenery, 
// które posiadają swój wewnętrzny stan, 
// dlatego są one klasami. UsersList, MessageList to komponenty prezentacyjne