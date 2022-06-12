import { createClient, RedisClientType } from 'redis';
import { QueryResultCache } from "typeorm/cache/QueryResultCache";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";
import { QueryResultCacheOptions } from "typeorm/cache/QueryResultCacheOptions";

export default class RedisQueryResultCache implements QueryResultCache {
    private mRedisClient:RedisClientType;
    constructor(hostIp:string, port:number, password?:string) {
        this.mRedisClient = createClient({
            url: `redis://@${process.env.REDIS_HOST_IP}:${process.env.REDIS_PORT}`,
            password: process.env.REDIS_PASS
        });

        this.mRedisClient.on('error', (err) => console.log('Redis Client Error', err));
    }

    /**
     * Creates a connection with given cache provider.
     */
     async connect(): Promise<void> {
        console.log('Redis connecting');
        return await this.mRedisClient.connect();      
     }
     /**
      * Closes a connection with given cache provider.
      */
     async disconnect(): Promise<void> {
        console.log('Redis disconnecting')
        return await this.mRedisClient.disconnect();
     }
     /**
      * Performs operations needs to be created during schema synchronization.
      */
     synchronize(queryRunner?: QueryRunner): Promise<void> {
        return new Promise((ok, fail) => {
            ok();
        });
     }
     /**
      * Caches given query result.
      */
     getFromCache(options: QueryResultCacheOptions, queryRunner?: QueryRunner): Promise<QueryResultCacheOptions | undefined> {
        return new Promise(async (ok, fail) => {
            const key = options.identifier || options.query;
            const value = key ? await this.mRedisClient.get(key) : undefined;
            console.log('Redis getFromCache: key = ' + key + " value = " + value);
            ok(JSON.parse(value));
        });
    }
     /**
      * Stores given query result in the cache.
      */
     storeInCache(options: QueryResultCacheOptions, savedCache: QueryResultCacheOptions | undefined, queryRunner?: QueryRunner): Promise<void> {
        return new Promise((ok, fail) => {
            const key = options.identifier || options.query;
            const value = JSON.stringify(options);
            const duration = options.duration;
            console.log('Redis storeInCache: key = ' + key + " value = " + value + " duration = " + duration);
            this.mRedisClient.set(key, value, {PX: duration});
            ok();
        });
    }
     /**
      * Checks if cache is expired or not.
      */
     isExpired(savedCache: QueryResultCacheOptions): boolean {
        const expired = (savedCache.time ?? 0) + (savedCache.duration ?? 0) < new Date().getTime();
        console.log('Redis isExpired: ' + expired);
        return expired;
     }
     /**
      * Clears everything stored in the cache.
      */
     async clear(queryRunner?: QueryRunner): Promise<void> {
        console.log('Redis clearing');
        await this.mRedisClient.flushDb();
        return new Promise((ok, fail) => {
            ok();
        });
     }
     /**
      * Removes all cached results by given identifiers from cache.
      */
     async remove(identifiers: string[], queryRunner?: QueryRunner): Promise<void> {
        await Promise.all(identifiers.map((identifier) => {
            console.log('Redis removing key:' + identifier);
            return this.mRedisClient.del(identifier);
        }));
        return new Promise((ok, fail) => {
            ok();
        });
    }
}