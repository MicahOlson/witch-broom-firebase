import React from 'react';
import firebase from 'firebase/app';

function Signin() {
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function () {
        document.querySelector("#sign-up-message").innerHTML = "You have successfully signed up and signed in.";
      }).catch(function (error) {
        document.querySelector("#sign-up-message").innerHTML = error;
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        document.querySelector("#sign-in-message").innerHTML = "You have successfully signed in.";
      }).catch(function (error) {
        document.querySelector("#sign-in-message").innerHTML = error;
      });
  }

  function doSignOut() {
    firebase.auth().signOut()
      .then(function () {
        document.querySelector("#sign-out-message").innerHTML = "You have successfully signed out.";
      }).catch(function (error) {
        document.querySelector("#sign-out-message").innerHTML = error;
      });
  }


  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='Email'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Sign up</button>
      </form>
      <p id="sign-up-message"></p>
      <hr />
      <h1>Sign in</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='Email'
        />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password'
        />
        <button type='submit'>Sign in</button>
      </form>
      <p id="sign-in-message"></p>
      <hr />
      <h1>Sign out</h1>
      <button onClick={doSignOut}>Sign out</button>
      <p id="sign-out-message"></p>
    </>
  );
}

export default Signin;
