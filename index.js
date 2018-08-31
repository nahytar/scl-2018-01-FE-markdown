const mdLink = require('./lib/mdlink')

export const getLinksFromFile = (path, options) =>{
  return mdLink.mdLinks(path, options);
}