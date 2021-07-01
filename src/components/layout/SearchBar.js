import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs } from '../../actions/LogActions';

const SearchBar = ({ searchLogs }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    searchLogs(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchLogs(text);
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search Logs...'
              value={text}
              onChange={(e) => handleChange(e)}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i
              className='material-icons'
              onClick={() => {
                setText('');
                searchLogs('');
              }}
            >
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs })(SearchBar);
