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
class Sharify {

	/*!
	 * Constructor
	 * @param {object} - The options for Sharify.
	*/ 
	constructor(options) {
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
			weibo: 'http://service.weibo.com/share/share.php?url=' + this.siteInfo.url + '&title=' + this.siteInfo.title + '&pic=' + this.siteInfo.image,
			wechat: 'javascript:;',
			qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.siteInfo.url + '&title=' + this.siteInfo.title + '&desc=' + this.siteInfo.description + '&summary=' + this.siteInfo.summary + '&site=' + this.siteInfo.source,
			qq: 'http://connect.qq.com/widget/shareqq/index.html?url=' + this.siteInfo.url + '&title=' + this.siteInfo.title + '&source=' + this.siteInfo.source + '&desc=' + this.siteInfo.description + '&pics=' + this.siteInfo.image + '&site=' + this.siteInfo.title,
			douban: 'http://shuo.douban.com/!service/share?href=' + this.siteInfo.url + '&name=' + this.siteInfo.title + '&text=' + this.siteInfo.description + '&image=' + this.siteInfo.image + '&starid=0&aid=0&style=11',
			diandian: 'http://www.diandian.com/share?lo=' + this.siteInfo.url + '&ti=' + this.siteInfo.title + '&type=link',
			linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title=' + this.siteInfo.title + '&url=' + this.siteInfo.url + '&summary=' + this.siteInfo.summary + '&source=' + this.siteInfo.source + '&armin=armin',
			facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + this.siteInfo.url,
			twitter: 'https://twitter.com/intent/tweet?text=' + this.siteInfo.title + '&url=' + this.siteInfo.url + '&via=' + this.siteInfo.siteOrigin,
			google: 'https://plus.google.com/share?url=' + this.siteInfo.url
		}
		// this._shareUrls = {
		// 	weibo: 'http://service.weibo.com/share/share.php?url={%url%}&title={%title%}&pic={%image%}',
		// 	wechat: 'javascript:;',
		// 	qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={%url%}&title={%title%}&desc={%description%}&summary={%summary%}&site={%source%}',
		// 	qq: 'http://connect.qq.com/widget/shareqq/index.html?url={%url%}&title={%title%}&source={%source%}&desc={%description%}',
		// 	douban: 'http://shuo.douban.com/!service/share?href={%url%}&name={%title%}&text={%description%}&image={%image%}&starid=0&aid=0&style=11',
		// 	diandian: 'http://www.diandian.com/share?lo={%url%}&ti={%title%}&type=link',
		// 	linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={%title%}&url={%url%}&summary={%summary%}&source={%source%}&armin=armin',
		// 	facebook: 'https://www.facebook.com/sharer/sharer.php?u={%url%}',
		// 	twitter: 'https://twitter.com/intent/tweet?text={%title%}&url={%url%}&via={%siteOrigin%}',
		// 	google: 'https://plus.google.com/share?url={%url%}'
		// }
		this.initialize();
	}

	/*!
	 * Initialize
	*/ 
	initialize() {
		// console.log(this.element);
		// console.log(this.defaults);
		// console.log(this.options);
		// console.log(this.data());
		this.renderIcons();
	}

	/*!
	 * Extend - Object copy.
	 * @param {object} - Source object.
	 * @param {object} - Target object.
	*/ 
	extend() {
		var i,
			len = arguments.length,
			property;
		for(i = len - 1; i > 0; i --) {
			if(typeof arguments[i] !== 'object') {
				throw Error('The parameter of the method extend() must be an object.');
			}
			for(property in arguments[i]) {
				arguments[i - 1][property] = arguments[i][property];
			}
		}
		return arguments[0];
	}

	/*!
	 * Query
	 * @param {string}
	*/ 
	renderIcons() {
		// let _split = String.prototype.split,
		// 	sites = _split.call(this.data().sites, ',');

		let sites = this.options.sites,
			i = 0,
			len = sites.length,
			fragment = document.createDocumentFragment(),
			_shareUrls = this._shareUrls;

		for (; i < len; i++) {
			let iconNode,
				name = sites[i],
				nameLower = name.toLowerCase();

			iconNode = document.createElement('a');
			// iconNode.setAttribute('href', 'http://www.baidu.com');
			iconNode.setAttribute('class', 'share-icon icon-' + nameLower);
			iconNode.setAttribute('title', name);
			iconNode.setAttribute('target', '_blank');
			// iconNode.text = name;

			iconNode.setAttribute('href', _shareUrls[nameLower]);

			fragment.appendChild(iconNode);
		}

		this.element.appendChild(fragment);
	}

	/*!
	 * getMeta
	 * @param {}
	*/ 
	getMeta(name) {
		let metas = document.getElementsByTagName('meta'),
			content,
			metaArray = Array.prototype.slice.call(metas),
			i = 0,
			len = metaArray.length;

		for (; i < len; i ++) {
			if (metaArray[i].getAttribute['name'] = name) {
				content = metaArray[i].content;
			}
		}
		return content;
	}

	/*!
	 * getImage
	 * @param {}
	*/ 
	getImage() {
		let body = document.getElementsByTagName('body')[0],
			image = body.getElementsByTagName('img')[0],
			src = image.src || image.getAttribute('src');
		return src || '';
	}

	/*!
	 * getSites
	 * @param {}
	*/ 
	getSites(url) {
		//
	}

	/*!
	 * Query
	 * @param {string}
	*/ 
	query(selector) {
		return document.querySelector(selector);
	}

	/*!
	 * Data - Get `data-*` data.
	*/ 
	data() {
		let element = this.element;
		return element.dataset;
	}
}
// }