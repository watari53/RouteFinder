// This is a JavaScript file

console.log("route detail map js");

    function createMap(canvas_id) {
        console.log(2);
        var canvas_id = "#" + canvas_id;
        /* createMap()関数の記述 */ 
        /* 東京都の座標を指定 */
        var latlng = new google.maps.LatLng(35.681382,139.766084);
        // 地図のズーム値、センター位置、タイプを指定
        var mapOption = {
            zoom: 6,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        console.log(3);
        // 地図を作成
        map = new google.maps.Map($(canvas_id)[0], mapOption);
        console.log(4);
        
        google.maps.event.addListener(map, "tilesloaded", function() {
            connectingModal.hide();
        })
    
    };
    
    function createRoute(waypoints) {
        console.log(waypoints);
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        /* sample route data
        var request = { 
            origin: "高知駅", 
            destination: "高松駅",
            travelMode: google.maps.TravelMode.DRIVING
        };
        */
        
        var start = new google.maps.LatLng(waypoints[0][AlbumsArrayKey.LAT], waypoints[0][AlbumsArrayKey.LNG]); 
        var goal = new google.maps.LatLng(waypoints[waypoints.length-1][AlbumsArrayKey.LAT], waypoints[waypoints.length-1][AlbumsArrayKey.LNG]);
        var request = { 
            origin: start, 
            waypoints: [],
            destination: goal,
            travelMode: google.maps.TravelMode.DRIVING
        };        
        
        if (waypoints.length > 2) {
            var waypts = waypoints.slice(1,waypoints.length-1);
            for(var i=0; i<waypts.length;i++) {
                var waypt = waypts[i][AlbumsArrayKey.LAT] + "," + waypts[i][AlbumsArrayKey.LNG];
                console.log(waypt);
                request.waypoints.push({location: waypt});
            }
        }
        directionsService.route(request, function(result, status) { 
            if (status == google.maps.DirectionsStatus.OK) {  
                directionsRenderer.setDirections(result);
            } 
        }); 
        console.log(5);
    }
    
    function onError(positionError) {
        /* onError()関数の記述 */
        var code = positionError.code;
        switch(code) {
            case 1:
                errorMessage = '位置情報の取得がユーザーによって許可されていません。';
                break;
            case 2:
                errorMessage = '位置情報の取得が行えません。';
                break;
            case 3:
                errorMessage = '時間切れです。位置情報が利用できない可能性があります。';
                break;    
            default:
                errorMessage = 'エラーが発生しました。' + code;
        }
        ons.notification.alert({ message: errorMessage });
    }