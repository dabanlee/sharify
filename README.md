# A share component to share your website on multiple third-party social networks
[![dependencies](https://david-dm.org/justclear/sharify.svg)](https://david-dm.org/justclear/sharify#info=dependencies&view=table)
[![devDependencies](https://david-dm.org/justclear/sharify/dev-status.svg)](https://david-dm.org/justclear/sharify#info=devDependencies&view=table)

## Demo

[Demo](http://justclear.github.io/sharify)

## Getting Started With Sliderify

### Install

```
bower install sharify
```

### Import CSS and JavaScript file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" href="./dist/css/sharify.min.css">
</head>
<body>

	<div class="share"></div>

	<script src="./dist/js/sliderify.min.js"></script>
	<script>
		var share = new Sharify({
			// Options
		});
	</script>
</body>
</html>
```

### Options

```javascript
var share = new Sharify({
	render: '.share',
	sites: ['weibo', 'qzone', 'qq', 'wechat', 'douban', 'linkedin', 'twitter', 'facebook', 'google']
});
```

### Todos

- Data surport
