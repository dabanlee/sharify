// @flow

import {
	getMeta,
	getImage,
	query,
	extend,
} from './utils/index.js';

export default class Sharify {
	constructor(options) {
		this.defaults = {
			element: '.share',
			sites: ['weibo', 'qzone', 'qq', 'wechat', 'douban', 'linkedin', 'twitter', 'facebook', 'google', 'pinterest',],
		};
		this.siteInfo = {
			url: location.href,
			siteOrigin: location.origin,
			source: document.title,
			title: document.title,
			description: getMeta('description'),
			summary: getMeta('description'),
			image: getImage(),
		};
		this.options = extend({}, this.siteInfo, this.defaults, options);
		this.element = query(this.options.element);
		this.shareUrls = {
			weibo: `http://service.weibo.com/share/share.php?url=${ this.options.url }&title=${this.options.title}&pic=${this.options.image}`,
			wechat: 'javascript:;',
			qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${ this.options.url }&title=${ this.options.title }&desc=${ this.options.description }&summary=${ this.options.summary }&site=${ this.options.source }`,
			qq: `http://connect.qq.com/widget/shareqq/index.html?url=${ this.options.url }&title=${ this.options.title }&source=${ this.options.source }&desc=${ this.options.description }&pics=${ this.options.image }&site=${ this.options.title }`,
			douban: `http://shuo.douban.com/!service/share?href=${ this.options.url }&name=${ this.options.title }&text=${ this.options.description }&image=${ this.options.image }&starid=0&aid=0&style=11`,
			linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${ this.options.title }&url=${ this.options.url }&summary=${ this.options.summary }&source=${ this.options.source }&armin=armin`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${ this.options.url }`,
			twitter: `https://twitter.com/intent/tweet?text=${ this.options.title }&url=${ this.options.url }&via=${ this.options.siteOrigin }`,
			pinterest: `https://www.pinterest.com/pin/create/button/?url=${ this.options.url }&media=${ this.options.image }&description=${ this.options.description }`,
			google: `https://plus.google.com/share?url=${ this.options.url }`,
		};
		this.initialize();
	}

	initialize() {
		this.renderIcons();
	}

	renderIcons() {
		let sites = this.options.sites,
			fragment = document.createDocumentFragment(),
			shareUrls = this.shareUrls,
			weChatIcon;

		sites.map((name) => {
			let iconNode,
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
				throw new Error(`Temporarily not supported ${ name } share.`);
			}
		});

		this.element.appendChild(fragment);
		weChatIcon = query('.icon-wechat');
		this.renderWeChat(weChatIcon);
	}

	renderWeChat(target) {
		let weChatQrCode,
			codeWrapper,
			// Use Top Scan Qr Code API.
			src = `http://qr.topscan.com/api.php?text=${ this.siteInfo.url }`;

		weChatQrCode = document.createElement('img');
		codeWrapper = document.createElement('div');
		weChatQrCode.setAttribute('src', src);
		weChatQrCode.setAttribute('alt', 'WeChat Qr-Code');
		codeWrapper.setAttribute('class', 'qr-code');
		codeWrapper.appendChild(weChatQrCode);
		target.appendChild(codeWrapper);
	}
}
