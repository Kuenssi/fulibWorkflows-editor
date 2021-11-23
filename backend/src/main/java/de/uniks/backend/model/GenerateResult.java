package de.uniks.backend.model;

import java.util.Map;

public class GenerateResult {
    private String board;
    private Map<Integer, String> pages;
    private int numberOfPages;

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }

    public Map<Integer, String> getPages() {
        return pages;
    }

    public void setPages(Map<Integer, String> pages) {
        this.pages = pages;
    }

    public int getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(int numberOfPages) {
        this.numberOfPages = numberOfPages;
    }
}
