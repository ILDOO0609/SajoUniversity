package com.study.test.rest_api;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequestMapping("/restApi")
@RestController
public class RestApi {
	 @GetMapping("/restApiAjax")
	    public Map<String, Object> getData() {
	        RestTemplate restTemplate = new RestTemplate();
	        String url = "http://localhost:5000/api/data"; // Replace with your Python API URL

	        // getForEntity method will make a GET request to the specified URL and return the response as Map
	        Map<String, Object> data = restTemplate.getForObject(url, Map.class);
	        System.out.println("@@@@@"+data);
	        return data;
	    }
}
