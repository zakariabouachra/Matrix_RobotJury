import React  from 'react';
import RecupTel from './recupTelephone';
import RecupTelVerified from './recupTelVerfied';

function RecupTelIndex() {
  //const [hasVerifiedNumber, setHasVerifiedNumber] = useState(false);

 
  const isNumberVerified =  true;

  //if (isNumberVerified) {
    //setHasVerifiedNumber(true);
  //}

  return (
    <>
      {isNumberVerified ? <RecupTelVerified /> : <RecupTel />}
    </>
  );
}

export default RecupTelIndex;
