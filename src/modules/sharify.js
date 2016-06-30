// @flow

export default class Sharify {

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
			description: this.getMeta('description'),
			summary: this.getMeta('description'),
			image: this.getImage()
		};
		this.options = this.extend({}, this.siteInfo, this.defaults, options);
		this.element = this.query(this.options.render);
		this._shareUrls = {
			weibo: `http://service.weibo.com/share/share.php?url=${ this.options.url }&title=${this.options.title}&pic=${this.options.image}`,
			wechat: 'javascript:;',
			qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${ this.options.url }&title=${ this.options.title }&desc=${ this.options.description }&summary=${ this.options.summary }&site=${ this.options.source }`,
			qq: `http://connect.qq.com/widget/shareqq/index.html?url=${ this.options.url }&title=${ this.options.title }&source=${ this.options.source }&desc=${ this.options.description }&pics=${ this.options.image }&site=${ this.options.title }`,
			douban: `http://shuo.douban.com/!service/share?href=${ this.options.url }&name=${ this.options.title }&text=${ this.options.description }&image=${ this.options.image }&starid=0&aid=0&style=11`,
			diandian: `http://www.diandian.com/share?lo=${ this.options.url }&ti=${ this.options.title }&type=link`,
			linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${ this.options.title }&url=${ this.options.url }&summary=${ this.options.summary }&source=${ this.options.source }&armin=armin`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${ this.options.url }`,
			twitter: `https://twitter.com/intent/tweet?text=${ this.options.title }&url=${ this.options.url }&via=${ this.options.siteOrigin }`,
			// pinterest: `https://www.pinterest.com/pin/create/button/?url=${ this.options.url }&media=${ this.options.image }&description=${ this.options.description }`,
			google: `https://plus.google.com/share?url=${ this.options.url }`
		}
		this.initialize();
	}

	initialize() {
		this.renderIcons();
	}

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

	renderIcons() {
		let sites = this.options.sites,
			i = 0,
			len = sites.length,
			fragment = document.createDocumentFragment(),
			_shareUrls = this._shareUrls,
			weChatElement;

		for (; i < len; i++) {
			let iconNode,
				name = sites[i],
				nameLower = name.toLowerCase();

			// determine whether surport this social network share component.
			if(nameLower in _shareUrls) {
				iconNode = document.createElement('a');
				iconNode.setAttribute('class', 'share-icon icon-' + nameLower);
				iconNode.setAttribute('title', name);
				iconNode.setAttribute('target', '_blank');
				iconNode.setAttribute('href', _shareUrls[nameLower]);

				fragment.appendChild(iconNode);
			} else {

				throw new Error(`Temporarily not supported ${ name } share.`);
			}
		}

		this.element.appendChild(fragment);

		weChatElement = this.query('.icon-wechat');
		this.renderWeChat(weChatElement);
	}

	renderWeChat(target) {
		let weChatNode,
			weChatQrCode,
			codeWrapper,
			// Use Top Scan Qr Code API.
			src = `http://qr.topscan.com/api.php?text=${ this.siteInfo.url }`;

		weChatQrCode = document.createElement('img');
		weChatQrCode.setAttribute('src', src);
		weChatQrCode.setAttribute('alt', 'WeChar Qr-Code');

		codeWrapper = document.createElement('div');
		codeWrapper.setAttribute('class', 'qr-code');

		codeWrapper.appendChild(weChatQrCode);

		target.appendChild(codeWrapper);
	}

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

	getImage() {
		let body = document.getElementsByTagName('body')[0],
			image = body.getElementsByTagName('img')[0],
			src = image.src || image.getAttribute('src');
		return src || '';
	}

	getSites(url) {
		//
	}

	query(selector) {
		return document.querySelector(selector);
	}

	data() {
		let element = this.element;
		return element.dataset;
	}
}
