import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
  return (
    <>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          placeholder='Beer name'
        />
         <input
          type='text'
          name='brand'
          placeholder='Brewer'
        />
        <input
          type='text'
          name='price'
          placeholder='Price'
        />
        <input
          type='text'
          name='alcoholContent'
          placeholder='ABV'
        />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;
