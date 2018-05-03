(
    function (global, factory)
    {
        if(typeof exports === 'object' && typeof module !== 'undefined')
        {
            module.exports = factory();
        }
        else if(typeof define === 'function' && define.amd )
        {
            define(factory);
        }
        else
        {

            global.createEditor = factory();
        }
    }
    (
        this,
        (
            function()
            {
                'use strict';
                // 检验是否浏览器环境
                try
                {
                    document;
                }
                catch (ex)
                {
                    throw new Error('请在浏览器环境下运行');
                }

                // polyfill
                //polyfill();
                var index = Editor;
                return index;
            }
        )
    )
);