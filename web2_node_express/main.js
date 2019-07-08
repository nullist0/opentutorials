var template = require('./lib/template.js');
var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var sanitizeHtml = require('sanitize-html');
var compression = require('compression');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.get('/', function (request, response) {
  var list = template.list(request.list);
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var html = template.html(title, list,
    `<h2>${title}</h2><p>${description}</p>
    <img src="/images/coding.jpg" style="width:100px; display:block; margin-top:10px;">`,
    `<a href='/create'>create</a>`);
  response.send(html);
});

app.get('/page/:pageId', function(request, response, next){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
    if(err) {
      next(err);
    }
    else{
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description);
      var list = template.list(request.list);
      var html = template.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
        `<a href='/create'>create</a>
        <a href='/update/${sanitizedTitle}'>update</a>
        <form action="/delete" method="post">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>`);
      response.send(html);
    }
  });
});

app.get('/create', function(request, response){
  var list = template.list(request.list);
  var title = 'Create';
  var html = template.html(title, list, `
    <form action="/create" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>

      <p>
        <input type="submit">
      </p>
    </form>

    `, '');
  response.send(html);
});

app.post('/create', function(request, response){
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/`);
  });
});

app.get('/update/:pageId', function(request, response){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.html(title, list, `
      <form action="/update/${title}" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>

        <p>
          <input type="submit">
        </p>
      </form>`,
      `<a href='/create'>create</a> <a href='/update/${title}'>update</a>`);
    response.send(html);
  });
});

app.post('/update/:pageId', function(request, response){
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(err){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/`);
    });
  });
});

app.post('/delete', function(request, response){
  var post = request.body;
  var filteredId = path.parse(post.id).base;

  fs.unlink(`data/${filteredId}`, function(err){
    response.redirect(`/`);
  });
});

app.use('*', function(request, response, next){
  response.status(404).send('404 Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});