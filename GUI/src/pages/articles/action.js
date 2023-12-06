import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
  } from '@mui/material';
  import Payment from 'pages/paiement'

const RenderDialog = ({dialogInfo,handleCloseDialog}) => {
      
    let dialogContent;
    switch (dialogInfo.action) {
        case 'Payer':
        dialogContent = (
            <DialogContent>
                <Payment articleId={dialogInfo.articleId}/>
            </DialogContent>
        );
        break;
        case 'Archiver':
        dialogContent = (
            <DialogContent>
            <DialogContentText>
                Vous êtes sur le point d&apos;archiver l&apos;article avec ID: {dialogInfo.articleId}
                {/* Implémenter la logique d'archivage ici. */}
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Annuler</Button>
                <Button onClick={() => { /* implémenter la logique d'archivage ici */ }} color="primary">
                Archiver
                </Button>
            </DialogActions>
            </DialogContent>
        );
        break;
        case 'Supprimer':
        dialogContent = (
            <DialogContent>
            <DialogContentText>
                Êtes-vous sûr de vouloir supprimer l&apos;article avec ID: {dialogInfo.articleId} ?
                {/* Implémenter la logique de suppression ici. */}
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Annuler</Button>
                <Button onClick={() => { /* implémenter la logique de suppression ici */ }} color="primary">
                Supprimer
                </Button>
            </DialogActions>
            </DialogContent>
        );
        break;
        case 'Reviser':
        dialogContent = (
            <DialogContent>
            <DialogContentText>
                Vous pouvez revoir et resoumettre l&apos;article avec ID: {dialogInfo.articleId}
                {/* Implémenter la logique de révision ici. */}
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Annuler</Button>
                <Button onClick={() => { /* implémenter la logique de révision ici */ }} color="primary">
                Reviser
                </Button>
            </DialogActions>
            </DialogContent>
        );
        break;
        default:
        dialogContent = (
            <DialogContent>
            <DialogContentText>Action non reconnue.</DialogContentText>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Fermer</Button>
            </DialogActions>
            </DialogContent>
        );
        break;
    }

    return (
        <Dialog
          open={dialogInfo.open}
          onClose={handleCloseDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>{dialogInfo.action}</DialogTitle>
          {dialogContent}
        </Dialog>
      );
};

export default RenderDialog;