import { Router } from 'express';
// I
import { clientController } from '../controllers/clientController';

const clientRouter = Router();

// R
// E
clientRouter.get('/:document', clientController.listPhonesByDocument);


// E
clientRouter.delete('/:document', clientController.deleteClient);

export default clientRouter;