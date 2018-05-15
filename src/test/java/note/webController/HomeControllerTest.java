package note.webController;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import note.webController.HomeController;

public class HomeControllerTest {

	  @Test
	  public void testHomePage() throws Exception {
	    HomeController controller = new HomeController(null);
	    MockMvc mockMvc = standaloneSetup(controller).build();
	    mockMvc.perform(get("/"))
	           .andExpect(view().name("home"));
	  }

}
