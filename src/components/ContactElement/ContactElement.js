import React from 'react';
import PropTypes from 'prop-types';
// Styles
import styles from './ContactElement.module.css';

const ContactElement = ({ contact, onDeleteContact }) => (
  <div className={`${styles.contactElement} container shadow`}>
    <span>
      {contact.name}: {contact.number}
    </span>
    <button
      onClick={() => onDeleteContact(contact.id)}
      className={styles.deleteBtn}
      type="button"
    >
      ✕
    </button>
  </div>
);

ContactElement.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactElement;
