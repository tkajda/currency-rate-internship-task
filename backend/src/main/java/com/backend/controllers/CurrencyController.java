package com.backend.controllers;


import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CurrencyController {

    private final Gson gson = new Gson();

    @CrossOrigin
    @RequestMapping(value = "/rate", method = RequestMethod.GET)
    public ResponseEntity<String> getCurrentRate() {
        return ResponseEntity.ok().body(gson.toJson("4.56"));
    }
}
