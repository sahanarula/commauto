let routes = {

  showServerIsRunning: (req, res) => {
    res.send(`Allo Allo! This server is running at ${process.env.NODE_ENV || 1337}`);
  },

  getGithubPayload: (req, res) => {
    console.log(req.body);
    res.send('Thanks!');
  }

};

export default routes;
