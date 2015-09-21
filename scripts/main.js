var oCata=document.getElementById('cl');
var oAddCata=document.getElementById('add-cata');
var oDelCata=document.getElementById('del-cata');
var oAddMission=document.getElementById('add-miss');
var oDelMission=document.getElementById('del-miss');
var oMark='';
var oDone='';
var oEdit='';
var oSave='';  //auto save
var oDel='';

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

//add mission
function addMission(){
	var today=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
	var activeDiv=byClass('div-active')[0];
	if(activeDiv.children[1]) activeDiv.removeChild(activeDiv.children[1]);//??? need to check ???
	var oLi=$('li');
	oLi.innerHTML='new mission';
	oLi.className='yet';
	byClass('miss-active')[0].className=byClass('miss-active')[0].className.replace(' miss-active','');
	activeDiv.children[0].appendChild(oLi);
	//click or add, it will read the data and focus
	oLi.className+=' miss-active';
	//content of mission
	oLi.title='';
	oLi.startTime=today;
	oLi.endTime='';
	oLi.content='';
	
}

addNew();

oAddCata.onclick=function(){
 	addCata(oCata,'1');
}

oAddMission.onclick=function(){
	addMission();
}