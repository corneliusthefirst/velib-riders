import { prop, getModelForClass, modelOptions, index } from '@typegoose/typegoose';

class NumBikesAvailableType {
  @prop({})
  mechanical?: number;

  @prop({})
  ebike?: number;
}

@modelOptions({ schemaOptions: { collection: 'stations', timestamps: true, _id: true } })
@index({ station_id: 1, stationCode: 1 }, { unique: true })
export class Station {
  @prop({})
  stationCode?: string;

  @prop({})
  station_id?: number;

  @prop({})
  name?: string;

  @prop({})
  capacity?: number;

  @prop({})
  lat?: number;

  @prop({})
  lon?: number;

  @prop({})
  num_bikes_available?: number;

  @prop({})
  numBikesAvailable?: number;

  @prop({ type: NumBikesAvailableType, _id: false })
  num_bikes_available_types?: NumBikesAvailableType[];

  @prop({})
  num_docks_available?: number;

  @prop({})
  numDocksAvailable?: number;

  @prop({})
  is_installed?: number;

  @prop({})
  is_returning?: number;

  @prop({})
  is_renting?: number;

  @prop({})
  last_reported?: number; // in seconds not ms -_-'

  createdAt?: Date;

  updatedAt?: Date;
}

const StationModel = getModelForClass(Station);

export default StationModel;
