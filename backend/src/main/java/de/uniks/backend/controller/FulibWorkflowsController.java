package de.uniks.backend.controller;

import org.fulib.workflows.html.HtmlGenerator3;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Controller
@CrossOrigin()
public class FulibWorkflowsController {

    Logger logger = LoggerFactory.getLogger(FulibWorkflowsController.class);

    @PostMapping(path = "/generate", consumes = MediaType.ALL_VALUE, produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    String generate(@RequestBody String yamlData) {
        String result = "";

        HtmlGenerator3 htmlGenerator3 = new HtmlGenerator3();
        try {
            File tempFile = File.createTempFile("test", ".yaml");

            Files.writeString(Path.of(tempFile.getPath()), yamlData);

            htmlGenerator3.generateViewFiles(tempFile.getPath(), "Testerino"); // TODO tmp file for now -> Write new method for direct data input in fulibWorkflows later

            tempFile.deleteOnExit();

            result = Files.readString(Path.of("./tmp/Testerino/TesterinoEventStorming.html"));

        } catch (IOException e) {
            logger.error(e.getMessage());
        }

        return result;
    }
}
