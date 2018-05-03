/*
    上传图片
*/

// 构造函数
function UploadImg(editor) {
    this.editor = editor;
}

// 原型
UploadImg.prototype = {
    constructor: UploadImg,

    // 根据 debug 弹出不同的信息
    _alert: function _alert(alertInfo, debugInfo) {
        var editor = this.editor;
        var debug = editor.config.debug;
        var customAlert = editor.config.customAlert;

        if (debug) {
            throw new Error('wangEditor: ' + (debugInfo || alertInfo));
        } else {
            if (customAlert && typeof customAlert === 'function') {
                customAlert(alertInfo);
            } else {
                alert(alertInfo);
            }
        }
    },

    // 根据链接插入图片
    insertLinkImg: function insertLinkImg(link) {
        var _this2 = this;

        if (!link) {
            return;
        }
        var editor = this.editor;
        var config = editor.config;

        // 校验格式
        var linkImgCheck = config.linkImgCheck;
        var checkResult = void 0;
        if (linkImgCheck && typeof linkImgCheck === 'function') {
            checkResult = linkImgCheck(link);
            if (typeof checkResult === 'string') {
                // 校验失败，提示信息
                alert(checkResult);
                return;
            }
        }

        editor.cmd.do('insertHTML', '<img src="' + link + '" style="max-width:100%;"/>');

        // 验证图片 url 是否有效，无效的话给出提示
        var img = document.createElement('img');
        img.onload = function () {
            var callback = config.linkImgCallback;
            if (callback && typeof callback === 'function') {
                callback(link);
            }

            img = null;
        };
        img.onerror = function () {
            img = null;
            // 无法成功下载图片
            _this2._alert('插入图片错误', 'wangEditor: \u63D2\u5165\u56FE\u7247\u51FA\u9519\uFF0C\u56FE\u7247\u94FE\u63A5\u662F "' + link + '"\uFF0C\u4E0B\u8F7D\u8BE5\u94FE\u63A5\u5931\u8D25');
            return;
        };
        img.onabort = function () {
            img = null;
        };
        img.src = link;
    },

    // 上传图片
    uploadImg: function uploadImg(files) {
        var _this3 = this;

        if (!files || !files.length) {
            return;
        }

        // ------------------------------ 获取配置信息 ------------------------------
        var editor = this.editor;
        var config = editor.config;
        var uploadImgServer = config.uploadImgServer;
        var uploadImgShowBase64 = config.uploadImgShowBase64;

        var maxSize = config.uploadImgMaxSize;
        var maxSizeM = maxSize / 1000 / 1000;
        var maxLength = config.uploadImgMaxLength || 10000;
        var uploadFileName = config.uploadFileName || '';
        var uploadImgParams = config.uploadImgParams || {};
        var uploadImgParamsWithUrl = config.uploadImgParamsWithUrl;
        var uploadImgHeaders = config.uploadImgHeaders || {};
        var hooks = config.uploadImgHooks || {};
        var timeout = config.uploadImgTimeout || 3000;
        var withCredentials = config.withCredentials;
        if (withCredentials == null) {
            withCredentials = false;
        }
        var customUploadImg = config.customUploadImg;

        if (!customUploadImg) {
            // 没有 customUploadImg 的情况下，需要如下两个配置才能继续进行图片上传
            if (!uploadImgServer && !uploadImgShowBase64) {
                return;
            }
        }

        // ------------------------------ 验证文件信息 ------------------------------
        var resultFiles = [];
        var errInfo = [];
        arrForEach(files, function (file) {
            var name = file.name;
            var size = file.size;

            // chrome 低版本 name === undefined
            if (!name || !size) {
                return;
            }

            if (/\.(jpg|jpeg|png|bmp|gif)$/i.test(name) === false) {
                // 后缀名不合法，不是图片
                errInfo.push('\u3010' + name + '\u3011\u4E0D\u662F\u56FE\u7247');
                return;
            }
            if (maxSize < size) {
                // 上传图片过大
                errInfo.push('\u3010' + name + '\u3011\u5927\u4E8E ' + maxSizeM + 'M');
                return;
            }

            // 验证通过的加入结果列表
            resultFiles.push(file);
        });
        // 抛出验证信息
        if (errInfo.length) {
            this._alert('图片验证未通过: \n' + errInfo.join('\n'));
            return;
        }
        if (resultFiles.length > maxLength) {
            this._alert('一次最多上传' + maxLength + '张图片');
            return;
        }

        // ------------------------------ 自定义上传 ------------------------------
        if (customUploadImg && typeof customUploadImg === 'function') {
            customUploadImg(resultFiles, this.insertLinkImg.bind(this));

            // 阻止以下代码执行
            return;
        }

        // 添加图片数据
        var formdata = new FormData();
        arrForEach(resultFiles, function (file) {
            var name = uploadFileName || file.name;
            formdata.append(name, file);
        });

        // ------------------------------ 上传图片 ------------------------------
        if (uploadImgServer && typeof uploadImgServer === 'string') {
            // 添加参数
            var uploadImgServerArr = uploadImgServer.split('#');
            uploadImgServer = uploadImgServerArr[0];
            var uploadImgServerHash = uploadImgServerArr[1] || '';
            objForEach(uploadImgParams, function (key, val) {
                val = encodeURIComponent(val);

                // 第一，将参数拼接到 url 中
                if (uploadImgParamsWithUrl) {
                    if (uploadImgServer.indexOf('?') > 0) {
                        uploadImgServer += '&';
                    } else {
                        uploadImgServer += '?';
                    }
                    uploadImgServer = uploadImgServer + key + '=' + val;
                }

                // 第二，将参数添加到 formdata 中
                formdata.append(key, val);
            });
            if (uploadImgServerHash) {
                uploadImgServer += '#' + uploadImgServerHash;
            }

            // 定义 xhr
            var xhr = new XMLHttpRequest();
            xhr.open('POST', uploadImgServer);

            // 设置超时
            xhr.timeout = timeout;
            xhr.ontimeout = function () {
                // hook - timeout
                if (hooks.timeout && typeof hooks.timeout === 'function') {
                    hooks.timeout(xhr, editor);
                }

                _this3._alert('上传图片超时');
            };

            // 监控 progress
            if (xhr.upload) {
                xhr.upload.onprogress = function (e) {
                    var percent = void 0;
                    // 进度条
                    var progressBar = new Progress(editor);
                    if (e.lengthComputable) {
                        percent = e.loaded / e.total;
                        progressBar.show(percent);
                    }
                };
            }

            // 返回数据
            xhr.onreadystatechange = function () {
                var result = void 0;
                if (xhr.readyState === 4) {
                    if (xhr.status < 200 || xhr.status >= 300) {
                        // hook - error
                        if (hooks.error && typeof hooks.error === 'function') {
                            hooks.error(xhr, editor);
                        }

                        // xhr 返回状态错误
                        _this3._alert('上传图片发生错误', '\u4E0A\u4F20\u56FE\u7247\u53D1\u751F\u9519\u8BEF\uFF0C\u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001\u662F ' + xhr.status);
                        return;
                    }

                    result = xhr.responseText;
                    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object') {
                        try {
                            result = JSON.parse(result);
                        } catch (ex) {
                            // hook - fail
                            if (hooks.fail && typeof hooks.fail === 'function') {
                                hooks.fail(xhr, editor, result);
                            }

                            _this3._alert('上传图片失败', '上传图片返回结果错误，返回结果是: ' + result);
                            return;
                        }
                    }
                    if (!hooks.customInsert && result.errno != '0') {
                        // hook - fail
                        if (hooks.fail && typeof hooks.fail === 'function') {
                            hooks.fail(xhr, editor, result);
                        }

                        // 数据错误
                        _this3._alert('上传图片失败', '上传图片返回结果错误，返回结果 errno=' + result.errno);
                    } else {
                        if (hooks.customInsert && typeof hooks.customInsert === 'function') {
                            // 使用者自定义插入方法
                            hooks.customInsert(_this3.insertLinkImg.bind(_this3), result, editor);
                        } else {
                            // 将图片插入编辑器
                            var data = result.data || [];
                            data.forEach(function (link) {
                                _this3.insertLinkImg(link);
                            });
                        }

                        // hook - success
                        if (hooks.success && typeof hooks.success === 'function') {
                            hooks.success(xhr, editor, result);
                        }
                    }
                }
            };

            // hook - before
            if (hooks.before && typeof hooks.before === 'function') {
                var beforeResult = hooks.before(xhr, editor, resultFiles);
                if (beforeResult && (typeof beforeResult === 'undefined' ? 'undefined' : _typeof(beforeResult)) === 'object') {
                    if (beforeResult.prevent) {
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        this._alert(beforeResult.msg);
                        return;
                    }
                }
            }

            // 自定义 headers
            objForEach(uploadImgHeaders, function (key, val) {
                xhr.setRequestHeader(key, val);
            });

            // 跨域传 cookie
            xhr.withCredentials = withCredentials;

            // 发送请求
            xhr.send(formdata);

            // 注意，要 return 。不去操作接下来的 base64 显示方式
            return;
        }

        // ------------------------------ 显示 base64 格式 ------------------------------
        if (uploadImgShowBase64) {
            arrForEach(files, function (file) {
                var _this = _this3;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    _this.insertLinkImg(this.result);
                };
            });
        }
    }
};