const markdown = require('markdown').markdown;
const fs = require('fs');

const findLinks = (tree, path) => {
  if(tree.length < 2) {
    return [];
  }
  if (tree[0] === 'link') {
    return [{
      href: tree[1].href,
      text: tree[2],
      file: path
    }];
  }
  return tree.reduce((previus, actual) => {
    let result = [];
    if (Array.isArray(previus)) {
      result = result.concat(previus);
    }
    if (Array.isArray(actual)) {
      result = result.concat(findLinks(actual, path));
    }
    return result;
  });
};

const mdLinks = (path, options) => {
  const data = markdown.parse(fs.readFileSync(path, 'utf8'));
  return findLinks(data, path);
};

module.exports = { mdLinks }
