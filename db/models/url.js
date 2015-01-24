/**
 * Created by root on 15-1-22.
 */
var Url = {
    baidu:{
        hostname:'api.map.baidu.com',
        searcherPath:"/place/v2/search?page_size=7&ak=T1E0HUvqvtFAsQMlP5il4ZgE&output=json&query=公交站&scope=1&location=location_X,location_Y&radius=2000",
        directionPath:"/direction/v1?mode=transit&origin=ORIGIN&destination=DESTINATION&region=肇庆&output=json&ak=T1E0HUvqvtFAsQMlP5il4ZgE"
    }
};

module.exports = Url;