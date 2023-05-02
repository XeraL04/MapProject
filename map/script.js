navigator.geolocation.getCurrentPosition(
    function (position) {
// console.log(position)

        const {latitude} = position.coords        
        const {longitude} = position.coords        

// console.log("longitude"+longitude, "latitude"+latitude);

        const coords = [latitude,longitude];
        // const coords = [longitude,latitude];

// console.log(coords)

        // let map = L.map("map").setView([36.7692618,3.0557265], 12);
        let map = L.map("map").setView(coords, 12);
        let tiles = L.esri.basemapLayer("Streets").addTo(map);

        // market 
        L.marker(coords).addTo(map);

        // create the geocoding control and add it to the map
      var searchControl = L.esri.Geocoding.geosearch({
        providers: [
          L.esri.Geocoding.arcgisOnlineProvider({
            // API Key to be passed to the ArcGIS Online Geocoding Service
            apikey: 'AAPK70232338b69c40f8af05a3cfade484778PYdmBWt00LRwBvMapYYiyqOihgzsRPf654GwGDs5__R7Vym5KBB6mWs0v6FuLdI'
          })
        ]
      }).addTo(map);

      // create an empty layer group to store the results and add it to the map
      var results = L.layerGroup().addTo(map);

      // listen for the results event and add every result to the map
      searchControl.on("results", function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        }
      });

    },
    function (){
        alert("Geolocation not provided")
    }
)