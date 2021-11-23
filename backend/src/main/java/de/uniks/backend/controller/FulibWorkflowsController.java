package de.uniks.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.uniks.backend.model.GenerateResult;
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
import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin()
public class FulibWorkflowsController {

    Logger logger = LoggerFactory.getLogger(FulibWorkflowsController.class);

    @PostMapping(path = "/generate", consumes = MediaType.ALL_VALUE)
    @ResponseBody
    String generate(@RequestBody String yamlData) {
        GenerateResult generateResult = new GenerateResult();

        generateResult.setBoard(getBoardResult(yamlData));

        generateResult.setPages(getPagesResult(yamlData));

        generateResult.setNumberOfPages(generateResult.getPages().size());

        String answer = "";

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            answer = objectMapper.writeValueAsString(generateResult);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return answer;
    }

    private Map<Integer, String> getPagesResult(String yamlData) {
        Map<Integer, String> result = new HashMap<>();
        result.put(1, "Page 01");
        result.put(3, "Page 02");
        result.put(2, "Page 03");
        result.put(4, "Page 04");
        return result;
    }

    private String getBoardResult(String yamlData) {
        String result = "";

        HtmlGenerator3 htmlGenerator3 = new HtmlGenerator3();
        try {
            File tempFile = File.createTempFile("test", ".yaml");

            Files.writeString(Path.of(tempFile.getPath()), yamlData);

            htmlGenerator3.generateViewFiles(tempFile.getPath(), "Testerino"); // TODO tmp file for now -> Write new method for direct data input in fulibWorkflows later

            if (!tempFile.delete()) {
                logger.error("Could not delete tempFile");
            }

            result = Files.readString(Path.of("./tmp/Testerino/TesterinoEventStorming.html"));

        } catch (IOException e) {
            logger.error(e.getMessage());
        }

        return result;
    }
}
