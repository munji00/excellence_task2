import { createClient } from "redis";

export const client = createClient();

export const  redisConnection = async()=> {
    try {
        await client.connect();
        console.log("redis connected successfully")
    } catch (error) {
        console.log(error)
    }
}