package br.com.hiven.bank.security;

import br.com.hiven.bank.security.filter.AuthenticationFilter;
import br.com.hiven.bank.security.filter.AuthorizationFilter;
import br.com.hiven.bank.security.util.TokenJWTSecurity;
import br.com.hiven.bank.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {

    private static final String[] PUBLIC_MATCHERS = { "/h2-console/**", "/auth/**" };
    private static final String[] PUBLIC_MATCHERS_GET = { "/health/**" };
    private static final String[] PUBLIC_MATCHERS_POST = {  };

    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http, PasswordEncoder passwordEncoder, UserDetailsService userDetailsService) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, TokenJWTSecurity tokenJWTSecurity, UserDetailsService userDetailsService, UserService userService, PasswordEncoder passwordEncoder) throws Exception {
        http.cors().and().csrf().disable();
        http.authorizeHttpRequests()
                .requestMatchers(PUBLIC_MATCHERS).permitAll()
                .requestMatchers(
                        HttpMethod.GET, Arrays.toString(PUBLIC_MATCHERS_GET)).permitAll()
                .requestMatchers(HttpMethod.POST, Arrays.toString(PUBLIC_MATCHERS_POST)).permitAll()
                .anyRequest().authenticated();

        http.addFilter(new AuthenticationFilter(authenticationManagerBean(http, passwordEncoder, userDetailsService), tokenJWTSecurity, userService));
        http.addFilter(new AuthorizationFilter(authenticationManagerBean(http, passwordEncoder, userDetailsService), tokenJWTSecurity, userService, userDetailsService));

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }

}
