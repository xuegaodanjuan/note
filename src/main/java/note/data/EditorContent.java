package note.data;
import java.io.FileReader; 
import javax.script.Invocable;

import javax.script.ScriptEngine;

import javax.script.ScriptEngineManager; 
public class EditorContent 
{
	ScriptEngineManager manager = new ScriptEngineManager();   
	ScriptEngine engine = manager.getEngineByName("javascript");     

	String jsFileName = "index.js";   // ��ȡjs�ļ�   

	public String getContent() throws Exception
	{
		FileReader reader = new FileReader(jsFileName);   // ִ��ָ���ű� 
		engine.eval(reader);
		if(engine instanceof Invocable) 
		{    
			Invocable invoke = (Invocable)engine;    // ����ָ�����������������    
			// c = merge(2, 3);    
			String c = (String)invoke.invokeFunction("merge", 2, 3);
			System.out.println("c = " + c);   
		}  
		String text = "";
		
		return text;
	}
}
