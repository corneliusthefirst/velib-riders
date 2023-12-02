import { Queue, Worker } from 'bullmq';
import { from, map, defer, lastValueFrom, toArray } from 'rxjs';
import axios from 'axios';
import StationModel, { Station } from '@/models/stations.model';
import { getRedisClient } from '@/databases';
import { logger } from '@/utils/logger';

export const STATIONS_STATIONS_QUEUE_NAME = 'Stations';
export const STATION_PROCESS_STATUS_JOB_NAME = 'ProcessAndPersisteStationStatus';
export const STATION_PROCESS_INFOS_JOB_NAME = 'ProcessAndPersisteStationInfos';

const endPointStationStatus = 'https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json';
const endPointStationInfos = 'https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json';

export const persisteStationStatus = (station: Station) => {
  return from(
    StationModel.findOneAndUpdate(
      {
        station_id: station.station_id,
      },
      station,
      { upsert: true },
    ),
  );
};

export const persisteStationInfos = (station: Station) => {
  const { station_id, name, capacity, lat, lon } = station;

  return from(
    StationModel.findOneAndUpdate(
      {
        station_id,
      },
      { name, capacity, lat, lon },
      { upsert: true },
    ),
  );
};

type StationInfos = Pick<Station, 'station_id' | 'name' | 'capacity' | 'lat' | 'lon'>;

type StationStatusResponse = {
  data: {
    stations: Station[];
  };
};

type StationInfosResponse = {
  data: {
    stations: StationInfos[];
  };
};

const fetchStationsStatus = () => {
  const promise = axios.get<StationStatusResponse>(endPointStationStatus);

  return defer(() => {
    return promise.then(({ data }) => {
      return data?.data?.stations || [];
    });
  });
};

const fetchStationsInfos = () => {
  const promise = axios.get<StationInfosResponse>(endPointStationInfos);

  return defer(() => {
    return promise.then(({ data }) => {
      return data?.data?.stations || [];
    });
  });
};

const queue = new Queue(STATIONS_STATIONS_QUEUE_NAME, {
  connection: getRedisClient(),
  defaultJobOptions: {
    removeOnComplete: true,
    // removeOnComplete: {
    //   age: 86400, // 24 hours
    // },
  },
});

export const processAndPersisteStationStatusesAsTasks = () => {
  return fetchStationsStatus().pipe(
    map(stations => {
      return stations.map(station => {
        return queue.add(STATION_PROCESS_STATUS_JOB_NAME, { stationId: station.station_id, stationStatus: station });
      });
    }),
    toArray(),
  );
};

export const processAndPersisteStationInfosAsTasks = () => {
  return fetchStationsInfos().pipe(
    map(stations => {
      return stations.map(station => {
        return queue.add(STATION_PROCESS_INFOS_JOB_NAME, { stationId: station.station_id, stationInfos: station });
      });
    }),
    toArray(),
  );
};

export const runStationsWorker = () => {
  const worker = new Worker(
    STATIONS_STATIONS_QUEUE_NAME,
    async job => {
      if (job.name === STATION_PROCESS_STATUS_JOB_NAME) {
        const { stationId, stationStatus } = job.data;

        logger.info('persisting station statuses: ' + stationId);

        await lastValueFrom(persisteStationStatus(stationStatus));
      }

      if (job.name === STATION_PROCESS_INFOS_JOB_NAME) {
        const { stationId, stationInfos } = job.data;

        logger.info('persisting station infos: ' + stationId);

        await lastValueFrom(persisteStationInfos(stationInfos));
      }
    },
    { connection: getRedisClient(), concurrency: 5 },
  );

  return worker;
};
