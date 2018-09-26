const markdown = require('markdown').markdown; // se importa la libreria externa markdown para procesar un string en formato markdown.
const fs = require('fs'); // se importa la libreria para manejar archivos incluida en node.
const fetch = require('node-fetch') // se importa la libreria externa node fetch para poder usar fetch como en el browser. 

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
  console.log(tree)
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
    console.log(result)
    return result;
  });
};
// ==========================================================================
const mdLinks = (path, options) => {
  options = options || {validate: false} // le da un valor por defecto a options por si pasa null o undefined
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => { // lee archivo que se encuentra en path
      if (err) {
        reject('no se pudo leer archivo'); 
      }
      const parsedMarkdown = markdown.parse(data) // Se parse la data que viene dentro del archivo markdown.
      let links = findLinks(parsedMarkdown, path) // Se busca los links en el archivo parseado.
      if (options.validate) { 
        Promise.all(links.map(validateUrl)) //crea un promise all que va a esperar que se terminen todas promesas del arreglo del promesas que devuelve el validador.
        .then((validatedLinks) => {  // cuando se terminan las promesas se resuelve la promesa principal para devolver los links ya validados.
          resolve(validatedLinks);
        })
      } else {
        resolve(links); // si no se pide validacion se devuelve los links sin pasar por el proceso de validacion.
      }
    })
  });
};

module.exports = { mdLinks }
