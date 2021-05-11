import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import ReusableForm from './ReusableForm';

function EditKegForm(props) {
  const firestore = useFirestore();
  const { keg } = props;
  function handleEditKegFormSubmission(event) {
    event.preventDefault();
    props.onEditKeg();
    const propertiesToUpdate = {
      name: event.target.name.value,
      brand: event.target.brand.value,
      price: event.target.price.value,
      alcoholContent: event.target.alcoholContent.value,
      pintCount: keg.pintCount,
    }
    return firestore.update({ collection: 'kegs', doc: keg.id }, propertiesToUpdate)
  }
  return (
    <>
      <ReusableForm
        keg={keg}
        formSubmissionHandler={handleEditKegFormSubmission}
        buttonText="Update Details"
      />
    </>
  );
}

EditKegForm.propTypes = {
  keg: PropTypes.object,
  onEditKeg: PropTypes.func
};

export default EditKegForm;
