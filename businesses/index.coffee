js2xmlparser = require "js2xmlparser"
utils = require "./utils"

class Index
    constructor: ()->
    
    jsonToXml: (xmlStr, callback)->
        data = {
            "ToUserName": "<![CDATA[owWqluO0UiXVM0oBIDcDXF-TPYfs]]>",
            "FromUserName": "<![CDATA[CyrilZhao]]>",
            "CreateTime": parseInt((new Date()).getTime() / 1000),
            "MsgType": "<![CDATA[text]]>",
            "Content": "<![CDATA[你好，世界]]>"
        }

        xml = js2xmlparser "xml", data

        return utils.xmlFilter xml

module.exports = Index