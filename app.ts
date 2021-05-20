import express, { json, Application } from 'express';
import config from 'config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import auth_routes from './routes/auth.routes';
import collection_routes from './routes/collection.routes';
import catalog_routes from './routes/catalog.routes';
import searchResult_routes from './routes/serachResult.routes'


const app: Application = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(json());

app.use('/api/auth', auth_routes);
app.use('/api/catalog', catalog_routes);
app.use('/api/catalog/collections',collection_routes);
app.use('/api/search', searchResult_routes);


const PORT: number = config.get('port') || 5000;
const MONGO_URI: string = config.get('mongoUri');

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {console.log(`app has been started on port ${PORT} ... `)});
    } catch(e){
        console.log('server error', e.message);
        process.exit(1);
    }
};

start();
