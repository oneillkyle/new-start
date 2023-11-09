import { ELASTIC_WEATHER_INDEX } from '../../secrets';
import { ElasticService } from './elastic';
import { AirWaterQuality as IAirWaterQuality } from '../generated/graphql';

export class AirWaterQualityService extends ElasticService<IAirWaterQuality> {
    defaultField = 'city';
    index = ELASTIC_WEATHER_INDEX;
}
