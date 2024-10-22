const path = require('path');
const glob = require('glob');

const baseFolder = path.resolve(`${__dirname}/../docs`);
const credentialBasePaths = glob.globSync(`${baseFolder}/**/credentials`);
const jsonLdSchemaPaths = glob.globSync(`${baseFolder}/**/v*.jsonld`);
const vocabPaths = glob.globSync(`${baseFolder}/**/vocabulary.md`);

module.exports = {
  credentialBasePaths,
  jsonLdSchemaPaths,
  vocabPaths,
};
