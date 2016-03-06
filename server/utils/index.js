import Github from 'github-api';
import Config from '../../config';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

let getDirName = path.dirname;

var github = new Github({
  token: `${Config.githubAccessToken}`,
  auth: "oauth"
})

var repo = github.getRepo(Config.originalRepo.username, Config.originalRepo.repoName);

repo.contents('master', "bin", function(err, contents) {
  contents.map((data, i) => {
    repo.read('master', data.path, (err, d) => {
      mkdirp(getDirName(process.env.PWD + '/.tmp/testing/' + data.path), function(err) {
        if(err) console.log(err);
        fs.createWriteStream(process.env.PWD + '/.tmp/testing/' + data.path).write(d);
      })
    })
  })
});

export function addFilesToNewRepo (files) {
  files.map((filePath, i) => {
    let path = `${Config.newRepo.pathToCopyTo}/${filePath}`;
    repo.read(Config.originalRepo.branchToCopyFrom, filePath, (err, fileData) => {
      mkdirp(getDirName(path), (err) => {
        if(err) console.log(err);
        fs.createWriteStream(path).write(fileData);
      })
    })
  })
}

export function removeFilesFromNewRepo (files) {
  files.map((filePath, i) => {
    let path = `${Config.newRepo.pathToCopyTo}/${filePath}`;
    fs.exists(path, function(exists) {
    if(exists) {
        console.log('File exists. Deleting now ...');
        fs.unlink(path);
      } else {
        console.log('File not found, so not deleting.');
      }
    });
  })
}

export function modifyFilesFromNewRepo (files) {
  files.map((filePath, i) => {
    let path = `${Config.newRepo.pathToCopyTo}/${filePath}`;
    repo.read(Config.originalRepo.branchToCopyFrom, filePath, (err, fileData) => {
      mkdirp(getDirName(path), (err) => {
        if(err) console.log(err);
        fs.createWriteStream(path).write(fileData);
      })
    })
  })
}

//
// var errorAndAttemptOpen = function(err) {
//   spinner.stop(1);
//   return NodeGit.Repository.open(`${Config.localPath}`);
// };
// console.log(Config.githubAccessToken);
// var cloneOptions = {};
// cloneOptions.fetchOpts = {
//   callbacks: {
//     certificateCheck: function() { return 1; },
//     credentials: function() {
//       return NodeGit.Cred.userpassPlaintextNew(`${Config.githubAccessToken}`, "x-oauth-basic");
//     }
//   }
// };
//
// let cloneRepository = NodeGit.Clone(Config.newRepo.url, Config.localPath, cloneOptions);
//
// cloneRepository
//   .catch(errorAndAttemptOpen)
//   .then(function(repository) {
//     spinner.stop(1);
//     console.log(repository);
//     return repository;
//   })
//
// export default cloneRepository;
