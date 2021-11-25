package de.uniks.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.uniks.backend.model.GenerateResult;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.fulib.workflows.html.HtmlGenerator3;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Controller
@CrossOrigin()
public class FulibWorkflowsController {

    Logger logger = LoggerFactory.getLogger(FulibWorkflowsController.class);

    @PostMapping(path = "/generate", consumes = MediaType.ALL_VALUE)
    @ResponseBody
    public String generate(@RequestBody String yamlData) {
        GenerateResult generateResult = generateFromYaml(yamlData);

        String answer = "";

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            answer = objectMapper.writeValueAsString(generateResult);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return answer;
    }

    private GenerateResult generateFromYaml(String yamlData) {
        GenerateResult generateResult = new GenerateResult();

        generateResult.setBoard(getBoardResult(yamlData));

        generateResult.setPages(getPagesResult(yamlData));

        generateResult.setNumberOfPages(generateResult.getPages().size());

        return generateResult;
    }

    @PostMapping(path = "/download", consumes = MediaType.ALL_VALUE, produces = "application/zip")
    public ResponseEntity<StreamingResponseBody> download(@RequestBody String yamlData) throws IOException {
        return ResponseEntity
                .ok()
                .header("Content-Disposition", "attachment; filename=\"test.zip\"")
                .body(out -> {
                    GenerateResult generateResult = generateFromYaml(yamlData);
                    //creating byteArray stream, make it bufforable and passing this buffor to ZipOutputStream
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(byteArrayOutputStream);
                    ZipOutputStream zipOutputStream = new ZipOutputStream(bufferedOutputStream);

                    //simple file list, just for tests
                    ArrayList<File> files = new ArrayList<>();

                    // Create Yaml file
                    File yamlFile = new File("workflow.yaml");
                    Files.writeString(Path.of(yamlFile.getPath()), generateResult.getBoard());
                    files.add(yamlFile);

                    // Create Board file
                    File boardFile = new File("board.html");
                    Files.writeString(Path.of(boardFile.getPath()), generateResult.getBoard());
                    files.add(boardFile);

                    for (int i = 1; i <= generateResult.getNumberOfPages(); i++) {
                        File mockupFile = new File(i + "_mockup.html");
                        Files.writeString(Path.of(mockupFile.getPath()), generateResult.getPages().get(i));
                        files.add(mockupFile);
                    }

                    //packing files
                    for (File file : files) {
                        //new zip entry and copying inputStream with file to zipOutputStream, after all closing streams
                        zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
                        FileInputStream fileInputStream = new FileInputStream(file);

                        IOUtils.copy(fileInputStream, zipOutputStream);

                        fileInputStream.close();
                        zipOutputStream.closeEntry();
                    }
                    zipOutputStream.finish();
                    zipOutputStream.flush();
                    IOUtils.closeQuietly(zipOutputStream);

                    IOUtils.closeQuietly(bufferedOutputStream);
                    IOUtils.closeQuietly(byteArrayOutputStream);
                });
    }

    private Map<Integer, String> getPagesResult(String yamlData) {
        Map<Integer, String> result = new HashMap<>();
        // TODO Not yet possible to get Pages via fulibWorkflows
        result.put(1, "Page 01");
        result.put(2, "Page 02");
        result.put(3, "Page 03");
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
