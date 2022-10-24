import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, gql } from '@apollo/client';

export default class GraphQlClient {
    /**
     * 
     * @param {*} token is optional
     * @param {*} endpoint is mandatory
     */
    constructor(endpoint, token) {

        if (!endpoint) {
            throw new Error("empty parameters");
        }
    
        const authLink = new ApolloLink((operation, forward) => {
            if (token) {
                operation.setContext({
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
            return forward(operation);
        });
    
        this.client = new ApolloClient({
            link: ApolloLink.from([
                authLink,
                new HttpLink({ uri: endpoint })
            ]),
            cache: new InMemoryCache()
        });
    }

    /**
     * 
     * @param 
     * filters: [{
                    field: "price",
                    op: "GE",
                    values: [
                        "500"
                    ]
                }]
     * @returns 
     */
    async getProducts(filters) {

        console.debug("getProducts filter input " + JSON.stringify(filters))

        const query = gql`
            query GetProducts($filterExpression: FiltersExpression){
                products: getProducts(filterExpression: $filterExpression) {
                    id
                    brand
                    model
                    thumbnail
                    displaySize
                    displayType
                    cpuType
                    storageType
                    cameraMp
                    cameraFrontMp
                    battery_mAh
                    quantity
                    sim
                    price
                }
            }`;

        const { data: { products }, errors } = await this.client.query({
            query,
            variables: {
                filterExpression: {
                    filters: filters
                }
            }
        });

        if (errors) {
            const errMsg = "getProducts failed " + JSON.stringify(errors);
            console.error(errMsg);
            throw new Error(errMsg);
        }

        return products;
    }
}
