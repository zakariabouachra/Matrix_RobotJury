import React  from 'react';
import RecupEmail from './recupEmail';
import RecupEmailVerified from './recupEmailVerified';

function RecupTelIndex() {

  const isEmailVerified =  true;
  return (
    <>
      {isEmailVerified ? <RecupEmailVerified /> : <RecupEmail />}
    </>
  );
}

export default RecupTelIndex;
