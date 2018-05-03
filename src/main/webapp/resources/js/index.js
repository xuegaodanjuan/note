var editor;
$(document).ready
(
	function()
	{
		var E = window.createEditor;
	    editor = new E('#divDemo');
	    editor.customConfig.uploadImgShowBase64 = true;
	    editor.create();
	}
);
function getContent()
{
	var text = editor.txt.html();
	alert(text);
}
function setContent()
{
	var text = "<h3>head</h3>";
	editor.txt.html(text);
}