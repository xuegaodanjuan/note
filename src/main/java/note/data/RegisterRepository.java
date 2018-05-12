package note.data;

import note.User;
public interface RegisterRepository 
{
	User save(User user);
	User findByUsername(String username);
}
