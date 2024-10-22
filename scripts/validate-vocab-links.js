const fs = require('fs');
const { jsonLdSchemaPaths } = require('./files');

function checkSchemaLinks(jsonLdSchemaPath) {
  const jsonLdTextContent = fs.readFileSync(jsonLdSchemaPath, 'utf8');

  const vocabPath = jsonLdSchemaPath.replace(`v1.jsonld`, 'vocabulary.md');
  const v1SchemaContent = fs.readFileSync(vocabPath, 'utf8');
  const jsonLdV1Links = (jsonLdTextContent.match(/https\:\/\/oid.spherity.com.*#.*(?=")/g) || [])

  const missingLinks = jsonLdV1Links.filter((link) => {
    const slug = link.split('#')[1];
    const isFound = v1SchemaContent.includes(`{#${slug}}`);

    if (!isFound) {
      console.log(`   ❌ ${slug}`);
      return slug;
    }

    console.log(`   ✅ ${slug}`);
  });

  if (missingLinks.length) {
    const missingAsText = missingLinks.map((link) => `\n- ${link}`).join('');

    throw new Error(`Links present in v1/schema.jsonld but not in vocabularies/v1: \n${missingAsText}`);
  }

  console.log(`\n   ✅ All links are present in vocabularies/v1.md`);
}

for (let jsonLdSchemPath of jsonLdSchemaPaths) {
  checkSchemaLinks(jsonLdSchemPath);
}

