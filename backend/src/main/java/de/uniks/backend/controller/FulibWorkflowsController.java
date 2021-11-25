package de.uniks.backend.controller;

import de.uniks.backend.services.FulibWorkflowsService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin()
public class FulibWorkflowsController {
    FulibWorkflowsService fulibWorkflowsService = new FulibWorkflowsService();

    @PostMapping(path = "/generate", consumes = MediaType.ALL_VALUE)
    @ResponseBody
    public String generate(@RequestBody String yamlData) {
        return fulibWorkflowsService.generate(yamlData);
    }

    @PostMapping(path = "/download", consumes = MediaType.ALL_VALUE, produces = "application/zip")
    @ResponseBody
    public byte[] download(@RequestBody String yamlData) {
        return fulibWorkflowsService.createZip(yamlData);
    }
}
