import { Router } from 'express';
import StationsController from '@controllers/stations.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { SearchStationsDto, GetStationByIdDto } from '@/dtos/stations.dto';

class StationsRoute implements Routes {
  public path = '/stations';
  public router = Router();
  public stationsController = new StationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.stationsController.getStations);
    this.router.get(`${this.path}/search`, validationMiddleware(SearchStationsDto, 'query'), authMiddleware, this.stationsController.searchStations);
    this.router.get(`${this.path}/:id`,validationMiddleware(GetStationByIdDto, 'params'),authMiddleware, this.stationsController.getStationById);
  }
}

export default StationsRoute;
