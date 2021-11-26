package de.uniks.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.uniks.backend.model.GenerateResult;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.fulib.workflows.events.Board;
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
        BoardGenerator boardGenerator = new BoardGenerator();
        Board board = boardGenerator.generateBoardFromString(yamlData);

        String answer = "";

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            answer = objectMapper.writeValueAsString(board);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return answer;
    }
}
