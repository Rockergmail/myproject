var currentCateId = 0;
var currentSubCateId = 0;
var currentMissionId = 0;

var aCate = [{
		'id' : 0,
		'name' : '默认分类',
		'child' : [0]
}];
var aSubCate = [{
		'id' : 0,
		'pid' : 0,
		'name' : '默认子分类',
		'child' : [0]	
}];
var aMission = [{
		'id' : 0,
		'pid' : 0,
		'name' : '使用说明',
		'date' : '2015-12-24',
		'finish' : true,
		'content' : '第一个做的综合项目<br/>version 1:实现的方法是纯DOM的操作，没有任何js编程思路<br/>version 2：参考别人的代码，他用到的思路是将业务数据用json封装起来，然后按照CURL写了几个操作数据的方法。数据操作和视图操作分得很清楚，挺受启发的。这里的MVC不是很明显，但是思路是很明显的，而且他写的代码可读性高。'
}];

//---------------init database--------------

/*
 *数据库的思想：
 	数据存储格式
	数据处理方法：CURL
 */

//---------------query------------
/*
 * 返回主分类的名字，用来检查名字唯一性
 * @return {Array} 主分类名字的数组
 */
function queryCateNames(){
	var cateNames = [];
	for(var i = 0; i < aCate.length; i++){
		cateNames.push(aCate[i].name);
	}
	return cateNames;
}

/*
 * 返回子分类的名字，用来检查名字唯一性
 * @param {Number} pid 对应主分类的ID
 * @return {Array} 子分类名字的数组
 */
function querySubCateNames(pid){
	var subCateNames = [];
	console.log(pid);
	for(var i = 0; i < aCate[pid].child.length; i++){
		subCateNames.push(aSubCate[aCate[pid].child[i]].name);
	}
	return subCateNames;
}

function queryMissionNames(pid){
	var missionNames = [];
	for(var i = 0; i < aSubCate[pid].length; i++){
		missionNames.push(aMission[i].name);
	}
	return missionNames;
}

//---------------add--------------
/*
 * 添加主分类
 * @param {String} name 主分类名
 */
function addCate(name){
	var cateNames = queryCateNames();
	if(!name){
		console.log('cate name undefined');
	} else {
		//检查名字唯一性
		for(var i = 0; i < aCate.length; i++){
			if(name === cateNames[i]){
				alert("该名字已存在");
				return 'conflict';
			}
		}
		//插入主分类
		aCate.push({
			'id' : aCate[aCate.length - 1].id + 1,
			'name' : name,
			'child' : []
		});

		initCates();
	}
}
/*
 * 添加子分类
 * @param {Number} pid 对应主分类的ID
 * @param {String} name 主分类名
 */
function addSubCate(pid, name){
	var subCateNames = querySubCateNames(pid);
	var subCateId = aSubCate[aSubCate.length - 1].id + 1;
	console.log(pid);
	console.log(name);
	if(!pid && !name){
		console.log('pid or name undefined');
	} else {
		// 检查名字唯一性
		for(var i = 0; i < subCateNames.length; i++){
			if(name === subCateNames[i]){
				alert("名字已存在");
				return 'conflict';
			}
		}
		//插入子分类
		aSubCate.push({
			'id' : subCateId,
			'pid' : pid,
			'name' : name,
			'child' : []
		});	

		aCate[pid].child.push(subCateId);

		initCates();
	}
	
}
/*
 * 添加任务
 * @param {Number} pid 对应主分类的ID
 * @param {String} name 任务名
 * @param {Date} date 日期
 * @param {String} content 内容
 */
function addMission(pid, name, date, content){
	var missionNames = queryMissionNames(pid);
	if(!pid || !name){
		console.log('pid or name undefined');
	}  else {
		//检查名字唯一性
		for(var i = 0; i < missionNames.length; i++){
			if(name === missionNames[i].name){
				return false;
			}
		}
		//插入子分类
		aMission.push({
			'id' : aMission[aMission.length - 1].id + 1,
			'pid' : pid,
			'name' : name,
			'date' : date,
			'finish' : false,
			'content' : content
		});	
	}
}


//-----------------------视图控制---------------------------
function initCates(){
	var tempStr='';
	for(var i = 0; i < aCate.length; i++){
		tempStr += '<li>'+aCate[i].name+'<ul>';
		for(var j = 0; j < aCate[i].child.length; j++){
			var serial = aCate[i].child[j];
			var subCate = aSubCate[serial].name;
			console.log(subCate);
			tempStr += '<li>'+subCate+'</li>';
 		}
 		tempStr += '</ul></li>';
	}
	$("#cl").innerHTML=tempStr;

	initOptions();
	listMissions();
}

//lack paixu of dates and content
function listMissions(){
	var missionsLength = aSubCate[currentSubCateId].child.length;
	var aSerial = aSubCate[currentSubCateId].child;
	var tempStr = '';
	for(var i = 0; i < missionsLength; i++){
		tempStr +='<div class="dates">'+aMission[aSerial[i]].date+'</div>'+
				  '<div>'+aMission[aSerial[i]].name+'</div>';
	}
	$("#sort").innerHTML = tempStr;
}

//初始化选项
function initOptions(){
	var allCates = queryCateNames();
	var tempStr = '<option value="-1">新增主分类</option>';
	for(var i = 0; i < allCates.length; i++){
		tempStr += '<option value="'+i+'">'+allCates[i]+'</option>';
	}
	$("#addCatex").innerHTML = tempStr;
}


// $("#cl").addEventListener('click',function(e){
// 	initCates();
// 	listMissions();
// },false);

$('#add-cata').onclick = function(){
	$("#tip-layer").style.display = 'block';
}

$("#add-miss").onclick = function(){
	addMission(currentSubCateId)
}

$("#cancel").onclick = function(){
	$("#tip-layer").style.display = 'none';
}

$("#ok").onclick = function(){
	var cateList = $("#addCatex");
	var cateid = parseInt(cateList.options[cateList.selectedIndex].value);
	var catename = $("#newCateName").value;
	var returnMsg = '';
	if(cateid === -1){
		returnMsg = addCate(catename);
	} else {
		returnMsg = addSubCate(cateid, catename)
	}

	if(returnMsg === 'conflict'){
		$("#newCateName").focus();
	} else {
		$("#newCateName").value = '';
		$("#tip-layer").style.display = 'none';
	}
}

initCates();

//无论是重构还是第一次做，都要画出视图、按功能模块去规划，安排时间.