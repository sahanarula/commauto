import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', routes.showServerIsRunning);
app.get('/commauto', routes.showServerIsRunning);
app.post('/commauto', routes.getGithubPayload);

app.listen(process.env.NODE_ENV || 1337, function(err) {
  console.log('Server is now listening at ', process.env.NODE_ENV || 1337)
})
