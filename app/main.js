var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

var routes = require('./routes')

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))


app.get('/', routes.index)

app.listen(3000)
