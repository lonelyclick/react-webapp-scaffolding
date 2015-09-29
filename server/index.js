const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const parse = require('co-body')
const render = require('./lib/render')
const serverStatic = require('koa-static')
const mount = require('koa-mount')
const fs = require('fs')


const app = module.exports = koa()

function *list() {
	this.body = JSON.stringify({
		"1": {
			"name": "zhihu",
			"age": 23
		},
		"2": {
			"name": "zhihutest",
			"age": 33
		}
	})
}

function *add() {
	this.body = yield render('new')
}

function *show(id) {
	this.body = id
}

function *create() {
	this.body = 'create'
}

function *json() {
	this.body = JSON.stringify()
}

function ignoreAssets(mw) {
	return function *(next) {
		if (/(\.json)$/.test(this.path)) {
			yield next
		} else {
			yield mw.call(this, next)
		}
	}
}

app.use(logger())

// app.use(mount('/static', serverStatic(`${__dirname}/public`)))

// app.use(mount('/static', serverStatic(`${__dirname}/public`)))

app.use(serverStatic('dev'))

app.use(route.get('/redis/list', list))

app.use(route.get('*', function* () {
	this.type = 'html'
	this.body = yield function (done) {
		fs.readFile('dev/index.html', 'utf8', done)
	}
}))

/*app.use(route.get('/', list))
 app.use(route.get('/post/new', add))
 app.use(route.get('/post/:id', show))
 app.use(route.post('/post', create))*/

// app.use(serverStatic('public'))

/*app.use(function * pageNotFound(next) {
 yield next

 if (this.status !== 404) return

 this.body = 'page not found'
 })*/


app.listen(3000)
