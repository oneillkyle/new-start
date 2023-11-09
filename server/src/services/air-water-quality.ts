import { ELASTIC_WEATHER_INDEX } from '../../secrets';
import { ElasticService } from './elastic';

export class AirWaterQualityService extends ElasticService {
    defaultField = 'city';
    index = ELASTIC_WEATHER_INDEX;
}
