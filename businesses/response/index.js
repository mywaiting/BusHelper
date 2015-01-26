/**
 * Created by root on 15-1-24.
 */
function response(){};
response.responseText = function(req,content){
    var createTime = new Date().getTime();
    var xml = "<xml>\n" +
        "<ToUserName><![CDATA[" + req.body.FromUserName +"]]></ToUserName>\n" +
        "<FromUserName><![CDATA[" + req.body.ToUserName + "]]></FromUserName>\n" +
        "<CreateTime>" + createTime + "</CreateTime>\n" +
        "<MsgType><![CDATA[text]]></MsgType>\n" +
        "<Content><![CDATA[" + content +"]]></Content>\n" +
    "</xml>";
    return xml;
};
response.responseNews = function(json,data){
    var createTime = new Date().getTime();
    var xml = "<xml>\n" +
        "<ToUserName><![CDATA[" + json.FromUserName +"]]></ToUserName>\n" +
        "<FromUserName><![CDATA[" + json.ToUserName + "]]></FromUserName>\n" +
        "<CreateTime>" + createTime + "</CreateTime>\n" +
        "<MsgType><![CDATA[news]]></MsgType>\n" +
        "<ArticleCount>" + data.length + "</ArticleCount>\n" +
        "<Articles>\n";
    for(var name in data){
        xml += "<item>\n" +
            "<Title><![CDATA[" + data[name].Title + "]]></Title>\n" +
            "<Description><![CDATA[" + data[name].Description + "]]></Description>\n" +
            "<PicUrl><![CDATA[" + data[name].PicUrl + "]]></PicUrl>\n" +
            "<Url><![CDATA["+ data[name].Url + "]]></Url>\n" +
            "</item>\n";
    }
    xml += "</Articles>\n" +
        "</xml>";

    return xml;
};
module.exports = response;