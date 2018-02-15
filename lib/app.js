const http = require('http')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

exports.start = function(args) {
  const port = parseInt(args[0]) ? args[0] : 1337

  http
    .createServer(function(req, res) {
      const url = req.url

      if (url.indexOf('?') != -1) {
        url = url.split('?')[0]
      }

      const file = url === '/' ? '/index.html' : url.replace(/(\.\.[\/\\])+/g, '')
      const rootPath = path.normalize(process.cwd())

      fs.readFile(`${rootPath}${file}`, (err, data) => {
        if (!!err) {
          console.error('Error loading : ' + url)
          res.writeHead(404)
          res.end()
        } else {
          var type = path.extname(file)

          if (type === '.js') {
            contentType = 'application/javascript'
          } else {
            contentType = 'text/' + type.slice(1, type.length)
          }

          res.setHeader('content-type', contentType)
          res.end(data)
        }
      })
    })
    .listen(port)
  process.stdout.write('\033[33mWeb Server started on localhost:' + port + ' \033[39m\n')
}
