package com.study.test.websocket.config;

import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
	@Override
	 public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/").setAllowedOrigins("*").withSockJS();
   }

}
