import { getConnectionOptions } from "typeorm";
import { Connection } from "typeorm";
import { createConnection } from "typeorm";

export default async(): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

console.log(process.env.NODE_ENV)

    return createConnection(
        Object.assign(defaultOptions, {
           database: process.env.NODE_ENV === 'test' 
            ? "./src/database/database.test.sqlite"
            : defaultOptions.database,
        })
    );
};

