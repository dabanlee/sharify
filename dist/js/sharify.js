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
            url: window.location.href,
            siteOrigin: window.location.origin,
            source: document.title,
            description: ''
        };
        this.options = this.extend({}, this.defaults, options);
        this.element = this.query(this.options.render);
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
        console.log(this.defaults);
        console.log(this.options);
        console.log(this.data());
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
        var _split = String.prototype.split, sites = _split.call(this.data().sites, ',');
        console.log(sites);
        for (var site in sites) {
            var name_1 = sites[site], nameLower = name_1.toLowerCase(), 
            // iconNodeText = '<a class="share-icon icon-"' + name + '></a>',
            iconNode = document.createElement('a');
            iconNode.setAttribute('href', 'http://www.baidu.com');
            iconNode.setAttribute('class', 'share-icon icon-' + nameLower);
            iconNode.text = name_1;
            this.element.appendChild(iconNode);
        }
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
    /*!
     * setUrl
     * @param {}
    */
    Sharify.prototype.setUrl = function (url) {
        //
    };
    return Sharify;
})();
// } 
