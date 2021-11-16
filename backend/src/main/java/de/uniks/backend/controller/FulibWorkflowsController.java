package de.uniks.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin()
public class FulibWorkflowsController {

    @PostMapping(path = "/generate", consumes = MediaType.ALL_VALUE)
    @ResponseBody
    String generate(@RequestBody String yamlData) {
        return yamlData;
    }
}
