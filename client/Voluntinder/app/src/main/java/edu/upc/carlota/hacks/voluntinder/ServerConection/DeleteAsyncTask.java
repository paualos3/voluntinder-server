package edu.upc.carlota.hacks.voluntinder.ServerConection;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import edu.upc.carlota.hacks.voluntinder.Utils.Constants;
import edu.upc.carlota.hacks.voluntinder.Utils.Helpers;

public class DeleteAsyncTask extends AsyncTask<JSONObject, Void, JSONObject> {

    private URL url;
    private Context context;

    SharedPreferences prefs;
    String newAchievement="";

    public DeleteAsyncTask(String url2, Context coming_context) {
        try {
            url = new URL(url2);

        } catch (MalformedURLException e) {
            Log.v("DeleteAsyncTask", "", e);
        }
        context = coming_context;
    }
    public String getNewAchievement(){
        return newAchievement;
    }

    protected JSONObject doInBackground(final JSONObject... params) {
        try {
            prefs = context.getSharedPreferences(Constants.SH_PREF_NAME, Context.MODE_PRIVATE);
         //   prefs = MainActivity.getContextOfApplication().getSharedPreferences(SH_PREF_NAME, Context.MODE_PRIVATE);
            String tokenToSend = "";
            if (prefs.contains("token")){
                tokenToSend = prefs.getString("token","");
            }

            HttpsURLConnection client = (HttpsURLConnection) url.openConnection();
            client.setConnectTimeout(35000);
            client.setReadTimeout(35000);
            client.setRequestMethod("DELETE");
            client.setDoInput(true);
            client.setRequestProperty("Authorization", Constants.SH_PREF_NAME);

            JSONObject aux;

            Log.i("asdDeleteAsyncTask", Integer.toString(client.getResponseCode()));

            if (client.getResponseCode() >= 400){
                Log.i("asdDelete","error 400");
                Log.i("asdDelete", Helpers.iStreamToString(client.getErrorStream()));
                aux = new JSONObject(Helpers.iStreamToString(client.getErrorStream()));
            }

            else if(client.getResponseCode() == 302) {
                aux = new JSONObject();
                Log.i("asdGetTokenAsyncTask", "entra al 302");
                aux.put("302",client.getURL().toString());
            }
            else {
                aux = new JSONObject();
            }

            client.disconnect();

            return aux;
        } catch (IOException | JSONException e1) {
            e1.printStackTrace();
            Log.e("fds", e1.getMessage());
            Map<String, String> map = new HashMap<>();
            if(e1.getMessage().contains("failed to connect to")){
                if(e1.getMessage().contains("Network is unreachable")){
                    map.put("error", "Noconection");
                } else {
                    map.put("error", "Conectiontimeout");
                }
            } else {
                map.put("error", e1.getMessage());
            }
            return new JSONObject(map);
        }
    }
}
