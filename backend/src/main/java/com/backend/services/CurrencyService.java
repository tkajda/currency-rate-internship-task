package com.backend.services;

import org.json.*;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;
import java.util.stream.Collectors;

@Service
public class CurrencyService {

    public double getCurrentGbpRate() throws IOException, JSONException {
        URL url = new URL("http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json");
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();
        switch (connection.getResponseCode()) {
            case 200:
            case 201:
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String string = br.lines().collect(Collectors.joining());

                return new JSONObject(string).getJSONArray("rates").getJSONObject(0).getDouble("mid");
        }
        return 0;
    }
}
