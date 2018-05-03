/*
    所有菜单的汇总
*/

// 存储菜单的构造函数
var MenuConstructors = {};
MenuConstructors.bold = Bold;
MenuConstructors.head = Head;
MenuConstructors.link = Link;
MenuConstructors.italic = Italic;
MenuConstructors.redo = Redo;
MenuConstructors.strikeThrough = StrikeThrough;
MenuConstructors.underline = Underline;
MenuConstructors.undo = Undo;
MenuConstructors.list = List;
MenuConstructors.justify = Justify;
MenuConstructors.foreColor = ForeColor;
MenuConstructors.backColor = BackColor;
MenuConstructors.quote = Quote;
MenuConstructors.code = Code;
MenuConstructors.emoticon = Emoticon;
MenuConstructors.table = Table;
//MenuConstructors.video = Video;
//MenuConstructors.image = Image;
/*
    菜单集合
*/
// 构造函数
function Menus(editor) {
    this.editor = editor;
    this.menus = {};
}

// 修改原型
Menus.prototype = {
    constructor: Menus,

    // 初始化菜单
    init: function init() {
        var _this = this;

        var editor = this.editor;
        var config = editor.config || {};
        var configMenus = config.menus || []; // 获取配置中的菜单

        // 根据配置信息，创建菜单
        configMenus.forEach(function (menuKey) {
            var MenuConstructor = MenuConstructors[menuKey];
            if (MenuConstructor && typeof MenuConstructor === 'function') {
                // 创建单个菜单
                _this.menus[menuKey] = new MenuConstructor(editor);
            }
        });

        // 添加到菜单栏
        this._addToToolbar();

        // 绑定事件
        this._bindEvent();
    },

    // 添加到菜单栏
    _addToToolbar: function _addToToolbar() {
        var editor = this.editor;
        var $toolbarElem = editor.$toolbarElem;
        var menus = this.menus;
        var config = editor.config;
        // config.zIndex 是配置的编辑区域的 z-index，菜单的 z-index 得在其基础上 +1
        var zIndex = config.zIndex + 1;
        objForEach(menus, function (key, menu) {
            var $elem = menu.$elem;
            if ($elem) {
                // 设置 z-index
                $elem.css('z-index', zIndex);
                $toolbarElem.append($elem);
            }
        });
    },

    // 绑定菜单 click mouseenter 事件
    _bindEvent: function _bindEvent() {
        var menus = this.menus;
        var editor = this.editor;
        objForEach(menus, function (key, menu) {
            var type = menu.type;
            if (!type) {
                return;
            }
            var $elem = menu.$elem;
            var droplist = menu.droplist;
            var panel = menu.panel;

            // 点击类型，例如 bold
            if (type === 'click' && menu.onClick) {
                $elem.on('click', function (e) {
                    if (editor.selection.getRange() == null) {
                        return;
                    }
                    menu.onClick(e);
                });
            }

            // 下拉框，例如 head
            if (type === 'droplist' && droplist) {
                $elem.on('mouseenter', function (e) {
                    if (editor.selection.getRange() == null) {
                        return;
                    }
                    // 显示
                    droplist.showTimeoutId = setTimeout(function () {
                        droplist.show();
                    }, 200);
                }).on('mouseleave', function (e) {
                    // 隐藏
                    droplist.hideTimeoutId = setTimeout(function () {
                        droplist.hide();
                    }, 0);
                });
            }

            // 弹框类型，例如 link
            if (type === 'panel' && menu.onClick) {
                $elem.on('click', function (e) {
                    e.stopPropagation();
                    if (editor.selection.getRange() == null) {
                        return;
                    }
                    // 在自定义事件中显示 panel
                    menu.onClick(e);
                });
            }
        });
    },

    // 尝试修改菜单状态
    changeActive: function changeActive() {
        var menus = this.menus;
        objForEach(menus, function (key, menu) {
            if (menu.tryChangeActive) {
                setTimeout(function () {
                    menu.tryChangeActive();
                }, 100);
            }
        });
    }
};