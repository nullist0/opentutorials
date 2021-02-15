#!/usr/bin/python3
print("Content-Type:text/html\n")

import cgi
form = cgi.FieldStorage()
pageId = form['id'].value

# print(pageId)

print('''<!doctype html>
<html>
  <head>
    <title>WEB1 - Welcome</title>
    <meta charset="utf-8">
  </head>

  <body>
    <h1><a href="index.py">WEB</a></h1>

    <!-- Query String or URL Parameter -->
    <ol>
      <li><a href="index.py?id=HTML">HTML</a></li>
      <li><a href="index.py?id=CSS">CSS</a></li>
      <li><a href="index.py?id=JavaScript">JavaScript</a></li>
    </ol>

    <h2>{title}</h2>

    <p>The World Wide Web (WWW), also called the Web, is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and accessible via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser in 1990 while employed at CERN in Switzerland.[2][3] The browser was released outside CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
    The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).[7] In addition to formatted text, web pages may contain images, video, audio, and software components that are rendered in the user's web browser as coherent pages of multimedia content.
    </p>
  </body>
</html>
'''.format(title=pageId))