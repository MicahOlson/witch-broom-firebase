import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <h1>The Witch&apos;s Broom</h1>
      <h2>Keg Kollector</h2>
      <p><Link to='/'>Home</Link> | <Link to='/signin'>Sign In</Link></p>
    </>
  )
}

export default Header;
