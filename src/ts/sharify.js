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
var Sharify = (function () {
    /*!
     * Constructor
     * @param {object} - The options for Sharify.
    */
    function Sharify(options) {
        this.defaults = {
            render: '.share',
            url: window.location.href,
            siteOrigin: window.location.origin
        };
        this.options = this.extend(this.defaults, options);
        this.element = document.querySelector(options.render);
        this._shareUrls = {
            weibo: 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}'
        };
        this.initialize();
    }
    /*!
     * Initialize
    */
    Sharify.prototype.initialize = function () {
        console.log(this.element);
        console.log(this.options.render);
        console.log(this.options.url);
        console.log(this.options.siteOrigin);
        console.log(this.data(this.element));
    };
    /*!
     * Extend - Object copy.
     * @param {object} - Source object.
     * @param {object} - Target object.
    */
    Sharify.prototype.extend = function (target, source) {
        for (var property in source) {
            target[property] = source[property];
        }
        return target;
    };
    /*!
     * Data - Get `data-*` data.
     * @param {object} - DOM object.
    */
    Sharify.prototype.data = function (element) {
        return element.dataset;
    };
    /*!
     * Data - Get `data-*` data.
     * @param {object} - DOM object.
    */
    Sharify.prototype.setUrl = function (url) {
        return element.dataset;
    };
    return Sharify;
})();
exports["default"] = Sharify;
// } 
