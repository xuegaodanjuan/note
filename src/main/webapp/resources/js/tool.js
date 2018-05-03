/*
工具
*/

// 和 UA 相关的属性
var UA =
{
    _ua: navigator.userAgent,

    // 是否 webkit
    isWebkit: function isWebkit()
    {
        var reg = /webkit/i;
        return reg.test(this._ua);
    },

    // 是否 IE
    isIE: function isIE()
    {
        return 'ActiveXObject' in window;
    }
};

// 遍历对象
function objForEach(obj, fn)
{
    var key = void 0,
        result = void 0;
    for (key in obj)
    {
        if (obj.hasOwnProperty(key))
        {
            result = fn.call(obj, key, obj[key]);
            if (result === false)
            {
                break;
            }
        }
    }
}

// 遍历类数组
function arrForEach(fakeArr, fn)
{
    var i = void 0,
        item = void 0,
        result = void 0;
    var length = fakeArr.length || 0;
    for (i = 0; i < length; i++)
    {
        item = fakeArr[i];
        result = fn.call(fakeArr, item, i);
        if (result === false)
        {
            break;
        }
    }
}

// 获取随机数
function getRandom(prefix)
{
    return prefix + Math.random().toString().slice(2);
}

// 替换 html 特殊字符
function replaceHtmlSymbol(html)
{
    if (html == null)
    {
        return '';
    }
    return html.replace(/</gm, '&lt;').replace(/>/gm, '&gt;').replace(/"/gm, '&quot;');
}

// 返回百分比的格式