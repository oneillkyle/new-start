import { map } from 'rxjs';
import { AirWaterQualityService } from '../services/air-water-quality';
import { AirWaterQuality, Resolvers } from '../generated/graphql';

export const airWaterQualityResolvers: Resolvers = {
    Query: {
        //   weather(parent, args, contextValue, info) {
        airWaterQuality() {
            const service = new AirWaterQualityService();
            return service.getAll().then((result) =>
                result.hits.hits.reduce((acc, hit) => {
                    return hit._source ? [...acc, hit._source] : acc;
                }, [] as AirWaterQuality[])
            );
        }
    }
};
