package com.example.carcircle.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/llm")
public class AnthropicProxyController {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/complete";

    @PostMapping("/claude")
    public ResponseEntity<?> proxyToClaude(@RequestBody Map<String, Object> payload) {
        String apiKey = System.getenv("ANTHROPIC_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "ANTHROPIC_API_KEY not configured on server environment"));
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // Anthropic typically accepts x-api-key header
        headers.set("x-api-key", apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(ANTHROPIC_ENDPOINT, request, String.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "Failed to contact Anthropic API", "details", e.getMessage()));
        }
    }
}
