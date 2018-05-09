
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
