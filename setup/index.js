import NodeGit from 'nodegit';
import CLISpinner from 'cli-spinner';
import Config from '../config';
import Github from 'github-api';
import { download_git_directory } from '../utils';
require('shelljs/global');

let Spinner = CLISpinner.Spinner;
let spinner = new Spinner('cloning... %s');
spinner.setSpinnerString('|/-\\');
spinner.start();

var github = new Github({
  token: `${Config.githubAccessToken}`,
  auth: "oauth"
})

var repo = github.getRepo('Instamojo', 'imojo');

var errorAndAttemptOpen = function(err) {
  return NodeGit.Repository.open(`${Config.localPath}`);
};

var cloneOptions = {};

cloneOptions.fetchOpts = {
  callbacks: {
    certificateCheck: function() { return 1; },
    credentials: function() {
      return NodeGit.Cred.userpassPlaintextNew(`${Config.githubAccessToken}`, "x-oauth-basic");
    }
  }
};

let cloneRepository = NodeGit.Clone(Config.newRepo.url, Config.localPath, cloneOptions);

cloneRepository
.catch(errorAndAttemptOpen)
.then((repository) => {
  spinner.stop(1);
  download_git_directory(repo, Config.originalRepo.pathToCopyFrom)
  cd(Config.localPath);
  if (exec('git add -A').code !== 0) {
    echo('Error: Git add files failed');
    exit(1);
  }
  if (exec(`git commit -am "Auto-Commit by ${Config.committer.botName}" --author="${Config.committer.name} <${Config.committer.email}>"`).code !== 0) {
    echo('Error: Git Commit failed');
  }
  if (exec("git push").code !== 0) {
    echo('Error: Git Commit failed');
    exit(1);
  }

  return repository;
})
