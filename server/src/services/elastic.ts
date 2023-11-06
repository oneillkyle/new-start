import { Client } from '@elastic/elasticsearch';
import {
    ELASTIC_API_ID,
    ELASTIC_API_KEY,
    ELASTIC_PWD,
    ELASTIC_URL,
    ELASTIC_USER,
    ELASTIC_WEATHER_INDEX
} from '../../secrets';
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { from } from 'rxjs';

const client = new Client({
    node: `${ELASTIC_URL}`, // Elasticsearch endpoint
    auth: {
        username: ELASTIC_USER,
        password: ELASTIC_PWD
        // apiKey: {
        //     // API key ID and secret
        //     id: ELASTIC_API_ID,
        //     api_key: ELASTIC_API_KEY
        // }
    },
    tls: {
        rejectUnauthorized: false
    }
});

export class ElasticService {
    #client: Client;
    #index: string;
    defaultField = 'city';
    constructor(index: string = ELASTIC_WEATHER_INDEX) {
        this.#index = index;
        this.#client = client;
    }
    getAll(fields?: string[]) {
        return this.search({fields});
    }
    simpleSearch(
        search: string,
        searchFields?: string[],
        returnFields?: string[]
    ) {
        return this.search({
            query: {
                query_string: {
                    query: search,
                    fields: searchFields || [],
                    default_field: 'city'
                }
            },
            fields: returnFields
        });
    }
    search(opts: {
        query?: QueryDslQueryContainer;
        fields?: string[];
        returnFields?: string[];
    }) {
        return this.#client.search({
                index: this.#index,
                fields: opts?.returnFields
            })
        // return results;
    }
}
