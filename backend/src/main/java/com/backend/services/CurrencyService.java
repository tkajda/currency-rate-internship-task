package com.backend.services;

import lombok.Getter;
import lombok.extern.java.Log;
import org.json.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;
import java.util.logging.Level;
import java.util.stream.Collectors;

@Service
@EnableScheduling
@Log
@Getter
public class CurrencyService {

    private double plnGbpRate = 0;

    @Scheduled(fixedDelay = 300_000)
    @Async
    public void retrieveData() {
        try {
            double tmp = getCurrentGbpRate();
            if (tmp < 0) {
                log.log(Level.WARNING, "Failed getting data: " + tmp);
                return;
            }
            plnGbpRate = tmp;
            log.log(Level.INFO, "Exchange rate: " + getCurrentGbpRate());
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
    }

    private double getCurrentGbpRate() throws IOException, JSONException {
        URL url = new URL("http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json");
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();
        switch (connection.getResponseCode()) {
            case 200, 201 -> {
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String string = br.lines().collect(Collectors.joining());
                return new JSONObject(string).getJSONArray("rates").getJSONObject(0).getDouble("mid");
            }
            default -> {
                return -1;
            }
        }
    }
}
