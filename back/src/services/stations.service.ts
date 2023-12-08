import stationsModel, { Station } from '@models/stations.model';
import mongoose from 'mongoose';

class StationsService {
  public async findAllStations(): Promise<Station[]> {
    const stations: Station[] = await stationsModel.find();

    return stations;
  }


  public async searchStations(
    searchTerm: string,
    bikeType: 'mechanical' | 'ebike' | 'all' = 'all', // 'all' to retrieve all types
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ stations: Station[]; total: number }> {

  let query: any = {};

  // Check if searchTerm is provided
  if (searchTerm.trim() !== '') {
    const regex = new RegExp(searchTerm, 'i');
    query.name = { $regex: regex };
  }
    // Optionally add bike type filter
    if (bikeType !== 'all') {
      query[`num_bikes_available_types.${bikeType}`] = { $gt: 0 };
    }

    const total = await stationsModel.countDocuments(query);
    const skip = (page - 1) * pageSize;

    const stations = await stationsModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();

    return { stations, total };
  }

  public async findStationById(stationId: string): Promise<Station> {

    const findOneStationData: Station = await stationsModel.findOne({ station_id: stationId });

    if (!findOneStationData) throw new Error('station not found');

    return findOneStationData;
  }


}

export default StationsService;
