const mdLinks = require('../lib/mdlink').mdLinks;

describe('mdLinks', () => {
  test('debe devolver arreglo vacio', () => {
    const result = mdLinks('test/files/empty.md')
    expect(result).toEqual([])
  })

  test ('debe devolver un link sin validar', () => {
    const result = mdLinks('test/files/oneLink.md')
    expect(result).toEqual([{
      href: 'https://www.google.com',
      text: 'I\'m an inline-style link',
      file: 'test/files/oneLink.md'
     }])
  })
})

