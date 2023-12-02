import stationsModel, { Station } from '@models/stations.model';

class StationsService {
  public async findAllStations(): Promise<Station[]> {
    const stations: Station[] = await stationsModel.find();

    return stations;
  }
}

export default StationsService;
