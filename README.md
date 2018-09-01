# Markdown Links
Libreria node para buscar y validar links dentro de un markdown.

## Como instalar
npm install --save https://github.com/nahytar/scl-2018-01-FE-markdown.git

## Uso desde consola

### Sin validación
node_modules/bin/mdLink archivo.md

### Con validación
node_modules/bin/mdLink archivo.md --validate

## Uso programatico

### Sin validación
const mdLink = require('mdLink');
mdLink.mdLinks('path/to/file.md', {validate: false});

### Con validación
const mdLink = require('mdLink');
mdLink.mdLinks('path/to/file.md', {validate: true});