function response(){};
response.responseText = function(json,content){
    var createTime = new Date().getTime();
    var xml = "<xml>" +
        "<ToUserName><![CDATA[" + json.FromUserName +"]]></ToUserName>" +
        "<FromUserName><![CDATA[" + json.ToUserName + "]]></FromUserName>" +
        "<CreateTime>" + createTime + "</CreateTime>" +
        "<MsgType><![CDATA[text]]></MsgType>" +
        "<Content><![CDATA[" + content +"]]></Content>" +
    "</xml>";
    return xml;
};
response.responseNews = function(json,data){
    var createTime = new Date().getTime();
    var xml = "<xml>" +
        "<ToUserName><![CDATA[" + json.FromUserName +"]]></ToUserName>" +
        "<FromUserName><![CDATA[" + json.ToUserName + "]]></FromUserName>" +
        "<CreateTime>" + createTime + "</CreateTime>" +
        "<MsgType><![CDATA[news]]></MsgType>" +
        "<ArticleCount>" + data.length + "</ArticleCount>" +
        "<Articles>";
    for(var name in data){
        xml += "<item>" +
            "<Title><![CDATA[" + data[name].Title + "]]></Title>" +
            "<Description><![CDATA[" + data[name].Description + "]]></Description>" +
            "<PicUrl><![CDATA[" + data[name].PicUrl + "]]></PicUrl>" +
            "<Url><![CDATA["+ data[name].Url + "]]></Url>" +
            "</item>";
    }
    xml += "</Articles>" +
        "</xml>";

    return xml;
};
module.exports = response;