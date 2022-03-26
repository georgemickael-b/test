const child = require('child_process');
var request = require('request');

function checkRepoPublic() {
  return new Promise((resolve, reject) => {
    let remoteURL;
    try {
      const res = child
        .execSync('git config --get remote.origin.url')
        .toString()
        .split('\n');
      if (res.length == 0) throw new Error();
      remoteURL = res[0];
      console.log('Repo URL : ', remoteURL);
      request(remoteURL, (error, response, body) => {
        if (response.statusCode == 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      console.log(err);
      reject({
        msg: 'Cannot determine the remote URL of this repo. Please check if the remote is configured.'
      });
    }
  });
}

module.exports = checkRepoPublic;
