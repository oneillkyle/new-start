import { AirWaterQualityService } from '../services/air-water-quality';
import { AirWaterQuality, Resolvers } from '../generated/graphql';

export const airWaterQualityResolvers: Resolvers = {
    Query: {
        airWaterQuality() {
            const service = new AirWaterQualityService();
            return service.getAll().then((result) =>
                result.hits.hits.reduce((acc, hit) => {
                    return hit._source ? [...acc, hit._source] : acc;
                }, [] as AirWaterQuality[])
            );
        },

        airWaterQualitySearch(parent, { search }, context, info) {
            const service = new AirWaterQualityService();
            const searchFields = ['city', 'country', 'region'];
            return service.simpleSearch(search || '', searchFields).then((result) =>
                result.hits.hits.reduce((acc, hit) => {
                    return hit._source ? [...acc, hit._source] : acc;
                }, [] as AirWaterQuality[])
            );
        }
    }
};
