package org.przepisy.backend.security;

import org.przepisy.backend.service.Impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import org.przepisy.backend.security.JwtAuthenticationEntryPoint;
import org.przepisy.backend.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthenticationEntryPoint unauthorizedHandler, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/recipes").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/recipes/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/recipes/*/comments").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/recipes/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/users/*/recipes").permitAll()
                        // Protected endpoints
                        .requestMatchers(HttpMethod.POST, "/api/recipes").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/recipes/*").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/recipes/*").authenticated()
                        .requestMatchers("/api/recipes/*/rate").authenticated()
                        .requestMatchers("/api/recipes/*/comments").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/comments/*").authenticated()
                        .requestMatchers("/api/users/me").authenticated()
                        // All other requests need authentication
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Specify exact origins or use patterns
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5174")); // Specify your frontend URL
        // Alternatively, use patterns if you have multiple local ports
        // configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
