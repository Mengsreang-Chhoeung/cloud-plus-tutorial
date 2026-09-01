package com.example.springboothello;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@Value("${app.message}")
	private String message;

	@GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
	public String hello() {
		return "<h1>" + message + "</h1><p>Served by Spring Boot on Run App.</p>";
	}

	@GetMapping("/health")
	public Map<String, String> health() {
		return Map.of("status", "ok");
	}

}
