
var data = {title: "My New Post", body: "This is my first post!"};
var source   = $("#entry-template").html(); // template class or id 
var template = Handlebars.compile(source); // compiling 
var markup = template(data); //  to get the mark up 

$('div#article-content').append(markup);