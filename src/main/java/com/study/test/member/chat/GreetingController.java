package com.study.test.member.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.study.test.member.service.memberService;

import jakarta.annotation.Resource;


@Controller
public class GreetingController {
	
	
	@Resource(name = "memberService")
	private memberService memberService;
	
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
    	
        String content = HtmlUtils.htmlEscape(message.getName() + " : ");
        return new Greeting(content);
    }

   
}
