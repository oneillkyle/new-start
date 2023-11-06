import { map } from 'rxjs';
import { ElasticService } from '../services/elastic';

export const airWaterQualityResolvers = {
    Query: {
        //   weather(parent, args, contextValue, info) {
        airWaterQuality() {
            const service = new ElasticService();
            return service
                .getAll()
                .then((result) => result.hits.hits.map((hit) => hit._source));
        }
    }
};
