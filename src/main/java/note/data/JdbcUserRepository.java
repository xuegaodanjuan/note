package note.data;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import note.User;
@Repository
public class JdbcUserRepository implements RegisterRepository
{
	private JdbcOperations jdbc;
	
	@Autowired
	public JdbcUserRepository(JdbcOperations jdbc)
	{
		this.jdbc = jdbc;
	}
	
	private static class UserRowMapper implements RowMapper<User>
	{
		public User mapRow(ResultSet rs,int rowNum) throws SQLException
		{
			return new User(
					rs.getLong("id"),
					rs.getString("username"),
					null,
					rs.getString("firstName"),
					rs.getString("lastName"),
					rs.getString("email")
					);
		}
	}
	
	public User save(User user)
	{
		jdbc.update("insert into User (username, password, firstName, lastName, email) values (?, ?, ?, ?, ?)",
				user.getUsername(),
				user.getPassword(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail()
				);
		return user; // TODO: Determine value for id
	}
	
	public User findByUsername(String username)
	{
		return jdbc.queryForObject("select id, username, null, firstName, lastName, email from User where username=?",
				new UserRowMapper(),
				username
				);
	}
}
