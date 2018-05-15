package note.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;

@Configuration
@EnableWebMvcSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter 
{
	@Override
	protected void configure(HttpSecurity http) throws Exception
	{
		http.formLogin().loginPage("/login")
			.and()
			.logout().logoutSuccessUrl("/")
			.and()
			.rememberMe()
				.tokenRepository(new InMemoryTokenRepositoryImpl())
				.tokenValiditySeconds(2419200)
				.key("MNOTEKEY")
			.and()
			.authorizeRequests()
				.antMatchers("/").authenticated()
				.antMatchers("/regist/me").authenticated()
				.antMatchers(HttpMethod.POST,"/login/msg").authenticated()
				.antMatchers(HttpMethod.POST,"/notes").authenticated()
				.anyRequest().permitAll();
	}
}
