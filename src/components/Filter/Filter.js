import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChangeFilter }) => (
  <div className="container shadow">
    <p>Find contacts by name:</p>
    <input
      name="filter"
      value={value}
      onChange={onChangeFilter}
      placeholder="Type here to search..."
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
