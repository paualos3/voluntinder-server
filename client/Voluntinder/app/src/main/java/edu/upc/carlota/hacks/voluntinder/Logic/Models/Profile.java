package edu.upc.carlota.hacks.voluntinder.Logic.Models;

import java.util.Vector;

public class Profile {

    private Double lat;
    private Double lng;
    private String Name;
    private String imatge;
    private String born;
    private String bio;
    private String gender;
    private EmployHistory Histories;
    private Vector<String> Qualifications;

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getImatge() {
        return imatge;
    }

    public void setImatge(String imatge) {
        this.imatge = imatge;
    }

    public String getBorn() {
        return born;
    }

    public void setBorn(String born) {
        this.born = born;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public EmployHistory getHistories() {
        return Histories;
    }

    public void setHistories(EmployHistory histories) {
        Histories = histories;
    }

    public Vector<String> getQualifications() {
        return Qualifications;
    }

    public void setQualifications(Vector<String> qualifications) {
        Qualifications = qualifications;
    }
}
