/**
 * Created by root on 15-1-22.
 */
var Url = {
    baidu: {
        hostname: 'api.map.baidu.com',
        searcherPath: "/place/v2/search?page_size=9&ak=T1E0HUvqvtFAsQMlP5il4ZgE&output=json&query=QUERY&scope=1&location=location_X,location_Y&radius=2000",
        directionPath: "/direction/v1?mode=transit&origin=ORIGIN&destination=DESTINATION&region=肇庆&output=json&ak=T1E0HUvqvtFAsQMlP5il4ZgE",
        convert:"/geoconv/v1/?coords=COORDS&from=3&to=5&ak=T1E0HUvqvtFAsQMlP5il4ZgE"
    }
};

module.exports = Url;