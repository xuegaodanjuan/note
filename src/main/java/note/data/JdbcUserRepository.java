package note.data;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;


import note.User;
@Repository
public class JdbcUserRepository extends JdbcDaoSupportExtend implements RegisterRepository 
{
	private JdbcOperations jdbc;
	private JdbcTemplate jdbcTemplate;
	

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
		System.out.println("i am in save");
		System.out.println("Username: "+user.getUsername());
		String id = "1";
		jdbc.update("insert into User (id, username, password, firstName, lastName, email) values (?, ?, ?, ?, ?, ?)",
				id,
				user.getUsername(),
				user.getPassword(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail()
				);
		return user;
	}
	
	public User save2(User user)
	{
		System.out.println("i am in save2");
		System.out.println("Username: "+user.getUsername());
		String id = "1";
		jdbcTemplate = this.getJdbcTemplate();
		
		int i=jdbcTemplate.update("insert into User (id, username, password, firstName, lastName, email) values (?, ?, ?, ?, ?, ?)",
				id,
				user.getUsername(),
				user.getPassword(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail()
				);
		System.out.println("inset result: "+ i);
		return user;
	}
	
	public User findByUsername(String username)
	{
		System.out.println("i am in findByUsername");
		jdbcTemplate = this.getJdbcTemplate();
		User resultUser = new User();
		try{
			resultUser.setUser(jdbcTemplate.queryForObject("select id, username, null, firstName, lastName, email from User where username=?", 
									                new RowMapper<User>(){  
									  
									                    public User mapRow(ResultSet rs,int rowNum) throws SQLException
														{
									                    	System.out.println("rowNum:"+rowNum);
									                    	User user = new User();
									                    	if(rowNum>=0)
									                    	{
									                    		System.out.println("--------------------------");
									                    		user.setId((long)1);
									                    		user.setUsername(rs.getString("username"));
									                    		user.setFirstName(rs.getString("firstName"));
									                    		user.setLastName(rs.getString("lastName"));
									                    		user.setEmail(rs.getString("email"));
									                    		System.out.println(rs.getString("username") + " findbyname");
									                    		System.out.println(rs.getString("firstName") + " findbyname");
									                    		System.out.println(rs.getString("lastName") + " findbyname");
									                    		System.out.println(rs.getString("email") + " findbyname");
									                    		System.out.println("--------------------------");
									                    	}
									                    	else
									                    	{
									                    		user.setId((long)0);
									                    	}

								                    		
															return user;
														} 
									                },
									                username
												  ));
		}
		 catch (Exception e) {
			 resultUser.setId((long)0);
			 System.out.println("i find no data");
		}
		
		System.out.println(resultUser.getUsername() + " findbyname finish");
		return resultUser;
	}
}
