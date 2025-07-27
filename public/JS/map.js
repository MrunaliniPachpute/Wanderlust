function InitMap() {
  var map = new atlas.Map("myMap", {
    center: currShowListing.geometry.coordinates, //[long, lat]
    zoom: 12,
    language: "en-US",
    style : "road",
    authOptions: {
      authType: "subscriptionKey",
      subscriptionKey: mapToken,
    },
  });

  //Create an HTML marker and add it to the map.
  map.events.add("ready", function () {
    var marker = new atlas.HtmlMarker({
      color: "Red",
      text: "!",
      position: currShowListing.geometry.coordinates,
      popup: new atlas.Popup({
        content: `<div  style="padding:10px"><h4>${currShowListing.location},${currShowListing.country}</h4><p>Exact location will be provided after booking</p></div>`,
        pixelOffset: [0, -30],
      }),
    });

    map.markers.add(marker);

    //Add a click event to toggle the popup.
    map.events.add("click", marker, () => {
      marker.togglePopup();
    });
  });
}
