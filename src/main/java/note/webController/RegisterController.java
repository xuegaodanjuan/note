package note.webController;

import static org.springframework.web.bind.annotation.RequestMethod.*;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import note.User;
import note.data.RegisterRepository;

@Controller
@RequestMapping("/note")
public class RegisterController 
{
	private RegisterRepository registerRepository;
	
	@Autowired
	public RegisterController(RegisterRepository registerRepository)
	{
		this.registerRepository = registerRepository;
	}
	
	@RequestMapping(value="/register", method=GET)
	public String showRegistrationForm(Model model) 
	{
	    model.addAttribute(new User());
	    return "registerForm";
	}
	
	@RequestMapping(value="/register",method=POST)
	public String processRegistration(@Valid User user,Errors errors)
	{
		if(errors.hasErrors())
		{
			return "registerForm";
		}
		registerRepository.save(user);
		return "redirect:/note/" + user.getUsername();
	}
	
	@RequestMapping(value="/{username}",method=GET)
	public String showUserProfile(@PathVariable String username, Model model)
	{
		User user = registerRepository.findByUsername(username);
		model.addAttribute(user);
		return "profile";
	}
	
}