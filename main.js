var http = require('http'); //가로 안에 있는 값은 모듈(클래스?)
var fs = require('fs');
var url =require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
//refectoring

var template = require('./lib/template.js');

var app = http.createServer(function(request,response){ //통신규약은 http 활용하고 서버를 생산한다.
    var _url = request.url;                                 //request는 클라이언으가 요청하고 response는 서버가 보내는 값 사용자가 입력한 url을 입력하면 _request로 보내 값 저장
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
       //url모듈의 parse분석 메소드 활용해서 사용자가 요청한 url을 분석하고 단위는 쿼리?
       console.log(pathname);
    //위에 내용을 토대로 다음의 url을 정리하면 http://localhost:3000/?id=JavaScript  서버 자원의 위치가 어디 있냐? 그리고 3000값을 갖는 서버에 쿼리 스트링 쪽에 id가 JavaScript인 것을 갖고온다. 이것이고

    console.log(url.parse(_url, true));

    if(pathname ==='/'){
    if(queryData.id === undefined ){ //undefined에 '' string 값 주면 안됨
   fs.readdir('./data' , function(err, filelist) {
       console.log(filelist);
       var title = 'Welcome';
       var description ='Hello , Nodejs';
       var list = template.list(filelist);
       var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, '');
   response.writeHead(200);
   response.end(html);
 });

  }else{
  fs.readdir('./data' , function(err, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}` , 'utf8', function(err, description){
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          var list = template.list(filelist);
          var html = template.html(title, list, `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
          `<a href="/create">create</a>
           <a href="/update?id=${sanitizedTitle}">update</a>
           <form action="delete_process" method="post">
           <input type="hidden" name="id" value="${sanitizedTitle}">
           <input type="submit" value="delete">
           </form>`
        );
      response.writeHead(200);
      response.end(html);
        });
      });
      }
 }else if (pathname ==='/create') {
   fs.readdir('./data' , function(err, filelist) {
       console.log(filelist);
       var title = 'Web-create';
       var description ='Hello , Nodejs';
       var list = template.list(filelist);
       var html = template.html(title, list, `<form action="/create_process" method="post">
       <p><input type ="text" name="title" placeholder="title"></p>
       <p>
       <textarea name="description" placeholder="description"></textarea>
       </p>
       <p>
       <input type ="submit">
       </p>
       </form>
       `, '');
   response.writeHead(200);
   response.end(html);
 });
}else if(pathname==='/create_process'){
  var body ='';
  request.on('data',function(data) {
      body += data;
  });
request.on('end', function(){
  var post = qs.parse(body);
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`,description ,'utf8', function (err) {
    response.writeHead(302,{Location: `/?id=${title}`});
    response.end("success");
  })
  console.log(post);
});

}else if(pathname ==='/update'){
        fs.readdir('./data' , function(err, filelist) {
          var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}` , 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.html(title, list,
          `<form action="/update_process" method="post">
          <input type ="hidden" name="id" value="${title}">
          <p><input type ="text" name="title" placeholder="title", value="${title}"></p>
          <p>
          <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
          <input type ="submit">
          </p>
          </form>
          `, `<a href="/create">create</a>  <a href="/update?id=${title}">update</a>`
        );
      response.writeHead(200);
      response.end(html);
        });
      });
    }else if(pathname ==='/update_process'){
      var body ='';
      request.on('data',function(data) {
          body += data;
      });
      request.on('end', function(){
      var post = qs.parse(body);
      var id =post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`,`data/${title}`, function(error) {
        fs.writeFile(`data/${title}`,description ,'utf8', function (err) {
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end("success");
        });
      });

      console.log(post);
      });
    }else if(pathname ==='/delete_process'){
      var body ='';
      request.on('data',function(data) {
          body += data;
      });
      request.on('end', function(){
      var post = qs.parse(body);
      var id =post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error) {
        response.writeHead(302,{Location: `/`});
        response.end();
      });

      console.log(post);
      });

    }else{response.writeHead(404);
 response.end("Not Found");
}
});
app.listen(3000);
