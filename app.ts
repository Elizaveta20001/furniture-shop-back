import express, {json, Application} from 'express';
import config from 'config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes';
import collectionRoutes from './routes/collection.routes';
import catalogRoutes from './routes/catalog.routes';
import searchResultRoutes from './routes/serachResult.routes';
import paymentRoues from './routes/payment.routes';
import userRoutes from './routes/user.routes';


const app: Application = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/catalog/collections', collectionRoutes);
app.use('/api/search', searchResultRoutes);
app.use('/payment', paymentRoues);
app.use('/api/user',userRoutes);


const PORT: number = config.get('port') || 5000;
const MONGO_URI: string = config.get('mongoUri');

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`app has been started on port ${PORT} ... `)
        });
    } catch (e) {
        console.log('server error', e.message);
        process.exit(1);
    }
};

start();
