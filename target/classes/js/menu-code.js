/*
    menu - code
*/
// 构造函数
function Code(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-terminal"><i/>\n        </div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Code.prototype = {
    constructor: Code,

    onClick: function onClick(e) {
        var editor = this.editor;
        var $startElem = editor.selection.getSelectionStartElem();
        var $endElem = editor.selection.getSelectionEndElem();
        var isSeleEmpty = editor.selection.isSelectionEmpty();
        var selectionText = editor.selection.getSelectionText();
        var $code = void 0;

        if (!$startElem.equal($endElem)) {
            // 跨元素选择，不做处理
            editor.selection.restoreSelection();
            return;
        }
        if (!isSeleEmpty) {
            // 选取不是空，用 <code> 包裹即可
            $code = $('<code>' + selectionText + '</code>');
            editor.cmd.do('insertElem', $code);
            editor.selection.createRangeByElem($code, false);
            editor.selection.restoreSelection();
            return;
        }

        // 选取是空，且没有夸元素选择，则插入 <pre><code></code></prev>
        if (this._active) {
            // 选中状态，将编辑内容
            this._createPanel($startElem.html());
        } else {
            // 未选中状态，将创建内容
            this._createPanel();
        }
    },

    _createPanel: function _createPanel(value) {
        var _this = this;

        // value - 要编辑的内容
        value = value || '';
        var type = !value ? 'new' : 'edit';
        var textId = getRandom('texxt');
        var btnId = getRandom('btn');

        var panel = new Panel(this, {
            width: 500,
            // 一个 Panel 包含多个 tab
            tabs: [{
                // 标题
                title: '插入代码',
                // 模板
                tpl: '<div>\n                        <textarea id="' + textId + '" style="height:145px;;">' + value + '</textarea>\n                        <div class="w-e-button-container">\n                            <button id="' + btnId + '" class="right">\u63D2\u5165</button>\n                        </div>\n                    <div>',
                // 事件绑定
                events: [
                    // 插入代码
                    {
                        selector: '#' + btnId,
                        type: 'click',
                        fn: function fn() {
                            var $text = $('#' + textId);
                            var text = $text.val() || $text.html();
                            text = replaceHtmlSymbol(text);
                            if (type === 'new') {
                                // 新插入
                                _this._insertCode(text);
                            } else {
                                // 编辑更新
                                _this._updateCode(text);
                            }

                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true;
                        }
                    }]
            } // first tab end
            ] // tabs end
        }); // new Panel end

        // 显示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 插入代码
    _insertCode: function _insertCode(value) {
        var editor = this.editor;
        editor.cmd.do('insertHTML', '<pre><code>' + value + '</code></pre><p><br></p>');
    },

    // 更新代码
    _updateCode: function _updateCode(value) {
        var editor = this.editor;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        $selectionELem.html(value);
        editor.selection.restoreSelection();
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        var $parentElem = $selectionELem.parent();
        if ($selectionELem.getNodeName() === 'CODE' && $parentElem.getNodeName() === 'PRE') {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};