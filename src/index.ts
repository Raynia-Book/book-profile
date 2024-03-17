import express, { json, urlencoded } from 'express';
import config from './config';
import booksApi from './routers/booksApi';
import { initDB } from './db/initDB';

async function main(): Promise<void> {
    const app = express();
    const port = config.app.port;
    const host = config.app.host;

    await initDB();

    app.use(json())
    app.use(urlencoded({ extended: true}))

    // api/v1
    app.use('/api/v1/books', booksApi)

    app.listen(port, () => console.log(`Server is running on http://${host}:${port}`))
}
main()