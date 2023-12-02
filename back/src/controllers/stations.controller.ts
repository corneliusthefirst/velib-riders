import { NextFunction, Request, Response } from 'express';
import stationsService from '@services/stations.service';
import { Station } from '@/models/stations.model';

class StationsController {
  public stationsService = new stationsService();

  public getStations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const finAllStations: Station[] = await this.stationsService.findAllStations();

      res.status(200).json({ data: finAllStations, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default StationsController;
