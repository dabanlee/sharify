/*!
 * A share component to share your website
 * on multiple third-party social networks.
 *
 * @Author: Clear
 * @Version: 1.0.0
 * @Update: 2015-12-31
 *
 * Powered By: TypeScript
 *
 * Released under the MIT license
 *
*/
// module Sharify {
// export default 
var Sharify = (function () {
    /*!
     * Constructor
     * @param {object} - The options for Sharify.
    */
    function Sharify(options) {
        this.defaults = {
            render: '.share',
            sites: ['weibo', 'qzone', 'qq', 'wechat', 'douban', 'linkedin', 'twitter', 'facebook', 'google', 'diandian']
        };
        this.siteInfo = {
            url: window.location.href,
            siteOrigin: window.location.origin,
            source: document.getElementsByTagName('title')[0].innerText || document.title,
            title: document.getElementsByTagName('title')[0].innerText || document.title,
            image: this.getImage(),
            description: this.getMeta('description'),
            summary: ''
        };
        this.options = this.extend({}, this.defaults, options);
        this.element = this.query(this.options.render);
        this._shareUrls = {
            weibo: "http://service.weibo.com/share/share.php?url=" + this.siteInfo.url + "&title=" + this.siteInfo.title + "&pic=" + this.siteInfo.image,
            wechat: 'javascript:;',
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + this.siteInfo.url + "&title=" + this.siteInfo.title + "&desc=" + this.siteInfo.description + "&summary=" + this.siteInfo.summary + "&site=" + this.siteInfo.source,
            qq: "http://connect.qq.com/widget/shareqq/index.html?url=" + this.siteInfo.url + "&title=" + this.siteInfo.title + "&source=" + this.siteInfo.source + "&desc=" + this.siteInfo.description + "&pics=" + this.siteInfo.image + "&site=" + this.siteInfo.title,
            douban: "http://shuo.douban.com/!service/share?href=" + this.siteInfo.url + "&name=" + this.siteInfo.title + "&text=" + this.siteInfo.description + "&image=" + this.siteInfo.image + "&starid=0&aid=0&style=11",
            diandian: "http://www.diandian.com/share?lo=" + this.siteInfo.url + "&ti=" + this.siteInfo.title + "&type=link",
            linkedin: "http://www.linkedin.com/shareArticle?mini=true&ro=true&title=" + this.siteInfo.title + "&url=" + this.siteInfo.url + "&summary=" + this.siteInfo.summary + "&source=" + this.siteInfo.source + "&armin=armin",
            facebook: "https://www.facebook.com/sharer/sharer.php?u=" + this.siteInfo.url,
            twitter: "https://twitter.com/intent/tweet?text=" + this.siteInfo.title + "&url=" + this.siteInfo.url + "&via=" + this.siteInfo.siteOrigin,
            google: "https://plus.google.com/share?url=" + this.siteInfo.url
        };
        this.initialize();
    }
    /*!
     * Initialize
    */
    Sharify.prototype.initialize = function () {
        // console.log(this.element);
        // console.log(this.defaults);
        // console.log(this.options);
        // console.log(this.data());
        this.renderIcons();
    };
    /*!
     * Extend - Object copy.
     * @param {object} - Source object.
     * @param {object} - Target object.
    */
    Sharify.prototype.extend = function () {
        var i, len = arguments.length, property;
        for (i = len - 1; i > 0; i--) {
            if (typeof arguments[i] !== 'object') {
                throw Error('The parameter of the method extend() must be an object.');
            }
            for (property in arguments[i]) {
                arguments[i - 1][property] = arguments[i][property];
            }
        }
        return arguments[0];
    };
    /*!
     * Query
     * @param {string}
    */
    Sharify.prototype.renderIcons = function () {
        // let _split = String.prototype.split,
        // 	sites = _split.call(this.data().sites, ',');
        var sites = this.options.sites, i = 0, len = sites.length, fragment = document.createDocumentFragment(), _shareUrls = this._shareUrls, weChatElement;
        for (; i < len; i++) {
            var iconNode = void 0, name_1 = sites[i], nameLower = name_1.toLowerCase();
            iconNode = document.createElement('a');
            // iconNode.setAttribute('href', 'http://www.baidu.com');
            iconNode.setAttribute('class', 'share-icon icon-' + nameLower);
            iconNode.setAttribute('title', name_1);
            iconNode.setAttribute('target', '_blank');
            // iconNode.text = name;
            iconNode.setAttribute('href', _shareUrls[nameLower]);
            fragment.appendChild(iconNode);
        }
        this.element.appendChild(fragment);
        weChatElement = this.query('.icon-wechat');
        this.renderWeChat(weChatElement);
    };
    /*!
     * renderWeChat
     * @param {}
    */
    Sharify.prototype.renderWeChat = function (target) {
        var weChatNode, weChatQrCode, codeWrapper, 
        // Use Top Scan Qr Code API.
        src = "http://qr.topscan.com/api.php?text=" + this.siteInfo.url;
        weChatQrCode = document.createElement('img');
        weChatQrCode.setAttribute('src', src);
        weChatQrCode.setAttribute('alt', 'WeChar Qr-Code');
        codeWrapper = document.createElement('div');
        codeWrapper.setAttribute('class', 'qr-code');
        codeWrapper.appendChild(weChatQrCode);
        target.appendChild(codeWrapper);
    };
    /*!
     * getMeta
     * @param {}
    */
    Sharify.prototype.getMeta = function (name) {
        var metas = document.getElementsByTagName('meta'), content, metaArray = Array.prototype.slice.call(metas), i = 0, len = metaArray.length;
        for (; i < len; i++) {
            if (metaArray[i].getAttribute['name'] = name) {
                content = metaArray[i].content;
            }
        }
        return content;
    };
    /*!
     * getImage
     * @param {}
    */
    Sharify.prototype.getImage = function () {
        var body = document.getElementsByTagName('body')[0], image = body.getElementsByTagName('img')[0], src = image.src || image.getAttribute('src');
        return src || '';
    };
    /*!
     * getSites
     * @param {}
    */
    Sharify.prototype.getSites = function (url) {
        //
    };
    /*!
     * Query
     * @param {string}
    */
    Sharify.prototype.query = function (selector) {
        return document.querySelector(selector);
    };
    /*!
     * Data - Get `data-*` data.
    */
    Sharify.prototype.data = function () {
        var element = this.element;
        return element.dataset;
    };
    return Sharify;
})();
// } 
