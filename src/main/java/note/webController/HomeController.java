package note.webController;

import static org.springframework.web.bind.annotation.RequestMethod.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import note.User;
import note.data.RegisterRepository;

@Controller
@RequestMapping("/home")
public class HomeController {
	private RegisterRepository registerRepository;
	
	@Autowired
	public HomeController(RegisterRepository registerRepository)
	{
		this.registerRepository = registerRepository;
	}
	
	@RequestMapping(value="/{username}",method=GET)
	public String showUserNotes(@PathVariable String username, Model model)
	{
		User user = registerRepository.findByUsername(username);
		model.addAttribute(user);
		return "home";
	}
	
	//remember to delete this
	@RequestMapping(value="",method=GET)
	public String showUserNotes()
	{
		return "home";
	}
}