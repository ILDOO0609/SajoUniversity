package com.study.test.reply.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.reply.service.ReplyService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/reply")
public class ReplyController {
	@Resource(name="replyService")
	private ReplyService replyService;

}
