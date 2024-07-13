import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariables } from './environments/environment';

let app: express.Application = express();

app.listen(3000, () => {
  console.log('Server is Running on Port 3000');
});

mongoose.connect(getEnvironmentVariables().db_uri)
  .then(() => {
    console.log('Connected to MongoDB.');
  })

app.get('/api/login', (req, res) => {
  const data = [{ name: 'Rhandzu' }];
  res.status(200).send(data);
});

app.get('/api/user/test', (req, res) => {
  console.log('test');
  res.send('test');
})

app.use((req, res, next) => {
  console.log('middleware');
  next();
})