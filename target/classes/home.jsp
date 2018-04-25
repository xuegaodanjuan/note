<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
  <head>
    <title>MNote</title>
    <link rel="stylesheet" 
          type="text/css" 
          href="<c:url value="/resources/style.css" />" >
  </head>
  <body>
    <h1>Welcome to my note</h1>
	<a href="<c:url value="/pages" />">Pages</a> | 
    <a href="<c:url value="/note/register" />">Register</a>
    
  </body>
</html>
