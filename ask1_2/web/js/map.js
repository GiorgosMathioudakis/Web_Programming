/* global OpenLayers */

"use strict";
class myMap {
  constructor() {
    this.$output = $("#map-output");
    this.$map = $("#map");
    this.doubleButtonFlag = false;

    this.setUpEventListeners();

    // Check if geolocation is supported.
    if (navigator.geolocation) {
      $(".geolocation-btn").on("click", this.clickLocationFill.bind(this));
    } else {
      $(".geolocation-btn").hide();
    }
  }

  /**
   * @param {string} text
   */
  set output(text) {
    this.$output.get(0).innerHTML = text;
    this.showOutput();
  }
  // ____________________ Helpers _______________________
  hideOutput() {
    this.$output.hide();
  }

  showOutput() {
    this.$output.show();
  }

  hideMap() {
    if (this.map === undefined) return;
    if (this.map !== null) this.map.destroy();
    this.$map.css("display", "none");
  }

  showMap() {
    this.$map.css("display", "block");
  }

  hideFields() {
    this.hideMap();
    this.hideOutput();
  }

  // __________________ Map _________________________
  // Builds the object from the json and calls func.
  applyInLocation(url, func) {
    const that = this;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState !== xhr.DONE) return;
      var locationObj = JSON.parse(this.responseText);
      func(locationObj);
    });

    xhr.open("GET", url);
    xhr.setRequestHeader(
      "x-rapidapi-host",
      "forward-reverse-geocoding.p.rapidapi.com"
    );
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "47bbaedfb4msh4059ca98be2a018p196197jsn160648f6eea5"
    );
    xhr.send(null);
  }
  // Checks if the location is in crete and exists
  checkLocation(locationObj) {
    console.log(locationObj[0]);
    // Location not Recognized
    if (locationObj[0] === undefined) {
      this.output = "The location you have inputed is not recognized.";
      this.hideMap();
      return;
    }
    var address = locationObj[0]; // Get the first address found

    // Location outside of crete
    if (!address.display_name.includes("Crete")) {
      this.output = "This service is available only in Crete at the moment.";
      this.hideMap();
      return;
    }

    // If fields are correct then show the map-btn
    this.output = "<button id='map-btn' type='button'>Check Map</button>";
    $("#map-btn").on("click", this.mapButtonLogic.bind(this));
    $("#map-btn").on("click", this.mapHandler.bind(this));

    this.lat = address.lat;
    this.lon = address.lon;
  }
  // Button event listener
  mapButtonLogic() {
    if (this.doubleButtonFlag) {
      this.doubleButtonFlag = false;
      return;
    }
    if ($("#map-btn").hasClass("active")) {
      console.log("if");
      $("#map-btn").removeClass("active");
      $("#map-btn").get(0).innerHTML = "Check Map";
    } else {
      $("#map-btn").addClass("active");
      $("#map-btn").get(0).innerHTML = "Close Map";
    }
  }
  // Map handler
  mapHandler() {
    if ($("#map-btn").hasClass("active")) {
      this.hideMap();
      this.createMap();
      this.showMap();
      this.addMapMarkers();
      this.addView();
    } else {
      this.hideMap();
    }
  }
  // _________Map Helpers ______
  createMap() {
    this.map = new OpenLayers.Map("map");
    this.map.addLayer(new OpenLayers.Layer.OSM());
    this.map.addLayer(new OpenLayers.Layer.Markers("Markers"));
  }

  addMapMarkers() {
    var size = new OpenLayers.Size(21, 25);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
    var icon = new OpenLayers.Icon(
      "../ServletWithDatabaseConnection_Maven/assets/marker.png",
      size,
      offset
    );
    this.map.layers[1].addMarker(
      new OpenLayers.Marker(this.transformPosition(), icon)
    );
    this.map.setCenter(this.transformPosition(), 2);
  }

  addView() {
    this.map.setCenter(this.transformPosition(), 2);
  }

  transformPosition() {
    var fromProj = new OpenLayers.Projection("EPSG:4326");
    var toProj = new OpenLayers.Projection("EPSG:900913");
    return new OpenLayers.LonLat(this.lon, this.lat).transform(
      fromProj,
      toProj
    );
  }

  // _____________Fill_________________________________
  clickLocationFill() {
    $(".geolocation-btn").addClass("active");
    this.hideFields();
    navigator.geolocation.getCurrentPosition(
      this.geolocationHandler.bind(this)
    );
  }

  geolocationHandler(position) {
    var url =
      "https://nominatim.openstreetmap.org/reverse?format=geojson&lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude;
    this.applyInLocation(url, this.fillLocationForm.bind(this));

    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;

    this.createMap();
    this.showMap();
    this.addMapMarkers();
    this.addView();
  }

  fillLocationForm(locationObj) {
    var locationInfo = locationObj.features[0].properties.address;
    if (!locationInfo) {
      this.output = "Couldn't find your location";
      return;
    }
    $("#country").val(locationInfo.country);
    $("#city").val(locationInfo.state);
    $("#address").val(locationInfo.road + " " + locationInfo.house_number);
  }

  // ________________________ Event Listeners ________________________
  setUpEventListeners() {
    const that = this;

    // Trigger when a change is made in Country, City, address fields
    $("#address,#city,#country").on("blur", function () {
      var $country = $("#country").val();
      var $city = $("#city").val();
      var $address = $("#address").val();
      var $mapbtn = $("#map-btn").hasClass("active");
      var $fillbtn = $(".geolocation-btn").hasClass("active");

      // If any of the fields doesn't have value then return.
      if (!$country || !$city || !$address) {
        that.hideFields();
        return;
      }

      if ($mapbtn) {
        return;
      }

      if ($fillbtn) {
        that.hideMap();
        $(".geolocation-btn").removeClass("active");
      }

      // Requests the location based of country, city, address parses the JSON creating
      // a location object and calls checkLocation with that object.
      var location = $address + " " + $city + " " + $country;
      var url =
        "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q= " +
        location +
        "&accept-language=en&polygon_threshold=0.0";
      that.applyInLocation(url, that.checkLocation.bind(that));
    });
  }
}
