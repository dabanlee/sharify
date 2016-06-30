(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('Sharify', factory) :
  (global.Sharify = factory());
}(this, function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  // utils/index.js

  function getMeta() {
      var metas = document.querySelectorAll('meta'),
          content = void 0,
          metaArray = Array.prototype.slice.call(metas);

      metaArray.map(function (item, index) {
          if (item.getAttribute['name'] == name) {
              content = item.content;
          }
      });
      return content;
  }

  function getImage() {
      var body = document.querySelector('body'),
          image = document.querySelector('img'),
          src = image.src || image.getAttribute('src');
      return src || '';
  }

  function query(selector) {
      return document.querySelector(selector);
  }

  function extend() {
      var i,
          len = arguments.length,
          property;
      for (i = len - 1; i > 0; i--) {
          if (_typeof(arguments[i]) !== 'object') {
              throw Error('The parameter of the method extend() must be an object.');
          }
          for (property in arguments[i]) {
              arguments[i - 1][property] = arguments[i][property];
          }
      }
      return arguments[0];
  }

  var Sharify = function () {
  	function Sharify(options) {
  		classCallCheck(this, Sharify);

  		this.defaults = {
  			element: '.share',
  			sites: ['weibo', 'qzone', 'qq', 'wechat', 'douban', 'linkedin', 'twitter', 'facebook', 'google', 'diandian']
  		};
  		this.siteInfo = {
  			url: location.href,
  			siteOrigin: location.origin,
  			source: document.title,
  			title: document.title,
  			description: getMeta('description'),
  			summary: getMeta('description'),
  			image: getImage()
  		};
  		this.options = extend({}, this.siteInfo, this.defaults, options);
  		this.element = query(this.options.element);
  		this.shareUrls = {
  			weibo: 'http://service.weibo.com/share/share.php?url=' + this.options.url + '&title=' + this.options.title + '&pic=' + this.options.image,
  			wechat: 'javascript:;',
  			qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.options.url + '&title=' + this.options.title + '&desc=' + this.options.description + '&summary=' + this.options.summary + '&site=' + this.options.source,
  			qq: 'http://connect.qq.com/widget/shareqq/index.html?url=' + this.options.url + '&title=' + this.options.title + '&source=' + this.options.source + '&desc=' + this.options.description + '&pics=' + this.options.image + '&site=' + this.options.title,
  			douban: 'http://shuo.douban.com/!service/share?href=' + this.options.url + '&name=' + this.options.title + '&text=' + this.options.description + '&image=' + this.options.image + '&starid=0&aid=0&style=11',
  			diandian: 'http://www.diandian.com/share?lo=' + this.options.url + '&ti=' + this.options.title + '&type=link',
  			linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title=' + this.options.title + '&url=' + this.options.url + '&summary=' + this.options.summary + '&source=' + this.options.source + '&armin=armin',
  			facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + this.options.url,
  			twitter: 'https://twitter.com/intent/tweet?text=' + this.options.title + '&url=' + this.options.url + '&via=' + this.options.siteOrigin,
  			pinterest: 'https://www.pinterest.com/pin/create/button/?url=' + this.options.url + '&media=' + this.options.image + '&description=' + this.options.description,
  			google: 'https://plus.google.com/share?url=' + this.options.url
  		};
  		this.initialize();
  	}

  	createClass(Sharify, [{
  		key: 'initialize',
  		value: function initialize() {
  			this.renderIcons();
  		}
  	}, {
  		key: 'renderIcons',
  		value: function renderIcons() {
  			var sites = this.options.sites,
  			    fragment = document.createDocumentFragment(),
  			    shareUrls = this.shareUrls,
  			    weChatIcon = void 0;

  			sites.map(function (name) {
  				var iconNode = void 0,
  				    nameLower = name.toLowerCase();

  				// determine whether surport this social network share component.
  				if (nameLower in shareUrls) {
  					iconNode = document.createElement('a');
  					iconNode.setAttribute('class', 'share-icon icon-' + nameLower);
  					iconNode.setAttribute('title', name);
  					iconNode.setAttribute('target', '_blank');
  					iconNode.setAttribute('href', shareUrls[nameLower]);
  					fragment.appendChild(iconNode);
  				} else {
  					throw new Error('Temporarily not supported ' + name + ' share.');
  				}
  			});

  			this.element.appendChild(fragment);
  			weChatIcon = query('.icon-wechat');
  			this.renderWeChat(weChatIcon);
  		}
  	}, {
  		key: 'renderWeChat',
  		value: function renderWeChat(target) {
  			var weChatQrCode = void 0,
  			    codeWrapper = void 0,

  			// Use Top Scan Qr Code API.
  			src = 'http://qr.topscan.com/api.php?text=' + this.siteInfo.url;

  			weChatQrCode = document.createElement('img');
  			codeWrapper = document.createElement('div');
  			weChatQrCode.setAttribute('src', src);
  			weChatQrCode.setAttribute('alt', 'WeChat Qr-Code');
  			codeWrapper.setAttribute('class', 'qr-code');
  			codeWrapper.appendChild(weChatQrCode);
  			target.appendChild(codeWrapper);
  		}
  	}]);
  	return Sharify;
  }();

  return Sharify;

}));
//# sourceMappingURL=sharify.js.map