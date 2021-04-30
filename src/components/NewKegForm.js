import React from 'react';
import ReusableForm from './ReusableForm';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';

function NewKegForm(props) {
  function handleNewKegFormSubmission(event) {
    event.preventDefault();
    props.onNewKegCreation({
      name: event.target.name.value,
      brand: event.target.brand.value,
      price: event.target.price.value,
      alcoholContent: event.target.alcoholContent.value,
      pintCount: 124,
      id: v4()
    });
  }
  return (
    <>
      <ReusableForm
        formSubmissionHandler={handleNewKegFormSubmission}
        buttonText="Add Keg"
      />
    </>
  );
}

NewKegForm.propTypes = {
  onNewKegCreation: PropTypes.func
};

export default NewKegForm;
