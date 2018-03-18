package edu.upc.carlota.hacks.voluntinder.ServerConection;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import edu.upc.carlota.hacks.voluntinder.Presentation.HomeFragment;
import edu.upc.carlota.hacks.voluntinder.Utils.Constants;
import edu.upc.carlota.hacks.voluntinder.Utils.Helpers;

public class GetAsyncTask extends AsyncTask<JSONObject, Void, JSONObject> {
    private URL url;
    @SuppressLint("StaticFieldLeak")
    private HomeFragment context;

    SharedPreferences prefs;


    String newAchievement="";


    public GetAsyncTask(String url2, HomeFragment coming_context) {
        try {
            url = new URL(url2);
            context = coming_context;
        } catch (MalformedURLException e) {
            Log.i("asdGetTokenAsyncTask", "", e);
        }
    }
    public String getNewAchievement(){
        return newAchievement;
    }

    protected JSONObject doInBackground(final JSONObject... params) {

        //prefs = MainActivity.getContextOfApplication().getSharedPreferences(SH_PREF_NAME, Context.MODE_PRIVATE);
        //String tokenToSend = prefs.getString("token","");

        Log.i("asdGetTokenAsyncTask", "123");

        try {
            HttpsURLConnection client = (HttpsURLConnection) url.openConnection();
            client.setRequestMethod("GET");
            client.setRequestProperty("Authorization", Constants.SH_PREF_NAME);
            client.connect();

            newAchievement = client.getHeaderField("X-New-Achievements");

            JSONObject aux;
            String response = Helpers.iStreamToString(client.getInputStream());


            if (client.getResponseCode() >= 400){
                Log.i("asdGetTokenAsyncTask", "entra al 400");
                aux = new JSONObject(Helpers.iStreamToString(client.getErrorStream()));

            }

            else if (client.getResponseCode() == 302) {
                aux = new JSONObject();
                Log.i("asdGetTokenAsyncTask", "entra al 302");
                aux.put("302",client.getURL().toString());
            }

            else if (response.equals("[]")) {
                aux = new JSONObject();
                aux.put("arrayResponse",new JSONArray());
                Log.i("asdGetTokenAsyncTask", "entra al []");
            }

            else {
                if(response.startsWith("[")){
                    aux = new JSONObject();
                    aux.put("arrayResponse", new JSONArray(response));
                    Log.i("asdGetTokenAsyncTask", "entra al else");
                }
                else {
                    aux = new JSONObject(response);
                    Log.i("asdGetTokenAsyncTask", "entra al else2");
                }
            }

            client.disconnect();

            Log.i("asdGetTokenAsyncTask", "desconectat");
            Log.i("asdGetTokenAsyncTask", aux.toString());
            return aux;


        } catch (IOException | JSONException e) {
            Log.e("error", e.getMessage());
            e.printStackTrace();
            return null;

        }
    }
}