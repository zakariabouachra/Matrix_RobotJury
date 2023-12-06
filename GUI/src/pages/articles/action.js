import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
  } from '@mui/material';
  import Payment from './paiement'
  import SoummissionFinal from './publier'

const RenderDialog = ({dialogInfo,articlesData,handleCloseDialog}) => {

  //------hnaya ndir la fonction besh nsuprimier -----//
  const handleDelete = async (articleId) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
  
      const response = await fetch(`http://localhost:5000/supprimerarticle/${articleId}`, requestOptions);
  
      if (response.ok) {
        console.log(`Article avec ID ${articleId} supprimé avec succès.`);
  
        // Mettez à jour localement la liste des articles après la suppression
        const updatedArticles = articlesData.filter((article) => article.id !== articleId);
        localStorage.setItem('articlesData', JSON.stringify(updatedArticles));
  
        // Appeler la fonction de fermeture du dialogue avec le nouvel état
        handleCloseDialog(updatedArticles);
      } else {
        console.error(`Échec de la suppression de l'article avec ID ${articleId}.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article', error);
    }
  
   
  };
      
    let dialogContent;
    let maxWidth = 'xs';
    switch (dialogInfo.action) {
        case 'Payer':
        dialogContent = (
            <DialogContent>
                <Payment articleId={dialogInfo.articleId} handleCloseDialog={handleCloseDialog}/>
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
                <Button onClick={() => { handleDelete(dialogInfo.articleId); }} color="primary">
                         Supprimer
                </Button>
            </DialogActions>
            </DialogContent>
        );
        break;
        case 'Reviser':
        maxWidth = 'md';
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
        case 'Publier':
        maxWidth = 'md';
        dialogContent = (
            <DialogContent>
                <SoummissionFinal articleId={dialogInfo.articleId} handleCloseDialog={handleCloseDialog}/>
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
          maxWidth={maxWidth}
          fullWidth
        >
          <DialogTitle>{dialogInfo.action}</DialogTitle>
          {dialogContent}
        </Dialog>
      );
};

export default RenderDialog;