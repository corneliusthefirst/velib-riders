import { IsString } from 'class-validator';

export class SearchStationsDto {
  @IsString()
  public searchTerm: string;
  @IsString()
  public bikeType: 'mechanical' | 'ebike' | 'all';
  @IsString()
  public page: string;
  @IsString()
  public pageSize: string;

}

export class GetStationByIdDto {
  @IsString()
  public id: string;
}
