import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WitchBroomHeader = styled.h1`
  font-size: 36px;
  text-align: center;
  color: green;
  text-shadow: 1px 1px gray;
  margin-bottom: 0px;
`

const WitchBroomSubheader = styled.h2`
  text-align: center;
  text-shadow: 1px 1px gray;
  margin-top: 0px;
  margin-bottom: 100px;
`

function Header() {
  return (
    <>
      <WitchBroomHeader>
        The Witch&apos;s Broom
      </WitchBroomHeader> 
      <WitchBroomSubheader>
        Keg Kollector
      </WitchBroomSubheader>
      <p><Link to='/'>Home</Link> | <Link to='/signin'>Sign In</Link></p>
    </>
  )
}

export default Header;
