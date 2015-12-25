var aCate = [{
		'id' : -1,
		'name' : '默认分类',
		'child' : [-1]
}];
var aSubCate = [{
		'id' : -1,
		'pid' : -1,
		'name' : '默认子分类',
		'child' : [-1]	
}];
var aMission = [{
		'id' : -1,
		'pid' : -1,
		'name' : '使用说明',
		'date' : '2015-12-24',
		'finish' : true,
		'content' : '第一个做的综合项目<br/>version 1:实现的方法是纯DOM的操作，没有任何js编程思路<br/>version 2：参考别人的代码，他用到的思路是将业务数据用json封装起来，然后按照CURL写了几个操作数据的方法。数据操作和视图操作分得很清楚，挺受启发的。这里的MVC不是很明显，但是思路是很明显的，而且他写的代码可读性高。'
}];

/*
 *数据库的思想：
 	数据存储格式
	数据处理方法：CURL
 */

//---------------query------------
/*
 * 添加分类
 * @param {number} */