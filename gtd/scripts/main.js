var oCata=document.getElementById('cl');
var oAddCata=document.getElementById('add-cata');
var oDelCata=document.getElementById('del-cata');
var oAddMission=document.getElementById('add-miss');
var oDelMission=document.getElementById('del-miss');
var oMark=[$('#markall'),$('#markyet'),$('#markdone')];

//getElementByClassName
function byClass(cname,tagname){
	cname=(cname.indexOf('.')==0)?cname.substring(1):cname;
	if(document.getElementsByClassName){
		return document.getElementsByClassName(cname);
	}
	else if(document.querySelector){
		return document.querySelectorAll('.'+cname);
	}
	else{
		tagname=tagname?tagname:'*';
		var all=document.getElementsByTagName(tagname);
		var get=[];
		for(var i=0;i<all.length;i++){
			if(all[i].className.indexOf(cname)>=0){
				get.push(all[i]);
			}
		}
		return get;
	}
}

//return the id element & create element
function $(args){
	if(args.indexOf('#')==0){
		args=args.substring(1);
		var idNode=document.getElementById(args);
		if(idNode) return idNode;
		else{
			console.log(args+' isn\'t exist');
			return false;
		}
	}
	else{
		args=args?args:'li';
		return document.createElement(args);
	}
}

//add catagories 
function addCata(parent,id){
	var oInput=$('input');
	oInput.type='text';
	var oLi=$('li');
	oLi.appendChild(oInput);
	parent.appendChild(oLi);
	oInput.focus();
	oInput.onblur=function(){
		if(this.value==''){
			oLi.removeChild(this);
			parent.removeChild(oLi);
		}
		else{
			if(parent.id=='cl')	oLi.innerHTML=oInput.value+'<span></span><ul></ul>';
			else oLi.innerHTML=oInput.value;
			// id management
			if($('#'+id+'-'+oInput.value)){
				parent.removeChild(oLi);
				alert('name exists');
				return false;
			}
			oLi.id=id+'-'+oInput.value;
			if(parent.id!='cl'){
				oLi.className+=oLi.id;
				if(!byClass(oLi.id)[1]){
					//其实的话最好的判断是byClass(oLi.id)[1].tagName='div';
					var oDiv=$('div');
					oDiv.className=oLi.id;
					oDiv.innerHTML='<ul></ul><p style="text-align:center;padding-top:1em">nothing yet<br>add mission now<br>↓</p>';
					$('#sort').appendChild(oDiv);
					} 
			}
			addNew();
		}
	}
}

//when add new node , update their function
function addNew(){
for(var i=0;i<oCata.children.length;i++){
	 oCata.children[i].onclick=function(){
	 	addCata(this.children[1],this.id);
	 	return false;
	 }
	 for(var h=0;h<oCata.children[i].children[1].children.length;h++){
	 	oCata.children[i].children[1].children[h].onclick=function(event){
	 			console.log(this);
	 			var now=byClass('cata-active');
	 			for(var k=0;k<now.length;k++){
		 		now[k].className=now[k].className.replace(' cata-active','');
		 		}
		 		this.className+=' cata-active';
		 		//add or select the div of mission, and hide others
		 		byClass('div-active')[0].className=byClass('div-active')[0].className.replace(' div-active','');
				//如何关闭ctrl双选？
				byClass(this.id)[1].className+=' div-active';
		 		event.stopPropagation();
	 	}
	 }
}
}

//check if the finish btn exist
function finishExist(){
	if($('#finish').style.display=='block'){
		$('#finish').onclick();
	}
}

//add mission
function addMission(){
	//submit the edit first 
	finishExist();
	var today=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
	var activeDiv=byClass('div-active')[0];
	if(activeDiv.children[1]) activeDiv.removeChild(activeDiv.children[1]);
	var oLi=$('li');
	oLi.innerHTML='new mission';
	oLi.className='yet';
	byClass('miss-active')[0].className=byClass('miss-active')[0].className.replace(' miss-active','');
	activeDiv.children[0].appendChild(oLi);
	//click or add, it will read the data and focus
	oLi.className+=' miss-active';
	//content of mission
	oLi.title='new mission';
	oLi.startTime=today;
	oLi.endTime='';
	oLi.content='';
	$('#title').innerHTML=oLi.title;
	$('#starttime').innerHTML=oLi.startTime;
	$('#endtime').innerHTML=oLi.endTime;
	$('#content-text').innerHTML=oLi.content;
}


