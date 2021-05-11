import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function NewKegForm(props) {
  const firestore = useFirestore();

  function addKegToFirestore(event) {
    event.preventDefault();
    props.onNewKegCreation();
    return firestore.collection('kegs').add(
      {
        name: event.target.name.value,
        brand: event.target.brand.value,
        price: event.target.price.value,
        alcoholContent: event.target.alcoholContent.value,
        pintCount: 124,
      }
    );
  }

  return (
    <>
      <ReusableForm
        formSubmissionHandler={addKegToFirestore}
        buttonText="Add Keg"
      />
    </>
  );
}

NewKegForm.propTypes = {
  onNewKegCreation: PropTypes.func
};

export default NewKegForm;
