import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
  const { keg } = props;
  let name;
  let brand;
  let price;
  let alcoholContent;

  if (keg) {
    name = keg.name;
    brand = keg.brand;
    price = keg.price;
    alcoholContent = keg.alcoholContent;
  }

  return (
    <>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          defaultValue={name}
          placeholder='Beer name'
          />
         <input
          type='text'
          name='brand'
          defaultValue={brand}
          placeholder='Brewer'
          />
        <input
          type='text'
          name='price'
          defaultValue={price}
          placeholder='Price'
          />
        <input
          type='text'
          name='alcoholContent'
          defaultValue={alcoholContent}
          placeholder='ABV'
        />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </>
  );
}

ReusableForm.propTypes = {
  keg: PropTypes.object,
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;
