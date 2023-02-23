package com.backend.controllers;


import com.backend.services.CurrencyService;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
        if (currencyService.getPlnGbpRate() > 0) {
            return ResponseEntity.ok().body(gson.toJson(currencyService.getPlnGbpRate()));
        }
        return ResponseEntity.status(404).body(gson.toJson("not found"));
    }
}
