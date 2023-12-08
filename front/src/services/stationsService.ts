import {searchStationsInterface} from '../utils/types';
import api from './api';

export default class StationService {
  async getAllStations(): Promise<any> {
    return api.get('/stations');
  }

  async searchStations(props: searchStationsInterface): Promise<any> {
    const {searchTerm = '', bikeType = 'all', page = 1, pageSize = 10} = props;
    return api.get(
      `/stations/search?searchTerm=${searchTerm}&bikeType=${bikeType}&page=${page}&pageSize=${pageSize}`,
    );
  }

  async getStation(id: string): Promise<any> {
    return api.get(`/stations/${id}`);
  }
}
