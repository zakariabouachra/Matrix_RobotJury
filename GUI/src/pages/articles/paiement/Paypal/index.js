import PayPalConsent from './PayPalConsent';

function PaymentMethodManagement({articleId,prix, handleCloseDialog } ) {
 

  return (
    <PayPalConsent articleId={articleId} prix={prix} handleCloseDialog={handleCloseDialog}/>
  );
}

export default PaymentMethodManagement;
