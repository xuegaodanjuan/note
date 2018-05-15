
package note.webController;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestMapping;

import note.LoginMsg;
import note.User;
import note.data.RegisterRepository;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	private RegisterRepository registerRepository;
	
	@Autowired
	public LoginController(RegisterRepository registerRepository)
	{
		this.registerRepository = registerRepository;
	}
	
	@RequestMapping(value= {"","/"}, method=GET)
	public String home(Model model) {
		return "login";
	}

	@RequestMapping(value= {"msg"},method=POST)
	public String processRegistration(@Valid LoginMsg loginMsg,Errors errors)
	{
		System.out.println(loginMsg.username);
		System.out.println(loginMsg.password);
		
		if(errors.hasErrors())
		{
			return "login";
		}
		
		User user = registerRepository.findByUsername(loginMsg.username);
		
		if(user.getId()==0)
		{
			return "login";
		}
		return "redirect:/home/" + user.getUsername();
	}
}
