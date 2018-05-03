/*
    menu - emoticon
*/
// 构造函数
function Emoticon(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-happy"><i/>\n        </div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Emoticon.prototype = {
    constructor: Emoticon,

    onClick: function onClick() {
        this._createPanel();
    },

    _createPanel: function _createPanel() {
        var _this = this;

        // 拼接表情字符串
        var faceHtml = '';
        var faceStr = '😀 😃 😄 😁 😆 😅 😂  😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁  😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐';
        faceStr.split(/\s/).forEach(function (item) {
            if (item) {
                faceHtml += '<span class="w-e-item">' + item + '</span>';
            }
        });

        var handHtml = '';
        var handStr = '🙌 👏 👋 👍 👎 👊 ✊ ️👌 ✋ 👐 💪 🙏 ️👆 👇 👈 👉 🖕 🖐 🤘 🖖';
        handStr.split(/\s/).forEach(function (item) {
            if (item) {
                handHtml += '<span class="w-e-item">' + item + '</span>';
            }
        });

        var panel = new Panel(this, {
            width: 300,
            height: 200,
            // 一个 Panel 包含多个 tab
            tabs: [{
                // 标题
                title: '表情',
                // 模板
                tpl: '<div class="w-e-emoticon-container">' + faceHtml + '</div>',
                // 事件绑定
                events: [{
                    selector: 'span.w-e-item',
                    type: 'click',
                    fn: function fn(e) {
                        var target = e.target;
                        _this._insert(target.innerHTML);
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            }, // first tab end
                {
                    // 标题
                    title: '手势',
                    // 模板
                    tpl: '<div class="w-e-emoticon-container">' + handHtml + '</div>',
                    // 事件绑定
                    events: [{
                        selector: 'span.w-e-item',
                        type: 'click',
                        fn: function fn(e) {
                            var target = e.target;
                            _this._insert(target.innerHTML);
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true;
                        }
                    }]
                } // second tab end
            ] // tabs end
        });

        // 显示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 插入表情
    _insert: function _insert(emoji) {
        var editor = this.editor;
        editor.cmd.do('insertHTML', '<span>' + emoji + '</span>');
    }
};