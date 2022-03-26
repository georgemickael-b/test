const prompt = require('prompt-sync')();
const checkRepoPublic = require('./scripts/checkRepoPublic');
const checkIfUserHasNeverCommitted = require('./scripts/checkIfUserHasNeverCommitted');

function prePush() {
  checkRepoPublic()
    .then((isPublic) => {
      if (isPublic) {
        const response = prompt(
          'Respository is  public. Do you want to proceed (y/n) ? '
        );
        if (response.toLowerCase() != 'y') process.exit(-1);
      } else {
        console.log('Repository is public');
      }
      return checkIfUserHasNeverCommitted();
    })
    .then((hasUserCommitedBefore) => {
      if (!hasUserCommitedBefore) {
        console.log('User has never committed to this before');
        process.exit(-1);
      }
      return;
    })
    .then(() => {
      console.log('All checks passed.');
      process.exit(0);
    });
}

prePush();
