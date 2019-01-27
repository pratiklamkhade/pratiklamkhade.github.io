
var config = {
    apiKey: "AIzaSyBM-h92G6v1Ql0n1V0Z_WJtQYcDiRM4Ffs",
    authDomain: "demo2-d1c18.firebaseapp.com",
    databaseURL: "https://demo2-d1c18.firebaseio.com",
    projectId: "demo2-d1c18",
    storageBucket: "demo2-d1c18.appspot.com",
    messagingSenderId: "733347137730"
  };
  firebase.initializeApp(config); 
 
    var map;
    var dt;
    var dtstr;
    var marker=[];
    var flightPlanCoordinates=[];
    var flightPath;
    var coordinates=[];
    var infowindow;
    var contentString;
    var markers=[];
    var placeIdArray = [];
    var polylines = [];
    var snappedCoordinates = [];
    var pathValues=[];
    var path;
    
    /*for (var i = 0; i<=100; i++ )
    {
        var pathValues = 
    }*/
   
    function initialize () {
    var uluru = {lat: 19.21979, lng: 72.96651};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru,
      mapTypeId: 'terrain'
    }); 
    }

    var datedatabase = firebase.database(); 
    var dates = datedatabase.ref('Location');
    var locationdatabase = firebase.database(); 

    dates.on('value',getDate);
    function getDate(data){        
        var objDate = data.val();
        var dates = Object.keys(objDate);
            for (var j = 0; j <dates.length; j++) 
            {
                dt = dates[j];
                console.log(dates.length);
                console.log('Location/'+dt);
                               
                var ref = locationdatabase.ref('Location').child(dt);
                ref.on ("value",gotData,errData);
                function gotData(data){
                    var Loc = data.val();
                    var times = Object.keys(Loc);
                    for (var i = 0; i <times.length; i++) {
                        if(flightPlanCoordinates.length<=i){
                        var k = times[i];
                        //console.log(k);
                        var Latitude = Loc[k].Latitude;
                        var Longitude = Loc[k].Longitude;
                        //loc.push(data[i].Latitude,Longitude);
                        //console.log(k+" : "+Latitude,Longitude);  
                        //var node = document.createElement("LI");
                        //var textnode = document.createTextNode(k+" : "+Latitude+" , "+Longitude);
                        //node.appendChild(textnode);
                        //document.getElementById("myList").appendChild(node);
                       //console.log({lat:parseFloat(Latitude),lng:parseFloat(Longitude)});
                        console.log(parseFloat(Loc[k].Latitude),parseFloat(Loc[k].Longitude));
                        
                        pathValues.push(parseFloat(Loc[k].Latitude)+','+parseFloat(Loc[k].Longitude));                  //console.log(typeof loc[i]);
                        //console.log(loc[i]);
                        coordinates[i]={lat:parseFloat(Latitude),lng:parseFloat(Longitude)};
                       //console.log(coordinates[i]);
                       addMarker({
                            coords:coordinates[i],
                            content:'<div id="content">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<p><b>Location Details</b><br/>'+                  
                            'Date : ' +dt+'<br/>'+'Time : '+k+
                            '</div>'+
                            '</div>'
                        });
                        markers.push(addMarker[i]);
                        flightPlanCoordinates.push(coordinates[i]);
                        //addPath(flightPlanCoordinates);
                        //console.log(date);
                        
                        //console.log({lat: 19.21979, lng: 72.96651});
                        //addMarker(loc[i]);
                      
                       }    
                     

                    }
                 
                       /*for (var i = 0; i<=100; i++ )
                        {
                            var pathValues = ['coordinates[i].']
                        }*/

                }
                if(j = dates.length)
                {
                    runSnapToRoad(path);
                }
            }  
            console.log(flightPlanCoordinates);                     
            //pathvalues = [toString(flightPlanCoordinates[1].lat)+','+toString(flightPlanCoordinates[1].lng)];
            console.log(pathValues);  

        }
        
        function runSnapToRoad(path) {
            //var pathValues = ["19.22148,72.96690","19.22148,72.96684","19.22149,72.9668","19.22159,72.96659","19.22196,72.96694"];
  
  
            for (var i = 0; i < pathValues.length; i++) {
              //pathValues.push(path.getAt(i).toUrlValue());
              console.log('pathValues['+i+']: ' +pathValues[i]);
              //console.log(function() {return this.lat + " , " + this.lng;});
              //pathValues.push(pathValues[i].lat+','+pathValues[i].lng)

            }
            
           /* var myJSON = JSON.stringify(pathValues);
            console.log(JSON.parse(JSON.stringify(pathValues)));*/

            console.log('pathValues[str]: ' +pathValues.join('|'));
            console.log(typeof pathValues);
            console.log('https://roads.googleapis.com/v1/snapToRoads?'+'path='+pathValues.join('|')+
              '&interpolate=true'+'&key=AIzaSyBDouawghO54-ZLnZov-3nGo5NnC5BJrB4')

              $.get('https://roads.googleapis.com/v1/snapToRoads', {
                interpolate: true,
                key: "AIzaSyBDouawghO54-ZLnZov-3nGo5NnC5BJrB4",
                path: pathValues.join('|')
              }, function(data) {
                processSnapToRoadResponse(data);
                drawSnappedPolyline();
               
              });
          }
      function processSnapToRoadResponse(data) {
      snappedCoordinates = [];
      placeIdArray = [];
      for (var i = 0; i < data.snappedPoints.length; i++) {
        var latlng = new google.maps.LatLng(
            data.snappedPoints[i].location.latitude,
            data.snappedPoints[i].location.longitude);
        snappedCoordinates.push(latlng);
        placeIdArray.push(data.snappedPoints[i].placeId);
      }
    }
    function drawSnappedPolyline() {
        var snappedPolyline = new google.maps.Polyline({
          path: snappedCoordinates,
          strokeColor: 'black',
          strokeWeight: 3
        });
      
        snappedPolyline.setMap(map);
        polylines.push(snappedPolyline);
    }

    function addPath(coords)
    {
        var flightPath = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        flightPath.setMap(map);
    } 

    for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
    }


    function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          //icon:props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content
        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

             marker.addListener('mouseover', function(){
            infoWindow.open(map, marker);
          });
            marker.addListener('mouseout', function() {
            infoWindow.close(map, marker);
            });    
        }
    }
  
    function errData(error) {
        console.log("Something went wrong.");
        console.log(error);
    }
    $(window).load(initialize);