package de.uniks.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.uniks.backend.model.GenerateResult;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.fulib.workflows.generators.BoardGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
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


    public byte[] createZip(String yamlData, Map<String, String> queryParams) {
        GenerateResult generateResult = generateFromYaml(yamlData);

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream);

            // Yaml file
            if (queryParams.get("exportYaml").equals("true")) {
                createZipEntry(zipOutputStream, "workflow.es.yaml", yamlData);
            }

            // Board file
            if (queryParams.get("exportBoard").equals("true")) {
                createZipEntry(zipOutputStream, "board.html", generateResult.getBoard());
            }

            // Mockup Directory
            if (queryParams.get("exportPages").equals("true")) {
                zipOutputStream.putNextEntry(new ZipEntry("mockups/"));

                // Mockup files
                for (int i = 1; i <= generateResult.getNumberOfPages(); i++) {
                    String fileName = "mockups/" + i + "_mockup.html";
                    createZipEntry(zipOutputStream, fileName, generateResult.getPages().get(i));
                }
            }

            zipOutputStream.finish();
            zipOutputStream.flush();
            zipOutputStream.close();

            return byteArrayOutputStream.toByteArray();
        } catch (
                IOException ioe) {
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
        BoardGenerator boardGenerator = new BoardGenerator();

        Map<String, String> htmls = boardGenerator.generateAndReturnHTMLsFromString(yamlData);

        generateResult.setBoard(getBoardResult(htmls));

        generateResult.setPages(getPagesResult(htmls));

        generateResult.setNumberOfPages(generateResult.getPages().size());

        return generateResult;
    }

    private String getBoardResult(Map<String, String> htmls) {
        for (String key : htmls.keySet()) {
            if (key.contains("Board")) {
                return htmls.get(key);
            }
        }
        return "Nothing found";
    }

    private Map<Integer, String> getPagesResult(Map<String, String> htmls) {
        Map<Integer, String> result = new HashMap<>();

        for (String key : htmls.keySet()) {
            if (key.contains("_")) {
                int index = Integer.parseInt(key.substring(0, key.indexOf("_")));
                result.put(index + 1, htmls.get(key));
            }
        }

        return result;
    }
}
