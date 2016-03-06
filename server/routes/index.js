import Config from '../../config';
import {
  addFilesToNewRepo,
  removeFilesFromNewRepo,
  modifyFilesFromNewRepo
} from '../utils';

let routes = {

  showServerIsRunning: (req, res) => {
    res.send(`Allo Allo! This server is running at ${process.env.NODE_ENV || 1337}`);
  },

  getGithubPayload: (req, res) => {
    console.log(req.body);
    let data = req.body;
    let branch = data.ref.replace('refs/heads/');
    console.log(branch);
    console.log(Config.originalRepo.branchToCopyFrom);
    if (data.ref.replace('refs/heads/', '') === Config.originalRepo.branchToCopyFrom) {
      console.log('intel inside');
      addFilesToNewRepo(data.head_commit.added);
      removeFilesFromNewRepo(data.head_commit.removed);
      modifyFilesFromNewRepo(data.head_commit.modified);
    }
    res.send('Thanks!');
  }

};

export default routes;
