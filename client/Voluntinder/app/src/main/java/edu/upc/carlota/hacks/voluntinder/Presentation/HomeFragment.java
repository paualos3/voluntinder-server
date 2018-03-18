package edu.upc.carlota.hacks.voluntinder.Presentation;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.upc.carlota.hacks.voluntinder.R;
import edu.upc.carlota.hacks.voluntinder.ServerConection.GetAsyncTask;
import edu.upc.carlota.hacks.voluntinder.Utils.Constants;

public class HomeFragment extends Fragment {

    private TextView companyName, position, time, location;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        View pantalla = inflater.inflate(R.layout.fragment_home, null);

        companyName = container.findViewById(R.id.cName);
        position = container.findViewById(R.id.pos);
        time = container.findViewById(R.id.time);
        location = container.findViewById(R.id.loca);
        Button reject = (Button) container.findViewById(R.id.reject);

        reject.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View view) {

                new Handler().postDelayed(new Runnable() {
                    public void run() {
                        view.findViewById(R.id.llayout1).setVisibility(View.GONE);
                        view.findViewById(R.id.llayout3).setVisibility(View.VISIBLE);
                    }
                }, 3000);
            }
        });
        Button accept = (Button) container.findViewById(R.id.accept);

        accept.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View view) {

                new Handler().postDelayed(new Runnable() {
                    public void run() {
                        view.findViewById(R.id.llayout1).setVisibility(View.GONE);
                        view.findViewById(R.id.llayout2).setVisibility(View.VISIBLE);
                    }
                }, 3000);
            }
        });

        searchOptions();

        return pantalla;

    }






    @SuppressLint("StaticFieldLeak")
    void searchOptions() {
        JSONObject Jason = new JSONObject();

        /*try {
            //Jason.put("lat", Constants.lat);
            //Jason.put("long", Constants.lng);
            //Jason.put("dist", 100000);
            Jason.put("position", 1);
        } catch (JSONException e) {
            e.printStackTrace();
        }*/

        new GetAsyncTask(Constants.URL + "api/position", this) {

            @Override
            protected void onPostExecute(JSONObject jsonObject) {

                try {
                    if (jsonObject.has("error")) {
                        String error = jsonObject.get("error").toString();
                        Log.i("asd123", "Error");
                    }

                    else if (jsonObject != null){
                        JSONArray ArrayProp = jsonObject.getJSONArray("arrayResponse");

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }.execute(Jason);
    }

}
