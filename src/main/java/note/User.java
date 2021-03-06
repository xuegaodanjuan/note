package note;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Email;

import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;

@Getter
@Setter
@EqualsAndHashCode
public class User 
{
	private Long id;
	  
	@NotNull
	@Size(min=5, max=16, message="username must be between 5 and 16 characters long")
	private String username;

	@NotNull
	@Size(min=5, max=25, message="password must be between 5 and 25 characters long")
	private String password;
	  
	@NotNull
	@Size(min=2, max=30, message="firstName must be between 2 and 30 characters long")
	private String firstName;

	@NotNull
	@Size(min=2, max=30, message="lastName must be between 2 and 30 characters long")
	private String lastName;
	  
	@NotNull
	@Email(message="the entry in the Sender field must be a valid email address")
	private String email;

	public User() {this.id=(long)0;}
	  
	public User(String username, String password, String firstName, String lastName, String email) 
	{
		this(null, username, password, firstName, lastName, email);
	}
	public User(Long id, String username, String password, String firstName, String lastName, String email) 
	{
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	public User(User user)
	{
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
	}
	public void setUser(User user)
	{
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
	}
}
