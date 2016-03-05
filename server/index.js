import express from 'express';

let app = express();

app.get('/commauto', function(req, res) {
  console.log(req.params);
  res.send('hello world');
})

app.listen(process.env.NODE_ENV || 1337, function(err) {
  console.log('Server is now listening at ', process.env.NODE_ENV || 1337)
})
