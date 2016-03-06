import Config from '../config';
import mkdirp from 'mkdirp';
import path from 'path';
import fs from 'fs';

let getDirName = path.dirname;

export function download_git_directory (repo, directory) {
  repo.contents(Config.originalRepo.branchToCopy, directory, (err, contents) => {
    contents.map((content, i) => {
      if (content.type === 'dir') {
        download_git_directory(repo, content.path);
      }
      else {
        repo.read(Config.originalRepo.branchToCopy, content.path, (err, fileData) => {
          if(err) console.log(err);
          let path = `${Config.newRepo.pathToCopyTo}/${content.path}`
          mkdirp(getDirName(path), (err) => {
            console.log(path);
            if(err) console.log(err);
            else {
              fs.createWriteStream(path).write(fileData);
            }
          })
        })
      }
    })
  })
}
