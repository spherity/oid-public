const fs = require('fs');
const jsonld = require('jsonld');
const { credentialBasePaths, jsonLdSchemaPaths } = require('./files');
const { globSync } = require('glob')

const nodeDocumentLoader = jsonld.documentLoaders.node();
const customLoader = async (url, options) => {
  // [
  //   'docs/contexts/dbp/v1.jsonld',
  //   undefined,
  //   'contexts/dbp/v1.jsonld',
  //   index: 74,
  //   input: 'https://raw.githubusercontent.com/spherity/dpp-vocabulary/refs/heads/main/docs/contexts/dbp/v1.jsonld',
  //   groups: undefined
  // ]
  const jsonLdPathMatch = url.match(/.*(contexts\/.*\/v.*)/);
  if (!jsonLdPathMatch) {
    return nodeDocumentLoader(url);
  }

  try {
    const absolutePath = globSync(`./docs/**/${jsonLdPathMatch[1]}.jsonld`);
    const jsonLdContent = JSON.parse(fs.readFileSync(absolutePath[0], 'utf8'))

    return {
      contextUrl: null,
      document: jsonLdContent,
      documentUrl: url
    };
  } catch (ex) {
    console.log(ex);
  }
};

jsonld.documentLoader = customLoader;

async function validateJsonLd(basePath, jsonLdPath, credentialFileName) {
  console.log(`\n- ${credentialFileName}`);

  const credential = JSON.parse(fs.readFileSync(`${basePath}/${credentialFileName}`, 'utf8'));
  const jsonldContent = JSON.parse(fs.readFileSync(jsonLdPath, 'utf8'));
  const compacted = await jsonld.compact(credential, jsonldContent);
  console.log(`   ✅ JSON-LD compacted successfully!`);

  await jsonld.expand(compacted);
  console.log(`   ✅ JSON-LD expanded successfully!`);

  await jsonld.flatten(compacted);
  console.log(`   ✅ JSON-LD flattened successfully!`);

  await jsonld.canonize(compacted, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads'
  });
  console.log(`   ✅ JSON-LD canonized successfully!`);

  await jsonld.toRDF(compacted, {format: 'application/n-quads'});
  console.log(`   ✅ JSON-LD converted to RDF successfully!`);
}

async function validate() {
  for (let i = 0; i < credentialBasePaths.length; i += 1) {
    const basePath = credentialBasePaths[i];
    const credentialFiles = fs.readdirSync(basePath);
    for (let credentialPath of credentialFiles) {
      await validateJsonLd(basePath, jsonLdSchemaPaths[i], credentialPath);
    }
  }
}

validate();
