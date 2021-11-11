package de.uniks.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FulibWorkflowsController {

    @RequestMapping("/generateWorkflowBoard")
    @ResponseBody
    String generateWorkflowBoard() {
        return """
                <html lang="en">
                <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
                                
                body {
                    font-family: "Arial Narrow", Arial, sans-serif;
                }
                                
                .lane {
                    width: 3000px;
                    float: left;
                }
                                
                .box {
                    position: relative;
                    float: left;
                    margin: 6px;
                    padding: 12px;
                }
                                
                .placeholder {
                    opacity: 0.0;
                }
                                
                .event {
                    background-color: Orange;
                }
                                
                .page {
                    background-color: LightBlue;
                }
                                
                .command {
                    background-color: LightBlue;
                }
                                
                .data {
                    background-color: #FFA2FF;
                }
                                
                .user {
                    background-color: Yellow;
                }
                                
                .server {
                    background-color: Violet;
                }
                                
                .center {
                    text-align: center;
                }
                                
                .fa-rotate-45 {
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                    color: #FFA2FF;
                    font-size: 3em;
                }
                                
                .fa-cloud {
                    color: LightGrey;
                    font-size: 3em;
                }
                </style>
                <body>
                <div id="SmoothCase">
                    <div id="showSmoothCase">
                        <div id="SmoothCase" class="lane">
                            <div class="box">
                                <div class="center"><i class="fa fa-cogs"></i></div>
                                <div>SmoothCase</div>
                            </div>
                            <div class="box user">
                                <div class="center"><i class="fa fa-user"></i></div>
                                <div>somebody</div>
                            </div><div class="box event">
                                <div> product stored 12:01</div>
                                
                            </div><div class="box event">
                                <div> product offered 12:02</div>
                                
                            </div><div class="box event">
                                <div> product ordered 12:03</div>
                                
                            </div><div class="box event">
                                <div> order picked 12:04</div>
                                
                            </div><div class="box event">
                                <div> order delivered 12:05</div>
                                
                            </div>
                        </div>
                    </div>
                </div><div id="OutOfStock">
                    <div id="showOutOfStock">
                        <div id="OutOfStock" class="lane">
                            <div class="box">
                                <div class="center"><i class="fa fa-cogs"></i></div>
                                <div>OutOfStock</div>
                            </div>
                            <div class="box user">
                                <div class="center"><i class="fa fa-user"></i></div>
                                <div>somebody</div>
                            </div><div class="box event">
                                <div> product ordered 13:01</div>
                                
                            </div><div class="box event">
                                <div> order rejected 13:02</div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                </body>
                </html>
                """;
    }

    @RequestMapping("/generateWorkflowMockup")
    @ResponseBody
    String generateWorkflowMockup() {
        return """
                <form action="/page/12_14" method="get">
                   <p>make new offer</p>
                   <p><input id="product" name="product" placeholder="product?"></p>
                   <p><input id="price" name="price" placeholder="price?"></p>
                   <p><input id="event" name="event" type="hidden" value="add offer"></p>
                   <p><input id="ok" name="button" type="submit" value="ok"></p>
                </form>
                """;
    }
}
