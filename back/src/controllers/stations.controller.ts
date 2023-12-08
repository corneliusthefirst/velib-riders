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

  public searchStations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const searchTerm = req.query.searchTerm as string;
      const bikeType = req.query.bikeType as 'mechanical' | 'ebike' | 'all';
      const page = parseInt(req.query.page as string);
      const pageSize = parseInt(req.query.pageSize as string);

      const { stations, total } = await this.stationsService.searchStations(searchTerm, bikeType, page, pageSize);

      res.status(200).json({ data: stations, total, message: 'searched stations' });
    } catch (error) {
      next(error);
    }
  };

  public getStationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stationId = req.params.id as string;
      const findOneStationData: Station = await this.stationsService.findStationById(stationId);

      res.status(200).json({ data: findOneStationData, message: 'find Station By Id' });
    } catch (error) {
      next(error);
    }
  }
}

export default StationsController;
