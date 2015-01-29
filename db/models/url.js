/**
 * Created by root on 15-1-22.
 */
var Url = {
    baidu: {
        hostname: 'api.map.baidu.com',
        searcherPath: "/place/v2/search?page_size=9&ak=T1E0HUvqvtFAsQMlP5il4ZgE&output=json&query=QUERY&scope=1&location=location_X,location_Y&radius=2000",
        directionPath: "/direction/v1?mode=transit&origin=ORIGIN&destination=DESTINATION&region=广州&output=json&ak=T1E0HUvqvtFAsQMlP5il4ZgE",
        convert:"/geoconv/v1/?coords=COORDS&from=3&to=5&ak=T1E0HUvqvtFAsQMlP5il4ZgE",
        currentPath:"/marker?location=LOCATION&title=我的位置&content=我的位置&output=html&src=src",
        walkDirection:"/direction?origin=latlng:ORIGIN|name:当前位置&destination=latlng:DESTINATION|name:NAME&mode=walking&region=广州&output=html&src=src"
    },
    server:{
        hostname:'120.24.80.233:80',
        walkDirection:'/walkDirection?origin=ORIGIN&destination=DESTINATION&name=NAME'
    }
};

module.exports = Url;

