package note.data;
import java.io.*;
import java.io.FileReader; 
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager; 
public class EditorContent 
{
	public ScriptEngineManager manager;   
	public ScriptEngine engine;     
	public String jsFileName;
	
	EditorContent()
	{
		 manager = new ScriptEngineManager();
		 engine = manager.getEngineByName("javascript");
		 jsFileName = "src/main/webapp/resources/js/content.js";
	}
	public String getContent() 
	{
		String result = "";
		try{
			FileReader reader = new FileReader(jsFileName);
			engine.eval(reader);
			if(engine instanceof Invocable) 
			{    
				Invocable invoke = (Invocable)engine;
				result = (String)invoke.invokeFunction("getContent");
				System.out.println("result = " + result);   
			}
			reader.close();
		}
		catch(Exception ex)
		{
			System.out.println(ex + "(" + jsFileName + ")");
			return "error";
		}
		
		return result;
	}
}
