class Utils
    constructor: ()->
    
Utils.xmlFilter = (xmlStr)->
    xmlStr = xmlStr.replace /&lt;/g, "<"
    xmlStr = xmlStr.replace /&gt;/g, ">"

    return xmlStr

Utils.mime = (req)->
    str = req.headers['content-type'] || ''
    i = str.indexOf ';' 
    
    if ~i
        return str.slice 0, i
    else
        return str

Utils.isArray = (obj)->
    if Object.prototype.toString.call(obj) == '[object Array]'
        return true
    else 
        return false

module.exports = Utils