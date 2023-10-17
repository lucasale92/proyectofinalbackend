import { EError } from '../services/errors/enums.js';
import { logger } from '../utils/logger.utils.js';

export default (error, req, res, next) => {
  logger.error(error.cause);

  switch (error.code) {
    case EError.INCOMPLETE_FIELD_ERROR:
      res.status(400).send({
        status: 'error',
        error: error.name,
        cause: error.cause,
      });
      break;

    default:
      res.send({
        status: 'error',
        error: 'Error no controlado',
      });
      break;
  }
};