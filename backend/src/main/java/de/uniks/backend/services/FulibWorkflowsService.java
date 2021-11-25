package de.uniks.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.uniks.backend.model.GenerateResult;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.fulib.workflows.html.HtmlGenerator3;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class FulibWorkflowsService {
    Logger logger = LoggerFactory.getLogger(FulibWorkflowsService.class);

    public String generate(String yamlData) {
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


    public byte[] createZip(String yamlData) {
        GenerateResult generateResult = generateFromYaml(yamlData);

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream);

            // Yaml file
            createZipEntry(zipOutputStream, "workflow.es.yaml", yamlData);

            // Board file
            createZipEntry(zipOutputStream, "board.html", generateResult.getBoard());

            // Page files
            for (int i = 1; i <= generateResult.getNumberOfPages(); i++) {
                String fileName = i + "_mockup.html";
                createZipEntry(zipOutputStream, fileName, generateResult.getPages().get(i));
            }

            zipOutputStream.finish();
            zipOutputStream.flush();
            zipOutputStream.close();

            return byteArrayOutputStream.toByteArray();
        } catch (IOException ioe) {
            ioe.printStackTrace();
            logger.error(ioe.getMessage());
        }

        return null;
    }

    private void createZipEntry(ZipOutputStream zipOutputStream, String fileName, String data) throws IOException {
        ZipEntry zipEntry = new ZipEntry(fileName);
        zipOutputStream.putNextEntry(zipEntry);
        zipOutputStream.write(data.getBytes(StandardCharsets.UTF_8));
        zipOutputStream.closeEntry();
    }


    private GenerateResult generateFromYaml(String yamlData) {
        GenerateResult generateResult = new GenerateResult();

        generateResult.setBoard(getBoardResult(yamlData));

        generateResult.setPages(getPagesResult(yamlData));

        generateResult.setNumberOfPages(generateResult.getPages().size());

        return generateResult;
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

            htmlGenerator3.generateViewFiles(tempFile.getPath(), "Test"); // TODO tmp file for now -> Write new method for direct data input in fulibWorkflows later

            if (!tempFile.delete()) {
                logger.error("Could not delete tempFile");
            }

            result = Files.readString(Path.of("./tmp/Test/TestEventStorming.html"));

        } catch (IOException e) {
            logger.error(e.getMessage());
        }

        return result;
    }
}
