import { Client } from '@elastic/elasticsearch';
import {
    ELASTIC_API_ID,
    ELASTIC_API_KEY,
    ELASTIC_PWD,
    ELASTIC_URL,
    ELASTIC_USER,
    ELASTIC_WEATHER_INDEX
} from '../../secrets';
import { estypes } from '@elastic/elasticsearch';
import { from } from 'rxjs';

// Should we use a seperate client per service or just one?
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

export abstract class ElasticService<ReturnType> {
    #client: Client = client;

    protected index: string = '';
    protected defaultField: string = '';
    protected IReturnType: any;

    getAll(fields?: string[]) {
        return this.search({ fields });
    }

    simpleSearch(
        search: string = '',
        searchFields?: string[],
        returnFields?: string[]
    ) {
        return this.search({
            query: {
                query_string: {
                    query: search,
                    fields: searchFields || [],
                    default_field: this.defaultField
                }
            },
            fields: returnFields
        });
    }

    search(opts: {
        query?: estypes.QueryDslQueryContainer;
        fields?: string[];
        returnFields?: string[];
    }) {
        return this.#client.search<ReturnType>({
            index: this.index,
            fields: opts?.returnFields,
            query: opts.query || {}
        });
    }
}