//change mark
function markChange(state1,state2){
		console.log(this);
		byClass('btnactive')[0].className='';
		this.className='btnactive';
		if(byClass('done')){
			var oDone=byClass('done');
			for(var i=0;i<oDone.length;i++){
				oDone[i].style.display=state1;
			}
		}
		if(byClass('yet')){
			var oYet=byClass('yet');
			for(var i=0;i<oYet.length;i++){
				oYet[i].style.display=state2;
			}
		}
		return false;
	}
	
	oMark[0].onclick=function(){markChange.call(this,'block','block');}
	oMark[1].onclick=function(){markChange.call(this,'none','block'); }
	oMark[2].onclick=function(){markChange.call(this,'block','none'); }
	
	/*纠正错误的想法：this指向调用该函数的对象*/
	
//change mark
/*
function markChange(obj,state1,state2){
		byClass('btnactive')[0].className='';
		obj.className='btnactive';
		if(byClass('done')){
			var oDone=byClass('done');
			for(var i=0;i<oDone.length;i++){
				oDone[i].style.display=state1;
			}
		}
		if(byClass('yet')){
			var oYet=byClass('yet');
			for(var i=0;i<oYet.length;i++){
				oYet[i].style.display=state2;
			}
		}
		return false;
	}
	
	oMark[0].onclick=function(){markChange(this,'block','block');}
	oMark[1].onclick=function(){markChange(this,'none','block');}
	oMark[2].onclick=function(){markChange(this,'block','none');}
*/

//when click the mission
$('#sort').addEventListener('click',function(e){
	//submit the edit if so
	finishExist();

	if(e.target && e.target.nodeName.toUpperCase()=='LI'){
		byClass('miss-active')[0].className=byClass('miss-active')[0].className.replace(' miss-active','');
		e.target.className+=' miss-active';
		$('#title').innerHTML=e.target.title;
		$('#starttime').innerHTML=e.target.startTime;
		$('#endtime').innerHTML=e.target.endTime;
		$('#content-text').innerHTML=e.target.content;
	}
},false);

$('#edit').onclick=function(){
	var edit=$('#edit');
		finish=$('#finish'),
		titleedit=$('#titleedit'),
		title=$('#title'),
		timeedit=$('#timeedit'),
		endtime=$('#endtime'),
		contenttextedit=$('#content-text-edit'),
		contenttext=$('#content-text'),
		missactive=byClass('miss-active')[0];
	var edits=[titleedit,timeedit,contenttextedit],shows=[title,endtime,contenttext];

	for(var xx=0;xx<edits.length;xx++){
		edits[xx].innerHTML=shows[xx].innerHTML;
		edits[xx].value=shows[xx].innerHTML;
		edits[xx].style.display='block';
		shows[xx].style.display='none';
	}
	
	this.style.display='none';
	finish.style.display='block';
	return false;
}

$('#finish').onclick=function(){

	var edit=$('#edit');
		finish=$('#finish'),
		titleedit=$('#titleedit'),
		title=$('#title'),
		timeedit=$('#timeedit'),
		endtime=$('#endtime'),
		contenttextedit=$('#content-text-edit'),
		contenttext=$('#content-text'),
		missactive=byClass('miss-active')[0];
	var edits=[titleedit,timeedit,contenttextedit],shows=[title,endtime,contenttext];

		for(var xx=0;xx<edits.length;xx++){
			shows[xx].style.display='block';
			edits[xx].style.display='none';
		}

		missactive.title=missactive.innerHTML=edits[0].value;
		missactive.endTime=edits[1].value;
		missactive.content=edits[2].innerHTML;

		missactive.click();

		edit.style.display='block';
		this.style.display='none';
		return false;
}

//inital
var aboutme=$('#aboutme');
aboutme.title='about me';
aboutme.startTime='2015-09-26';
aboutme.endTime='Who knows';
aboutme.content='Author:Rocker';
aboutme.click();

addNew();

oAddCata.onclick=function(){
 	addCata(oCata,'1');
}

oAddMission.onclick=function(){
	addMission();
}

