import { map } from 'rxjs';
import { AirWaterQualityService } from '../services/air-water-quality';

export const airWaterQualityResolvers = {
    Query: {
        //   weather(parent, args, contextValue, info) {
        airWaterQuality() {
            const service = new AirWaterQualityService();
            return service
                .getAll()
                .then((result) => result.hits.hits.map((hit) => hit._source));
        }
    }
};
