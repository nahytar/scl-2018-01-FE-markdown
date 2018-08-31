const mdLinks = require('../lib/mdlink').mdLinks;

describe('mdLinks', () => {
  test('debe devolver arreglo vacio', (done) => {
    mdLinks('test/files/empty.md').then((result) => {
      expect(result).toEqual([]);
      done();
    })
  })

  test('debe devolver un link sin validar', (done) => {
    mdLinks('test/files/oneLink.md').then((result) => {
      expect(result).toEqual([{
        href: 'https://www.google.com',
        text: 'I\'m an inline-style link',
        file: 'test/files/oneLink.md'
      }]);
      done();
    })
  })

  test('debe devolver un link sin validar', (done) => {
    mdLinks('test/files/multiLink.md').then((result) => {
      expect(result).toEqual([
        {
          href: 'https://www.google.com',
          text: 'I\'m an inline-style link',
          file: 'test/files/multiLink.md'
        },
        {
          href: 'https://www.google.com',
          text: 'I\'m an inline-style link with title',
          file: 'test/files/multiLink.md'
        },
        {
          href: '../blob/master/LICENSE',
          text: 'I\'m a relative reference to a repository file',
          file: 'test/files/multiLink.md'
        },
        {
          href: 'http://www.example.com',
          text: 'http://www.example.com',
          file: 'test/files/multiLink.md'
        }
      ]);
      done();
    })
  })
  describe('con validacion', () => {
    test('debe devolver arreglo vacio', (done) => {
      mdLinks('test/files/empty.md', { validate: true }).then((result) => {
        expect(result).toEqual([]);
        done();
      })
    })

    test('debe devolver un link sin validar', (done) => {
      mdLinks('test/files/oneLink.md', { validate: true }).then((result) => {
        expect(result).toEqual([{
          href: 'https://www.google.com',
          text: 'I\'m an inline-style link',
          file: 'test/files/oneLink.md',
          status: 'ok'
        }]);
        done();
      })
    })

    test('debe devolver un link sin validar', (done) => {
      mdLinks('test/files/multiLink.md', { validate: true }).then((result) => {
        expect(result).toEqual([
          {
            href: 'https://www.google.com',
            text: 'I\'m an inline-style link',
            file: 'test/files/multiLink.md',
            status: 'ok'
          },
          {
            href: 'https://www.google.com',
            text: 'I\'m an inline-style link with title',
            file: 'test/files/multiLink.md',
            status: 'ok'
          },
          {
            href: '../blob/master/LICENSE',
            text: 'I\'m a relative reference to a repository file',
            file: 'test/files/multiLink.md',
            status: 'fail'
          },
          {
            href: 'http://www.example.com',
            text: 'http://www.example.com',
            file: 'test/files/multiLink.md',
            status: 'ok'
          }
        ]);
        done();
      })
    })
  })
})

