const markdown = require('markdown').markdown;
const fs = require('fs');
const fetch = require('node-fetch')

const validateUrl = (link) => {
  return new Promise((resolve, reject) => {
    fetch(link.href)
      .then((response) => {
        if (response.status == 200) {
          link.status = 'ok'
        } else {
          link.status = 'fail'
        }
        resolve(link)
      })
      .catch((error) => {
        link.status = 'fail'
        resolve(link)
      })
  })
}

const findLinks = (tree, path) => {
  if (tree.length < 2) {
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
  options = options || {validate: false}
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject('no se pudo leer archivo');
      }
      let links = findLinks(markdown.parse(data), path)
      if (options.validate) {
        Promise.all(links.map(validateUrl)).then((validatedLinks) => {
          resolve(validatedLinks);
        })
      } else {
        resolve(links);
      }
    })
  });
};

module.exports = { mdLinks }
