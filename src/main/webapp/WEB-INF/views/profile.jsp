<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
	<head>
		<title>Hi</title>
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />" >
	</head>
	<body>
		<h1>Your Profile</h1>
		<c:out value="${user.username}" /><br/>
		<c:out value="${user.firstName}" /><br/> <c:out value="${user.lastName}" /><br/>
		<c:out value="${user.email}" />
	</body>
</html>