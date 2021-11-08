package de.uniks.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GreetingsController {

    @RequestMapping("/hello")
    @ResponseBody
    String home() {
        return "Hello there!";
    }
}
