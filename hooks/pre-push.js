const checkRepoPublic = require('./scripts/checkRepoPublic');
const checkIfUserHasNeverCommitted = require('./scripts/checkIfUserHasNeverCommitted');
const prompt = require('prompt-sync')();

const remote = process.argv[2];

function prePush() {
  checkRepoPublic(remote)
    .then((isPublic) => {
      if (isPublic) {
        const response = prompt(
          'Respository is  public. Do you want to proceed (y/n) ? '
        );
        if (response.toLowerCase() != 'y') process.exit(1);
      } else {
        console.log('Repository is public');
      }
      return checkIfUserHasNeverCommitted(remote);
    })
    .then((hasUserCommitedBefore) => {
      if (!hasUserCommitedBefore) {
        console.log('User has never committed to this before');
        console.log('Exiting...');
        process.exit(1);
      }
      return;
    })
    .then(() => {
      console.log('prepush-hook : All checks passed.');
      process.exit(0);
    });
}

prePush();
