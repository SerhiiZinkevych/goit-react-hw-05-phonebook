// Core
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';
// Components
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
// Styles
import styles from './App.module.css';
// Transitions
import slideFromRightTransition from '../../transitions/slideFromRight.module.css';
import slideFromLeftTransition from '../../transitions/slideFromLeft.module.css';
import popTransition from '../../transitions/pop.module.css';

import 'normalize.css';

const filterContacts = (contacts, filter) =>
  contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    message: '',
    showMessage: false,
  };

  componentDidMount() {
    const fromLS = JSON.parse(localStorage.getItem('contacts'));
    if (fromLS) {
      this.setState({ contacts: fromLS });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  onDeleteContact = (id) => {
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter((contact) => contact.id !== id),
    });
  };

  onFormSubmit = (formData) => {
    const { contacts } = this.state;

    const contactToAdd = {
      id: uuidv4(),
      name: formData.name,
      number: formData.number,
    };

    if (contacts.find((contact) => contact.name === contactToAdd.name)) {
      this.setState({ showMessage: true, message: 'Contact already exists!' });
      setTimeout(() => {
        this.setState({ showMessage: false });
      }, 2000);
      return;
    }

    this.setState({
      contacts: [...contacts, contactToAdd],
    });
  };

  render() {
    const { contacts, filter, message, showMessage } = this.state;

    const filteredContacts = filterContacts(contacts, filter);
    return (
      <div className="container">
        <CSSTransition
          in={showMessage}
          timeout={200}
          classNames={slideFromRightTransition}
          unmountOnExit
        >
          <Notification message={message} />
        </CSSTransition>

        <CSSTransition
          in
          appear
          timeout={1000}
          classNames={slideFromLeftTransition}
        >
          <h1 className={styles.title}>Phonebook</h1>
        </CSSTransition>

        <ContactForm onFormSubmit={this.onFormSubmit} />

        <CSSTransition
          in={contacts.length > 1}
          timeout={200}
          classNames={popTransition}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
