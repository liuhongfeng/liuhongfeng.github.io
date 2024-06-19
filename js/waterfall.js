/* jshint asi:true */
// 先等图片都加载完成
// 再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function () {
	/**
	 * 内容JSON
	 */
	var demoContent = [
		{
			demo_link: 'https://gaohaoyang.github.io/threeJourney/23-rose/',
			img_link: 'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/pics/3d_rose.gif',
			code_link: 'https://github.com/Gaohaoyang/threeJourney/tree/main/src/23-rose',
			title: 'Three.js render 3D Rose',
			core_tech: 'Three.js WebGL',
			description: 'On the 5th anniversary, I use Three.js to render a rose for my wife.',
		  }
	];
	contentInit(demoContent) // 内容初始化
	waitImgsLoad() // 等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
	var htmlStr = ''
	for (var i = 0; i < content.length; i++) {
		htmlStr +=
			'<div class="grid-item">'
			+ ' <a class="a-img" href="' + content[i].demo_link + '">' + '<img src="' + content[i].img_link + '">' + '</a>'
			+ ' <h3 class="demo-title">' + ' <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '</h3>'
			+ ' <p>主要技术：' + content[i].core_tech + '</p>'
			+ ' <p>' + content[i].description + '</p>'
			+ ' <p> <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i> </a> </p>'
			+ '</div>'
	}
	var grid = document.querySelector('.grid')
	grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
	var imgs = document.querySelectorAll('.grid img')
	var totalImgs = imgs.length
	var count = 0
	//console.log(imgs)
	for (var i = 0; i < totalImgs; i++) {
		if (imgs[i].complete) {
			//console.log('complete');
			count++
		} else {
			imgs[i].onload = function () {
				// alert('onload')
				count++
				//console.log('onload' + count)
				if (count == totalImgs) {
					//console.log('onload---bbbbbbbb')
					initGrid()
				}
			}
		}
	}
	if (count == totalImgs) {
		//console.log('---bbbbbbbb')
		initGrid()
	}
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
	var msnry = new Masonry('.grid', {
		// options
		itemSelector: '.grid-item',
		columnWidth: 250,
		isFitWidth: true,
		gutter: 20
	})
}
