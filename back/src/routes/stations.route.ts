import { Router } from 'express';
import StationsController from '@controllers/stations.controller';
import { Routes } from '@interfaces/routes.interface';

class StationsRoute implements Routes {
  public path = '/stations';
  public router = Router();
  public stationsController = new StationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/stations', this.stationsController.getStations);
  }
}

export default StationsRoute;
