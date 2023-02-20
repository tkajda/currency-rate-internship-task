package com.backend.controllers;


import com.backend.services.CurrencyService;
import com.google.gson.Gson;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class CurrencyController {

    private final Gson gson = new Gson();
    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @CrossOrigin
    @RequestMapping(value = "/rate", method = RequestMethod.GET)
    public ResponseEntity<String> getCurrentRate() {
        try {
            return ResponseEntity.ok().body(gson.toJson(currencyService.getCurrentGbpRate()));
        } catch (IOException | JSONException ex) {
            ex.printStackTrace();
        }
        return ResponseEntity.status(404).body(gson.toJson("not found"));
    }
}
