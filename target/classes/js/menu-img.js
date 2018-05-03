/*
    menu - img
*/
// 构造函数
function Image(editor) {
    this.editor = editor;
    var imgMenuId = getRandom('w-e-img');
    this.$elem = $('<div class="w-e-menu" id="' + imgMenuId + '"><i class="w-e-icon-image"><i/></div>');
    editor.imgMenuId = imgMenuId;
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Image.prototype = {
    constructor: Image,

    onClick: function onClick() {
        var editor = this.editor;
        var config = editor.config;
        if (config.qiniu) {
            return;
        }
        if (this._active) {
            this._createEditPanel();
        } else {
            this._createInsertPanel();
        }
    },

    _createEditPanel: function _createEditPanel() {
        var editor = this.editor;

        // id
        var width30 = getRandom('width-30');
        var width50 = getRandom('width-50');
        var width100 = getRandom('width-100');
        var delBtn = getRandom('del-btn');

        // tab 配置
        var tabsConfig = [{
            title: '编辑图片',
            tpl: '<div>\n                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">\u6700\u5927\u5BBD\u5EA6\uFF1A</span>\n                        <button id="' + width30 + '" class="left">30%</button>\n                        <button id="' + width50 + '" class="left">50%</button>\n                        <button id="' + width100 + '" class="left">100%</button>\n                    </div>\n                    <div class="w-e-button-container">\n                        <button id="' + delBtn + '" class="gray left">\u5220\u9664\u56FE\u7247</button>\n                    </dv>\n                </div>',
            events: [{
                selector: '#' + width30,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.css('max-width', '30%');
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }, {
                selector: '#' + width50,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.css('max-width', '50%');
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }, {
                selector: '#' + width100,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.css('max-width', '100%');
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }, {
                selector: '#' + delBtn,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.remove();
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }]
        }];

        // 创建 panel 并显示
        var panel = new Panel(this, {
            width: 300,
            tabs: tabsConfig
        });
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    _createInsertPanel: function _createInsertPanel() {
        var editor = this.editor;
        var uploadImg = editor.uploadImg;
        var config = editor.config;

        // id
        var upTriggerId = getRandom('up-trigger');
        var upFileId = getRandom('up-file');
        var linkUrlId = getRandom('link-url');
        var linkBtnId = getRandom('link-btn');

        // tabs 的配置
        var tabsConfig = [{
            title: '上传图片',
            tpl: '<div class="w-e-up-img-container">\n                    <div id="' + upTriggerId + '" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="' + upFileId + '" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>\n                    </div>\n                </div>',
            events: [{
                // 触发选择图片
                selector: '#' + upTriggerId,
                type: 'click',
                fn: function fn() {
                    var $file = $('#' + upFileId);
                    var fileElem = $file[0];
                    if (fileElem) {
                        fileElem.click();
                    } else {
                        // 返回 true 可关闭 panel
                        return true;
                    }
                }
            }, {
                // 选择图片完毕
                selector: '#' + upFileId,
                type: 'change',
                fn: function fn() {
                    var $file = $('#' + upFileId);
                    var fileElem = $file[0];
                    if (!fileElem) {
                        // 返回 true 可关闭 panel
                        return true;
                    }

                    // 获取选中的 file 对象列表
                    var fileList = fileElem.files;
                    if (fileList.length) {
                        uploadImg.uploadImg(fileList);
                    }

                    // 返回 true 可关闭 panel
                    return true;
                }
            }]
        }, // first tab end
            {
                title: '网络图片',
                tpl: '<div>\n                    <input id="' + linkUrlId + '" type="text" class="block" placeholder="\u56FE\u7247\u94FE\u63A5"/></td>\n                    <div class="w-e-button-container">\n                        <button id="' + linkBtnId + '" class="right">\u63D2\u5165</button>\n                    </div>\n                </div>',
                events: [{
                    selector: '#' + linkBtnId,
                    type: 'click',
                    fn: function fn() {
                        var $linkUrl = $('#' + linkUrlId);
                        var url = $linkUrl.val().trim();

                        if (url) {
                            uploadImg.insertLinkImg(url);
                        }

                        // 返回 true 表示函数执行结束之后关闭 panel
                        return true;
                    }
                }]
            } // second tab end
        ]; // tabs end

        // 判断 tabs 的显示
        var tabsConfigResult = [];
        if ((config.uploadImgShowBase64 || config.uploadImgServer || config.customUploadImg) && window.FileReader) {
            // 显示“上传图片”
            tabsConfigResult.push(tabsConfig[0]);
        }
        if (config.showLinkImg) {
            // 显示“网络图片”
            tabsConfigResult.push(tabsConfig[1]);
        }

        // 创建 panel 并显示
        var panel = new Panel(this, {
            width: 300,
            tabs: tabsConfigResult
        });
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor._selectedImg) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};