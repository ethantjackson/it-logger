import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearCurrent, updateLog } from '../../actions/LogActions';
import M from 'materialize-css/dist/js/materialize.min.js';

import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ current, clearCurrent, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '')
      M.toast({ html: 'Please enter a message and select a technician...' });
    else {
      updateLog({
        message: message,
        attention: attention,
        tech: tech,
        date: new Date(),
        id: current.id,
      });

      M.toast({ html: `Log updated by ${tech}` });

      setMessage('');
      setAttention(false);
      setTech('');
      clearCurrent();
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => {
                setTech(e.target.value);
              }}
            >
              {' '}
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(e.target.checked)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  clearCurrent: PropTypes.func.isRequired,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

const modalStyle = {
  height: '75%',
  width: '75%',
};

export default connect(mapStateToProps, { clearCurrent, updateLog })(
  EditLogModal
);
