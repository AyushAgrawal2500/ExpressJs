var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', ['$scope','$window','$compile', 'qbImgCrop', 'qbAccordion','qbInsertImg', function($scope,$window,$compile,qbImgCrop,qbAccordion,qbInsertImg) {
	var qbImgCropProps={};
	
	//For Initialization.
	qbImgCrop.stageInitFun({
		pixel:{
			width:150,
			height:150
		},
		per:{
			width:50,
			height:50
		},
		shape:"square"
	},45);

	//For getting Props
	$scope.getProps=function(){
		qbImgCropProps=qbImgCrop.getPropsFun(45);
		console.log(qbImgCropProps)
	}

	//For setting Display
	$scope.setDisplayFun=function(){
		qbImgCrop.displaySetFun(qbImgCropProps,45);
	}

	//For Checking Loading Image
	document.querySelector("#qbImgCrop").addEventListener("change", function(event){

		qbImgCrop.imgInsertFun(event.target,45);
	});
	$scope.id=78;
}]);

myApp.service('qbBasics',qbBasics);
qbBasics.$inject=['$compile'];
function qbBasics($compile)
{
    this.classCons= function (classes) {
        var allClass=classes.split(',');
        var classL="";
        var k=0;
        angular.forEach(allClass, function(value, key){
            if(!(classL))
                classL=allClass[k];
            else
                classL=classL+" "+allClass[k];
            k++;
        });
        return classL;
    }
    this.findParent=function(pElement,pName){
        var par=pElement.parent();
        var con=true;
        var parName=pName.toUpperCase();
        var reqElement;
        while(con)
        {
            if((par[0].nodeName)===parName)
            {
                reqElement=par;
                con=false;
            }
            else if((par[0].nodeName)==="BODY")
            {
                con=false;
                reqElement=undefined;
            }
            else
                par=par.parent();
        }
        if(reqElement===undefined)
            alert("Undefined Parent Name");
        return reqElement;
    }
    this.findParentByClassName=function(pElement,pClassName){
        var par=angular.element(pElement).parent();
        var con=true;
        var reqElement;
        while(con)
        {
            if(par.hasClass(pClassName))
            {
                reqElement=par;
                con=false;
            }
            else if((par[0].nodeName)==="BODY")
            {
                con=false;
                reqElement=undefined;
            }
            else
                par=par.parent();
        }
        return reqElement;
    }
    this.findChildren=function(cElement,cName){
        var child=angular.element(cElement).children();
        var reqChildren=[];
        var con=true;
        var found=false;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                var j=0;
                angular.forEach(child, function(value, key){
                    if((angular.element(value)[0].nodeName)===(cName.toUpperCase()))
                    {
                        reqChildren[i]=child[j];
                        i++;
                        found=true;
                    }
                    j++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();    
                }
            }
            else
            {
                con=false;
                //alert("Undefined Children NodeName");
            }
        }
        return reqChildren;
    }
    this.findElement=function(eName){
        var qbContainer=angular.element(document.querySelector(eName));
        var con=true;
        var found=false;
        var reqElement;
        /*var child=qbContainer.children();
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                angular.forEach(child, function(value, key){
                    if((angular.element(value)[0].nodeName)===(eName.toUpperCase()))
                    {
                       reqElement=child[i];
                        found=true;
                    }
                    i++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();    
                }
            }
            else
            {
                con=false;
                alert("Undefined Element NodeName");
            }
        }*/
        return qbContainer;
    }
    
    this.findQbChildren=function(eObject){
        var child=eObject.children();
        var reqChildren=[];
        var con=true;
        var found=false;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                var j=0;
                angular.forEach(child, function(value, key){
                    var childName=angular.element(value)[0].nodeName;
                    if(((childName[0])==="Q")&&((childName[1])==="B")&&((childName[2])==="-"))
                    {
                        reqChildren[i]=child[j];
                        i++;
                        found=true;
                    }
                    j++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();    
                }
            }
            else
            {
                con=false;
                //alert("Undefined Children NodeName");
            }
        }
        return reqChildren;
    }
    
    this.isQbType=function(eName){
        var eleName=angular.element(eName)[0].nodeName;
        if(((eleName[0])==="Q")&&((eleName[1])==="B")&&((eleName[2])==="-"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    this.contentsAlign=function(elem,hAlign,vAlign,widthType,heightType,contentsTotalWidth,contentHeight){
        var contsWidth=[];
        var contsHeight=[];
        var contents=angular.element(elem).children();
        if(hAlign)
        {
            if(hAlign=="left")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="left";
                 });
            }
            
            else if(hAlign==="middle")
            {
                if(widthType==="responsive")
                {
                    var totalWidth=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
    	                totalWidth=totalWidth+thisWidth;
    	                contsWidth[i]=thisWidth;
    	                i++;
	                });
	                var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                var paddingWidth=(parentWidth-totalWidth)/2;
	                var paddingPer=(paddingWidth/parentWidth)*100;
	                angular.element(elem).css("padding-left",paddingPer+"%");
	                angular.element(elem).css("padding-right",paddingPer+"%");
	                i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var widthPer=(contsWidth[i]/totalWidth)*100;
	                    angular.element(vCont).css("width",widthPer+"%");
	                    i++;
	                });
                }
                else if(widthType==="static")
                {
                    var totalWidth=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
    	                totalWidth=totalWidth+thisWidth;
    	                contsWidth[i]=thisWidth;
    	                i++;
	                });
	                var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                var paddingWidth=(parentWidth-totalWidth)/2;
	                angular.element(elem).css("padding-left",paddingWidth+"px");
	                angular.element(elem).css("padding-right",paddingWidth+"px");
                }
            }
            
            else if(hAlign==="right")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="right";
                 });
            }
        }
        
        if(vAlign)
        {
            if(vAlign==="top")
            {
                
            }
            else if(vAlign==="centre")
            {
                if(heightType==="responsive")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
    	                contsHeight[i]=thisHeight;
    	                if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
    	                i++;
	                });
	            
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                var paddingPer=(paddingHeight/parentHeight)*100;
	                angular.element(elem).css("padding-top",paddingPer+"%");
	                angular.element(elem).css("padding-bottom",paddingPer+"%");
	                
	                i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var heightPer=(contsHeight[i]/lHeight)*100;
	                    angular.element(vCont).css("height",heightPer+"%");
	                    i++;
	                });
                }
                else if(heightType==="static")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
	                    if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
	                });
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                angular.element(elem).css("padding-top",paddingHeight+"px");
	                angular.element(elem).css("padding-bottom",paddingHeight+"px");
                }
            }
            else if(vAlign==="bottom")
            {
                
            }
        }
    }
    
    this.contentsAlignResize=function(elem,hAlign,vAlign,widthType,heightType,contentsTotalWidth,contentHeight){
        var contsWidth=[];
        var contents=angular.element(elem).children();
        if(hAlign)
        {
            if(hAlign=="left")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="left";
                 });
            }
            
            else if(hAlign==="middle")
            {
                if(hAlign==="middle")
	            {
	                if(widthType==="static")
	                {
	                    if(contentsTotalWidth)
	                    {
	                        var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                        var paddingWidth=(parentWidth-contentsTotalWidth)/2;
                            angular.element(elem).css("padding-left",paddingWidth+"px");
    		                angular.element(elem).css("padding-right",paddingWidth+"px");
	                    }
	                }
	            }
            }
            
            else if(hAlign==="right")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="right";
                 });
            }
        }
        
        if(vAlign)
        {
            if(vAlign==="top")
            {
                
            }
            else if(vAlign==="centre")
            {
                if(heightType==="static")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
	                    if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
	                });
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                angular.element(elem).css("padding-top",paddingHeight+"px");
	                angular.element(elem).css("padding-bottom",paddingHeight+"px");
                }
            }
            else if(vAlign==="bottom")
            {
                
            }
            
        }
    }
    
    this.compile=function(ele){
        var scope=angular.element(document.querySelector("qb-compile")).children().scope().qbCompileFun();
        var qbCompileEle=$compile(ele)(scope);
        return qbCompileEle;
    }   
    
    this.setInnerWidth=function(ele,outterWidth){
        var cont=angular.element(ele)[0];
        
        var thisPaddingLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left'));
        var thisPaddingRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right'));
        var thisMarginLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left'));
        var thisMarginRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right'));
        var thisBorderLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left'));
        var thisBorderRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right'));
        
        var innerWidth=outterWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderRight+thisBorderLeft);
        cont.style.width=innerWidth+"px";
	}
	
	this.getRespPercents=function(ele,outterWidth){
		var cont=angular.element(ele)[0];

		var thisPaddingLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left')))/outterWidth;
		var thisPaddingRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right')))/outterWidth;
		var thisMarginLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left')))/outterWidth;
		var thisMarginRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right')))/outterWidth;
		var thisBorderLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left')))/outterWidth;
		var thisBorderRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right')))/outterWidth;

		var thisInnerWidth=1-(thisPaddingLeftPer+thisPaddingRightPer+thisMarginLeftPer+thisMarginRightPer+thisBorderLeftPer+thisBorderRightPer);

		return {
			paddingLeft: thisPaddingLeftPer,
			paddingRight: thisPaddingRightPer,
			marginLeft: thisMarginLeftPer,
			marginRight: thisMarginRightPer,
			borderLeft: thisBorderLeftPer,
			borderRight: thisBorderRightPer,
			innerWidth: thisInnerWidth
		}
	}

	this.setRespPercents=function(ele,outterWidth,respPercents){
		var cont=angular.element(ele)[0];

		angular.element(cont).css('padding-left',(respPercents.paddingLeft*outterWidth)+"px");
		angular.element(cont).css('padding-right',(respPercents.paddingRight*outterWidth)+"px");
		angular.element(cont).css('border-left',(respPercents.borderLeft*outterWidth)+"px");
		angular.element(cont).css('border-right',(respPercents.borderRight*outterWidth)+"px");
		angular.element(cont).css('margin-left',(respPercents.marginLeft*outterWidth)+"px");
		angular.element(cont).css('margin-right',(respPercents.marginRight*outterWidth)+"px");
		angular.element(cont).css('width',(respPercents.innerWidth*outterWidth)+"px");
	}
    
    this.getOutterWidth=function(ele){
        var cont=angular.element(ele)[0];
        
        var thisPaddingLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left'));
        var thisPaddingRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right'));
        var thisMarginLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left'));
        var thisMarginRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right'));
        var thisBorderLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left'));
        var thisBorderRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right'));
        var thisWidth=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('width'));
        
        var outterWidth=(thisWidth+thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderRight+thisBorderLeft);
        return outterWidth;
    }
}

//Services of Custom Directives
myApp.service('qbAlert',function (){
    this.call=function(qbAlertData){
        var qbAlertEles={
            title:"",
            body:"",
            buttonYes:"",
            buttonNo:"",
            buttonCancel:""
        }
        if(qbAlertData.title.content)
        {
            var qbAlertTitle=angular.element("<div class=\"qb-alert-title\"></div>");
            if(qbAlertData.title.class)
            {
                angular.element(qbAlertTitle).addClass(qbAlertData.title.class);
            }
            qbAlertTitle.append(qbAlertData.title.content);
            qbAlertEles.title=qbAlertTitle;
        }
        
        if(qbAlertData.body.content)
        {
            var qbAlertBody=angular.element("<div class=\"qb-alert-body\"></div>");
            if(qbAlertData.body.class)
            {
                angular.element(qbAlertBody).addClass(qbAlertData.body.class);
            }
            qbAlertBody.append(qbAlertData.body.content);
            qbAlertEles.body=qbAlertBody;
        }
        
        if(qbAlertData.buttonYes.content)
        {
            if(qbAlertData.buttonYes.function)
            {
                var qbAlertButtonYes=angular.element("<button class=\"qb-alert-button-yes\" ng-click=\""+qbAlertData.buttonYes.function+"\"></button>");
                qbAlertButtonYes.append(qbAlertData.buttonYes.content);
            }
            else 
            {
                var qbAlertButtonYes=angular.element("<button class=\"qb-alert-button-yes\" ng-click=\"qbAlertButtonYesFun()\"></button>");
                qbAlertButtonYes.append(qbAlertData.buttonYes.content);
            }
            if(qbAlertData.buttonYes.class)
            {
                qbAlertButtonYes.addClass(qbAlertData.buttonYes.class);
            }
            qbAlertEles.buttonYes=qbAlertButtonYes;
        }
        
        if(qbAlertData.buttonNo.content)
        {
            if(qbAlertData.buttonNo.function)
            {
                var qbAlertButtonNo=angular.element("<button class=\"qb-alert-button-no\" ng-click=\""+qbAlertData.buttonNo.function+"\"></button>");
                qbAlertButtonNo.append(qbAlertData.buttonNo.content);
            }
            else 
            {
                var qbAlertButtonNo=angular.element("<button class=\"qb-alert-button-no\" ng-click=\"qbAlertButtonNoFun()\"></button>");
                qbAlertButtonNo.append(qbAlertData.buttonNo.content);
            }
            if(qbAlertData.buttonNo.class)
            {
                qbAlertButtonNo.addClass(qbAlertData.buttonNo.class);
            }
            qbAlertEles.buttonNo=qbAlertButtonNo;
        }
        
        if(qbAlertData.buttonCancel.content)
        {
            if(qbAlertData.buttonCancel.function)
            {
                var qbAlertButtonCancel=angular.element("<button class=\"qb-alert-button-cancel\" ng-click=\"qbAlertCancelFun();"+qbAlertData.buttonCancel.function+"\"></button>");
                qbAlertButtonCancel.append(qbAlertData.buttonCancel.content);
            }
            else
            {
                var qbAlertButtonCancel=angular.element("<button class=\"qb-alert-button-cancel\" ng-click=\"qbAlertCancelFun()\"></button>");
                qbAlertButtonCancel.append(qbAlertData.buttonCancel.content);
            }
            qbAlertEles.buttonCancel=qbAlertButtonCancel;
        }
        
        var qbAlertDiv=angular.element(document.querySelector("qb-alert"));
        var qbAlertElement=qbAlertDiv.children().scope().qbAlertActiveFun(qbAlertEles);
        return qbAlertElement;
    }
});

myApp.service('qbWizard',function (){
    this.call=function(qbAlertData){
        console.log("hello!");
        var qbWiz={
            name:"ayush",
            enable:function(){
                console.log("Ayush");
            }
        }
        return qbWiz;
    }
});

myApp.service('qbAccordion',function (){
    this.qbAccordionsInitiateFun=function(qbAccordionsId){
        var qbAccordionsEles=document.querySelectorAll("qb-accordions");
        angular.forEach(qbAccordionsEles,function(qbAccordionsEle,qbAccordionsKey){
            var qbAccordions=angular.element(qbAccordionsEle);
            if(qbAccordions.attr("qb-accordions-id")==qbAccordionsId)
            {
                qbAccordions.children().scope().qbAccordionsInitiateFun();
            }
        });
    }
});

myApp.service('qbShapeEditor',function (){
    this.initFun=function(qbShapeEditorParams){
		var qbTextEditor;
		angular.forEach(document.querySelectorAll("qb-text-editor"), function(qbTextEditorEle, qbKey){
			if(angular.element(qbTextEditorEle).attr("qb-text-editor-id")==qbShapeEditorParams.qbTextEditorId)
			{
				qbTextEditor=angular.element(qbTextEditorEle);
			}
		});

		var qbShapeEditor;
		angular.forEach(document.querySelectorAll("qb-shape-editor"), function(qbShapeEditorEle, qbKey){
			if(angular.element(qbShapeEditorEle).attr("qb-shape-editor-id")==qbShapeEditorParams.qbShapeEditorId)
			{
				qbShapeEditor=angular.element(qbShapeEditorEle);
			}
		});

		if(qbShapeEditor)
		{
			angular.element(qbShapeEditor.children()[1]).css("display","table");
		}
	}
});

myApp.service('qbImgCrop',['$interval','qbBasics', function($interval,qbBasics){
	this.stageInitFun=function(qbImgCropStageProps,qbImgCropId){
		setTimeout(function(){
			angular.forEach(document.querySelectorAll("qb-img-crop"), function(qbImgCrop, qbKey){
				if(angular.element(qbImgCrop).attr("qb-img-crop-id")===qbImgCropId.toString())
				{
					angular.element(qbImgCrop).children().scope().qbImgCropStageInitFun(qbImgCropStageProps);
				}
			});
		},0.00005); 
	}

	this.imgInsertFun=function(element, qbImgCropId){
		var qbImgFile=element.files[0];
		
		var qbFileReader= new FileReader();
		qbFileReader.readAsDataURL(qbImgFile);
		qbFileReader.onload=function(event){
			angular.forEach(document.querySelectorAll("qb-img-crop"), function(qbImgCrop, qbKey){
				angular.element(qbImgCrop).children().scope().qbImgCropInsertImgFun(event.target.result)
			});
		}
	}

	this.getPropsFun=function(qbImgCropId){
		var qbImgCropProps={};
		angular.forEach(document.querySelectorAll("qb-img-crop"), function(qbImgCrop, qbKey){
			if(angular.element(qbImgCrop).attr("qb-img-crop-id")===qbImgCropId.toString())
			{
				qbImgCropProps=angular.element(qbImgCrop).children().scope().qbGetImgCropPropsFun();
			}
		});

		return qbImgCropProps;
	}

	this.displaySetFun=function(qbImgCropStageProps,qbImgCropId){
		setTimeout(function(){
			angular.forEach(document.querySelectorAll("qb-img-crop"), function(qbImgCrop, qbKey){
				if(angular.element(qbImgCrop).attr("qb-img-crop-id")===qbImgCropId.toString())
				{
					angular.element(qbImgCrop).children().scope().qbImgCropDisplaySetFun(qbImgCropStageProps);
				}
			});
		},0.00005); 
	}
}]);

myApp.service('qbInsertImg', ['qbBasics', function(qbBasics){
	this.fileReader=function(element, qbCallBackFun){
		var qbImgInput=angular.element(element);
		var qbImgFile=element.files[0];
		
		var qbFileReader= new FileReader();
		qbFileReader.readAsDataURL(qbImgFile);
		qbFileReader.onload=function(event){
			qbCallBackFun(event.target.result);
		}
	}
}]);

myApp.service('qbDataBase',qbDataBase);
qbDataBase.$inject=['$http'];
function qbDataBase($http)
{
    this.arrayData= function (tabName,colName,fColName,fVal) {
        var arrData;
        var filter_data={table:tabName,column:colName,fcolumn:fColName,fvalue:fVal};
        
        $http({
        method:'POST',url:'../controllers/filter.php',data:filter_data
            }).then(function mySucces(response){
               arrData=response.data;
               alert(arrData);
            },function myError(response){
                alert(response.statusText);
        });
    }   
}

myApp.service('php',php);
php.$inject=['$http'];
function php($http)
{
    this.post=function(link,parameters){
        var linkParts=link.split("/");
        var phpPostData={
            transactionType:linkParts[1]
        }
        
        angular.forEach(parameters, function(value, key){
            phpPostData[key]=value;
        });
        
        $http({
            method:'POST',url:'../controllers/'+linkParts[0]+'.php',data:phpPostData
                }).then(function mySucces(response){
                     data=response.data;
                     console.log(data);
                },function myError(response){
                    alert(response.statusText);
                });
    }
}

myApp.directive('qbImgCrop',qbImgCrop);
qbImgCrop.$inject=['$http'];
function qbImgCrop($http)
{
	return{
		scope: {},
		transclude :true,
		link :function(scope, element, attr, ctrl, transclude){
			scope.qbImgCropStageInitFun=function(qbImgCropStageProps){
				angular.element(element[0].querySelector("qb-img-crop-stage")).children().scope().qbImgCropStageInitFun(qbImgCropStageProps);
			}
			
			scope.qbImgCropInsertImgFun=function(qbImgData){
				angular.element(element[0].querySelector("qb-img-crop-stage")).children().scope().qbImgCropStageInsertImgFun(qbImgData);
			}

			scope.qbGetImgCropPropsFun=function(){
				var qbImgCropProps={};
				qbImgCropProps=angular.element(element[0].querySelector("qb-img-crop-stage")).children().scope().qbGetImgCropPropsFun();
				return qbImgCropProps;
			}

			scope.qbImgCropDisplaySetFun=function(qbImgCropStageProps){
				angular.element(element[0].querySelector("qb-img-crop-display")).children().scope().qbImgCropDisplaySetFun(qbImgCropStageProps);
			}
		},
		template: function(element,attr){
			return "<div class=\"qb-img-crop\" ng-transclude></div>";
		}
	}
}

myApp.directive('qbImgCropStage',qbImgCropStage);
qbImgCropStage.$inject=['qbBasics'];
function qbImgCropStage(qbBasics)
{
	return{
		scope: {},
		transclude :false,
		link :function(scope, element, attr, ctrl){
			//Image Cropper All Elements
			var qbImgCropStage=angular.element(element[0].querySelector(".qb-img-crop-stage"));
			var qbImgCropStageCover=angular.element(element[0].querySelector(".qb-img-crop-stage-cover"));
			var qbImgCropStageLayer=angular.element(element[0].querySelector(".qb-img-crop-stage-layer"));
			var qbImgCropStagePsuedoImg=angular.element(element[0].querySelector(".qb-img-crop-stage-psuedo-img"));
			var qbImgCropBackground=angular.element(element[0].querySelector(".qb-img-crop-stage-background"));
			var qbImgCropStageCropBox=angular.element(element[0].querySelector(".qb-img-crop-stage-crop-box"));
			var qbImgCropStageImg=angular.element(element[0].querySelector(".qb-img-crop-stage-img"));
			var qbImgCropDisplay=angular.element(qbBasics.findParent(element,"qb-img-crop")[0].querySelector(".qb-img-crop-display"));
			var qbImgCropStageCropBoxResizer=angular.element(element[0].querySelector(".qb-img-crop-stage-crop-box-resizer"));

			//All Element Props
			var qbImgCropStageCropBoxProps={
				per:{
					height:25,
					width:25,
					left:0,
					top:0,
					minimumWidth:1,
					minimumHeight:1,
					maxHeight:100,
					maxWidth:100,
					minHeight:1,
					minWidth:1
				},
				pixel:{
					height:150,
					width:200,
					left:0,
					top:0,
					minimumWidth:10,
					minimumHeight:10,
					minHeight:10,
					minWidth:10
				},
				qbDrag:false,
				qbResize:false,
				shape:"free"
			}

			angular.element(element).ready(function(){
				angular.element(element).css("display","none")
			});

			if(attr.qbCropBoxShape)
			{
				qbImgCropStageCropBoxProps.shape=attr.qbCropBoxShape;
			}

			//Function for getting cropProps
			scope.qbGetImgCropPropsFun=function(){
				var qbImgSizeRatio=qbImgCropStagePsuedoImg[0].height/qbImgCropStageLayer[0].getBoundingClientRect().height;
				var qbImgCropFinalProps=qbImgCropStageCropBoxProps;
				qbImgCropFinalProps.pixel.height=qbImgCropStageCropBoxProps.pixel.height*qbImgSizeRatio;
				qbImgCropFinalProps.pixel.width=qbImgCropStageCropBoxProps.pixel.width*qbImgSizeRatio;
				qbImgCropFinalProps.pixel.top=qbImgCropStageCropBoxProps.pixel.top*qbImgSizeRatio;
				qbImgCropFinalProps.pixel.left=qbImgCropStageCropBoxProps.pixel.left*qbImgSizeRatio;

				return qbImgCropFinalProps;
			}

			//Scope function for setting up max and min dimensions
			scope.qbImgCropStageInitFun=function(qbImgCropBoxProps){
				if(qbImgCropBoxProps.per)
				{
					//Setting Up Width And Height (Per) On Service Call
					if(qbImgCropBoxProps.per.width)
					{
						qbImgCropStageCropBoxProps.per.width=qbImgCropBoxProps.per.width;
					}
					if(qbImgCropBoxProps.per.height)
					{
						qbImgCropStageCropBoxProps.per.height=qbImgCropBoxProps.per.height;
					}

					//Setting Up maxWidth And maxHeight (Per) On Service Call
					if(qbImgCropBoxProps.per.maxWidth)
					{
						qbImgCropStageCropBoxProps.per.maxWidth=qbImgCropBoxProps.per.maxWidth;
					}
					if(qbImgCropBoxProps.per.maxHeight)
					{
						qbImgCropStageCropBoxProps.per.maxHeight=qbImgCropBoxProps.per.maxHeight;
					}

					//Setting Up minWidth And minHeight (Per) On Service Call
					if(qbImgCropBoxProps.per.minWidth)
					{
						qbImgCropStageCropBoxProps.per.minWidth=qbImgCropBoxProps.per.minWidth;
					}
					if(qbImgCropBoxProps.per.minHeight)
					{
						qbImgCropStageCropBoxProps.per.minHeight=qbImgCropBoxProps.per.minHeight;
					}
				}

				if(qbImgCropBoxProps.pixel)
				{
					//Setting Up Height And Width (Pixel) On Service Call
					if(qbImgCropBoxProps.pixel.width)
					{
						qbImgCropStageCropBoxProps.pixel.width=qbImgCropBoxProps.pixel.width;
					}
					if(qbImgCropBoxProps.pixel.height)
					{
						qbImgCropStageCropBoxProps.pixel.height=qbImgCropBoxProps.pixel.height;
					}
					
					//Setting Up minHeight And minWidth (Pixel) On Service Call
					if(qbImgCropBoxProps.pixel.minWidth)
					{
						qbImgCropStageCropBoxProps.pixel.minWidth=qbImgCropBoxProps.pixel.minWidth;
					}
					if(qbImgCropBoxProps.pixel.minHeight)
					{
						qbImgCropStageCropBoxProps.pixel.minHeight=qbImgCropBoxProps.pixel.minHeight;
					}
				}

				//Setting Up Shape On Service Call
				if(qbImgCropBoxProps.shape)
				{
					var qbCropBoxShapes=["circle", "square", "same", "free"];
					if(qbCropBoxShapes.includes(qbImgCropBoxProps.shape))
					{
						qbImgCropStageCropBoxProps.shape=qbImgCropBoxProps.shape;
					}
				}

				//Setting Up Shape Its Temp Code. 
				//Sending Img Src to display
				if(angular.isDefined(qbImgCropDisplay.scope()))
				{
					qbImgCropDisplay.scope().qbImgCropDisplayInitFun(qbImgCropStagePsuedoImg.attr("src"));
				}

				//Calling Set Dimension Function
				qbImgCropStageDimensionFun();
				
				//Calling this Function as to Keep the things proper even after the calling of InitService Too.
				var qbUpdatedImgCropBoxProps={}
				if((qbImgCropStageCropBoxProps.shape=="square")||(qbImgCropStageCropBoxProps.shape=="circle"))
				{
					//Setting up deimensions
					if(qbImgCropBoxProps.pixel.height)
					{
						qbUpdatedImgCropBoxProps.height=qbImgCropBoxProps.pixel.height+"px";
						qbUpdatedImgCropBoxProps.width=qbImgCropBoxProps.pixel.height+"px";

						qbImgCropStageCropBoxProps.pixel.width=qbImgCropStageCropBoxProps.pixel.height;
					}
				}

				if(qbImgCropStageCropBoxProps.shape=="same")
				{
					//Setting up deimensions
					qbUpdatedImgCropBoxProps.height=qbImgCropStageCropBoxProps.per.height+"%";
					qbUpdatedImgCropBoxProps.width=qbImgCropStageCropBoxProps.per.height+"%";

					qbImgCropStageCropBoxProps.per.width=qbImgCropStageCropBoxProps.per.height;
				}

				scope.qbImgCropStageCropBoxPropsSetFun(qbUpdatedImgCropBoxProps);
			}

			//Scope for setting image src
			scope.qbImgCropStageInsertImgFun=function(qbImgData){
				qbImgCropStagePsuedoImg.attr("src",""+qbImgData+"");	
				qbImgCropStageImg.attr("src",""+qbImgData+"");	
				qbImgCropBackground.css("background-image","url('"+qbImgData+"')")
				
			}

			//Set Img Crop Box Props Function
			scope.qbImgCropStageCropBoxPropsSetFun=function(qbImgCropBoxProps){
				if(qbImgCropBoxProps.height)
				{
					qbImgCropStageCropBox.css("height",qbImgCropBoxProps.height);
					qbImgCropStageCropBoxProps.pixel.height=qbImgCropStageCropBox[0].getBoundingClientRect().height;
					qbImgCropStageCropBoxProps.per.height=qbImgCropStageCropBoxProps.pixel.height*100/qbImgCropBackground[0].getBoundingClientRect().height;
				}
				if(qbImgCropBoxProps.width)
				{
					qbImgCropStageCropBox.css("width",qbImgCropBoxProps.width);
					qbImgCropStageCropBoxProps.pixel.width=qbImgCropStageCropBox[0].getBoundingClientRect().width;
					qbImgCropStageCropBoxProps.per.width=qbImgCropStageCropBoxProps.pixel.width*100/qbImgCropBackground[0].getBoundingClientRect().width;
				}
				if(qbImgCropBoxProps.top)
				{
					qbImgCropStageCropBox.css("top",qbImgCropBoxProps.top);
					qbImgCropStageCropBoxProps.pixel.top=-(qbImgCropBackground[0].getBoundingClientRect().top-qbImgCropStageCropBox[0].getBoundingClientRect().top);
					qbImgCropStageImg.css("top","-"+(qbImgCropStageCropBoxProps.pixel.top)+"px");
					qbImgCropStageCropBoxProps.per.top=qbImgCropStageCropBoxProps.pixel.top*100/qbImgCropBackground[0].getBoundingClientRect().height;

				}
				if((qbImgCropBoxProps.left)||(qbImgCropBoxProps.left==0))
				{
					qbImgCropStageCropBox.css("left",qbImgCropBoxProps.left);
					qbImgCropStageCropBoxProps.pixel.left=-(qbImgCropBackground[0].getBoundingClientRect().left-qbImgCropStageCropBox[0].getBoundingClientRect().left);
					qbImgCropStageImg.css("left","-"+(qbImgCropStageCropBoxProps.pixel.left)+"px");
					qbImgCropStageCropBoxProps.per.left=qbImgCropStageCropBoxProps.pixel.left*100/qbImgCropBackground[0].getBoundingClientRect().width;
					
				}
				if(qbImgCropBoxProps.shape)
				{
					qbImgCropStageCropBoxProps.shape=qbImgCropBoxShape;
				}

				//Code For Checking Circle
				if(qbImgCropStageCropBoxProps.shape==="circle")
				{
					qbImgCropStageCropBox.css("border-radius","50%");
				}
				else
				{
					qbImgCropStageCropBox.css("border-radius","unset");
				}

				//Code For Movement of Resizer
				qbImgCropStageCropBoxResizer.css("top",(qbImgCropStageCropBoxProps.pixel.top-7.5)+"px")
				qbImgCropStageCropBoxResizer.css("left",(qbImgCropStageCropBoxProps.pixel.left+qbImgCropStageCropBoxProps.pixel.width-7.5)+"px")
							
				//console.log(qbImgCropStageCropBoxProps)
				if(angular.isDefined(qbImgCropDisplay.scope()))
				{
					qbImgCropDisplay.scope().qbImgCropDisplaySetFun(qbImgCropStageCropBoxProps)
				}
			}

			scope.qbImgCropStageCropBoxMoveSetFun=function(qbNewMousePointerDiff){
				qbMousePointerDiff=qbNewMousePointerDiff;
				
				if(qbImgCropBackground[0].getBoundingClientRect().bottom<(qbImgCropStageCropBox[0].getBoundingClientRect().bottom+qbMousePointerDiff.y))
				{
					qbMousePointerDiff.y=qbImgCropBackground[0].getBoundingClientRect().bottom-qbImgCropStageCropBox[0].getBoundingClientRect().bottom;
				}
				else if(qbImgCropBackground[0].getBoundingClientRect().top>(qbImgCropStageCropBox[0].getBoundingClientRect().top+qbMousePointerDiff.y))
				{
					qbMousePointerDiff.y=qbImgCropBackground[0].getBoundingClientRect().top-qbImgCropStageCropBox[0].getBoundingClientRect().top;
				}
				
				if(qbImgCropBackground[0].getBoundingClientRect().right<(qbImgCropStageCropBox[0].getBoundingClientRect().right+qbMousePointerDiff.x))
				{
					qbMousePointerDiff.x=qbImgCropBackground[0].getBoundingClientRect().right-qbImgCropStageCropBox[0].getBoundingClientRect().right;
				}
				else if(qbImgCropBackground[0].getBoundingClientRect().left>(qbImgCropStageCropBox[0].getBoundingClientRect().left+qbMousePointerDiff.x))
				{
					qbMousePointerDiff.x=qbImgCropBackground[0].getBoundingClientRect().left-qbImgCropStageCropBox[0].getBoundingClientRect().left;
				}

				var qbCropBoxNewProps={
					top:(qbImgCropStageCropBox[0].getBoundingClientRect().top-qbImgCropBackground[0].getBoundingClientRect().top+qbMousePointerDiff.y)+"px",
					left:(qbImgCropStageCropBox[0].getBoundingClientRect().left-qbImgCropBackground[0].getBoundingClientRect().left+qbMousePointerDiff.x)+"px"
				}

				scope.qbImgCropStageCropBoxPropsSetFun(qbCropBoxNewProps);
			}

			scope.qbImgCropStageCropBoxSizeSetFun=function(qbPsuedoMousePointerDiff,qbResizeType){
				qbMousePointerDiff=qbPsuedoMousePointerDiff;

				if(qbImgCropBackground[0].getBoundingClientRect().bottom<(qbImgCropStageCropBoxResizer[0].getBoundingClientRect().top+7.5+qbMousePointerDiff.y))
				{
					qbMousePointerDiff.y=qbImgCropBackground[0].getBoundingClientRect().bottom-qbImgCropStageCropBoxResizer[0].getBoundingClientRect().top-7.5;
				}
				else if((qbImgCropBackground[0].getBoundingClientRect().top)>(qbImgCropStageCropBoxResizer[0].getBoundingClientRect().top+qbMousePointerDiff.y))
				{
					qbMousePointerDiff.y=qbImgCropBackground[0].getBoundingClientRect().top-qbImgCropStageCropBoxResizer[0].getBoundingClientRect().top;
				}
				
				if(qbImgCropBackground[0].getBoundingClientRect().right<(qbImgCropStageCropBoxResizer[0].getBoundingClientRect().left+7.5+qbMousePointerDiff.x))
				{
					qbMousePointerDiff.x=qbImgCropBackground[0].getBoundingClientRect().right-qbImgCropStageCropBoxResizer[0].getBoundingClientRect().left-7.5;
				}
				else if((qbImgCropBackground[0].getBoundingClientRect().left)>(qbImgCropStageCropBoxResizer[0].getBoundingClientRect().left+qbMousePointerDiff.x))
				{
					qbMousePointerDiff.x=qbImgCropBackground[0].getBoundingClientRect().left-qbImgCropStageCropBoxResizer[0].getBoundingClientRect().left;
				}

				var qbCropBoxNewProps={};
				if(qbImgCropStageCropBoxProps.shape=="free")
				{
					var qbCropBoxNewHeight=(qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y);
					var qbCropBoxNewWidth=(qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x);

					//checking for max height and width
					if(qbImgCropStageCropBoxProps.per.maxHeight)
					{
						if(qbCropBoxNewHeight>(qbImgCropStageLayer[0].getBoundingClientRect().height*qbImgCropStageCropBoxProps.per.maxHeight/100))
						{
							qbCropBoxNewHeight=(qbImgCropStageLayer[0].getBoundingClientRect().height*qbImgCropStageCropBoxProps.per.maxHeight/100);
						}
					}
					if(qbImgCropStageCropBoxProps.per.maxWidth)
					{
						if(qbCropBoxNewWidth>(qbImgCropStageLayer[0].getBoundingClientRect().width*qbImgCropStageCropBoxProps.per.maxWidth/100))
						{
							qbCropBoxNewWidth=(qbImgCropStageLayer[0].getBoundingClientRect().width*qbImgCropStageCropBoxProps.per.maxWidth/100);
						}
					}

					//checking for min height and width
					if(qbImgCropStageCropBoxProps.pixel.minHeight)
					{
						if(qbCropBoxNewHeight<qbImgCropStageCropBoxProps.pixel.minHeight)
						{
							qbCropBoxNewHeight=qbImgCropStageCropBoxProps.pixel.minHeight;
						}
					}
					if(qbImgCropStageCropBoxProps.pixel.minWidth)
					{
						if(qbCropBoxNewWidth<qbImgCropStageCropBoxProps.pixel.minWidth)
						{
							qbCropBoxNewWidth=qbImgCropStageCropBoxProps.pixel.minWidth;
						}
					}

					//Checking For Minimum
					if(qbCropBoxNewHeight<qbImgCropStageCropBoxProps.pixel.minimumHeight)
					{
						qbCropBoxNewHeight=qbImgCropStageCropBoxProps.pixel.minimumHeight;
					}
					if(qbCropBoxNewWidth<qbImgCropStageCropBoxProps.pixel.minimumWidth)
					{
						qbCropBoxNewWidth=qbImgCropStageCropBoxProps.pixel.minimumWidth;
					}

					qbCropBoxNewProps={
						height:qbCropBoxNewHeight+"px",
						width:qbCropBoxNewWidth+"px"
					}
					scope.qbImgCropStageCropBoxPropsSetFun(qbCropBoxNewProps);
				}

				if((qbImgCropStageCropBoxProps.shape=="square")||(qbImgCropStageCropBoxProps.shape=="circle"))
				{
					var qbLargeValue;
					var qbSmallValue;

					if((qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x)<=(qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y))
					{
						qbLargeValue=(qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y);
						qbSmallValue=(qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x);
					}
					else
					{
						qbSmallValue=(qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y);
						qbLargeValue=(qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x);
					}

					var qbSquareSideValue;
					if(qbResizeType=="inc")
					{
						qbSquareSideValue=qbLargeValue;
					}
					else
					{
						qbSquareSideValue=qbSmallValue;
					}
			
					//Finding Max Value of Square Side
					var qbSquareSideMaxValue;
					if(qbImgCropStageLayer[0].getBoundingClientRect().width>qbImgCropStageLayer[0].getBoundingClientRect().height)
					{
						qbSquareSideMaxValue=qbImgCropStageLayer[0].getBoundingClientRect().height;
					}
					else
					{
						qbSquareSideMaxValue=qbImgCropStageLayer[0].getBoundingClientRect().width;
					}

					//Checking For Max Not Required
					if(qbSquareSideValue>qbSquareSideMaxValue)
					{
						qbSquareSideValue=qbSquareSideMaxValue;
					}

					//Checking For Min
					if(qbImgCropStageCropBoxProps.pixel.minHeight)
					{
						if(qbSquareSideValue<qbImgCropStageCropBoxProps.pixel.minHeight)
						{
							qbSquareSideValue=qbImgCropStageCropBoxProps.pixel.minHeight;
						}
					}
					if(qbImgCropStageCropBoxProps.pixel.minWidth)
					{
						if(qbSquareSideValue<qbImgCropStageCropBoxProps.pixel.minWidth)
						{
							qbSquareSideValue=qbImgCropStageCropBoxProps.pixel.minWidth;
						}
					}
					
					//Checking For Minimum
					if(qbSquareSideValue<qbImgCropStageCropBoxProps.pixel.minimumHeight)
					{
						qbSquareSideValue=qbImgCropStageCropBoxProps.pixel.minimumHeight;
					}
					if(qbSquareSideValue<qbImgCropStageCropBoxProps.pixel.minimumWidth)
					{
						qbSquareSideValue=qbImgCropStageCropBoxProps.pixel.minimumWidth;
					}

					qbCropBoxNewProps={
						height:qbSquareSideValue+"px",
						width:qbSquareSideValue+"px"
					}
					scope.qbImgCropStageCropBoxPropsSetFun(qbCropBoxNewProps);
				}

				if(qbImgCropStageCropBoxProps.shape==="same")
				{
				
					var qbLargeValue;
					var qbSmallValue;

					if(((qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x)*100/qbImgCropBackground[0].getBoundingClientRect().width)<=((qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y)*100/qbImgCropBackground[0].getBoundingClientRect().height))
					{
						qbLargeValue=((qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y)*100/qbImgCropBackground[0].getBoundingClientRect().height);
						qbSmallValue=((qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x)*100/qbImgCropBackground[0].getBoundingClientRect().width);
					}
					else
					{
						qbSmallValue=((qbImgCropStageCropBox[0].getBoundingClientRect().height+qbMousePointerDiff.y)*100/qbImgCropBackground[0].getBoundingClientRect().height);
						qbLargeValue=((qbImgCropStageCropBox[0].getBoundingClientRect().width+qbMousePointerDiff.x)*100/qbImgCropBackground[0].getBoundingClientRect().width);
					}

					var qbCropSidePerValue;
					if(qbResizeType=="inc")
					{
						qbCropSidePerValue=qbLargeValue;
					}
					else
					{
						qbCropSidePerValue=qbSmallValue;
					}

					//checking for max height and width
					if(qbImgCropStageCropBoxProps.per.maxHeight)
					{
						if(qbCropSidePerValue>qbImgCropStageCropBoxProps.per.maxHeight)
						{
							qbCropSidePerValue=qbImgCropStageCropBoxProps.per.maxHeight;
						}
					}
					if(qbImgCropStageCropBoxProps.per.maxWidth)
					{
						if(qbCropSidePerValue>qbImgCropStageCropBoxProps.per.maxWidth)
						{
							qbCropSidePerValue=qbImgCropStageCropBoxProps.per.maxWidth;
						}
					}
				
					//checking for min height and width
					if(qbImgCropStageCropBoxProps.per.minHeight)
					{
						if(qbCropSidePerValue<qbImgCropStageCropBoxProps.per.minHeight)
						{
							qbCropSidePerValue=qbImgCropStageCropBoxProps.per.minHeight;
						}
					}
					if(qbImgCropStageCropBoxProps.per.minWidth)
					{
						if(qbCropSidePerValue<qbImgCropStageCropBoxProps.per.minWidth)
						{
							qbCropSidePerValue=qbImgCropStageCropBoxProps.per.minWidth;
						}
					}

					//checking for minimum height and width
					if(qbCropSidePerValue<qbImgCropStageCropBoxProps.per.minimumHeight)
					{
						qbCropSidePerValue=qbImgCropStageCropBoxProps.per.minimumHeight;
					}
					if(qbCropSidePerValue<qbImgCropStageCropBoxProps.per.minimumWidth)
					{
						qbCropSidePerValue=qbImgCropStageCropBoxProps.per.minimumWidth;
					}

					qbCropBoxNewProps={
						height:qbCropSidePerValue+"%",
						width:qbCropSidePerValue+"%"
					}
					scope.qbImgCropStageCropBoxPropsSetFun(qbCropBoxNewProps);
				}
			}

			window.addEventListener("resize",function(){
				qbImgCropStageDimensionFun();
			});

			//Set dimension Function
			var qbImgCropStageDimensionFun=function(){
				qbImgCropStageCover.css("display","none");
			
				var qbPsuedoImgHeight=qbImgCropStagePsuedoImg[0].height;
				var qbPsuedoImgWidth=qbImgCropStagePsuedoImg[0].width;
				
				var qbPsuedoImgRatio=qbPsuedoImgHeight/qbPsuedoImgWidth;
				var qbStageRatio=qbImgCropStage[0].getBoundingClientRect().height/qbImgCropStage[0].getBoundingClientRect().width;
				
				var qbImgCropStageBgHeight=0;
				var qbImgCropStageBgWidth=0;
				if(qbPsuedoImgRatio<=qbStageRatio)
				{
					qbImgCropStageBgWidth=qbImgCropStage[0].getBoundingClientRect().width;
					qbImgCropStageBgHeight=qbPsuedoImgRatio*qbImgCropStage[0].getBoundingClientRect().width;
				}
				else
				{
					qbImgCropStageBgWidth=qbImgCropStage[0].getBoundingClientRect().height/qbPsuedoImgRatio;
					qbImgCropStageBgHeight=qbImgCropStage[0].getBoundingClientRect().height;
				}

				qbImgCropBackground.css("width",qbImgCropStageBgWidth+"px");
				qbImgCropBackground.css("height",qbImgCropStageBgHeight+"px");
				qbImgCropStageImg.attr("height",qbImgCropStageBgHeight);
				qbImgCropStageImg.attr("width",qbImgCropStageBgWidth);

				qbImgCropStageCover.css("display","table-cell");
				
				//For Checking Whether the props is null or not.
				var qbImgCropNewProps={
					width:qbImgCropStageCropBoxProps.per.width+"%",
					height:qbImgCropStageCropBoxProps.per.height+"%",
					top:qbImgCropStageCropBoxProps.per.top+"%",
					left:qbImgCropStageCropBoxProps.per.left+"%"
				}

				scope.qbImgCropStageCropBoxPropsSetFun(qbImgCropNewProps);
			}

			//Psuedo Image Load Function
			qbImgCropStagePsuedoImg[0].addEventListener("load", function(event){
				console.log("Image Loaded Again")
				
				//For Setting Display Block
				angular.element(element).css("display","block");

				//Sending Img Src to display
				if(angular.isDefined(qbImgCropDisplay.scope()))
				{
					qbImgCropDisplay.scope().qbImgCropDisplayInitFun(qbImgCropStagePsuedoImg.attr("src"));
				}

				//Calling Set Dimension Function
				qbImgCropStageDimensionFun();

				//Calling this Function as to Keep the things proper even after the calling of InitService Too.
				var qbUpdatedImgCropBoxProps={}
				if((qbImgCropStageCropBoxProps.shape=="square")||(qbImgCropStageCropBoxProps.shape=="circle"))
				{
					//Setting up deimensions
					qbUpdatedImgCropBoxProps.height=qbImgCropStageCropBoxProps.pixel.height+"px";
					qbUpdatedImgCropBoxProps.width=qbImgCropStageCropBoxProps.pixel.height+"px";

					qbImgCropStageCropBoxProps.pixel.width=qbImgCropStageCropBoxProps.pixel.height;
				}

				if(qbImgCropStageCropBoxProps.shape=="same")
				{
					//Setting up deimensions
					qbUpdatedImgCropBoxProps.height=qbImgCropStageCropBoxProps.per.height+"%";
					qbUpdatedImgCropBoxProps.width=qbImgCropStageCropBoxProps.per.height+"%";

					qbImgCropStageCropBoxProps.per.width=qbImgCropStageCropBoxProps.per.height;
				}

				scope.qbImgCropStageCropBoxPropsSetFun(qbUpdatedImgCropBoxProps);

				//Setting events on crop box
				qbImgCropStageCropBox[0].addEventListener("mousedown",function(event){
					qbImgCropBoxMouseDownFun(event,"mouse");
				});
				qbImgCropStageCropBox[0].addEventListener("mousemove",function(event){
					if(qbImgCropStageCropBoxProps.qbDrag)
					{
						qbImgCropBoxMouseMoveFun(event,"mouse");
					}
				});
				qbImgCropStageCropBox[0].addEventListener("mouseup",function(event){
					qbImgCropBoxMouseUpFun(event,"mouse");
				});

				qbImgCropStageCropBox[0].addEventListener("touchstart",function(event){
					qbImgCropBoxMouseDownFun(event,"touch");
				});
				qbImgCropStageCropBox[0].addEventListener("touchmove",function(event){
					if(qbImgCropStageCropBoxProps.qbDrag)
					{
						qbImgCropBoxMouseMoveFun(event,"touch");
					}
				});
				qbImgCropStageCropBox[0].addEventListener("touchend",function(event){
					qbImgCropBoxMouseUpFun(event,"touch");
				});

				//Setting Events on Resizer
				qbImgCropStageCropBoxResizer[0].addEventListener("mousedown", function(event){
					qbImgCropBoxResizerMouseDownFun(event,"mouse");
				});
				qbImgCropStageCropBoxResizer[0].addEventListener("touchstart", function(event){
					qbImgCropBoxResizerMouseDownFun(event,"touch");
				});
				qbImgCropStageLayer[0].addEventListener("mousemove",function(event){
					if(qbImgCropStageCropBoxProps.qbResize)
					{
						qbImgCropBoxResizerMouseMoveFun(event,"mouse");
					}
				});
				qbImgCropStageLayer[0].addEventListener("touchmove",function(event){
					if(qbImgCropStageCropBoxProps.qbResize)
					{
						qbImgCropBoxResizerMouseMoveFun(event,"touch");
					}
				});
				qbImgCropStageLayer[0].addEventListener("mouseup",function(event){
					qbImgCropBoxResizerMouseUpFun(event,"mouse");
				});
				qbImgCropStageLayer[0].addEventListener("touchend",function(event){
					qbImgCropBoxResizerMouseUpFun(event,"touch");
				});
			});

			//Mouse Events And Mouse Pointer
			var qbMousePointer={};

			var qbMousePointerDiff={};

			var qbImgCropBoxMouseDownFun=function(event,qbEventType){
				qbImgCropStageCropBoxProps.qbDrag=true;
				if(qbEventType==="mouse")
				{
					qbMousePointer.x=event.clientX;
					qbMousePointer.y=event.clientY;
				}
				else if(qbEventType==="touch")
				{
					qbMousePointer.x=event.touches[0].clientX;
					qbMousePointer.y=event.touches[0].clientY;
				}

				qbMousePointerDiff.x=0;
				qbMousePointerDiff.y=0;
			}
			var qbImgCropBoxMouseMoveFun=function(event,qbEventType){
				//For Getting Difference in Pixels
				var qbClientX,qbClientY;
				if(qbEventType==="mouse")
				{
					qbClientX=event.clientX;
					qbClientY=event.clientY;
				}
				else if(qbEventType==="touch")
				{
					qbClientX=event.touches[0].clientX;
					qbClientY=event.touches[0].clientY;
				}
				var qbPsuedoMousePointerDiff={};
				qbPsuedoMousePointerDiff.x=qbClientX-qbMousePointer.x;
				qbPsuedoMousePointerDiff.y=qbClientY-qbMousePointer.y;

				if(!((qbClientX<=qbImgCropBackground[0].getBoundingClientRect().right)&&(qbClientX>=qbImgCropBackground[0].getBoundingClientRect().left)))
				{
					qbPsuedoMousePointerDiff.x=0;
				}
				if(!((qbClientY<=qbImgCropBackground[0].getBoundingClientRect().bottom)&&(qbClientY>=qbImgCropBackground[0].getBoundingClientRect().top)))
				{
					qbPsuedoMousePointerDiff.y=0;
				}
				
				scope.qbImgCropStageCropBoxMoveSetFun(qbPsuedoMousePointerDiff);
				
				qbMousePointer.x=qbClientX;
				qbMousePointer.y=qbClientY;
			}
			var qbImgCropBoxMouseUpFun=function(event){
				qbImgCropStageCropBoxProps.qbDrag=false;
			}

			//Function For Correcting Pointer Position
			qbImgCropStageLayer[0].addEventListener("mouseup",function(event){
				if(qbImgCropStageCropBoxProps.qbDrag)
				{
					qbImgCropStageCropBoxProps.qbDrag=false;
				}
				if(qbImgCropStageCropBoxProps.qbResize)
				{
					qbImgCropStageCropBoxProps.qbResize=false;
				}
			});

			//Function For Mouse Leave
			qbImgCropStageLayer[0].addEventListener("mouseleave", function(event){
				if(qbImgCropStageCropBoxProps.qbDrag)
				{
					console.log("mouse left Tell me What To do?")
				}
				if(qbImgCropStageCropBoxProps.qbResize)
				{
					qbImgCropStageCropBoxProps.qbResize=false;
				}
			});
			
			//Function For Resizing
			var qbImgCropBoxResizerMouseDownFun=function(event,qbEventType){
				qbImgCropStageCropBoxProps.qbResize=true;
				if(qbEventType==="mouse")
				{
					qbMousePointer.x=event.clientX;
					qbMousePointer.y=event.clientY;
				}
				else if(qbEventType==="touch")
				{
					qbMousePointer.x=event.touches[0].clientX;
					qbMousePointer.y=event.touches[0].clientY;
				}

				qbMousePointerDiff.x=0;
				qbMousePointerDiff.y=0;
			}

			var qbImgCropBoxResizerMouseMoveFun=function(event,qbEventType){
				//For Getting Difference in Pixels
				var qbClientX,qbClientY;
				if(qbEventType==="mouse")
				{
					qbClientX=event.clientX;
					qbClientY=event.clientY;
				}
				else if(qbEventType==="touch")
				{
					qbClientX=event.touches[0].clientX;
					qbClientY=event.touches[0].clientY;
				}
				var qbPsuedoMousePointerDiff={};
				qbPsuedoMousePointerDiff.x=qbClientX-qbMousePointer.x;
				qbPsuedoMousePointerDiff.y=qbClientY-qbMousePointer.y;

				//for Moving resizer
				if(!((qbClientX<=qbImgCropBackground[0].getBoundingClientRect().right)&&(qbClientX>=qbImgCropBackground[0].getBoundingClientRect().left)))
				{
					qbPsuedoMousePointerDiff.x=0;
				}
				if(!((qbClientY<=qbImgCropBackground[0].getBoundingClientRect().bottom)&&(qbClientY>=qbImgCropBackground[0].getBoundingClientRect().top)))
				{
					qbPsuedoMousePointerDiff.y=0;
				}
			
				var qbResizeType="";
				if((qbClientX>qbImgCropStageCropBox[0].getBoundingClientRect().right)&&(qbClientY>qbImgCropStageCropBox[0].getBoundingClientRect().bottom))
				{
					qbResizeType="inc";
				}
				else
				{
					qbResizeType="dec";
				}
				scope.qbImgCropStageCropBoxSizeSetFun(qbPsuedoMousePointerDiff,qbResizeType);
				
				qbMousePointer.x=qbClientX;
				qbMousePointer.y=qbClientY;
			}
			var qbImgCropBoxResizerMouseUpFun=function(event){
				qbImgCropStageCropBoxProps.qbResize=false;
			}
			
		},
		template: function(element,attr){
			return 	"<div class=\"qb-img-crop-stage\" style=\"display:table; width:"+attr.qbWidth+"; height:"+attr.qbHeight+"\">"+
						"<div class=\"qb-img-crop-stage-cover\" style=\"display:table-cell; text-align:center; vertical-align:middle; \">"+
							"<div class=\"qb-img-crop-stage-background\" style=\"display:inline-block;background-image:url('"+attr.qbSrc+"'); background-size:cover; background-repeat:no-repeat; background-position:center center;\">"+
								"<div class=\"qb-img-crop-stage-layer\" style=\"position:relative; top:0px; bottom:0px; width:100%; height:100%; background-color: rgba(0,0,0,0.5);\">"+
									"<div class=\"qb-img-crop-stage-crop-box\" style=\"width:200px; height:150px; overflow:hidden; position:relative;\">"+
										"<img src=\""+attr.qbSrc+"\" draggable=\"false\" style=\"display:block; position:relative;\" class=\"qb-img-crop-stage-img\">"+
									"</div>"+
									"<div class=\"qb-img-crop-stage-crop-box-resizer\" style=\"background-color:grey; width:15px; height:15px; position:relative; \" ></div>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>"+
					"<img src=\""+attr.qbSrc+"\" style=\"display:none\" class=\"qb-img-crop-stage-psuedo-img\">";
		}
	}
}

myApp.directive('qbImgCropDisplay',qbImgCropDisplay);
qbImgCropDisplay.$inject=['qbBasics'];
function qbImgCropDisplay(qbBasics)
{
	return{
		scope: {},
		link :function(scope, element, attr, ctrl, transclude){
			var qbImgCropDisplayWrap=angular.element(element[0].querySelector(".qb-img-crop-display-wrap"));
			var qbImgCropDisplayCover=angular.element(element[0].querySelector(".qb-img-crop-display-cover"));
			var qbImgCropDisplayImgDiv=angular.element(element[0].querySelector(".qb-img-crop-display-img-div"));
			var qbImgCropDisplayPsuedoImg=angular.element(element[0].querySelector(".qb-img-crop-display-psuedo-img"));
			var qbImgCropDisplay=angular.element(element[0].querySelector(".qb-img-crop-display"));

			
			var qbImgCropDisplayWidth=0;
			var qbImgCropDisplayHeight=0;

			var qbImgCropBoxProps={};
			scope.qbImgCropDisplaySetFun=function(qbImgCropBoxNewProps){
				qbImgCropBoxProps=qbImgCropBoxNewProps;
				qbImgCropDisplayDimensionSetFun();
			}

			scope.qbImgCropDisplayInitFun=function(qbImgSrc){
				qbImgCropDisplayPsuedoImg.attr("src",qbImgSrc);
				qbImgCropDisplayImgDiv.css("background-image","url('"+qbImgSrc+"')");
				qbImgCropDisplayPsuedoImg[0].addEventListener("load", function(event){
					qbImgCropDisplayWrap.css("display","table");
					qbImgCropDisplayDimensionSetFun();
				});
			}

			var qbImgCropDisplaySetFun=function(){
				var qbImgCropDisplayImgDivTop="-"+(qbImgCropBoxProps.per.top*qbImgCropDisplayHeight/qbImgCropBoxProps.per.height)+"px";
				var qbImgCropDisplayImgDivLeft="-"+(qbImgCropBoxProps.per.left*qbImgCropDisplayWidth/qbImgCropBoxProps.per.width)+"px";

				qbImgCropDisplayImgDiv.css("top",qbImgCropDisplayImgDivTop);
				qbImgCropDisplayImgDiv.css("left",qbImgCropDisplayImgDivLeft);
			}

			window.addEventListener("resize", function(){
				qbImgCropDisplayDimensionSetFun();
			});

			var qbImgCropDisplayDimensionSetFun=function(){
				qbImgCropDisplayCover.css("display","none");
				if(!attr.qbWidth)
				{
					qbImgCropDisplayWrap.css("width","100%");	
				}
				else if(attr.qbWidth=="auto")
				{
					qbImgCropDisplayWrap.css("width","100%");
				}
				
				var qbImgCropDisplayPsuedoImgHeight=qbImgCropDisplayPsuedoImg[0].height;
				var qbImgCropDisplayPsuedoImgWidth=qbImgCropDisplayPsuedoImg[0].width;

				//All three ratios
				var qbImgCropDisplayPsuedoImgRatio=qbImgCropDisplayPsuedoImgHeight/qbImgCropDisplayPsuedoImgWidth;
				var qbImgCropDisplayWrapRatio=qbImgCropDisplayWrap[0].getBoundingClientRect().height/qbImgCropDisplayWrap[0].getBoundingClientRect().width;
				var qbImgCropBoxRatio=qbImgCropBoxProps.pixel.height/qbImgCropBoxProps.pixel.width;

				if(qbImgCropDisplayWrapRatio>=qbImgCropBoxRatio)
				{
					qbImgCropDisplayWidth=qbImgCropDisplayWrap[0].getBoundingClientRect().width;
					qbImgCropDisplayHeight=qbImgCropBoxRatio*qbImgCropDisplayWrap[0].getBoundingClientRect().width;
				}
				else
				{
					qbImgCropDisplayHeight=qbImgCropDisplayWrap[0].getBoundingClientRect().height;
					qbImgCropDisplayWidth=qbImgCropDisplayWrap[0].getBoundingClientRect().height/qbImgCropBoxRatio;
				}

				qbImgCropDisplay.css("width",qbImgCropDisplayWidth+"px");
				qbImgCropDisplay.css("height",qbImgCropDisplayHeight+"px");

				qbImgCropDisplayImgDiv.css("height",(10000/qbImgCropBoxProps.per.height)+"%");
				qbImgCropDisplayImgDiv.css("width",(10000/qbImgCropBoxProps.per.width)+"%");

				if(qbImgCropBoxProps.shape==="circle")
				{
					qbImgCropDisplay.css("border-radius","50%");
				}
				else
				{
					qbImgCropDisplay.css("border-radius","unset");
				}

				qbImgCropDisplaySetFun();
				qbImgCropDisplayCover.css("display","table-cell");
			}
		},
		template: function(element,attr){
			return 	"<div class=\"qb-img-crop-display-wrap\" style=\"display:none; height:"+attr.qbHeight+"; width:"+attr.qbWidth+"\">"+
						"<div class=\"qb-img-crop-display-cover\" style=\"display:table-cell; vertical-align:middle; text-align:center;\" >"+
							"<div class=\"qb-img-crop-display\" style=\"display:inline-block; overflow:hidden\" >"+
								"<div class=\"qb-img-crop-display-img-cover\" style=\"position:relative; width:100%; height:100%; overflow:hidden;\">"+
									"<div class=\"qb-img-crop-display-img-div\" style=\"display:block; position:relative;background-cover:size; background-position: center center; background-repeat: no-repeat; background-size:cover; \"></div>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>"+
					"<img draggable=\"false\" class=\"qb-img-crop-display-psuedo-img\" style=\"display:none; position:relative;\">";
		}
	}
}

myApp.directive('qbSwitch',['qbDataBase','qbBasics', function(qbDataBase,qbBasics) {
    return {
		scope: {
            qbModel:"="
        },
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
			var qbToggleSwitch=angular.element(element[0].querySelector(".qb-toggle-switch"));
			var qbToggleCircle=angular.element(element[0].querySelector("#qb-toggle-circle"));
		    scope.$watch('qbModel', function (newval, oldval) {
				if(newval)
				{
					qbToggleSwitch.addClass("qb-toggle-switch-on");
					qbToggleSwitch.removeClass("qb-toggle-switch-off");

					qbToggleCircle.addClass("qb-toggle-circle-on");
					qbToggleCircle.removeClass("qb-toggle-circle-off");
				}
				else
				{
					qbToggleSwitch.addClass("qb-toggle-switch-off");
					qbToggleSwitch.removeClass("qb-toggle-switch-on");
					
					qbToggleCircle.addClass("qb-toggle-circle-off");
					qbToggleCircle.removeClass("qb-toggle-circle-on");
				}
			});
        },
		template: function(element,attr){	
            return  "<div class=\"qb_div_1\" >"+
						"<div class=\"qb_div_2\">"+
							"<div class=\"qb_div_3\" style=\"background-color:"+attr.qbToggleSwitchColor+";\">"+
								"<div class=\"qb_div_4\" >"+
									"<input ng-model=\"qbModel\" type=\"checkbox\" class=\"qb-toggle-switch qb_div_4_input\">"+
									"<div class=\"qb_div_4_div_1\" id=\"qb-toggle-circle\">"+
										
									"</div>"+
									"<div class=\"qb_div_4_div_2\">"+
										
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>"
		}
	}
}]);

myApp.directive('qbdb',['qbDataBase', function(qbDataBase) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    qbDataBase.arrayData("location_master","Location_Master_State","Location_Master_Country","India");
		},
		template: function(element,attr){
		    return "<div></div>"
		}
	}
}]);
 
 myApp.directive('qbContainer', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var scHeight= window.innerHeight;
		    var cHeight=0;
		    var rHeight=0;
		    var child=angular.element(element).children().children();
		    if(window.innerWidth>600)
		    {
        	    angular.forEach(child, function(value, key){
        	        if(((angular.element(value)[0].nodeName)=="QB-TOP-MENUS")||((angular.element(value)[0].nodeName)=="QB-HEADER"))
        	            cHeight=cHeight + angular.element(value).children()[0].offsetHeight;
        	        else
        	            cHeight=cHeight + angular.element(value)[0].offsetHeight;
        	    });
        	    rHeight=scHeight-cHeight;
        	    angular.forEach(child, function(value, key){
        	        if((angular.element(value)[0].nodeName)==="QB-ROW")
        	        {
        	            angular.element(value).children().css('height',rHeight);
        	        }
        	    });
		    }
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
		        var scHeight= window.innerHeight;
		        var cHeight=0;
    	        if(scWidth>600)
		        {
		            angular.forEach(child, function(value, key){
            	    if(((angular.element(value)[0].nodeName)=="QB-TOP-MENUS")||((angular.element(value)[0].nodeName)=="QB-HEADER"))
            	        cHeight=cHeight + angular.element(value).children()[0].offsetHeight;
            	    else
            	        cHeight=cHeight + angular.element(value)[0].offsetHeight;
            	   });
            	   rHeight=scHeight-cHeight;
		           angular.forEach(child, function(value, key){
            	        if((angular.element(value)[0].nodeName)==="QB-ROW")
            	        {
            	            angular.element(value).children().css('height',rHeight);
            	        }
            	    }); 
		        }
		        else if(scWidth<600)
		        {
		            angular.forEach(child, function(value, key){
            	        if((angular.element(value)[0].nodeName)==="QB-ROW")
            	        {
            	            angular.element(value).children().css('height','100%');
            	        }
            	    });
		        }
            });
		},
		template: function(element,attr){
		    return "<div ng-transclude></div>";    
		}
	}
});

 
myApp.directive('qbFormInput',['qbBasics',  function(qbBasics) {
    return {
		scope: {
		    ngmodel:'='
		},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    angular.element(element).children().attr("name","ayush");
		    scope.validate=function()
		    {
		        var str = scope.ngmodel;
                var patt = new RegExp(attr.expression);
                var res = patt.test(str);
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-input-container\"> <span class=\"qb-input-label\"></span> <input type=\"text\" name=\""+attr.name+"\" ng-model=\"ngmodel\" class=\"qb-input\" ng-keyup=\"validate()\" required> <div class=\"qb-input-message\" ng-transclude> </div> </div>";
		}
	}
}]);

myApp.directive('qbFlex',['qbBasics',  function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    var height=0;
		    scope.loadfun=function(){
		        angular.element(element).children().append(transclude());
		        angular.element(element).children().append("<div style=\"clear:both\"></div>");
		        var childs=angular.element(element).children().children();
		        angular.forEach(childs, function(value, key){
                    height=height+(angular.element(value)[0].offsetHeight);
                });
		    };
		},
		template: function(element,attr){
		    return "<div ng-if=\"loadfun\" ng-init=\"loadfun()\" ng-click=\"clickfun()\"></div>";
		}
	}
}]);

myApp.directive('qbFilter',qbFilter);
qbFilter.$inject=['$http'];
function qbFilter($http)
{
	return {
		restrict: 'E',
		scope:{
		    val: "=",
		    fvar: "="
		},
		link: function(scope,element,attr){
		    scope.datafetch=function(fvariable){
		        if(!attr.fvalue)
		        {
		            if(fvariable)
                    {
                        if(attr.defaultSelect)
                        {
                            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:fvariable};
            		        
            	            $http({
                            method:'POST',url:'../controllers/filter.php',data:filter_data
                                }).then(function mySucces(response){
                                    angular.element(element).children().scope().responses=response.data;
                                    //alert(scope.responses);
                                },function myError(response){
                                    alert(response.statusText);
                            });
                        }
                        else
                        {
                            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:fvariable};
        		            angular.element(element).children().children().children().attr("hidden","");
        		            $http({
                            method:'POST',url:'../controllers/filter.php',data:filter_data
                                }).then(function mySucces(response){
                                    angular.element(element).children().scope().responses=response.data;
                                    if(angular.element(element).children().scope().responses)
                                    {
                                        angular.element(element).children().children().children().html("");
                                        angular.element(element).children().children().scope().val=angular.element(element).children().scope().responses[0];
                                        angular.element(element).children().scope().changefun();
                                    }
                                },function myError(response){
                                    alert(response.statusText);
                            });
                        }
                    }
                    else
                    {
                        angular.element(element).children().scope().changefun();
                    }
		        }
		    };
		    
		    scope.datadetach=function(fvariable){
		        angular.element(element).children().scope().responses="";
		        var myFilters = angular.element(document.querySelectorAll("qb-filter"));
    		    angular.forEach(myFilters, function(value, key){
    		        if(angular.element(value).attr("fetch-id")==attr.filterId)
    		        {
    		            angular.element(value).children().scope().datadetach(fvariable);
    		        }
    		    });
		    };
		    scope.changefun=function(){
		        scope.val=angular.element(element).children().children().scope().val;
		        var fvariable=angular.element(element).children().children().scope().val;
		        angular.element(element).children().scope().findfilter(fvariable);
		    };
		    scope.clickfun=function(){
		        
		    };
		    scope.findfilter=function(fvariable){
		        var myFilters = angular.element(document.querySelectorAll("qb-filter"));
    		    angular.forEach(myFilters, function(value, key){
    		        if(angular.element(value).attr("fetch-id")==attr.filterId)
    		        {
    		            //alert(angular.element(value).attr("filter-id"));
    		            if(fvariable)
    		                angular.element(value).children().scope().datafetch(fvariable);
    		            else
    		                angular.element(value).children().scope().datadetach(fvariable);
    		        }
    		    });
		    };
		    scope.dataload=function(){
		        if(attr.fvalue)
		        {
		            if(attr.defaultSelect)
        		    {
        		        //try to make default selection i got one solution .
            		    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		        
    		            $http({
                        method:'POST',url:'../controllers/filter.php',data:filter_data
                            }).then(function mySucces(response){
                                angular.element(element).children().scope().responses=response.data;
                            },function myError(response){
                                alert(response.statusText);
                        });
        		    }
        		    else
        		    {
        		        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		            angular.element(element).children().children().children().attr("hidden","");
    		            $http({
                        method:'POST',url:'../controllers/filter.php',data:filter_data
                            }).then(function mySucces(response){
                                angular.element(element).children().scope().responses=response.data;
                                if(angular.element(element).children().scope().responses)
                                {
                                    angular.element(element).children().children().children().html("");
                                    angular.element(element).children().children().scope().val=angular.element(element).children().scope().responses[0];
                                    angular.element(element).children().scope().changefun();
                                }
                            },function myError(response){
                                alert(response.statusText);
                        });
        		    }
		        }
		        else if(!attr.defaultSelect)
		        {
		            angular.element(element).children().children().children().html("");
		        }
		    };
		},
		template: function(element,attr){
	        return "<div ng-if=\"dataload\" ng-init=\"dataload()\" > <select ng-model=\"val\" ng-change=\"changefun()\"> <option value=\"\">"+attr.defaultSelect+"</option> <option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select> </div>";
		}
	}
}

myApp.directive('qbAccordions',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
            
            var qbAccordions;
		    var qbAccHeadings;
		    var qbAccContents;
            scope.qbidies=[];
        
            scope.qbAccordionsInitiateFun=function(){
                scope.qbidies=[];
                qbAccordions=qbBasics.findChildren(angular.element(element),"QB-ACCORDION");
                qbAccHeadings=qbBasics.findChildren(angular.element(element),"QB-ACC-HEADING");
                qbAccContents=qbBasics.findChildren(angular.element(element),"QB-ACC-CONTENT");
                
                var i=0;
                angular.forEach(qbAccordions, function(value, key){
                    scope.qbidies.push("qb-acc-"+i);
                    angular.element(qbAccordions[i]).children().attr("qb-acc-id",scope.qbidies[i]);
                    angular.element(qbAccHeadings[i]).children().attr("qb-acc-id",scope.qbidies[i]);
                    angular.element(qbAccContents[i]).children().attr("qb-acc-id",scope.qbidies[i]);
                    i++;
                });
            }
        
            scope.qbAccordionsInitiateFun();
            scope.initiatefun=function(accId){
	            angular.forEach(qbAccordions, function(value, key){
	                if((angular.element(value).children().attr("qb-acc-id"))==accId)
	                {
	                    if((angular.element(value).children().scope().state)==="close")
	                    {
	                        angular.element(value).children().scope().openacc();
	                    }
	                    else
	                    {
	                        angular.element(value).children().scope().closeacc();
	                    }
	                }
	                else
	                {
	                    angular.element(value).children().scope().closeacc();
	                }
    		    });
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordions\" ng-transclude></div>";
		}
	}
}]);
myApp.directive('qbAccordion',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.state="close";
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.openacc=function(){
		        scope.state="open";
		        var acCont=qbBasics.findChildren(angular.element(element),"qb-acc-content");
                angular.element(acCont).children().addClass("qb-accordion-content-open").removeClass("qb-accordion-content-close");
                angular.element(acCont[0]).children().scope().openAccContentFun();

                var acHead=qbBasics.findChildren(angular.element(element),"qb-acc-heading");
                angular.element(acHead[0]).children().scope().openAccHeadingFun();
		    };
		    
		    scope.closeacc=function(){
		        scope.state="close";
		        var acCont=qbBasics.findChildren(angular.element(element),"qb-acc-content");
		        angular.element(acCont).children().addClass("qb-accordion-content-close").removeClass("qb-accordion-content-open");
                angular.element(acCont[0]).children().scope().closeAccContentFun();
            
                var acHead=qbBasics.findChildren(angular.element(element),"qb-acc-heading");
                angular.element(acHead[0]).children().scope().closeAccHeadingFun();
		    };
		    if(attr.default==="open")
		    {
	            angular.element(element).children().scope().openacc();
		    }
		    else
		    {
		        angular.element(element).children().scope().closeacc();
            }
            
            var qbAccordions=qbBasics.findParent(element,"qb-accordions");
            if(attr.ngRepeat)
            {
                qbAccordions.children().scope().qbAccordionsInitiateFun();
            }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordion\" ng-transclude></div>";
		}
	}
}]);
myApp.directive('qbAccHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
	        if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
            }
            
		    
		    scope.clickfun=function(){
                var accs=qbBasics.findParent(angular.element(element),"qb-accordions");
                var accId=angular.element(element).children().attr("qb-acc-id");
		        angular.element(accs).children().scope().initiatefun(accId);
            };
            
            scope.openAccHeadingFun=function(){
                angular.element(element).children().addClass(attr.qbActiveClass).removeClass(attr.qbInactiveClass);
            }
            scope.closeAccHeadingFun=function(){
                angular.element(element).children().addClass(attr.qbInactiveClass).removeClass(attr.qbActiveClass);
            }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordion-heading\" ng-click=\"clickfun()\" ng-transclude ></div>";
		}
	}
}]);
myApp.directive('qbAccContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
            }
            
            scope.openAccContentFun=function(){
                angular.element(element).children().addClass(attr.qbOpenClass).removeClass(attr.qbCloseClass);
            }

            scope.closeAccContentFun=function(){
                angular.element(element).children().addClass(attr.qbCloseClass).removeClass(attr.qbOpenClass);
            }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordion-content\" ng-transclude></div>";
		}
	}
}]);

//last seen on 22-07-2019
//heading styling
myApp.directive('qbTabs',['qbBasics', function(qbBasics) {
    return {
	    scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbTabs=qbBasics.findChildren(angular.element(element),"QB-TAB");
		    var qbTabHeadings=qbBasics.findChildren(angular.element(element),"QB-TAB-HEADING");
		    var qbTabContents=qbBasics.findChildren(angular.element(element),"QB-TAB-CONTENT");
		    var numOfHeadings=qbTabHeadings.length;
		    scope.qbidies=[];
		    var i=0;
		    angular.forEach(qbTabs, function(value, key){
		        scope.qbidies.push("qb-tab-"+i);
		        angular.element(qbTabs[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        angular.element(qbTabHeadings[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        angular.element(qbTabContents[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        i++;
		    });
		    
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
            var headingAllign="";
            var headingSizeType="";
            var headingTotalWidth="";
            var headingComputedWidth="";
            var headingGivenWidth="";
            
            var headingPaddingRight="";
            var headingPaddingLeft="";
            var headingMarginRight="";
            var headingMarginLeft="";
            var headingBorderRight="";
            var headingBorderLeft="";
            
            if(attr.qbHeadingsStyle)
		    {
		        var qbHeadStyles=attr.qbHeadingsStyle.split(";");
		        angular.forEach(qbHeadStyles, function(value, key){
		            var qbHeadStyle="";
		            qbHeadStyle=value.split(":");
		            if((qbHeadStyle[0])==="allign")
		            {
		                if((qbHeadStyle[1])==="left")
		                {
		                    headingAllign="left";
		                }
		                else if((qbHeadStyle[1])==="right")
		                {
		                    headingAllign="right";
		                }
		                else if((qbHeadStyle[1])==="centre")
		                {
		                    headingAllign="centre";
		                }
		            }
		            else if((qbHeadStyle[0])==="size")
		            {
		                if((qbHeadStyle[1])==="equal")
		                {
		                    headingSizeType="equal";
		                    //angular.element(element).children().scope().headingSize(headSize,"equal");
		                }
		                else if((qbHeadStyle[1])==="auto")
		                {
		                    headingSizeType="auto";
		                }
		                else if((qbHeadStyle[1])==="fullfill")
		                {
		                    headingSizeType="fullfill";
		                }
		            }
		            else if((qbHeadStyle[0])==="total-width") 
		            {
		                if(qbHeadStyle[1])
		                {
		                    headingTotalWidth=parseFloat(qbHeadStyle[1]);
		                }
		            }
		        });
		        if(headingTotalWidth)
		        {
    	            var headingCont=angular.element(angular.element(element).children().children()[0]);
    	            headingComputedWidth=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('width'));
    	            headingGivenWidth=headingComputedWidth/100*headingTotalWidth;
    	            
    	            headingPaddingRight=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-right'));
    	            headingPaddingLeft=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-left'));
		        }
		        else
		        {
    	            var headingCont=angular.element(angular.element(element).children().children()[0]);
    	            headingComputedWidth=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('width'));
    	            headingGivenWidth=headingComputedWidth;
    	            
    	            headingPaddingRight=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-right'));
    	            headingPaddingLeft=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-left'));
		        }
		    } 
		    
		    
		    var headingSize=0;
		    scope.headingStyle=function(headWidth){
		        //size type
		        if(headingSizeType==="fullfill")
		        {
		            if(headingTotalWidth)
        	        {
        	            var headingWidth=(headingGivenWidth)/(numOfHeadings);
        	            
        	            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		                angular.forEach(headingDivs, function(value, key){
        	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
        	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
        	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
        	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
        	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
        	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
        	                
        	                var thisCalculatedWidth=headingWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight);
        	                angular.element(value).css("width",thisCalculatedWidth+"px");
        	            });
        	        }
        	        else
        	        {
        	            var headingWidth=(headingGivenWidth)/(numOfHeadings);
        	            
        	            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		                angular.forEach(headingDivs, function(value, key){
        	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
        	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
        	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
        	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
        	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
        	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
        	                
        	                var thisCalculatedWidth=headingWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight);
        	                angular.element(value).css("width",thisCalculatedWidth+"px");
        	            });
        	        }
		        }
		        else if(headingSizeType==="equal")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            if(headWidth>headingSize)
    		        {
    		            headingSize=headWidth;
    		        }
    		        angular.forEach(headingDivs, function(value, key){
    	                //all values of padding margin border
    	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
    	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
    	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
    	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
    	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
    	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
    	                
    	                var thisTotalWidth=thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight+headingSize;
    	                angular.element(value).css("width",thisTotalWidth+"px");
    	            });   
		        }
		        else if(headingSizeType==="auto")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("width","auto");
    	            });
		        }
		        
		        //total width
		        if(headingTotalWidth)
		        {
		            
		        }
		        
		        // allignment
		        if(headingAllign==="left")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingRight=(headingComputedWidth-headingGivenWidth)+headingPaddingRight;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-right",paddingRight+"px");
    	            
    	        }
		        else if(headingAllign==="right")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingLeft=(headingComputedWidth-headingGivenWidth)+headingPaddingLeft;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-left",paddingLeft+"px");
		        }
		        else if(headingAllign==="centre")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingRight=((headingComputedWidth-headingGivenWidth)/2)+headingPaddingRight;
    	            var paddingLeft=((headingComputedWidth-headingGivenWidth)/2)+headingPaddingLeft;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-right",paddingRight+"px");
    	            angular.element(angular.element(element).children().children()[0]).css("padding-left",paddingLeft+"px");
		        }
		    };
		    
		    scope.headingloadfun=function(qbId){
		        var times=0;
		        var defattr=false;
		        var qbtabid="";
		        angular.forEach(qbTabs, function(value, key){
        	        if(((angular.element(value).attr("default"))==="open")&&(!times))
        	        {
        	           defattr=true;
        	           qbtabid=angular.element(value).children().attr("qb-tab-id");
        	           times=1;
        	        }
        	    });
        	    if(!(defattr))
        	    {
        	        qbtabid=angular.element(qbTabs[0]).children().attr("qb-tab-id");
        	    }
    		    angular.forEach(qbTabHeadings, function(value, key){
    		        var headId=angular.element(value).children().attr("qb-tab-id");
    		        if(headId===qbId)
    		        {
    		            angular.element(value).children().scope().openHeadingClass();
    		            var tabHeading=angular.element(value).children().scope().getHeading();
    		            var tabHeadingClass=angular.element(value).children().scope().headingClass();
    		            var thisHeadings=angular.element(element).children().children().children();
    		            angular.forEach(thisHeadings, function(value1, key1){
    		                if(angular.element(value1).scope().qbid)
    		                {
    		                    if((angular.element(value1).scope().qbid)===qbId)
    		                    {
    		                        angular.element(value1).attr("qb-tab-id",qbId);
    		                        angular.element(value1).addClass(tabHeadingClass);
    		                        angular.element(value1).append(tabHeading);
    		                        
    		                        var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('padding-left'));
                	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('padding-right'));
                	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('margin-left'));
                	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('margin-right'));
                	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('border-left'));
                	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('border-right'));
                	                
                	                var thisTotalWidth=thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight+headingSize;
                	                angular.element(element).children().scope().headingStyle(thisTotalWidth);
    		                    }
    		                }
    		            }); 
    		        }
    		        if(qbtabid===qbId)
    		        {
    		            angular.element(element).children().scope().clickfun(qbtabid);
    		        }
    		    }); 
		    };
		    
		    scope.clickfun=function(qbId){
		        angular.forEach(qbTabContents, function(value, key){
		            if((angular.element(value).children().attr("qb-tab-id"))===qbId)
		            {
		                angular.element(value).children().scope().tabopen();          
		            }
		            else
		            {
		                angular.element(value).children().scope().tabclose();
		            }
		        }); 
		        var thisHeadings=angular.element(element).children().children().children();
                angular.forEach(thisHeadings, function(value1, key){
                    if(angular.element(value1).hasClass("qb-tab-heading-active"))
                    {
                        angular.element(value1).removeClass("qb-tab-heading-active").addClass("qb-tab-heading-inactive");
                    }
                    if(angular.element(value1).scope().qbid)
                    {
                        if((angular.element(value1).scope().qbid)===qbId)
                        {
                            angular.element(value1).addClass("qb-tab-heading-active").removeClass("qb-tab-heading-inactive");
                        }
                    }
                });
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-tabs\">"+ 
		                "<div class=\"qb-tab-headings\" style=\"overflow:hidden;width:auto\">"+
		                    " <div ng-repeat=\"qbid in qbidies\" class=\"qb-tab-heading qb-tab-heading-inactive ng-isolate-scope ng-scope\" ng-init=\"headingloadfun(qbid)\" ng-click=\"clickfun(qbid)\" ></div> "+
		                "</div>"+
		                "<div class=\"qb-tab-contents\" ng-transclude ></div>"+
		            "</div>";
		}
	}
}]);
myApp.directive('qbTab',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
	    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" ng-transclude ></div>";
		}
	}
}]);
myApp.directive('qbTabHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.headingClass=function(){
		        if(attr.classes)
    		    {
    		        var headingClass=qbBasics.classCons(attr.classes);
    		        return headingClass;
    		    }
    		    else
    		    {
    		        return undefined;
    		    }
		    };
		    scope.getHeading=function(){
		        return transclude();
		    };
		    scope.openHeadingClass=function(){
		        if(attr.qbTabOpenClasses)
		        {
		            var headingClass=qbBasics.classCons(attr.qbTabOpenClasses);
    		        return headingClass;
		        }
		        else
		        {
		            return undefined; 
		        }
		    };
		},
		template: function(element,attr){ 
		    return "<div style=\"display:none;\" ng-transclude></div>";
		}
	}
}]);
myApp.directive('qbTabContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.tabopen=function(){
		        angular.element(element).children().addClass("qb-tab-content-open").removeClass("qb-tab-content-close");
		    };
		    
		    scope.tabclose=function(){
		        angular.element(element).children().addClass("qb-tab-content-close").removeClass("qb-tab-content-open");
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-content\" ng-transclude></div>";
		}
	}
}]);

// new version last seen on 28-04-2019
myApp.directive('qbAutoCompletes',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.loadfun=function(){
		        var compNum=0;
		        angular.element(element).children().append(transclude());
		        var qbAutoCompletes=qbBasics.findChildren(angular.element(element).children(),"QB-AUTO-COMPLETE");
		        angular.forEach(qbAutoCompletes, function(value, key){
		            angular.element(value).children().attr("qb-auto-complete-id","qb-auto-complete-"+compNum);
		            compNum++;
		        });
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-auto-completes\" ng-if=\"loadfun\" ng-init=\"loadfun()\"></div>";
		}
	}
}]);

myApp.directive('qbAutoComplete',qbAutoComplete);
qbAutoComplete.$inject=['$http'];
function qbAutoComplete($http)
{
    return {
		scope: {
		    qbModel:"=",
		    qbScope:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    var sugs ; 
		    scope.listloadfun=function(){
		        if(attr.qbDatas)
		        {   
		            sugs=attr.qbDatas.split(",");
		            scope.sugidies={};
        	        var sugNum=0;
        	        angular.forEach(sugs, function(value, key){
        		        scope.sugidies[sugNum]=sugNum;
        		        sugNum++;
        		    });
		        }
		        else if(scope.qbScope)
		        {
		            sugs=scope.qbScope;
		            scope.sugidies={};
        	        var sugNum=0;
        	        angular.forEach(sugs, function(value, key){
        		        scope.sugidies[sugNum]=sugNum;
        		        sugNum++;
        		    });
		        }
		        if((attr.table)&&(attr.column)&&(attr.fcolumn)&&(attr.fvalue))
		        {
		            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
	        
    	            $http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
                            sugs=response.data;
                            scope.sugidies={};
                	        var sugNum=0;
                	        angular.forEach(sugs, function(value, key){
                		        scope.sugidies[sugNum]=sugNum;
                		        sugNum++;
                		    });
                        },function myError(response){
                            alert(response.statusText);
                    });   
		        }
		    };
		    
		    var sugDivs={};
		    var matchingSugDivs={};
		    var focusSugs={};
		    var noOfSugs;
		    scope.sugloadfun=function(sugId){
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
    		        if((angular.element(value).scope().sugid)==sugId)
    		        {
    		            angular.element(value).attr("qb-suggestion-id","qb-suggestion-"+sugId);
    		            angular.element(value).attr("qb-suggestion",sugs[sugId]);
    		            sugDivs[sugId]=angular.element(element).children().children().children()[sugId];
    		        }
    		    });   
		    };
		    
		    scope.$watch('qbModel', function (newval, oldval) {
		        var inpVal=newval;
                var matchingSug=[];
		        var sugNum2=0;
		        if(toEmpty)
		        {
		            toEmpty=0;
		            angular.forEach(angular.element(element).children().children().children(), function(value, key){
		                angular.element(value).empty();
		                angular.element(value)[0].style.display="none";
		            });
		        }
		        else if((inpVal)&&(inpVal.length))
		        {
		            angular.forEach(sugs, function(value, key){
		                var req=0;
    		            for(var i=0; i<inpVal.length; i++)
    		            {   
    		                var sugUpper=value.toUpperCase();
    		                var inpUpper=inpVal.toUpperCase();
    		                if(!(sugUpper[i]===inpUpper[i]))
    		                {
    		                    req=0;
    		                    break;
    		                }
    		                else
    		                {
    		                    req=1;
    		                }
    		            }
    		            if(req)
    		            {
    		                matchingSug[sugNum2]=value;
    		            }
    		            else
    		            {
    		                matchingSug[sugNum2]="";
    		            }
		                sugNum2++;
		            });   
		            
		            if(matchingSug)
		            {
		                var matchNum=0;
		                var focusNum=0;
		                angular.forEach(matchingSug, function(value, key){
                            if(value)
                            {
                                if(value===(angular.element(sugDivs[matchNum]).attr("qb-suggestion")))
                                {
                                       //sugDivs[matchNum].css("display","block");
                                       var sugBVal="";
                                       var sugNVal="";
                                       for(var j=0; j<value.length; j++)
                    		           {
                    		                if((inpVal.length)<=j)
                    		                {
                    		                    sugNVal=sugNVal+value[j];
                    		                }
                    		                else
                    		                {
                    		                    sugBVal=sugBVal+value[j];
                    		                }
                    		           }
                    		           
                                       var sugChild=angular.element("<strong>"+sugBVal+"</strong>"+sugNVal+" ");
                                       angular.element(sugDivs[matchNum]).empty();
                                       angular.element(sugDivs[matchNum])[0].style.display="block";
                                       angular.element(sugDivs[matchNum]).append(sugChild);
                                       matchingSugDivs[focusNum]=angular.element(sugDivs[matchNum]);
                                       focusSugs[focusNum]=value;
                                       focusNum++;
                                       noOfSugs=focusNum;
                                }
                            }
                            else
                            {
                                angular.element(sugDivs[matchNum])[0].style.display="none";
                            }
                            matchNum++;
            		    });
            		    angular.forEach(matchingSugDivs, function(value, key){
        	                angular.element(value).removeClass("qb-autocomplete-suggestion-active");
        	            });
        	            focus=-1;
		            }
		        }
		        else
		        {
		            angular.forEach(angular.element(element).children().children().children(), function(value, key){
		                angular.element(value).empty();
		                angular.element(value)[0].style.display="none";
		            }); 
		        }
		    });
		    
		    scope.sugclickfun=function(sugId,actionType){
		        focus=-1;
		        if(actionType=="focus")
		        {
    	            toEmpty=1;
		            scope.qbModel=focusSugs[sugId];
		        }
		        else
		        {
		            toFocus=1;
		            scope.qbModel=sugs[sugId];
		        }
		        angular.element(element).children().children()[0].focus();
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
                    angular.element(value).empty();
                    angular.element(value)[0].style.display="none";
                }); 
		    };
		    
		    var toFocus=0;
		    var toEmpty=0;
		    scope.blurfun=function(){
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
	                angular.element(value).empty();
	                angular.element(value)[0].style.display="none";
	            });
	            if(toFocus)
	            {
	                toFocus=0;
	                angular.element(element).children().children()[0].focus();
	            }
		    };
		    
		    var focus=-1;
		    var inp=angular.element(element).children().children()[0];
		    inp.addEventListener("keydown", function(e) {
                if (e.keyCode == 40) {
                    focus++;
                    if(noOfSugs>focus)
                    {
                        angular.element(element).children().scope().activesug(focus);
                    }
                    else
                    {
                        focus=0;
                        angular.element(element).children().scope().activesug(focus);
                    }            
                } 
                else if (e.keyCode == 38) {
                    focus--;
                    if(focus>-1)
                    {
                        angular.element(element).children().scope().activesug(focus);
                    }
                    else
                    {
                        focus=noOfSugs-1;
                        angular.element(element).children().scope().activesug(focus);
                    }
                } 
                else if (e.keyCode == 13) {
                    if(focus>-1)
                    {
                        angular.element(element).children().scope().sugclickfun(focus,"focus");
                        angular.element(element).children().children()[0].blur();
                        angular.element(element).children().children()[0].focus();
                    }
                }
            });
            
            scope.activesug=function(focusId){
                angular.forEach(matchingSugDivs, function(value, key){
	                angular.element(value).removeClass("qb-autocomplete-suggestion-active");
	            });
                angular.element(matchingSugDivs[focusId]).addClass("qb-autocomplete-suggestion-active");
            };
		    
		},
		template: function(element,attr){ 
		    return"<div class=\"qb-auto-complete\">"+ 
		        "<input type=\"text\" class=\"qb-auto-complete-input\" ng-model=\"qbModel\" ng-blur=\"blurfun()\">"+
    		    "<div class=\"qb-auto-complete-list\" ng-if=\"listloadfun\" ng-init=\"listloadfun()\" >"+
    		        "<div ng-mousedown=\"sugclickfun(sugid)\" class=\"qb-auto-complete-suggestion\" ng-repeat=\"sugid in sugidies\" ng-init=\"sugloadfun(sugid)\" ></div>"+
    		    "</div>"+
    		    "</div>";
		}
	}
}

myApp.directive('qbRow',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    var win = angular.element(window);
		    win.bind("resize",function(){
		        if(attr.responsive)
		        {
		            if(window.innerWidth>600)
		            {
		                var i=0;
		                angular.forEach(cellEles, function(vCell, key){
        	                angular.element(vCell).css("display","table-cell");
        	                angular.element(vCell).css("width",cellElesWidth[i]);
        	                i++;
        		        });
		            }
		            else
		            {
		                angular.forEach(cellEles, function(vCell, key){
        	                angular.element(vCell).css("display","block");
        	                angular.element(vCell).css("width","100%");
        		        }); 
		            }
		        }
		    });
		    
		    var rowEle;
		    var cellEles;
		    var cellElesWidth=[];
		    scope.rowloadfun=function(){
		        rowEle=angular.element(element).children().children();
		        angular.element(rowEle).append(transclude());
		        cellEles=angular.element(rowEle).children();
		        var numOfCells=cellEles.length;
		        var i=0;
		        angular.forEach(cellEles, function(vCell, key){
	                angular.element(vCell).addClass("qb-cell");
	                cellElesWidth[i]=angular.element(vCell).attr("qb-cell-width");
	                i++;
		        }); 
		        if(window.innerWidth>600)
	            {
	                var j=0;
	                angular.forEach(cellEles, function(vCell, key){
    	                angular.element(vCell).css("float","none");
    	                angular.element(vCell).css("display","table-cell");
    	                angular.element(vCell).css("width",cellElesWidth[j]);
    	                j++;
    		        });
	            }
	            else
	            {
	                angular.forEach(cellEles, function(vCell, key){
    	                angular.element(vCell).css("display","block");
    	                angular.element(vCell).css("width","100%");
    		        });
	            }
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-table\" style=\"display:table;table-layout:fixed\">"+
		                "<div class=\"qb-row\" style=\"display:table-row\" ng-if=\"rowloadfun\" ng-init=\"rowloadfun()\"></div>"+
		            "</div>";
		}
	}
}]);

myApp.directive('qbValid',['qbBasics', function(qbBasics) {
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    var cont="agrawal.ayush2500";
		    scope.blurfun=function(){
		        if(cont===scope.qbModel)
		        {
		            angular.element(angular.element(element).children()[1]).addClass("qb-tab-heading-active");
		        }
		    };
		},
		template: function(element,attr){ 
		    return "<div>"+
		                "<input ng-model=\"qbModel\" ng-blur=\"blurfun()\">"+
		           "</div>"+
		           "<div> already there</div>";
		}
	}
}]);

//qb form
myApp.directive('qbForm',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-form\">"+
                    "</div>";
		}
	}
}]);
myApp.directive('qbInput',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-input\">"+
                    "</div>";
		}
	}
}]);

//qb align last seen on 28-04-2019
myApp.directive('qbContentAlign',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
		    var horizontalAlign="";
		    var verticalAlign="";
		    var widthType="";
		    var heightType="";
		    var contentsTotalWidth=0;
		    var contents=angular.element(element).children();
		    angular.forEach(contents, function(vCont, kCont){
                var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
                contentsTotalWidth=contentsTotalWidth+thisWidth;
            });
            
            var largestH=0;
            angular.forEach(contents, function(vCont, kCont){
                var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
                if(thisHeight>largestH)
                {
                    largestH=thisHeight;
                }
            });
		    
		    if(!(qbBasics.isQbType(angular.element(element))))
		    {
		        var alignValues=attr.qbContentAlign.split(";");
		        if(contents)
		        {
    		        angular.forEach(alignValues, function(value, key){
    		            var alignValue=""; 
    		            alignValue=value.split(":");
    		            if((alignValue[0])=="vertical")
    		            {
    		                if(((alignValue[1])=="top")||((alignValue[1])=="centre")||((alignValue[1])=="bottom"))
    		                {
    		                    verticalAlign=alignValue[1];
    		                }
    		            }
    		            else if((alignValue[0])=="horizontal")
    		            {
    		                if(((alignValue[1])=="left")||((alignValue[1])=="middle")||((alignValue[1])=="right"))
    		                {
    		                    horizontalAlign=alignValue[1];
    		                }
    		            }
    		            else if((alignValue[0])=="width-type")
    		            {
    		                if(((alignValue[1])=="responsive")||((alignValue[1])=="static"))
    		                {
    		                    widthType=alignValue[1];
    		                }
    		            }
    		            else if((alignValue[0])=="height-type")
    		            {
    		                if(((alignValue[1])=="responsive")||((alignValue[1])=="static"))
    		                {
    		                    heightType=alignValue[1];
    		                }
    		            }
    		        });
    		        qbBasics.contentsAlign(angular.element(element),horizontalAlign,verticalAlign,widthType,heightType,contentsTotalWidth,largestH);
		        }
		    }
		    
		    var win = angular.element(window);
		    win.bind("resize",function(){
		        qbBasics.contentsAlignResize(angular.element(element),horizontalAlign,verticalAlign,widthType,heightType,contentsTotalWidth,largestH);
		    });
	
		}
	}
}]);

//qbSetContainerWidth last seen on 7-12-2019
myApp.directive('qbSetContainerWidth',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
			var contWidth=0;
			angular.forEach(angular.element(element).children(),function(contChild,key){
				contWidth+=qbBasics.getOutterWidth(contChild);
			});
			contWidth*=1.00001;
			angular.element(element).css('width',contWidth+"px");
		}
	}
}]);

//qbSetInnerWidth last seen on 8-12-2019
myApp.directive('qbSetInnerWidth',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
			var attrVal=attr.qbSetInnerWidth.split(";");
			var outterWidthPer=parseFloat(attrVal[1])/100;
			angular.element(element).ready(function(){
				var outterWidth=(angular.element(element).parent()[0].clientWidth)*(outterWidthPer);
				qbBasics.setInnerWidth(element,outterWidth);
				if(attrVal.includes("responsive"))
				{
					angular.element(window).bind('resize',function(){
						outterWidth=(angular.element(element).parent()[0].clientWidth)*(outterWidthPer);
						qbBasics.setInnerWidth(element,outterWidth);
					})
				}
			})
		}
	}
}]);

//qbRespContentAlign last seen on 08-12-2019
myApp.directive('qbRespContentAlign',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
			var outterWidth=(angular.element(element).parent()[0].clientWidth*(parseFloat(attr.qbRespContentAlign)/100))
			var respPers=qbBasics.getRespPercents(element,outterWidth);
			
			angular.element(element).ready(function(){
				qbBasics.setRespPercents(element,outterWidth,respPers);
				angular.element(window).bind('resize',function(){
					outterWidth=angular.element(element).parent()[0].clientWidth;
					qbBasics.setRespPercents(element,outterWidth,respPers);
				})
			})
		}
	}
}]);

myApp.directive('qbShowMenus',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
	        if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
	        
	        var trans=angular.element("<div></div>");
	        trans.append(transclude());
		    
		    scope.qbMenusOpenFun=function(){
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-open");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-close");
		        var qbMenusIcons=qbBasics.findChildren(angular.element(element),"qb-menus-icon");
		        angular.forEach(qbMenusIcons, function(value, key){
		            if((angular.element(value).attr("icon-type"))==="open")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-close");
		                angular.element(value).children().removeClass("qb-menus-icon-open");
		            }
		            else if((angular.element(value).attr("icon-type"))==="close")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-open");
		                angular.element(value).children().removeClass("qb-menus-icon-close");
		            }
                });
		    };
		    
		   scope.qbMenusCloseFun=function(){
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-close");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-open");
		        var qbMenusIcons=qbBasics.findChildren(angular.element(element),"qb-menus-icon");
		        angular.forEach(qbMenusIcons, function(value, key){
		            if((angular.element(value).attr("icon-type"))==="open")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-open");
		                angular.element(value).children().removeClass("qb-menus-icon-close");
		            }
		            else if((angular.element(value).attr("icon-type"))==="close")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-close");
		                angular.element(value).children().removeClass("qb-menus-icon-open");
		            }
                });
		    };
		    
		    scope.qbMenusMobShowFun=function(){
		        angular.element(element).children().children()[0].style.display="block";
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-close");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-open");
		        
		    };
		    
		    scope.qbMenusDeskShowFun=function(){
		        angular.element(element).children().children()[0].style.display="none";
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-open");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-close");
		    };
		    
		    
		    var isResponsive=attr.responsive;
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        if(isResponsive)
		        {
                    var scWidth= window.innerWidth;
                    if(scWidth>600)
                    {
                        angular.element(element).children().scope().qbMenusDeskShowFun();
                    }
                    else
                    {
                        angular.element(element).children().scope().qbMenusMobShowFun();
                        angular.element(element).children().scope().qbMenusCloseFun();
                    }
		        }
            });
		    
		    scope.qbShowTopMenusLoadFun=function(){   
    	        if(window.innerWidth<600)
    	        {
    	            angular.element(element).children().scope().qbMenusMobShowFun();
    	        }
    	        else
    	        {
    	            angular.element(element).children().scope().qbMenusDeskShowFun();
    	        }
    	        
    	        var qbMenuHeight=parseFloat(window.getComputedStyle(angular.element(angular.element(element).children().children()[1]).children()[0], null).getPropertyValue('height'));
    	        /*var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-sub-menus-top-type");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            var qbMenuId=angular.element(value).parent().attr("qb-menu-in-sub-menus-id");
		           angular.element(value).css("top",(qbMenuHeight*qbMenuId)+"px");
                });*/
                
                var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-menus");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                angular.element(value).addClass("qb-sub-sub-menus-top-type");
		                var qbMenuId=angular.element(value).parent().attr("qb-menu-in-sub-menus-id");
    		            angular.element(value).css("top",(qbMenuHeight*qbMenuId)+"px");
		            }
		            /*else if(angular.element(value).parent().hasClass("qb-menu-in-top-menus"))
		            {
		                angular.element(value).addClass("qb-top-sub-menus");
		            }*/
                });
                
		    };
		    
		    scope.qbShowLeftMenusLoadFun=function(){
    	        if(window.innerWidth<600)
    	        {
    	            angular.element(element).children().scope().qbMenusMobShowFun();
    	        }
    	        else
    	        {
    	            angular.element(element).children().scope().qbMenusDeskShowFun();
    	        }
    	        
		        var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-menus");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                angular.element(value).addClass("qb-sub-sub-menus-left-type");
		            }
		            else if(angular.element(value).parent().hasClass("qb-menu-in-left-menus"))
		            {
		                angular.element(value).addClass("qb-left-sub-menus");
		            }
		        });
		    };
		    
		    
		    scope.qbShowIconMenusLoadFun=function(){
    	        angular.element(element).children().scope().qbMenusMobShowFun();
    	        
		        var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-menus");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                angular.element(value).addClass("qb-sub-sub-menus-icon-type");
		            }
		            else if(angular.element(value).parent().hasClass("qb-menu-in-icon-menus"))
		            {
		                angular.element(value).addClass("qb-icon-sub-menus");
		            }
		        });
		        isResponsive=false;
		    };
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-show-menus\">"+
		                "<div class=\"qb-show-menus-icon-div\" ng-click=\"qbShowMenusClickFun()\" ng-transclude> </div>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbMenusHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menus-heading\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbMenusIcon',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    if((attr.iconType)==="open")
		    {
		        angular.element(element).children().addClass("qb-menus-icon-open");
		    }
		    else if((attr.iconType)==="close")
		    {
		        angular.element(element).children().addClass("qb-menus-icon-close");
		    }
		    
		    scope.qbMenusIconClickFun=function(){
		        var qbShowMenus=qbBasics.findParent(angular.element(element),"qb-show-menus");
		        if((attr.iconType)==="open")
    		    {
    		        var qbBar=qbBasics.findParent(angular.element(element),"qb-bar");
    		        var qbShowMenusAll=qbBar[0].querySelectorAll("qb-show-menus");
    		        angular.forEach(qbShowMenusAll, function(value, key){
    		            angular.element(value).children().scope().qbMenusCloseFun();
    		        }); 
    		        angular.element(qbShowMenus).children().scope().qbMenusOpenFun();      
    		    }
    		    else if((attr.iconType)==="close")
    		    {
    		        angular.element(qbShowMenus).children().scope().qbMenusCloseFun();
    		    }   
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menus-icon\" ng-click=\"qbMenusIconClickFun()\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);
myApp.directive('qbMenus',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.qbMenusLoadFun=function(){
		        if((attr.qbMenuType)==="top")
		        {
		            angular.element(element).children().scope().qbTopMenusLoadFun();
		        }
		        else if((attr.qbMenuType)==="left")
		        {
		            angular.element(element).children().scope().qbLeftMenusLoadFun();
		        }
		        else if((attr.qbMenuType)==="icon")
		        {
		            angular.element(element).children().scope().qbIconMenusLoadFun();
		        }
		    };
		    
		    scope.qbIconMenusLoadFun=function(){
		        var qbMainMenuDiv=angular.element("<div class=\"qb-menus qb-icon-menus\" style=\"overflow:hidden\"></div>");
		        if(attr.classes)
		        {
		            qbMainMenuDiv.addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuEle=angular.element(value).children().scope().qbMenuLoadFun();
                        if(qbMenuEle)
                        {
                            qbMainMenuDiv.append(angular.element(qbMenuEle).html());
                        }
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                var qbMenuInLeftMenusIdies=0;
                var qbMenuInLeftMenus=angular.element(qbMainMenuDiv).children();
                angular.forEach(qbMenuInLeftMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-icon-menus");
                        angular.element(value).attr("qb-menu-in-icon-menus-id",qbMenuInLeftMenusIdies);
                        qbMenuInLeftMenusIdies++;
                    }
                });
                
		        angular.element(element).children().empty();
		        var qbShowMenus=document.querySelectorAll("qb-show-menus");
		        angular.forEach(qbShowMenus, function(value, key){
                    if((angular.element(value).attr("qb-menus-id"))===(angular.element(element).attr("qb-menus-id")))
                    {
		                var qbIconMenusAppendEle=qbBasics.compile(angular.element(qbMainMenuDiv));
		                angular.element(value).children().append(qbIconMenusAppendEle);
		                angular.element(value).children().scope().qbShowIconMenusLoadFun();
                    }
                });
		        
		    };
		    
		    scope.qbLeftMenusLoadFun=function(){
		        var qbMainMenuDiv=angular.element("<div class=\"qb-menus qb-left-menus\" style=\"overflow:hidden\"></div>");
		        if(attr.classes)
		        {
		            qbMainMenuDiv.addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuEle=angular.element(value).children().scope().qbMenuLoadFun();
                        if(qbMenuEle)
                        {
                            qbMainMenuDiv.append(angular.element(qbMenuEle).html());
                        }
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                var qbMenuInLeftMenusIdies=0;
                var qbMenuInLeftMenus=angular.element(qbMainMenuDiv).children();
                angular.forEach(qbMenuInLeftMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-left-menus");
                        angular.element(value).attr("qb-menu-in-left-menus-id",qbMenuInLeftMenusIdies);
                        qbMenuInLeftMenusIdies++;
                    }
                });
                
		        angular.element(element).children().empty();
		        var qbShowMenus=document.querySelectorAll("qb-show-menus");
		        angular.forEach(qbShowMenus, function(value, key){
                    if((angular.element(value).attr("qb-menus-id"))===(angular.element(element).attr("qb-menus-id")))
                    {
		                var qbLeftMenusAppendEle=qbBasics.compile(angular.element(qbMainMenuDiv));
		                angular.element(value).children().append(qbLeftMenusAppendEle);
		                angular.element(value).children().scope().qbShowLeftMenusLoadFun();
                    }
                });
		        
		    };
		    
		    scope.qbTopMenusLoadFun=function(){
		        var qbMainMenuDiv=angular.element("<div class=\"qb-menus qb-top-menus\" style=\"overflow:hidden\"></div>");
		        if(attr.classes)
		        {
		            qbMainMenuDiv.addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuEle=angular.element(value).children().scope().qbMenuLoadFun();
                        if(qbMenuEle)
                        {
                            qbMainMenuDiv.append(angular.element(qbMenuEle).html());
                        }
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                var screenWidth=window.innerWidth;
                var qbMenuInTopMenuWidth;
                if(screenWidth>600)
                {
                    qbMenuInTopMenuWidth=(screenWidth/i);
                }
                else
                {
                    qbMenuInTopMenuWidth=screenWidth;
                }
                var qbMenuInTopMenusIdies=0;
                var qbMenuInSubMenus=angular.element(qbMainMenuDiv).children();
                angular.forEach(qbMenuInSubMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-top-menus");
                        angular.element(value).css("width",qbMenuInTopMenuWidth+"px");
                        angular.element(value).attr("qb-menu-in-top-menus-id",qbMenuInTopMenusIdies);
                        qbMenuInTopMenusIdies++;
                    }
                });
                
                var qbTopSubMenus=angular.element(qbMainMenuDiv).children().children();
                angular.forEach(qbTopSubMenus, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-top-menus"))
		            {
		                if(angular.element(value).hasClass("qb-sub-menus"))
		                {
		                    angular.element(value).addClass("qb-top-sub-menus");
		                }
		            }
		        });
		        
		        var qbShowMenus=document.querySelectorAll("qb-show-menus");
		        angular.forEach(qbShowMenus, function(value, key){
                    if((angular.element(value).attr("qb-menus-id"))===(angular.element(element).attr("qb-menus-id")))
                    {
                        var qbTopMenusAppendEle=qbBasics.compile(angular.element(qbMainMenuDiv));
		                angular.element(value).children().append(qbTopMenusAppendEle);
		                angular.element(value).children().scope().qbShowTopMenusLoadFun();
                    }
                });
                angular.element(element).empty();
            };
		    
		    scope.qbSubMenusLoadFun=function(){
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        var qbSubMenusEle=angular.element("<div class=\"qbsubmenus\"><div class=\"qb-sub-menus\"></div></div>");
		        if(attr.classes)
		        {
		            qbSubMenusEle.children().addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuRet=angular.element(value).children().scope().qbMenuLoadFun();
                        qbSubMenusEle.children().append(qbMenuRet.html());
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                
                var qbMenuInSubMenusIdies=0;
                var qbMenuInSubMenus=angular.element(qbSubMenusEle).children().children();
                angular.forEach(qbMenuInSubMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-sub-menus");
                        angular.element(value).attr("qb-menu-in-sub-menus-id",qbMenuInSubMenusIdies);
                        qbMenuInSubMenusIdies++;
                    }
                });
                
                var qbSubSubMenus=angular.element(qbSubMenusEle).children().children().children();
                angular.forEach(qbSubSubMenus, function(value, key){
                    if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                if(!(angular.element(value).hasClass("qb-menu-heading")))
		                {
		                    angular.element(value).addClass("qb-sub-sub-menus");
		                }
		            }
		        });
		        
		        return qbSubMenusEle;
    	    };
    	    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menus\" style=\"display:none\">"+
		                "<div ng-if=\"qbMenusLoadFun\" ng-init=\"qbMenusLoadFun()\"></div>"+
		           "</div>";
		}
	}
}]);

myApp.directive('qbMenu',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.qbMenuLoadFun=function(){
		        var qbDiv=angular.element("<div></div>");
		        qbDiv.append(transclude());
		        var qbSubMenus=qbDiv.children();
		        var qbSubMenusExist=false;
		        angular.forEach(qbSubMenus, function(value, key){
	                if((angular.element(value)[0].nodeName)==="QB-MENUS")
	                {
	                    qbSubMenusExist=true;
	                }
	            }); 
	            if(qbSubMenusExist)
	            {
	                var qbSubMenusEle=angular.element("<div class=\"qbsubmenus "+attr.classes+"\"></div>");
	                angular.forEach(qbSubMenus, function(value, key){
    	                if((angular.element(value)[0].nodeName)==="QB-MENUS")
    	                {
    	                    if((angular.element(value).attr("qb-menu-type"))==="sub")
    	                    {
    	                        var qbSubMenusRet=angular.element(value).children().scope().qbSubMenusLoadFun();
    	                        qbSubMenusEle.append(qbSubMenusRet.html());
    	                    }
    	                }
    	            }); 
    	            
    	            var qbMenuDiv=angular.element("<div></div>");
    	            var qbMenuHeading=angular.element(element).children().children();
    	            var qbSubMenusDiv=qbBasics.findChildren(angular.element(qbDiv),"QB-MENUS");
    	            qbDiv.children().remove();
    	            qbMenuHeading.append(qbDiv.html());
    	            qbMenuDiv.append(qbSubMenusDiv);
    	            angular.element(element).children().append(qbMenuDiv.html());
    	            
                    var qbMenuEle=angular.element("<div><div class=\"qb-menu "+attr.classes+"\"></div></div>");
                    qbMenuEle.children().append(qbMenuHeading);
                    qbMenuEle.children().append(qbSubMenusEle.html());
                    if(attr.classes)
                    {
                        qbMenuEle.children().addClass(qbBasics.classCons(attr.classes));
                    }
                    return qbMenuEle;
	            }
	            else
	            {
	                angular.element(element).children().empty();
	                var qbContent;
	                if(attr.qbLink)
	                {
	                    qbContent=angular.element("<div class=\"qb-menu-heading "+attr.classes+"\"><a class=\""+attr.qbAnchorClass+"\" href=\""+attr.qbLink+"\"></a></div>");
	                    qbContent.children().append(qbDiv.html());
	                }
	                else
	                {
	                    qbContent=angular.element("<div class=\"qb-menu-heading "+attr.classes+"\"></div>");
	                    qbContent.append(qbDiv.html());
	                }
                    angular.element(element).children().append(qbContent);
                    var qbMenuEle=angular.element(element);
                    if(attr.classes)
                    {
                        qbMenuEle.children().addClass(qbBasics.classCons(attr.classes));
                    }
                    return qbMenuEle;
	            }
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menu\">"+
		                "<div class=\"qb-menu-heading\"></div>"+
		           "</div>";
		}
	}
}]);

myApp.directive('qbModal',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.qbModalLoadFun=function(){
		        var qbModalEle=angular.element("<div></div>");
		        qbModalEle.append(transclude());
		        var qbModalEleConts=qbModalEle.children();
		        angular.forEach(qbModalEleConts, function(value, key){
		            if((angular.element(value)[0].nodeName)==="QB-MODAL-CLOSE-BUTTON")
		            {
		                var qbModalCloseButton=angular.element("<button class=\"qb-modal-close-button\"></button>");
		                qbModalCloseButton.append(angular.element(value).html());
		                qbModalCloseButton.bind("click",function(event){
		                    angular.element(element).children().scope().qbModalCloseFun();
		                });
		                var qbModalChildren=angular.element(element).children().children();
		                angular.forEach(qbModalChildren, function(vModal, key){
		                    if(angular.element(vModal).hasClass("qb-modal-content"))
		                    {
		                        angular.element(vModal).append(qbModalCloseButton);
		                    }
		                });
		            }
		            else if((angular.element(value)[0].nodeName)==="QB-MODAL-CONTENT")
		            {
		                var qbModalChildren=angular.element(element).children().children();
		                angular.forEach(qbModalChildren, function(vModal, key){
		                    if(angular.element(vModal).hasClass("qb-modal-content"))
		                    {
		                        angular.element(vModal).append(angular.element(value).html());
		                    }
		                });
		            }
		            else if((angular.element(value)[0].nodeName)==="QB-MODAL-OPEN-BUTTON")
		            {
		                var qbModalOpenButton=angular.element("<button class=\"qb-modal-open-button\"></button>");
		                qbModalOpenButton.append(angular.element(value).html());
		                qbModalOpenButton.bind("click",function(event){
		                    angular.element(element).children().scope().qbModalOpenFun();
		                });
		                angular.element(angular.element(element).children()).prepend(qbModalOpenButton);
		            } 
		        });
		    };
		    
		    scope.qbModalOpenFun=function(){
		        var qbModalChildren=angular.element(element).children().children();
		        angular.forEach(qbModalChildren, function(vModal, key){
                    if(angular.element(vModal).hasClass("qb-modal-content"))
                    {
                        angular.element(vModal).addClass("qb-modal-content-open");
                        angular.element(vModal).removeClass("qb-modal-content-close");
                    }
                });
		    };
		    
		    scope.qbModalCloseFun=function(){
		        var qbModalChildren=angular.element(element).children().children();
		        angular.forEach(qbModalChildren, function(vModal, key){
                    if(angular.element(vModal).hasClass("qb-modal-content"))
                    {
                        angular.element(vModal).addClass("qb-modal-content-close");
                        angular.element(vModal).removeClass("qb-modal-content-open");
                    }
                });
		    };
		},
		template: function(element,attr){
		    return "<div class=\"qb-modal\" ng-if=\"qbModalLoadFun\" ng-init=\"qbModalLoadFun()\">"+
		                "<div class=\"qb-modal-content qb-modal-content-close\">"+
		                "</div>"+
		           "</div>"
		}
    }
}]);

myApp.directive('qbBar',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.qbBarLoadFun=function(){
    		    if(attr.qbBarType)
    		    {
    		        if((attr.qbBarType)==="menu")
    		        {
    		            angular.element(element).children().addClass("qb-menu-bar");
    		            angular.element(element).children().scope().qbBarOpenFun();
    		        }
    		        else if((attr.qbBarType)==="search")
    		        {
    		            angular.element(element).children().addClass("qb-search-bar");
    		            angular.element(element).children().scope().qbBarCloseFun();
    		        }
    		    }  
		    };
		    
		    scope.qbBarOpenFun=function(){
		        angular.element(element).children().addClass(qbBasics.classCons(attr.qbOpenClass));
		        angular.element(element).children().removeClass(qbBasics.classCons(attr.qbCloseClass));
		    };
		    
		    scope.qbBarCloseFun=function(){
		        angular.element(element).children().addClass(qbBasics.classCons(attr.qbCloseClass));
		        angular.element(element).children().removeClass(qbBasics.classCons(attr.qbOpenClass));
		    };
		    
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-bar\" ng-if=\"qbBarLoadFun\" ng-init=\"qbBarLoadFun()\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbIcon',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.qbIconClickFun=function(){
		        var qbBars=document.querySelectorAll("qb-bar");
		        if((attr.qbIconType)==="search")
		        {
		            angular.forEach(qbBars, function(qbBar, key){
		                if(angular.element(qbBar).attr("qb-bar-type")==="menu")
		                {
    		                if((attr.qbIconId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarCloseFun();
    		                }
		                }
		                else if(angular.element(qbBar).attr("qb-bar-type")==="search")
		                {
    		                if((attr.qbTargetId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarOpenFun();
    		                }
		                }
		            });
		        }
		        else if((attr.qbIconType)==="back")
		        {
		            angular.forEach(qbBars, function(qbBar, key){
		                if(angular.element(qbBar).attr("qb-bar-type")==="menu")
		                {
    		                if((attr.qbTargetId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarOpenFun();
    		                }
		                }
		                else if(angular.element(qbBar).attr("qb-bar-type")==="search")
		                {
    		                if((attr.qbIconId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarCloseFun();
    		                }
		                }
		            });
		        }
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-icon\" ng-click=\"qbIconClickFun()\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbAvatar',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		   angular.element(element).children().addClass(attr.qbAvatarClass);
		   angular.element(element).children().children().addClass(attr.qbImageClass);
		},
		template: function(element,attr){ 
		    return "<div style=\"overflow:hidden\">"+
		                "<img src=\""+attr.qbSrc+"\" class=\"qb-avatar-image\" height=\""+attr.qbHeight+"\" width=\""+attr.qbWidth+"\" style=\"object-fit:cover\">"+
		           "</div>";
		}
	}
}]);

myApp.directive('qbImg',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    console.log(angular.element(element).children()[0].getContext("2d"));
		},
		template: function(element,attr){ 
		    return  "<canvas id=\"canvas\">"+
		                "Ayush Agrawal"+
		            "</canvas>";
	    }
	}
}]);


myApp.directive('qbAlert',qbAlert);
qbAlert.$inject=['$compile','qbBasics'];
function qbAlert($compile,qbBasics)
{
    return {
		transclude: true,
		link: function(scope,element,attr){
		    var qbAlertDiv=angular.element(element).children()[0];
		    var qbFocusEles;
		    var hasFocus=0;
		    
		    if(attr.qbAlertBackcoverClass)
		    {
		        angular.element(element).children().addClass(attr.qbAlertBackcoverClass);
		    }
		    if(attr.qbAlertClass)
		    {
		        angular.element(qbAlertDiv).children().addClass(attr.qbAlertBackcoverClass);
		    }
		    
		    scope.qbAlertActiveFun=function(qbAlertEles){
		        var qbWidth=0;
		        if(attr.qbWidth[(attr.qbWidth.length)-1]==="%")
		        {
		            qbWidth=parseFloat(attr.qbWidth)*(window.innerWidth)/100;
		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
		        }
		        else if((attr.qbWidth[(attr.qbWidth.length)-2]+attr.qbWidth[(attr.qbWidth.length)-1])==="px")
		        {
		            qbWidth=parseFloat(attr.qbWidth);
		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
		        }
		        
		        var qbHeight=0;
		        if(attr.qbHeight[(attr.qbHeight.length)-1]==="%")
		        {
		            qbHeight=parseFloat(attr.qbHeight)*(window.innerHeight)/100;
		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
		        }
		        else if((attr.qbHeight[(attr.qbHeight.length)-2]+attr.qbHeight[(attr.qbHeight.length)-1])==="px")
		        {
		            qbHeight=parseFloat(attr.qbHeight);
		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
		        }
		        
		        angular.element(qbAlertDiv).children().css("display","block");
    		    angular.element(qbAlertDiv).addClass("qb-alert-backcover-active").removeClass("qb-alert-backcover-inactive");
		        qbBasics.contentsAlign(qbAlertDiv,"middle","centre","static","static",qbWidth,attr.qbHeight);
		        
    		    var win = angular.element(window);
    		    win.bind("resize",function(){
    		        if(attr.qbWidth[(attr.qbWidth.length)-1]==="%")
    		        {
    		            qbWidth=parseFloat(attr.qbWidth)*(window.innerWidth)/100;
    		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
    		        }
    		        else if((attr.qbWidth[(attr.qbWidth.length)-2]+attr.qbWidth[(attr.qbWidth.length)-1])==="px")
    		        {
    		            qbWidth=parseFloat(attr.qbWidth);
    		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
    		        }
    		        
    		        if(attr.qbHeight[(attr.qbHeight.length)-1]==="%")
    		        {
    		            qbHeight=parseFloat(attr.qbHeight)*(window.innerHeight)/100;
    		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
    		        }
    		        else if((attr.qbHeight[(attr.qbHeight.length)-2]+attr.qbHeight[(attr.qbHeight.length)-1])==="px")
    		        {
    		            qbHeight=parseFloat(attr.qbHeight);
    		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
    		        }
    		        qbBasics.contentsAlignResize(qbAlertDiv,"middle","centre","static","static",qbWidth,attr.qbHeight);
    		    });
    		    
    		    angular.element(qbAlertDiv).children().empty();
    		    angular.forEach(qbAlertEles, function(value, key){
    		        if(value)
    		        {
    		            angular.element(qbAlertDiv).children().append($compile(angular.element(value))(scope));
    		        }
    		    });
    		    
		        angular.element(qbAlertDiv).children()[0].focus();
		        
		        qbFocusEles=qbAlertDiv.querySelectorAll("button, [href], input, select, textarea, *[tabindex='-1']");
		        
		        var qbAlertElement=angular.element(element).children().children().children();
		        var qbAlertRetrun={
		            scope:qbAlertElement.scope(),
		            elementRef:qbAlertElement
		        };
		        return qbAlertRetrun;
		    };
		    
		    scope.qbAlertCancelFun=function(){
		        angular.element(qbAlertDiv).addClass("qb-alert-backcover-inactive").removeClass("qb-alert-backcover-active");
		        angular.element(qbAlertDiv).children().css("display","none");
    		    angular.element(qbAlertDiv).children().empty();
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-alert-backcover qb-alert-backcover-inactive\" tabindex=\"-1\">"+
		                "<div class=\"qb-alert\" tabindex=\"-1\"></div>"+
		            "</div>";
		}
	}   
}

myApp.directive('qbTest',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
			console.log(scope.$parent.id)
		},
		template: function(element,attr){ 
		    return "<div>Testing</div>";
		}
	}
}]);

myApp.directive('qbCompile',qbCompile);
qbCompile.$inject=['$compile'];
function qbCompile($compile,$rootScope)
{
    return {
		link: function(scope,element,attr){
		    scope.qbCompileFun=function(){
		        return scope;
		    }
		},
		template: function(element,attr){
		    return "<div></div>"
		}
	}
}

myApp.directive('qbWizard',qbWizard);
qbWizard.$inject=['$compile','qbBasics'];
function qbWizard($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbWizardPanelEles;
		    var qbWizardPanels=[];
		    
		    var qbWizardPanelHeaderEles;
		    var qbWizardPanelHeaders=[];
		    
		    var qbWizardPanelContentEles;
		    var qbWizardPanelContents=[];
		    
		    angular.element(element).ready(function(){
		        var qbDefNum=0;
		        qbWizardPanelEles=qbBasics.findChildren(element,"qb-wizard-panel");
		        var num=0;
		        angular.forEach(qbWizardPanelEles, function(value, key){
		            var panelData=angular.element(value).children().scope().qbWizardPanelPropertyFun();
		            panelData.panelId="qb-wizard-panel-"+num;
		            panelData.ele.addClass(panelData.class);
		            if(panelData.default)
		            {
		                qbDefNum=num;
		            }
		            qbWizardPanels.push(panelData);
		            num++;
		        });
		        
		        qbWizardPanelHeaderEles=qbBasics.findChildren(element,"qb-wizard-panel-header");
		        num=0;
		        angular.forEach(qbWizardPanelHeaderEles, function(value, key){
		            var panelHeaderData=angular.element(value).children().scope().qbWizardPanelHeaderPropertyFun();
		            panelHeaderData.panelId="qb-wizard-panel-"+num;
		            panelHeaderData.ele.addClass(panelHeaderData.class);
		            
		            var refEle=angular.element("<div qb-wizard-panel-id=\"qb-wizard-panel-"+num+"\" ng-click=\"qbWizardPanelHeaderClickFun($event)\"></div>");
		            refEle.addClass(panelHeaderData.class);
		            refEle.append(panelHeaderData.ele.html());
		            var compiledRefEle=$compile(qbBasics.compile(refEle))(scope);
		            angular.element(angular.element(element).children().children()[0]).append(compiledRefEle);
		            panelHeaderData.refEle=compiledRefEle;
		            
		            qbWizardPanelHeaders.push(panelHeaderData);
		            num++;
		        });
		        
		        qbWizardPanelContentEles=qbBasics.findChildren(element,"qb-wizard-panel-content");
		        num=0;
		        angular.forEach(qbWizardPanelContentEles, function(value, key){
		            var panelContentData=angular.element(value).children().scope().qbWizardPanelContentPropertyFun();
		            panelContentData.panelId="qb-wizard-panel-"+num;
		            panelContentData.ele.addClass(panelContentData.class);
		            qbWizardPanelContents.push(panelContentData);
		            num++;
		        });
		        
		        num=0;
		        angular.forEach(qbWizardPanels, function(value,key){
		            if(num===qbDefNum)
		            {
		                scope.qbWizardPanelOpenFun(num);
		            }
		            else
		            {
		                scope.qbWizardPanelCloseFun(num);
		            }
		            num++;
		        });
		        
		    });
		    
		    scope.qbWizardPanelHeaderClickFun=function(event){
		        var qbTargetPanelId=angular.element(event.target).attr("qb-wizard-panel-id");
		        var num=0;
		        angular.forEach(qbWizardPanels, function(value,key){
		            var qbWizardPanel=value;
		            if((qbWizardPanel.panelId)===qbTargetPanelId)
		            {
		                scope.qbWizardPanelOpenFun(num);
		            }
		            else 
		            {
		                scope.qbWizardPanelCloseFun(num);
		            }
		            num++;
		        });
		    }
		    
		    scope.qbWizardPanelOpenFun=function(qbWizardPanelNum){
		        scope.qbWizardPanelHeaderActivate(qbWizardPanelHeaders[qbWizardPanelNum]);
		        qbWizardPanelContents[qbWizardPanelNum].open();
		    }
		    
		    scope.qbWizardPanelCloseFun=function(qbWizardPanelNum){
		        scope.qbWizardPanelHeaderDeactivate(qbWizardPanelHeaders[qbWizardPanelNum]);
		        qbWizardPanelContents[qbWizardPanelNum].close();
		    }
		    
		    scope.qbWizardPanelHeaderActivate=function(qbWizardPanelHeader){
		        qbWizardPanelHeader.refEle.addClass(qbWizardPanelHeader.activeClass);
		        qbWizardPanelHeader.refEle.removeClass(qbWizardPanelHeader.inactiveClass);
		    }
		    
		    scope.qbWizardPanelHeaderDeactivate=function(qbWizardPanelHeader){
		        qbWizardPanelHeader.refEle.addClass(qbWizardPanelHeader.inactiveClass);
		        qbWizardPanelHeader.refEle.removeClass(qbWizardPanelHeader.activeClass);
		    }
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard\">"+
		                "<div class=\"qb-wizard-headers\"></div>"+
		                "<div class=\"qb-wizard-contents\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('qbWizardPanel',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbDefault;
		    if(attr.default)
		    {
		        if((attr.default)==="true")
		        {
		            qbDefault=true;
		        }
		        else
		        {
		            qbDefault=false;
		        }
		    }
		    else 
		    {
		        qbDefault=false;
		    }
		    scope.qbWizardPanelPropertyFun=function(){
		        var panelData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            panelId:"",
		            default:qbDefault,
		            fun:function(){
		                console.log(angular.element(element).children());
		            }
		        }
		        return panelData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard-panel\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbWizardPanelHeader',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbWizardPanelHeaderPropertyFun=function(){
		        var panelData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            refEle:"",
		            activeClass:angular.element(element).attr("qb-active-class"),
		            inactiveClass:angular.element(element).attr("qb-inactive-class"),
		            panelId:""
		        }
		        return panelData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard-panel-header\" style=\"display:none\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbWizardPanelContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var openClass=angular.element(element).attr("qb-open-class");
		    var closeClass=angular.element(element).attr("qb-close-class");
		    scope.qbWizardPanelContentPropertyFun=function(){
		        var panelData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            open:function(){
		                angular.element(element).children().addClass(openClass);
		                angular.element(element).children().removeClass(closeClass);
		            },
		            close:function(){
		                angular.element(element).children().addClass(closeClass);
		                angular.element(element).children().removeClass(openClass);
		            },
		            panelId:""
		        }
		        return panelData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard-panel-content\" ng-transclude></div>";
		}
	}
}]);

// Latest Project 10.06.2019 New Tabs

myApp.directive('tabs',tabs);
tabs.$inject=['$compile','qbBasics'];
function tabs($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbTabEles;
		    var qbTabs=[];
		    
		    var qbTabHeaderEles;
		    var qbTabHeaders=[];
		    
		    var qbTabContentEles;
		    var qbTabContents=[];
		    
		    //qbHeadingsStyle Data Formation.
		    var qbTabHeadersStyle={};
		    var qbTabHeadersStyleAttrs=attr.qbHeadersStyle.split(";");
		    angular.forEach(qbTabHeadersStyleAttrs, function(value,key){
		        var qbTabHeadingsStyleKey=value.split(":")[0];
		        var qbTabHeadingsStyleValue=value.split(":")[1];
		        qbTabHeadersStyle[qbTabHeadingsStyleKey]=qbTabHeadingsStyleValue;
		    });
		    
		    var qbTabsContainerStyles={
		        qbTabs:{},
		        qbTabHeaders:{},
		        qbTabContents:{}
		    }
		    
		    angular.element(document).ready(function(){
		        var qbDefNum=0;
		        qbTabEles=qbBasics.findChildren(element,"tab");
		        var num=0;
		        angular.forEach(qbTabEles, function(value, key){
		            var tabData=angular.element(value).children().scope().qbTabPropertyFun();
		            tabData.tabId="qb-tab-"+num;
		            tabData.ele.addClass(tabData.class);
		            if(tabData.default)
		            {
		                qbDefNum=num;
		            }
		            qbTabs.push(tabData);
		            num++;
		        });
		        
		        qbTabHeaderEles=qbBasics.findChildren(element,"tab-header");
		        var qbTabHeaderContainer=angular.element("<div class=\"qb-tab-headers-containers\" style=\"overflow:hidden\"></div>")
		        num=0;
		        angular.forEach(qbTabHeaderEles, function(value, key){
		            var tabHeaderData=angular.element(value).children().scope().qbTabHeaderPropertyFun();
		            tabHeaderData.tabId="qb-tab-"+num;
		            
		            var refEle=angular.element("<div qb-tab-id=\"qb-tab-"+num+"\" style=\"float:left\" ng-click=\"qbTabHeaderClickFun($event)\" class=\"qb-tab-header\"></div>");
		            refEle.addClass(tabHeaderData.class);
		            refEle.append(tabHeaderData.ele.html());
		            var compiledRefEle=$compile(qbBasics.compile(refEle))(scope);
		            qbTabHeaderContainer.append(compiledRefEle);
		            tabHeaderData.refEle=compiledRefEle;
		            
		            qbTabHeaders.push(tabHeaderData);
		            num++;
		        });
		        
		        angular.element(angular.element(element).children().children()[0]).append(qbTabHeaderContainer);
		        
		        //designing of Tab Headings
		        if(qbTabHeadersStyle)
    		    {   
    		        qbTabHeadersContainer=angular.element(angular.element(element).children().children()[0]).children();
    		        if(qbTabHeadersStyle['total-width'])
    		        {
    		            if(qbTabHeadersStyle['total-width']==="auto")
    		            { 
    		                if(qbTabHeadersStyle['size']==="auto")
    		                {
    		                    var containerInnerWidth=0;
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        containerInnerWidth+=qbBasics.getOutterWidth(qbTabHeader.refEle);
    		                    });
    		                    qbTabHeadersContainer[0].style.width=containerInnerWidth+"px"
    		                }
    		                else if(qbTabHeadersStyle['size']==="equal")
    		                {
    		                    var largestWidth=0;
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        var thisHeaderWidth=parseFloat(window.getComputedStyle(qbTabHeader.refEle[0], null).getPropertyValue('width'));
    		                        if(largestWidth<thisHeaderWidth)
    		                        {
    		                            largestWidth=thisHeaderWidth;
    		                        }
    		                    });
    		                    
    		                    var contWidth=0
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        qbTabHeader.refEle[0].style.width=largestWidth+"px";
    		                        contWidth+=qbBasics.getOutterWidth(qbTabHeader.refEle);
    		                    });
    		                    
    		                    contWidth=contWidth*1.01;
    		                    qbTabHeadersContainer.css("width",contWidth+"px");
    		                }
    		            }
    		            else if(qbTabHeadersStyle['total-width'].includes('%'))
    		            {
    		                var totalWidthPer=parseFloat(qbTabHeadersStyle['total-width']);
    		                var qbTabHeadersInnerWidth=parseFloat(window.getComputedStyle(angular.element(element).children().children()[0], null).getPropertyValue('width'));
    		                var totalWidthPx=(totalWidthPer*qbTabHeadersInnerWidth)/100;
    		                angular.element(angular.element(element).children().children()[0]).children().css("width",totalWidthPx+"px");
    		                
    		                if(qbTabHeadersStyle['size']==="equal")
    		                {
    		                    var outterWidth=(qbTabHeadersContainer[0].offsetWidth/qbTabHeaders.length);
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        qbBasics.setInnerWidth(qbTabHeader.refEle,outterWidth);
    		                    })   
    		                }
    		            }
    		            else if(qbTabHeadersStyle['total-width'].includes('px'))
    		            {
    		                qbTabHeaderContainer[0].style.width=qbTabHeadersStyle['total-width']; 
    		                
    		                if(qbTabHeadersStyle['size']==="equal")
    		                {
    		                    var outterWidth=(qbTabHeadersContainer[0].offsetWidth/qbTabHeaders.length);
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        qbBasics.setInnerWidth(qbTabHeader.refEle,outterWidth);
    		                    })   
    		                }
    		            }
    		        }
    		        if(qbTabHeadersStyle['align'])
    		        {
		                var qbTabHeadersInnerWidth=parseFloat(window.getComputedStyle(angular.element(element).children().children()[0], null).getPropertyValue('width'));
		                var qbTabHeadersContainerOutterWidth=qbBasics.getOutterWidth(angular.element(angular.element(element).children().children()[0]).children());
		                
		                var reqPadding=qbTabHeadersInnerWidth-qbTabHeadersContainerOutterWidth;
    		            
    		            if(qbTabHeadersStyle['align']==="left")
    		            {
    		               angular.element( angular.element(element).children().children()[0]).css("padding-right",reqPadding+"px");
    		            }
    		            else if(qbTabHeadersStyle['align']==="right")
    		            {
    		               angular.element( angular.element(element).children().children()[0]).css("padding-left",reqPadding+"px");
    		            }
    		            else if(qbTabHeadersStyle['align']==="middle")
    		            {
    		               angular.element( angular.element(element).children().children()[0]).css("padding-left",(reqPadding/2)+"px");
    		               angular.element( angular.element(element).children().children()[0]).css("padding-right",(reqPadding/2)+"px");
    		            }
    		        }
		        }
		        
		        qbTabContentEles=qbBasics.findChildren(element,"tab-content");
		        num=0;
		        angular.forEach(qbTabContentEles, function(value, key){
		            var tabContentData=angular.element(value).children().scope().qbTabContentPropertyFun();
		            tabContentData.tabId="qb-tab-"+num;
		            tabContentData.ele.addClass(tabContentData.class);
		            qbTabContents.push(tabContentData);
		            num++;
		        });
		        
		        num=0;
		        angular.forEach(qbTabs, function(value,key){
		            if(num===qbDefNum)
		            {
		                scope.qbTabOpenFun(num);
		            }
		            else
		            {
		                scope.qbTabCloseFun(num);
		            }
		            num++;
		        });
		        
		        //designing of tab headers
		        scope.designer=function(styleData){
		            
		        }
		        
		        var styleData={
		            elem:angular.element(element).children().children()[0],
		            hAlign:"left",
		            vAlign:"right",
		        };
		    });
		    
		    scope.qbTabHeaderClickFun=function(event){
		        var qbTargetTabId=angular.element(event.target).attr("qb-tab-id");
		        var num=0;
		        angular.forEach(qbTabs, function(value,key){
		            var qbTab=value;
		            if((qbTab.tabId)===qbTargetTabId)
		            {
		                scope.qbTabOpenFun(num);
		            }
		            else 
		            {
		                scope.qbTabCloseFun(num);
		            }
		            num++;
		        });
		    }
		    
		    scope.qbTabOpenFun=function(qbTabNum){
		        scope.qbTabHeaderActivate(qbTabHeaders[qbTabNum]);
		        qbTabContents[qbTabNum].open();
		    }
		    
		    scope.qbTabCloseFun=function(qbTabNum){
		        scope.qbTabHeaderDeactivate(qbTabHeaders[qbTabNum]);
		        qbTabContents[qbTabNum].close();
		    }
		    
		    scope.qbTabHeaderActivate=function(qbTabHeader){
		        qbTabHeader.refEle.addClass(qbTabHeader.activeClass);
		        qbTabHeader.refEle.removeClass(qbTabHeader.inactiveClass);
		    }
		    
		    scope.qbTabHeaderDeactivate=function(qbTabHeader){
		        qbTabHeader.refEle.addClass(qbTabHeader.inactiveClass);
		        qbTabHeader.refEle.removeClass(qbTabHeader.activeClass);
		    }
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" style=\"width:100%\">"+
		                "<div class=\"qb-tab-headers\" style=\"width:100%\"></div>"+
		                "<div class=\"qb-tab-contents\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('tab',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbDefault;
		    if(attr.default)
		    {
		        if((attr.default)==="true")
		        {
		            qbDefault=true;
		        }
		        else
		        {
		            qbDefault=false;
		        }
		    }
		    else 
		    {
		        qbDefault=false;
		    }
		    scope.qbTabPropertyFun=function(){
		        var tabData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            tabId:"",
		            default:qbDefault
		        }
		        return tabData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('tabHeader',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbTabHeaderPropertyFun=function(){
		        var tabHeaderData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            refEle:"",
		            activeClass:angular.element(element).attr("qb-active-class"),
		            inactiveClass:angular.element(element).attr("qb-inactive-class"),
		            tabId:""
		        }
		        return tabHeaderData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-header\" style=\"display:none\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('tabContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var openClass=angular.element(element).attr("qb-open-class");
		    var closeClass=angular.element(element).attr("qb-close-class");
		    scope.qbTabContentPropertyFun=function(){
		        var tabContentData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            open:function(){
		                angular.element(element).children().addClass(openClass);
		                angular.element(element).children().removeClass(closeClass);
		            },
		            close:function(){
		                angular.element(element).children().addClass(closeClass);
		                angular.element(element).children().removeClass(openClass);
		            },
		            tabId:""
		        }
		        return tabContentData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-content\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbSelect',qbSelect);
qbSelect.$inject=['$compile','qbBasics'];
function qbSelect($compile,qbBasics)
{
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    angular.element(element).ready(function(){
		        scope.qbSelectCloseFun();
		        if(attr.qbOptionsClass)
		        {
		            qbSelectOptions.addClass(attr.qbOptionsClass);
		        }
		        if(attr.qbInputClass)
		        {
		            qbSelectInput.addClass(attr.qbInputClass);
				}
			});

			scope.$watch('qbModel',function(newval,oldval){
				var qbOptionValues=[];
				var qbOptionEles=angular.element(angular.element(element).children().children()[1]).children();
				angular.forEach(qbOptionEles,function(qbOptionEle,key){
					if((qbOptionEle.getAttribute("value"))===newval)
					{
						angular.element(qbOptionEle).children().scope().qbOptionClickFun();
					}
				})
			})
		    
		    var qbSelectInput=angular.element(angular.element(element).children().children()[0]);
		    var qbSelectOptions=angular.element(angular.element(element).children().children()[1]);
		    scope.qbSelectOptionClickFun=function(optionData){
		        scope.qbModel=optionData.value;
		        angular.element(angular.element(element).children().children()[0]).empty();
		        angular.element(angular.element(element).children().children()[0]).append(optionData.html);
		        scope.qbSelectCloseFun();
		    }
		    
		    var qbSelectOptionsState=false;
		    scope.qbSelectClickFun=function(){
		        if(qbSelectOptionsState)
		        {
		            scope.qbSelectCloseFun();
		        }
		        else
		        {
		            scope.qbSelectOpenFun();
		        }
		    }
		    
		    
		    scope.qbSelectOpenFun=function(){
		        qbSelectInput.addClass(attr.qbInputOpenClass);
		        qbSelectInput.removeClass(attr.qbInputCloseClass);
		        qbSelectOptions.addClass(attr.qbOptionsOpenClass);
		        qbSelectOptions.removeClass(attr.qbOptionsCloseClass);
		        qbSelectOptionsState=true;
		    }
		    scope.qbSelectCloseFun=function(){
		        qbSelectInput.addClass(attr.qbInputCloseClass);
		        qbSelectInput.removeClass(attr.qbInputOpenClass);
		        qbSelectOptions.addClass(attr.qbOptionsCloseClass);
		        qbSelectOptions.removeClass(attr.qbOptionsOpenClass);
		        qbSelectOptionsState=false;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-select\">"+
		                "<div class=\"qb-select-input\" ng-click=\"qbSelectClickFun()\" > </div>"+
		                "<div class=\"qb-select-options\" ng-transclude></div>"+
		           "</div>"
		}
	}
}

myApp.directive('qbOption',qbOption);
qbOption.$inject=['$compile','qbBasics'];
function qbOption($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbSelect;
		    angular.element(element).ready(function(){
		        qbSelect=qbBasics.findParent(element,"qb-select");
		        if(attr.default=="true")
		        {
		            scope.qbOptionClickFun();
		        }
		    });
		    scope.qbOptionClickFun=function(){
		        var optHtml=angular.element("<div class="+attr.qbClass+"></div>");
		        optHtml.html(angular.element(element).children().html());
		        var optionData={
		            value:attr.value,
		            html:optHtml
		        }
		        qbSelect.children().scope().qbSelectOptionClickFun(optionData);
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-option "+attr.qbClass+"\" ng-click=\"qbOptionClickFun()\" ng-transclude value="+attr.value+"></div>";
		}
	}
}
myApp.directive('qbImgLoad',qbImgLoad);
qbImgLoad.$inject=['$compile','qbBasics'];
function qbImgLoad($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    angular.element(element).children().ready(function(){
		        alert(angular.element(element).children()[0].offsetWidth);
		    });
		},
		template: function(element,attr){ 
		    return "<div><img src=\"http://www.cs4u.shiksha/public/css/Aquaman.jpg\"></div>";
		}
	}
}

myApp.directive('qbCheckBox',qbCheckBox);
qbCheckBox.$inject=['$compile','qbBasics'];
function qbCheckBox($compile,qbBasics)
{
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbModel=[];
		    scope.qbCheckBoxCheckFun=function(val){
		        if(val)
		        {
		            if(!scope.qbModel.includes(angular.element(element).attr("qb-value")))
    		        {
    		            scope.qbModel.push(angular.element(element).attr("qb-value"));
    		        }
		        }
		        else
		        {
		            if(scope.qbModel.includes(angular.element(element).attr("qb-value")))
    		        {
    		            var newArr=[];
    		            var num=0;
    		            angular.forEach(scope.qbModel,function(value,key){
    		                if(!(value===angular.element(element).attr("qb-value")))
    		                {
    		                    newArr[num]=value;
    		                    num++;
    		                }
    		            });
    		            scope.qbModel=newArr;
    		        }
		        }
		    };
		    angular.element(element).ready(function(){
		        var attrs=angular.element(element)[0].attributes;
		        if(attrs["qb-checked"])
		        {
    		        angular.element(element).children().children()[0].checked=true;
		        }
		    });
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-check-box qb-check-box-addOn\">"+
		                "<input type=\"checkbox\" ng-model=\"val\" ng-change=\"qbCheckBoxCheckFun(val)\" class=\"qb-check-box-input qb-check-box-input-addOn\" >"+
		                "<div class=\"qb-check qb-check-addOn\"><div class=\"qb-check-child qb-check-child-addOn\"></div></div>"+
		                "<div class=\"qb-check-box-content qb-check-box-content-addOn\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('qbRadioButton',qbRadioButton);
qbRadioButton.$inject=['$compile','qbBasics'];
function qbRadioButton($compile,qbBasics)
{
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbRadioButtonClickFun=function(val){
		        scope.qbModel=val;
		        var qbRadioButtons=document.querySelectorAll("qb-radio-button");
		        angular.forEach(qbRadioButtons,function(value,key){
		            if(angular.element(value).attr("qb-model")==attr.qbModel)
		            {
		                if(!(angular.element(value).attr("qb-value")==attr.qbValue))
		                angular.element(value).children().scope().qbRadioButtonValNoneFun();
		            }
		        });
		    }
		    scope.qbRadioButtonValNoneFun=function(){
		        angular.element(angular.element(element).children().children()[0]).scope().val="";
		    }
		    angular.element(element).ready(function(){
		        var attrs=angular.element(element)[0].attributes;
		        if(attrs["qb-checked"])
		        {
    		        angular.element(element).children().children()[0].checked=true;
		            scope.qbRadioButtonClickFun(attr.qbValue);
		        }
		    });
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-radio-button qb-radio-button-addOn\">"+
		                "<input type=\"radio\" ng-model=\"val\" ng-change=\"qbRadioButtonClickFun(val)\" value="+attr.qbValue+" class=\"qb-radio-button-input qb-radio-button-input-addOn\" name="+attr.qbModel+" >"+
		                "<div class=\"qb-radio-circle qb-radio-circle-addOn\"><div class=\"qb-radio-circle-child qb-radio-circle-child-addOn\"></div></div>"+
		                "<div class=\"qb-radio-button-content qb-radio-button-content-addOn\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('qbShapeEditor',qbShapeEditor);
qbShapeEditor.$inject=['$compile','qbBasics'];
function qbShapeEditor($compile,qbBasics){
	return {
		scope:{},
		transclude:true,
		link: function(scope, element, attr, ctrl, transclude){
			var qbShapeEditorArea=angular.element(element[0].querySelector(".qb-shape-editor-area"));
			var qbShapeInsertWrap=angular.element(element[0].querySelector(".qb-shape-insert-wrap"));
			var qbShapeEditorSVG=angular.element(element[0].querySelector(".qb-shape-editor-svg"));
			var qbInsertDataModalWrap=angular.element(element[0].querySelector(".qb-insert-data-modal-wrap"));
			var qbInsertDataModal=angular.element(element[0].querySelector(".qb-insert-data-modal"));
			var qbMousePointer={
				x:0,
				y:0
			};

			angular.element(element).ready(function(){
				scope.qbMoveRangeValue=10;
				scope.qbSizeChangeRangeValue=0.1;
				scope.qbSVGFinalWidth=400;
				scope.qbSVGFinalHeight=300;

				//Adding a mouse move to whole wrap
				angular.element(element).children()[0].addEventListener("mousemove", function(event){
					var qbMousePointerForWrap={
						x:event.clientX,
						y:event.clientY
					}

					var qbShapeEditorSVGOffset=qbShapeEditorSVG[0].getBoundingClientRect();
					if((qbMousePointerForWrap.x<qbShapeEditorSVGOffset.right)&&(qbMousePointerForWrap.x>qbShapeEditorSVGOffset.left)&&(qbMousePointerForWrap.y<qbShapeEditorSVGOffset.bottom)&&(qbMousePointerForWrap.y>qbShapeEditorSVGOffset.top))
					{
					
					}
					else
					{
						angular.forEach(qbShapeEditorSVG.children(), function(qbShapeEle, qbKey){
							qbShapeEleMouseUpFun(qbShapeEle);
						});	
					}
				});

				qbShapeEditorSVG.bind("mouseup", function(event){
					angular.forEach(qbShapeEditorSVG.children(), function(qbShapeEle, qbKey){
						qbShapeEleMouseUpFun(qbShapeEle);
					})
				});
			});
			
			//For Moving Objects Using Drag
			var qbShapeEleMouseDownFun=function(event){
				qbMousePointer.x=event.clientX;
				qbMousePointer.y=event.clientY;
				
				var qbShapeEle=event.target;
				var qbShapeId=angular.element(qbShapeEle).attr("qb-shape-id");
				qbShapeProps[qbShapeId].qbDrag=true;
			}

			var qbShapeEleMouseMoveFun=function(event){
				var qbShapeId=angular.element(event.target).attr("qb-shape-id");
				if(qbShapeProps[qbShapeId].qbDrag)
				{
					var qbMousePointerDiff={
						x:event.clientX-qbMousePointer.x,
						y:event.clientY-qbMousePointer.y
					}
	
					var qbShapeEle=event.target;
					var qbMoveType="";

					switch(qbShapeEle.nodeName)
					{
						case "polygon":	qbPolygonMoveFun(qbShapeEle,"R",qbMousePointerDiff.x);
										qbPolygonMoveFun(qbShapeEle,"D",qbMousePointerDiff.y);
							break;
						case "line":	qbLineMoveFun(qbShapeEle,"R",qbMousePointerDiff.x);
										qbLineMoveFun(qbShapeEle,"D",qbMousePointerDiff.y);
							break;
						case "circle":	qbCircleMoveFun(qbShapeEle,"R",qbMousePointerDiff.x);
										qbCircleMoveFun(qbShapeEle,"D",qbMousePointerDiff.y);
							break;
						case "text":	qbTextMoveFun(qbShapeEle,"R",qbMousePointerDiff.x);
										qbTextMoveFun(qbShapeEle,"D",qbMousePointerDiff.y);
							break;
						case "path":	qbPathMoveFun(qbShapeEle,"R",qbMousePointerDiff.x);
										qbPathMoveFun(qbShapeEle,"D",qbMousePointerDiff.y);
							break;
					}

					qbMousePointer.x=event.clientX;
					qbMousePointer.y=event.clientY;
				}
			}

			var qbShapeEleMouseUpFun=function(qbShapeEle){
				var qbShapeId=angular.element(qbShapeEle).attr("qb-shape-id");
				qbShapeProps[qbShapeId].qbDrag=false;
			}

			var qbShapesHTML=[
				"<polygon points=\"5,5 105,5 105,105 5,105\" draggable=\"true\" />",
				"<polygon points=\"5,5 105,5 105,105 5,105\"  draggable=\"true\"  fill=\"none\" stroke=\"black\" stroke-width=\"10\" />",
				"<polygon points=\"55,10 10,100 100,100\"  draggable=\"true\"   />",
				"<polygon points=\"55,10 10,100 100,100\"  draggable=\"true\"  fill=\"none\" stroke=\"black\" stroke-width=\"10\" />",
				"<polygon points=\"55,10 10,45.207 27.06,100 82.94,100 100,45.207\"  draggable=\"true\"  />",
				"<polygon points=\"55,10 10,45.207 27.06,100 82.94,100 100,45.207\"  draggable=\"true\"  fill=\"none\" stroke=\"black\" stroke-width=\"10\" />",
				"<polygon points=\"55,10 11.7,30 11.7,80 55,100 98.3,80 98.3,30\"  draggable=\"true\"  />",
				"<polygon points=\"55,10 11.7,30 11.7,80 55,100 98.3,80 98.3,30\"  draggable=\"true\"  fill=\"none\" stroke=\"black\" stroke-width=\"10\" />",
				"<line x1=\"10\" y1=\"55\" x2=\"100\" y2=\"55\" draggable=\"true\"  stroke=\"black\" stroke-width=\"10\" />",
				"<circle r=\"50\" cx=\"55\" cy=\"55\" draggable=\"true\"  fill=\"none\" stroke=\"black\" stroke-width=\"10\" />",
				"<circle r=\"50\" cx=\"55\" cy=\"55\" draggable=\"true\"  />"
			];

			var qbShapeProps=[];

			angular.forEach(qbShapesHTML, function(qbShape, qbKey){
				var qbShapeInsertButton=angular.element("<button class=\"qb-shape-insert-btn\" ng-click=\"qbInsertShapeFun("+qbKey+")\" ></button>");
				var qbShapeSVG=angular.element("<svg viewBox=\"0 0 110 110\" width=\"30\" height=\"30\" ></svg>")
				qbShapeSVG.append(angular.element(qbShape));
				qbShapeInsertButton.append(qbShapeSVG);
				qbShapeInsertWrap.append(qbShapeInsertButton[0].outerHTML);
			});

			var qbTextInsertButton=angular.element("<button class=\"qb-shape-insert-btn\" ng-click=\"qbInsertTextFun()\" ></button>");
			var qbTextSVG="<svg class=\"qb-shape-editor-svg\" style=\"padding-right:3px; margin-bottom:-2px\" width=\"36\" height=\"32\" viewBox=\"70 40 400 325\"><line x1=\"140\" y1=\"55\" x2=\"443.75\" y2=\"55\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"0\"></line><line x1=\"296\" y1=\"55\" x2=\"296.24188423838524\" y2=\"358.7499036905448\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"1\"></line><line x1=\"156\" y1=\"70\" x2=\"425.8886059330932\" y2=\"70\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"2\"></line><line x1=\"276\" y1=\"73\" x2=\"276.2269147924547\" y2=\"357.95178856719576\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"3\"></line><line x1=\"435\" y1=\"55\" x2=\"455.7937562448094\" y2=\"99.52547924000137\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"4\"></line><line x1=\"410\" y1=\"55\" x2=\"450.31967479305666\" y2=\"103.00796816477005\" stroke=\"black\" stroke-width=\"30\" qb-shape-id=\"5\"></line><line x1=\"414\" y1=\"49\" x2=\"453.26106423569684\" y2=\"95.74749812880206\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"6\"></line><line x1=\"134\" y1=\"103\" x2=\"178.61741653943577\" y2=\"49.52986488536475\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"7\"></line><line x1=\"128\" y1=\"101\" x2=\"152.0621940399061\" y2=\"49.04482897073356\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"8\"></line><line x1=\"138\" y1=\"95\" x2=\"157.41593621247904\" y2=\"53.077044639416776\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"9\"></line><line x1=\"231\" y1=\"355\" x2=\"345.6617856000001\" y2=\"355\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"10\"></line><line x1=\"90\" y1=\"200\" x2=\"236.60051640996986\" y2=\"200\" stroke=\"black\" stroke-width=\"36\" qb-shape-id=\"11\"></line><line x1=\"169\" y1=\"195\" x2=\"169.12840221611916\" y2=\"356.24308487493465\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"12\"></line><line x1=\"228\" y1=\"196\" x2=\"241.00093922082516\" y2=\"223.83879172969867\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"13\"></line><line x1=\"222\" y1=\"200\" x2=\"242.15628388468537\" y2=\"223.99975297476058\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"14\"></line><line x1=\"85\" y1=\"226\" x2=\"99.65325315582162\" y2=\"194.36064605815886\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"15\"></line><line x1=\"84\" y1=\"226\" x2=\"108.82141118285016\" y2=\"196.2536741787852\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"16\"></line><line x1=\"132\" y1=\"354\" x2=\"196.95390000000003\" y2=\"354\" stroke=\"black\" stroke-width=\"12\" qb-shape-id=\"17\"></line><line x1=\"97\" y1=\"210\" x2=\"227.45131000000006\" y2=\"210\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"18\"></line><line x1=\"154\" y1=\"209\" x2=\"154.11542429178127\" y2=\"353.94585404226945\" stroke=\"black\" stroke-width=\"20\"></line></svg>";
			qbTextInsertButton.append(qbTextSVG);
			qbShapeInsertWrap.append(qbTextInsertButton[0].outerHTML);
			scope.qbInsertTextFun=function(){
				var qbInsertDataModalHTML=angular.element("<div class=\"qb-insert-data-modal-content\"></div>");
				qbInsertDataModalHead="<div class=\"qb-insert-data-modal-head\">Enter Text You Want To Display</div>"
				qbInsertDataModalInput="<input type=\"text\" placeholder=\"Enter\" class=\"qb-insert-data-modal-input\">";
				qbInsertDataModalBtn="<div class=\"qb-insert-data-modal-btn-wrap\"><button class=\"qb-insert-data-modal-btn\"  ng-click=\"qbInsertTextSetDataFun($event)\">Insert</button><button class=\"qb-insert-data-modal-btn\" ng-click=\"qbInsertDataModalCloseFun($event)\">Cancel</button></div>";
				
				qbInsertDataModalHTML.append(qbInsertDataModalHead);
				qbInsertDataModalHTML.append(qbInsertDataModalInput);
				qbInsertDataModalHTML.append(qbInsertDataModalBtn);

				qbInsertDataModalOpenFun(qbInsertDataModalHTML);
				qbInsertDataModal[0].querySelector("input").focus();
			}

			scope.qbInsertTextSetDataFun=function(event){
				var qbTextHTML=angular.element("<text x=\"50\" y=\"50\" draggable=\"true\"  font-size=\"20\" font-family=\"sans-serif\" fill=\"black\"></text>");
				var qbText=qbInsertDataModal[0].querySelector("input").value;
				angular.element(qbTextHTML).append(qbText);
				qbShapeEditorSVG.html(qbShapeEditorSVG.html()+qbTextHTML[0].outerHTML);

				var qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle, qbKey){
					angular.element(qbShapeEle).attr("qb-shape-id",qbKey);

					if(angular.element(qbShapeEle).attr("stroke"))
					{
						angular.element(qbShapeEle).attr("stroke","black");
					}
					else
					{
						angular.element(qbShapeEle).attr("fill","black");
					}

					
					qbShapeEle.addEventListener("mousedown",function(event){
						qbShapeEleMouseDownFun(event);
					});

					qbShapeEle.addEventListener("mousemove",function(event){
						qbShapeEleMouseMoveFun(event);
					});

					qbShapeEle.addEventListener("mouseup",function(event){
						qbShapeEleMouseUpFun(event.target);
					});
				});

				angular.element(qbShapeEles[qbShapeEles.length-1]).attr("fill","grey");
				var qbTextProp={
					ele:qbShapeEles[qbShapeEles.length-1],
					qbDrag:false
				}

				qbShapeProps.push(qbTextProp); 

				qbInsertDataModalCloseFun();
			}

			//For ARC BUtton
			var qbARCInsertButton=angular.element("<button class=\"qb-shape-insert-btn\" style=\"width: 52.2px;height: 48.8px;float: none;position: absolute; font-size:20px;\" ng-click=\"qbInsertARCFun()\" >arc</button>");
			qbShapeInsertWrap.append(qbARCInsertButton[0].outerHTML);
			scope.qbInsertARCFun=function(){
				var qbInsertDataModalHTML=angular.element("<div class=\"qb-insert-data-modal-content\"></div>");
				qbInsertDataModalHead="<div class=\"qb-insert-data-modal-head\">Enter Angle For Arc</div>"
				qbInsertDataModalInput="<input type=\"number\" placeholder=\"90\" class=\"qb-insert-data-modal-input\">";
				qbInsertDataModalBtn="<div class=\"qb-insert-data-modal-btn-wrap\"><button class=\"qb-insert-data-modal-btn\"  ng-click=\"qbInsertARCSetDataFun($event)\">Insert</button><button class=\"qb-insert-data-modal-btn\" ng-click=\"qbInsertDataModalCloseFun($event)\">Cancel</button></div>";
				
				qbInsertDataModalHTML.append(qbInsertDataModalHead);
				qbInsertDataModalHTML.append(qbInsertDataModalInput);
				qbInsertDataModalHTML.append(qbInsertDataModalBtn);

				qbInsertDataModalOpenFun(qbInsertDataModalHTML);
				qbInsertDataModal[0].querySelector("input").focus();
			}
			scope.qbInsertARCSetDataFun=function(event){
				var qbARCAngle=qbInsertDataModal[0].querySelector("input").value;
				if(qbARCAngle)
				{
					qbARCAngle=(qbARCAngle%360);
				
					var qbPathHTML;
					var qbPathProps={
						startPoint:{
							x:150,
							y:100
						},
						endPoint:{},
						center:{
							x:100,
							y:100
						},
						angle:qbARCAngle,
						radius:50,
					}
					var qbXValue=Math.cos(qbARCAngle*3.14/180)*qbPathProps.radius;
					var qbYValue=Math.sin(qbARCAngle*3.14/180)*qbPathProps.radius;

					qbPathProps.endPoint.x=qbXValue+qbPathProps.center.x;
					qbPathProps.endPoint.y=qbYValue+qbPathProps.center.y;

					var qbPathAttrValue="M"+qbPathProps.startPoint.x+","+qbPathProps.startPoint.y+" A"+qbPathProps.radius+","+qbPathProps.radius+" 0 "+parseInt(qbPathProps.angle/180)+",1 "+qbPathProps.endPoint.x+","+qbPathProps.endPoint.y;
					
					qbPathHTML=angular.element("<path d=\""+qbPathAttrValue+"\" qb-angle="+qbPathProps.angle+" qb-start-point=\""+(qbPathProps.startPoint.x)+","+(qbPathProps.startPoint.y)+"\" qb-end-point=\""+(qbPathProps.endPoint.x)+","+(qbPathProps.endPoint.y)+"\" qb-radius=\""+(qbPathProps.radius)+"\" qb-center=\""+(qbPathProps.center.x)+","+(qbPathProps.center.y)+"\" qb-rotate-angle=\"0\" fill=\"none\" stroke=\"black\" stroke-width=\"5\" ></path>");
					
					qbShapeEditorSVG.html(qbShapeEditorSVG.html()+qbPathHTML[0].outerHTML);

					var qbShapeEles=qbShapeEditorSVG.children();
					angular.forEach(qbShapeEles, function(qbShapeEle, qbKey){
						angular.element(qbShapeEle).attr("qb-shape-id",qbKey);

						if(angular.element(qbShapeEle).attr("stroke"))
						{
							angular.element(qbShapeEle).attr("stroke","black");
						}
						else
						{
							angular.element(qbShapeEle).attr("fill","black");
						}

						
						qbShapeEle.addEventListener("mousedown",function(event){
							qbShapeEleMouseDownFun(event);
						});

						qbShapeEle.addEventListener("mousemove",function(event){
							qbShapeEleMouseMoveFun(event);
						});

						qbShapeEle.addEventListener("mouseup",function(event){
							qbShapeEleMouseUpFun(event.target);
						});
					});

					qbInsertDataModalCloseFun();

					angular.element(qbShapeEles[qbShapeEles.length-1]).attr("stroke","grey");
					var qbPathProp={
						ele:qbShapeEles[qbShapeEles.length-1],
						qbDrag:false
					}

					qbShapeProps.push(qbPathProp);
				}
			}

			//Final Compilation
			$compile(qbShapeInsertWrap)(scope);
			$compile(qbShapeEditorSVG)(scope);

			scope.qbInsertShapeFun=function (qbShapeKey) {
				qbShapeEditorSVG.html(qbShapeEditorSVG.html()+qbShapesHTML[qbShapeKey]);
				var qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle, qbKey){
					angular.element(qbShapeEle).attr("qb-shape-id",qbKey);

					if(angular.element(qbShapeEle).attr("stroke"))
					{
						angular.element(qbShapeEle).attr("stroke","black");
					}
					else
					{
						angular.element(qbShapeEle).attr("fill","black");
					}
					
					qbShapeEle.addEventListener("mousedown",function(event){
						qbShapeEleMouseDownFun(event);
					});

					qbShapeEle.addEventListener("mousemove",function(event){
						qbShapeEleMouseMoveFun(event);
					});

					qbShapeEle.addEventListener("mouseup",function(event){
						qbShapeEleMouseUpFun(event.target);
					});
				});

				if(angular.element(qbShapeEles[qbShapeEles.length-1]).attr("stroke"))
				{
					angular.element(qbShapeEles[qbShapeEles.length-1]).attr("stroke","grey");
				}
				else
				{
					angular.element(qbShapeEles[qbShapeEles.length-1]).attr("fill","grey");
				}

				var qbShapeProp={
					ele:qbShapeEles[qbShapeEles.length-1],
					qbDrag:false
				}

				qbShapeProps.push(qbShapeProp);

			}

			//For Opening Insert Data Modal
			var qbInsertDataModalOpenFun=function(qbInsertDataModalHTML){
				qbInsertDataModal.append($compile(qbInsertDataModalHTML)(scope))
				qbInsertDataModalWrap.css("display","table");
			}

			//For Closing Insert Data Modal
			scope.qbInsertDataModalCloseFun=function(event){
				qbInsertDataModalCloseFun();
			}
			var qbInsertDataModalCloseFun=function(){
				qbInsertDataModal.empty();
				qbInsertDataModalWrap.css("display","none");
			}

			//For Changing Stroke
			scope.qbShapeStrokeChangeFun=function(event){
				var qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle, qbKey){
					if(angular.element(qbShapeEle).attr("stroke"))
					{
						if(angular.element(qbShapeEle).attr("stroke")==="grey")
						{
							angular.element(qbShapeEle).attr("stroke-width",scope.qbStorkeWidthValue);
						}	
					}
				});
			}

			//For Resizing Text
			var qbTextResizeFun=function(qbTextEle,qbResizeType,qbResizeRange){
				var qbTextFontSize=parseFloat(angular.element(qbTextEle).attr("font-size"));
				if(qbResizeType=="+")
				{
					qbTextFontSize++;
					angular.element(qbTextEle).attr("font-size",qbTextFontSize);
				}
				else if((qbResizeType=="-")&&(qbTextFontSize))
				{
					qbTextFontSize--;
					angular.element(qbTextEle).attr("font-size",qbTextFontSize);
				}
			}

			//For Resizing Polygon
			var qbPolygonResizeFun=function(qbPolygonEle,qbResizeType,qbResizeRange){
				var qbResizeValue;
				if(qbResizeType=='+')
				{
					qbResizeValue=1+qbResizeRange;
				}
				else if(qbResizeType=='-')
				{
					qbResizeValue=1-qbResizeRange;
				}

				var qbPolygonPoints=angular.element(qbPolygonEle).attr("points").split(" ");
				var qbPolygonNewPoints="";
				angular.forEach(qbPolygonPoints, function(qbPolygonPoint,qbKey){
					if(qbPolygonPoint.split(",").length==2)
					{
						var qbPolygonPointVector={
							x:parseFloat(qbPolygonPoint.split(",")[0]),
							y:parseFloat(qbPolygonPoint.split(",")[1])
						}

						qbPolygonNewPoints+=" "+(qbPolygonPointVector.x*qbResizeValue)+","+(qbPolygonPointVector.y*qbResizeValue);
					}
				});
				
				angular.element(qbPolygonEle).attr("points",qbPolygonNewPoints);
			}

			//For Resizing Circle
			var qbCircleResizeFun=function(qbCircleEle,qbResizeType,qbResizeRange){
				var qbResizeValue;
				if(qbResizeType=='+')
				{
					qbResizeValue=1+qbResizeRange;
				}
				else if(qbResizeType=='-')
				{
					qbResizeValue=1-qbResizeRange;
				}
				
				var qbCircleRadius=parseFloat(angular.element(qbCircleEle).attr("r")*qbResizeValue);
				angular.element(qbCircleEle).attr("r",qbCircleRadius);
			}

			//For Resizing Path
			var qbPathResizeFun=function(qbPathEle,qbResizeType,qbResizeRange){
				var qbResizeValue;
				if(qbResizeType=='+')
				{
					qbResizeValue=1+qbResizeRange;
				}
				else if(qbResizeType=='-')
				{
					qbResizeValue=1-qbResizeRange;
				}

				var qbPathStartPointX=parseFloat(angular.element(qbPathEle).attr("qb-start-point").split(",")[0]);
				var qbPathStartPointY=parseFloat(angular.element(qbPathEle).attr("qb-start-point").split(",")[1]);
				var qbPathEndPointX=parseFloat(angular.element(qbPathEle).attr("qb-end-point").split(",")[0]);
				var qbPathEndPointY=parseFloat(angular.element(qbPathEle).attr("qb-end-point").split(",")[1]);
				var qbPathRadius=parseFloat(angular.element(qbPathEle).attr("qb-radius"));
				var qbPathCenterX=parseFloat(angular.element(qbPathEle).attr("qb-center").split(",")[0]);
				var qbPathCenterY=parseFloat(angular.element(qbPathEle).attr("qb-center").split(",")[1]);
				var qbPathAngle=parseFloat(angular.element(qbPathEle).attr("qb-angle"));

				var qbPathNewStartPointX;
				var qbPathNewStartPointY;
				var qbPathNewEndPointX;
				var qbPathNewEndPointY;
				var qbPathNewRadius;
			
				//For StartPoint for X co-ordinate
				if(qbPathStartPointX-qbPathCenterX)
				{
					var qbDiffX=(qbPathStartPointX-qbPathCenterX);
					qbPathNewStartPointX=(qbDiffX*qbResizeValue)+qbPathCenterX;
				}
				else
				{
					qbPathNewStartPointX=qbPathStartPointX;
				}
				
				//For StartPoint for Y co-ordinate
				if(qbPathStartPointY-qbPathCenterY)
				{
					var qbDiffY=(qbPathStartPointY-qbPathCenterY);
					qbPathNewStartPointY=(qbDiffY*qbResizeValue)+qbPathCenterY;
				}
				else
				{
					qbPathNewStartPointY=qbPathStartPointY;
				}

				//For EndPoint for X co-ordinate
				if(qbPathEndPointX-qbPathCenterX)
				{
					var qbDiffX=(qbPathEndPointX-qbPathCenterX);
					qbPathNewEndPointX=(qbDiffX*qbResizeValue)+qbPathCenterX;
				}
				else
				{
					qbPathNewEndPointX=qbPathEndPointX;
				}

				//For EndPoint for Y co-ordinate
				if(qbPathEndPointY-qbPathCenterY)
				{
					var qbDiffY=(qbPathEndPointY-qbPathCenterY);
					qbPathNewEndPointY=(qbDiffY*qbResizeValue)+qbPathCenterY;
				}
				else
				{
					qbPathNewEndPointY=qbPathEndPointY;
				}
				qbPathNewRadius=qbPathRadius*qbResizeValue;

				angular.element(qbPathEle).attr("qb-start-point",qbPathNewStartPointX+","+qbPathNewStartPointY);
				angular.element(qbPathEle).attr("qb-end-point",qbPathNewEndPointX+","+qbPathNewEndPointY);
				angular.element(qbPathEle).attr("qb-radius",qbPathNewRadius);

				var qbPathAttrValue="M"+qbPathNewStartPointX+","+qbPathNewStartPointY+" A"+qbPathNewRadius+","+qbPathNewRadius+" 0 "+parseInt(qbPathAngle/180)+",1 "+qbPathNewEndPointX+","+qbPathNewEndPointY;
				angular.element(qbPathEle).attr("d",qbPathAttrValue);
			}

			//For Resizing Line
			var qbLineResizeFun=function(qbLineEle,qbResizeType,qbResizeRange){
				var qbResizeValue;
				if(qbResizeType=='+')
				{
					qbResizeValue=1+qbResizeRange;
				}
				else if(qbResizeType=='-')
				{
					qbResizeValue=1-qbResizeRange;
				}

				var qbLineProps={
					x1:parseFloat(angular.element(qbLineEle).attr("x1")),
					x2:parseFloat(angular.element(qbLineEle).attr("x2")),
					y1:parseFloat(angular.element(qbLineEle).attr("y1")),
					y2:parseFloat(angular.element(qbLineEle).attr("y2"))
				}

				if((qbLineProps.x1-qbLineProps.x2)&&(qbLineProps.y1-qbLineProps.y2))
				{
					var diffX=qbLineProps.x2-qbLineProps.x1;
					var diffY=qbLineProps.y2-qbLineProps.y1;

					angular.element(qbLineEle).attr("x2",(diffX*qbResizeValue+qbLineProps.x1));
					angular.element(qbLineEle).attr("y2",(diffY*qbResizeValue+qbLineProps.y1));
				}
				else if((qbLineProps.x1-qbLineProps.x2)||(qbLineProps.y1-qbLineProps.y2))
				{
					if(qbLineProps.x1-qbLineProps.x2)
					{
						var diffX=(qbLineProps.x2-qbLineProps.x1);

						angular.element(qbLineEle).attr("x2",(diffX*qbResizeValue+qbLineProps.x1));
					}
					else if(qbLineProps.y1-qbLineProps.y2)
					{
						var diffY=(qbLineProps.y2-qbLineProps.y1);

						angular.element(qbLineEle).attr("y2",(diffY*qbResizeValue+qbLineProps.y1));
					}
				}
			}

			//For Resizing Objects
			scope.qbShapeResizeClickFun=function(qbResizeType){
				var qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle,key){
					if(angular.element(qbShapeEle).attr("stroke")==="grey")
					{
						switch(qbShapeEle.nodeName){
							case "line": qbLineResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
							case "circle": qbCircleResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
							case "polygon": qbPolygonResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
							case "path": qbPathResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
						}
					}
					else if(angular.element(qbShapeEle).attr("fill")==="grey")
					{
						switch(qbShapeEle.nodeName){
							case "line": qbLineResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
							case "circle": qbCircleResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
							case "polygon": qbPolygonResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
							case "text": qbTextResizeFun(qbShapeEle,qbResizeType,parseFloat(scope.qbSizeChangeRangeValue));
								break;
						}
					}
				});
			}

			//For Moving Path
			var qbPathMoveFun=function(qbPathEle, qbMoveType, qbMoveRange){
				var qbPathProps={
					startPoint:{
						x:parseFloat(angular.element(qbPathEle).attr("qb-start-point").split(",")[0]),
						y:parseFloat(angular.element(qbPathEle).attr("qb-start-point").split(",")[1])
					},
					endPoint:{
						x:parseFloat(angular.element(qbPathEle).attr("qb-end-point").split(",")[0]),
						y:parseFloat(angular.element(qbPathEle).attr("qb-end-point").split(",")[1])
					},
					center:{
						x:parseFloat(angular.element(qbPathEle).attr("qb-center").split(",")[0]),
						y:parseFloat(angular.element(qbPathEle).attr("qb-center").split(",")[1])
					},
					angle:parseFloat(angular.element(qbPathEle).attr("qb-angle"))
				}

				var qbPathNewProps=qbPathProps

				switch(qbMoveType){
					case "L":   qbPathNewProps.startPoint.x=qbPathProps.startPoint.x-qbMoveRange;
								qbPathNewProps.endPoint.x=qbPathProps.endPoint.x-qbMoveRange;
								qbPathNewProps.center.x=qbPathProps.center.x-qbMoveRange;
						break;
					
					case "R":   qbPathNewProps.startPoint.x=qbPathProps.startPoint.x+qbMoveRange;
								qbPathNewProps.endPoint.x=qbPathProps.endPoint.x+qbMoveRange;
								qbPathNewProps.center.x=qbPathProps.center.x+qbMoveRange;
						break;
				
					case "U":   qbPathNewProps.startPoint.y=qbPathProps.startPoint.y-qbMoveRange;
								qbPathNewProps.endPoint.y=qbPathProps.endPoint.y-qbMoveRange;
								qbPathNewProps.center.y=qbPathProps.center.y-qbMoveRange;
						break;
			
					case "D":   qbPathNewProps.startPoint.y=qbPathProps.startPoint.y+qbMoveRange;
								qbPathNewProps.endPoint.y=qbPathProps.endPoint.y+qbMoveRange;
								qbPathNewProps.center.y=qbPathProps.center.y+qbMoveRange;
						break;
				}

				var qbPathRadius=parseFloat(angular.element(qbPathEle).attr("qb-radius"));
				var qbPathAttrValue="M"+qbPathNewProps.startPoint.x+","+qbPathNewProps.startPoint.y+" A"+qbPathRadius+","+qbPathRadius+" 0 "+parseInt(qbPathProps.angle/180)+",1 "+qbPathNewProps.endPoint.x+","+qbPathNewProps.endPoint.y;

				angular.element(qbPathEle).attr("d",qbPathAttrValue);
				angular.element(qbPathEle).attr("qb-start-point",qbPathNewProps.startPoint.x+","+qbPathNewProps.startPoint.y);
				angular.element(qbPathEle).attr("qb-end-point",qbPathNewProps.endPoint.x+","+qbPathNewProps.endPoint.y);
				angular.element(qbPathEle).attr("qb-center",qbPathNewProps.center.x+","+qbPathNewProps.center.y);
			}

			//For Moving Line
			var qbLineMoveFun=function(qbLineEle,qbMoveType,qbMoveRange){
				var qbLineProps={
					x1:parseFloat(angular.element(qbLineEle).attr("x1")),
					x2:parseFloat(angular.element(qbLineEle).attr("x2")),
					y1:parseFloat(angular.element(qbLineEle).attr("y1")),
					y2:parseFloat(angular.element(qbLineEle).attr("y2"))
				}                
				switch(qbMoveType){
					case "L":   angular.element(qbLineEle).attr("x1",(qbLineProps.x1-qbMoveRange));
								angular.element(qbLineEle).attr("x2",(qbLineProps.x2-qbMoveRange));
						break;
					
					case "R":   angular.element(qbLineEle).attr("x1",(qbLineProps.x1+qbMoveRange));
								angular.element(qbLineEle).attr("x2",(qbLineProps.x2+qbMoveRange));
						break;
				
					case "U":   angular.element(qbLineEle).attr("y1",(qbLineProps.y1-qbMoveRange));
								angular.element(qbLineEle).attr("y2",(qbLineProps.y2-qbMoveRange));
						break;
			
					case "D":   angular.element(qbLineEle).attr("y1",(qbLineProps.y1+qbMoveRange));
								angular.element(qbLineEle).attr("y2",(qbLineProps.y2+qbMoveRange));
						break;
				}
			}
			
			//For Moving Polygon
			var qbPolygonMoveFun=function(qbPolygonEle,qbMoveType,qbMoveRange){
				var qbPolygonPoints=angular.element(qbPolygonEle).attr("points").split(" ");
				var qbPolygonNewPoints="";
				angular.forEach(qbPolygonPoints, function(qbPolygonPoint,qbKey){
					if(qbPolygonPoint.split(",").length==2)
					{
						var qbPolygonPointVector={
							x:parseFloat(qbPolygonPoint.split(",")[0]),
							y:parseFloat(qbPolygonPoint.split(",")[1])
						}

						switch(qbMoveType){
							case "L":   qbPolygonNewPoints+=" "+(qbPolygonPointVector.x-qbMoveRange)+","+(qbPolygonPointVector.y);
								break;
							
							case "R":   qbPolygonNewPoints+=" "+(qbPolygonPointVector.x+qbMoveRange)+","+(qbPolygonPointVector.y);
								break;
	
							case "U":   qbPolygonNewPoints+=" "+(qbPolygonPointVector.x)+","+(qbPolygonPointVector.y-qbMoveRange);
								break;
	
							case "D":   qbPolygonNewPoints+=" "+(qbPolygonPointVector.x)+","+(qbPolygonPointVector.y+qbMoveRange);
								break;
							
						}
					}
				});

				angular.element(qbPolygonEle).attr("points",qbPolygonNewPoints);
			}

			//For Moving Circle
			var qbCircleMoveFun=function(qbCricleEle,qbMoveType,qbMoveRange){
				var qbCircleProps={
					r:parseFloat(angular.element(qbCricleEle).attr("r")),
					cx:parseFloat(angular.element(qbCricleEle).attr("cx")),
					cy:parseFloat(angular.element(qbCricleEle).attr("cy"))
				}                
				switch(qbMoveType){
					case "L":   angular.element(qbCricleEle).attr("cx",(qbCircleProps.cx-qbMoveRange));
						break;
					
					case "R":   angular.element(qbCricleEle).attr("cx",(qbCircleProps.cx+qbMoveRange));
						break;

					case "U":   angular.element(qbCricleEle).attr("cy",(qbCircleProps.cy-qbMoveRange));
						break;

					case "D":   angular.element(qbCricleEle).attr("cy",(qbCircleProps.cy+qbMoveRange));
						break;
					
				}
			}

			//For Moving Text
			var qbTextMoveFun=function(qbTextEle,qbMoveType,qbMoveRange){
				var qbTextProps={
					x:parseFloat(angular.element(qbTextEle).attr("x")),
					y:parseFloat(angular.element(qbTextEle).attr("y"))
				}

				switch(qbMoveType){
					case "L":   angular.element(qbTextEle).attr("x",(qbTextProps.x-qbMoveRange));
						break;
					
					case "R":   angular.element(qbTextEle).attr("x",(qbTextProps.x+qbMoveRange));
						break;

					case "U":   angular.element(qbTextEle).attr("y",(qbTextProps.y-qbMoveRange));
						break;

					case "D":   angular.element(qbTextEle).attr("y",(qbTextProps.y+qbMoveRange));
						break;
					
				}

			}
			
			//For Moving Object
			scope.qbShapeMoveClickFun=function(qbMoveType){
				var qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle,key){
					if(angular.element(qbShapeEle).attr("stroke")=="grey")
					{
						switch(qbShapeEle.nodeName){
							case "line": qbLineMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));
								break;
							case "circle": qbCircleMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));
								break;
							case "polygon": qbPolygonMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));	
								break;
							case "path": qbPathMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));	
								break;
						}
					}
					else if(angular.element(qbShapeEle).attr("fill")=="grey")
					{
						switch(qbShapeEle.nodeName){
							case "line": qbLineMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));
										break;
							case "circle": qbCircleMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));
										break;
							case "polygon": qbPolygonMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));
										break;
							case "text": qbTextMoveFun(qbShapeEle,qbMoveType,parseFloat(scope.qbMoveRangeValue));
										break;
						}
					}
				});
			}

			//For Changing Angle Of Line
			var qbLineAngleFun=function(qbLineEle,qbAngleValue){
				var qbLineProps={
					x1:parseFloat(angular.element(qbLineEle).attr("x1")),
					x2:parseFloat(angular.element(qbLineEle).attr("x2")),
					y1:parseFloat(angular.element(qbLineEle).attr("y1")),
					y2:parseFloat(angular.element(qbLineEle).attr("y2"))
				}

				var qbLineLength=Math.sqrt(Math.pow((qbLineProps.x1-qbLineProps.x2),2)+Math.pow((qbLineProps.y1-qbLineProps.y2),2));
				var qbDiffX=qbLineLength*Math.cos(qbAngleValue*3.14/180);
				var qbDiffY=qbLineLength*Math.sin(qbAngleValue*3.14/180);

				angular.element(qbLineEle).attr("x2",(qbLineProps.x1+qbDiffX));
				angular.element(qbLineEle).attr("y2",(qbLineProps.y1+qbDiffY));
			}

			var qbPathAngleFun=function(qbPathEle,qbAngleValue){
				var qbPathProps={
					startPoint:{
						x:parseFloat(angular.element(qbPathEle).attr("qb-start-point").split(",")[0]),
						y:parseFloat(angular.element(qbPathEle).attr("qb-start-point").split(",")[1])
					},
					endPoint:{
						x:parseFloat(angular.element(qbPathEle).attr("qb-end-point").split(",")[0]),
						y:parseFloat(angular.element(qbPathEle).attr("qb-end-point").split(",")[1])
					},
					center:{
						x:parseFloat(angular.element(qbPathEle).attr("qb-center").split(",")[0]),
						y:parseFloat(angular.element(qbPathEle).attr("qb-center").split(",")[1])
					},
					angle:parseFloat(angular.element(qbPathEle).attr("qb-angle")),
					radius:parseFloat(angular.element(qbPathEle).attr("qb-radius")),
				}

				var qbPathNewProps=qbPathProps;

				//For Finding Initial Angle of Start Point
				var qbDiffX=Math.cos(qbAngleValue*3.14/180)*qbPathProps.radius;
				var qbDiffY=Math.sin(qbAngleValue*3.14/180)*qbPathProps.radius;

				qbPathNewProps.startPoint.x=qbPathProps.center.x+qbDiffX;
				qbPathNewProps.startPoint.y=qbPathProps.center.y+qbDiffY;

				qbDiffX=Math.cos((qbAngleValue+qbPathProps.angle)*3.14/180)*qbPathProps.radius;
				qbDiffY=Math.sin((qbAngleValue+qbPathProps.angle)*3.14/180)*qbPathProps.radius;

				qbPathNewProps.endPoint.x=qbPathProps.center.x+qbDiffX;
				qbPathNewProps.endPoint.y=qbPathProps.center.y+qbDiffY;

				var qbPathAttrValue="M"+qbPathProps.startPoint.x+","+qbPathProps.startPoint.y+" A"+qbPathProps.radius+","+qbPathProps.radius+" 0 "+parseInt(qbPathProps.angle/180)+",1 "+qbPathProps.endPoint.x+","+qbPathProps.endPoint.y;
				angular.element(qbPathEle).attr("d",qbPathAttrValue);

				angular.element(qbPathEle).attr("qb-start-point",(qbPathNewProps.startPoint.x)+","+(qbPathNewProps.startPoint.y));
				angular.element(qbPathEle).attr("qb-end-point",(qbPathNewProps.endPoint.x)+","+(qbPathNewProps.endPoint.y));
			}

			//For Changing Angles
			scope.qbShapeAngleApplyFun=function(){
				var qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle,key){
					if(angular.element(qbShapeEle).attr("stroke")==="grey")
					{
						switch(qbShapeEle.nodeName){
							case "line": qbLineAngleFun(qbShapeEle,scope.qbShapeAngleValue);
										break;
							case "path": qbPathAngleFun(qbShapeEle,scope.qbShapeAngleValue);
										break;
						}
					}
				});
			}

			//For Deleting Shape
			scope.qbShapeDeleteFun=function(){
				var qbShapeEles=qbShapeEditorSVG.children();
				var qbShapeId;
				angular.forEach(qbShapeEles, function(qbShapeEle,key){
					if(angular.element(qbShapeEle).attr("stroke")==="grey")
					{
						qbShapeId=angular.element(qbShapeEle).attr("qb-shape-id");
					}
					else if(angular.element(qbShapeEle).attr("fill")==="grey")
					{
						qbShapeId=angular.element(qbShapeEle).attr("qb-shape-id");
					}
				});

				qbShapeEditorSVG[0].removeChild(qbShapeEles[qbShapeId]);
				qbShapeEles=qbShapeEditorSVG.children();
				angular.forEach(qbShapeEles, function(qbShapeEle,qbKey){
					angular.element(qbShapeEle).attr("qb-shape-id",qbKey);
				
					if(angular.element(qbShapeEle).attr("stroke"))
					{
						angular.element(qbShapeEle).attr("stroke","black");
					}
					else
					{
						angular.element(qbShapeEle).attr("fill","black");
					}
				});

				if(angular.element(qbShapeEles[qbShapeEles.length-1]).attr("stroke"))
				{
					angular.element(qbShapeEles[qbShapeEles.length-1]).attr("stroke","grey");
				}
				else
				{
					angular.element(qbShapeEles[qbShapeEles.length-1]).attr("fill","grey");
				}
			}

			//For Clearing Shape Editor
			scope.qbShapeClearFun=function(){
				qbShapeEditorSVG.empty();
			}

			//For selecting Shape
			scope.qbShapeEditorClickFun=function(event){
				var qbShapeNames=[];
				angular.forEach(qbShapeEditorSVG.children(),function(qbShape,key){
					if(angular.element(qbShape).attr("stroke"))
					{
						angular.element(qbShape).attr("stroke","black");
					}
					else if(angular.element(qbShape).attr("fill")!="none")
					{
						angular.element(qbShape).attr("fill","black");
					}
					qbShapeNames.push(angular.element(qbShape)[0].nodeName);
				});
				if(qbShapeNames.includes(angular.element(event.target)[0].nodeName))
				{
					if(angular.element(event.target).attr("stroke"))
					{
						angular.element(event.target).attr("stroke","grey");
					}
					else if(angular.element(event.target).attr("fill")!="none")
					{
						angular.element(event.target).attr("fill","grey");
					}
				}
			}

			scope.qbApplyFinalSizeFun=function(){
				qbShapeEditorSVG.attr("viewBox","0 0 500 375");
				qbShapeEditorSVG.attr("width",scope.qbSVGFinalWidth);
				qbShapeEditorSVG.attr("height",scope.qbSVGFinalHeight);
			}

			scope.qbInsertHTMLFun=function(){
				var qbEditorTools;
				angular.forEach(document.querySelectorAll("qb-text-editor"), function(qbTextEditorEle, qbKey){
					if(angular.element(qbTextEditorEle).attr("qb-text-editor-id")==attr.qbTextEditorId)
					{
						qbEditorTools=angular.element(qbBasics.findChildren(qbTextEditorEle, "qb-editor-tools")[0]);
					}
				});

				qbShapeEditorSVG.attr("viewBox","0 0 500 375");
				qbShapeEditorSVG.attr("width",scope.qbSVGFinalWidth);
				qbShapeEditorSVG.attr("height",scope.qbSVGFinalHeight);
				
				angular.forEach(qbShapeEditorSVG.children(), function(qbShapeEle, qbKey){
					if(angular.element(qbShapeEle).attr("stroke")=="grey")
					{
						angular.element(qbShapeEle).attr("stroke","black");
					}
					else if(angular.element(qbShapeEle).attr("fill")=="grey")
					{
						angular.element(qbShapeEle).attr("fill","black");
					}
				});

				qbEditorTools.children().scope().qbInsertShapeFun(qbShapeEditorSVG[0].outerHTML);
				scope.qbShapeEditorCloseFun();
			}

			scope.qbShapeEditorCloseFun=function(){
				qbShapeEditorSVG.empty();
				angular.element(element).children().css("display","none");
			}
		},
		template: function(element,attr){
			return	"<div class=\"qb-insert-data-modal-wrap\" style=\"display: none; position: fixed; height: 100vh; width: 100vw; top: 0; left: 0; z-index: 20; background-color:rgba(0,0,0,0.1)\">"+
						"<div class=\"qb-insert-data-modal-cover\" style=\"display: table-cell; width: 100%; height: auto; vertical-align: middle; text-align: center;\" >"+
							"<div class=\"qb-insert-data-modal\" style=\"width: auto; display: inline-block;\" >"+
							"</div>"+
						"</div>"+
					"</div>"+
					"<div class=\"qb-shape-editor-modal-wrap\" style=\"width:100vw; height:100vh; text-align:center;position: fixed;top: 0px;left: 0px; display:none\" >"+
						"<div class=\"qb-shape-editor-close-btn-wrap\" style=\"z-index: 15;position: fixed;top: 5%;\"><button class=\"qb-shape-editor-close-btn\" style=\"right: 5%; position: fixed\" ng-click=\"qbShapeEditorCloseFun()\">Close</button></div>"+
						"<div class=\"qb-shape-editor-modal-cover\" style=\"height:auto; width:100%; display:table-cell; vertical-align:middle\" >"+
							"<div class=\"qb-shape-editor-modal\">"+
								"<div class=\"qb-shape-editor-area\" ng-click=\"qbShapeEditorClickFun($event)\">"+
									"<svg class=\"qb-shape-editor-svg\" width=\"500\" height=\"375\"></svg>"+
								"</div>"+
								"<div class=\"qb-shape-editor-tools\">"+
									"<div class=\"qb-shape-insert-wrap\" >"+

									"</div>"+
									"<div class=\"qb-shape-tools-container\">"+
										"<div class=\"qb-shape-size qb-shape-tool-wrap\">"+
											"<div class=\"qb-shape-tool-wrap-section\" >"+
												"<div class=\"qb-shape-tool-head\">Size </div>"+
												"<button class=\"qb-size-btn qb-tool-btn\" ng-click=\"qbShapeResizeClickFun('+')\">+</button>"+
												"<button class=\"qb-size-btn qb-tool-btn\" ng-click=\"qbShapeResizeClickFun('-')\" style=\"padding-left: 10px; padding-right: 10px;\">-</button><br>"+
											"</div>"+
											"<div class=\"qb-shape-tool-wrap-section\" >"+
												"<div class=\"qb-shape-tool-head\">Precentage </div>"+
												"<select ng-model=\"qbSizeChangeRangeValue\">"+
													"<option value=\"0.01\">1%</option>"+
													"<option value=\"0.02\">2%</option>"+
													"<option value=\"0.05\">5%</option>"+
													"<option value=\"0.1\">10%</option>"+
													"<option value=\"0.2\">20%</option>"+
													"<option value=\"0.5\">50%</option>"+
												"</select>"+
											"</div>"+
										"</div>"+
										"<div class=\"qb-shape-size qb-shape-tool-wrap\">"+
											"<div class=\"qb-shape-tool-wrap-section\">"+
												"<div class=\"qb-shape-tool-head\">Stroke</div>"+
												"<select ng-model=\"qbStorkeWidthValue\" ng-change=\"qbShapeStrokeChangeFun($event)\" class=\"qb-shape-tool-stroke-select\" >"+
													"<option value=\"1\">1px</option>"+
													"<option value=\"2\">2px</option>"+
													"<option value=\"3\">3px</option>"+
													"<option value=\"4\">4px</option>"+
													"<option value=\"5\">5px</option>"+
													"<option value=\"6\">6px</option>"+
													"<option value=\"7\">7px</option>"+
													"<option value=\"8\">8px</option>"+
													"<option value=\"9\">9px</option>"+
													"<option value=\"10\">10px</option>"+
													"<option value=\"11\">11px</option>"+
													"<option value=\"12\">12px</option>"+
													"<option value=\"13\">13px</option>"+
													"<option value=\"14\">14px</option>"+
													"<option value=\"15\">15px</option>"+
													"<option value=\"16\">16px</option>"+
													"<option value=\"17\">17px</option>"+
													"<option value=\"18\">18px</option>"+
													"<option value=\"19\">19px</option>"+
													"<option value=\"20\">20px</option>"+
												"</select>"+
											"</div>"+
										"</div>"+
										"<div class=\"qb-shape-move qb-shape-tool-wrap\">"+
											"<div class=\"qb-shape-tool-wrap-section\">"+
												"<div class=\"qb-shape-tool-head\">Move</div>"+
												"<button class=\"qb-move-btn qb-tool-btn\" ng-click=\"qbShapeMoveClickFun('U')\"><i class=\"fas fa-angle-up\"></i></button><br>"+
												"<button class=\"qb-move-btn qb-tool-btn\" ng-click=\"qbShapeMoveClickFun('L')\"><i class=\"fas fa-angle-left\"></i></button>"+
												"<span style=\"padding: 0px 15px;\"></span>"+
												"<button class=\"qb-move-btn qb-tool-btn\" ng-click=\"qbShapeMoveClickFun('R')\"><i class=\"fas fa-angle-right\"></i></button><br>"+
												"<button class=\"qb-move-btn qb-tool-btn\" ng-click=\"qbShapeMoveClickFun('D')\"><i class=\"fas fa-angle-down\"></i></button>"+
											"</div>"+
											"<div class=\"qb-shape-tool-wrap-section\" >"+
												"<div class=\"qb-shape-tool-head\">Pixel</div>"+
												"<select ng-model=\"qbMoveRangeValue\">"+
													"<option value=\"1\">1px</option>"+
													"<option value=\"2\">2px</option>"+
													"<option value=\"5\">5px</option>"+
													"<option value=\"10\">10px</option>"+
													"<option value=\"20\">20px</option>"+
													"<option value=\"50\">50px</option>"+
													"<option value=\"100\">100px</option>"+
												"</select>"+
											"</div>"+
										"</div>"+
										"<div class=\"qb-shape-angle qb-shape-tool-wrap\">"+
											"<div class=\"qb-shape-tool-head\">Angle </div>"+
											"<input type=\"number\" ng-model=\"qbShapeAngleValue\">"+
											"<button class=\"qb-angle-btn qb-tool-btn\" ng-click=\"qbShapeAngleApplyFun()\">Apply</button>"+
										"</div>"+
										"<div class=\"qb-shape-operations qb-shape-tool-wrap\">"+
											"<button class=\"qb-delete-btn qb-tool-btn\" ng-click=\"qbShapeDeleteFun()\">Delete</button><br>"+
											"<button class=\"qb-delete-btn qb-tool-btn\" ng-click=\"qbShapeClearFun()\">Clear</button>"+
										"</div>"+
										"<div class=\"qb-shape-tool-wrap\">"+
											"<div class=\"qb-shape-tool-head\">Final Size</div>"+
											"<input type=\"number\" ng-model=\"qbSVGFinalWidth\" >"+
											"<span>X</span>"+
											"<input type=\"number\" ng-model=\"qbSVGFinalHeight\" ><br>"+
											"<button class=\"qb-delete-btn qb-tool-btn\" ng-click=\"qbApplyFinalSizeFun()\">Apply</button>"+
											"<button class=\"qb-delete-btn qb-tool-btn\" ng-click=\"qbInsertHTMLFun()\">Insert</button>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>";
		}
	}
}

myApp.directive('qbTextEditor', ['qbBasics', function(qbBasics){
	return {
		scope:{},
		transclude:true,
		link: function(scope, element, attr, ctrl, transclude){
		
		},
		template: function(element,attr){
			return	"<div class=\"qb-text-editor\" ng-transclude>"+
					
					"</div>";
		}
	}
}]);


myApp.directive('qbEditorTools',qbEditorTools);
qbEditorTools.$inject=['$compile','qbBasics','qbShapeEditor'];
function qbEditorTools($compile,qbBasics,qbShapeEditor)
{
    return {
		scope:{},
		transclude:false,
		link: function(scope, element, attr, ctrl, transclude){
			var qbTextEditor=qbBasics.findParent(element,"qb-text-editor");
			var qbTextArea=angular.element(qbBasics.findChildren(qbTextEditor, "qb-text-area")[0]);
			var qbEditorModalScreenWrapper=angular.element(element[0].querySelector(".qb-editor-modal-screen-wrapper"))
			var qbAddTableBtn=angular.element(element[0].querySelector(".qb-add-table-btn"));
			var qbInsertIconBtn=angular.element(element[0].querySelector(".qb-insert-icon-btn"));
			var qbFontFamilyBtn=angular.element(element[0].querySelector(".qb-font-family-btn"));
			var qbFontSizeBtn=angular.element(element[0].querySelector(".qb-font-size-btn"));
			var qbEditorModal=angular.element(element[0].querySelector(".qb-editor-modal"));


			angular.element(element).ready(function(){
				var qbFontSizeSVG="<svg class=\"qb-shape-editor-svg\" style=\"padding-right:3px; margin-bottom:-2px\" width=\"20\" height=\"16.6666\" viewBox=\"70 40 400 325\"><line x1=\"140\" y1=\"55\" x2=\"443.75\" y2=\"55\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"0\"></line><line x1=\"296\" y1=\"55\" x2=\"296.24188423838524\" y2=\"358.7499036905448\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"1\"></line><line x1=\"156\" y1=\"70\" x2=\"425.8886059330932\" y2=\"70\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"2\"></line><line x1=\"276\" y1=\"73\" x2=\"276.2269147924547\" y2=\"357.95178856719576\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"3\"></line><line x1=\"435\" y1=\"55\" x2=\"455.7937562448094\" y2=\"99.52547924000137\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"4\"></line><line x1=\"410\" y1=\"55\" x2=\"450.31967479305666\" y2=\"103.00796816477005\" stroke=\"black\" stroke-width=\"30\" qb-shape-id=\"5\"></line><line x1=\"414\" y1=\"49\" x2=\"453.26106423569684\" y2=\"95.74749812880206\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"6\"></line><line x1=\"134\" y1=\"103\" x2=\"178.61741653943577\" y2=\"49.52986488536475\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"7\"></line><line x1=\"128\" y1=\"101\" x2=\"152.0621940399061\" y2=\"49.04482897073356\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"8\"></line><line x1=\"138\" y1=\"95\" x2=\"157.41593621247904\" y2=\"53.077044639416776\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"9\"></line><line x1=\"231\" y1=\"355\" x2=\"345.6617856000001\" y2=\"355\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"10\"></line><line x1=\"90\" y1=\"200\" x2=\"236.60051640996986\" y2=\"200\" stroke=\"black\" stroke-width=\"36\" qb-shape-id=\"11\"></line><line x1=\"169\" y1=\"195\" x2=\"169.12840221611916\" y2=\"356.24308487493465\" stroke=\"black\" stroke-width=\"40\" qb-shape-id=\"12\"></line><line x1=\"228\" y1=\"196\" x2=\"241.00093922082516\" y2=\"223.83879172969867\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"13\"></line><line x1=\"222\" y1=\"200\" x2=\"242.15628388468537\" y2=\"223.99975297476058\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"14\"></line><line x1=\"85\" y1=\"226\" x2=\"99.65325315582162\" y2=\"194.36064605815886\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"15\"></line><line x1=\"84\" y1=\"226\" x2=\"108.82141118285016\" y2=\"196.2536741787852\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"16\"></line><line x1=\"132\" y1=\"354\" x2=\"196.95390000000003\" y2=\"354\" stroke=\"black\" stroke-width=\"12\" qb-shape-id=\"17\"></line><line x1=\"97\" y1=\"210\" x2=\"227.45131000000006\" y2=\"210\" stroke=\"black\" stroke-width=\"20\" qb-shape-id=\"18\"></line><line x1=\"154\" y1=\"209\" x2=\"154.11542429178127\" y2=\"353.94585404226945\" stroke=\"black\" stroke-width=\"20\"></line></svg>";
				qbFontSizeBtn.prepend(qbFontSizeSVG);
			});
			var qbCmds=[
				{cmd:"bold", icon:"fas fa-bold", text:null},
				{cmd:"italic", icon:"fas fa-italic", text:null},
				{cmd:"underline", icon:"fas fa-underline", text:null},
				{cmd:"strikeThrough", icon:"fas fa-strikethrough", text:null},
				{cmd:"justifyLeft", icon:"fas fa-align-left", text:null},
				{cmd:"justifyRight", icon:"fas fa-align-right", text:null},
				{cmd:"justifyCenter", icon:"fas fa-align-center", text:null},
				{cmd:"cut", icon:"fas fa-cut", text:null},
				{cmd:"copy", icon:"fas fa-copy", text:null},
				{cmd:"undo", icon:"fas fa-undo", text:null},
				{cmd:"redo", icon:"fas fa-redo", text:null},
				{cmd:"indent", icon:"fas fa-indent", text:null},
				{cmd:"outdent", icon:"fas fa-outdent", text:null},
				{cmd:"subscript", icon:"fas fa-subscript", text:null},
				{cmd:"superscript", icon:"fas fa-superscript", text:null},
				{cmd:"insertOrderedList", icon:"fas fa-list-ol", text:null},
				{cmd:"insertUnorderedList", icon:"fas fa-list-ul", text:null},
				{cmd:"insertHorizontalRule", icon:null, text:"HR"}
			];

			scope.qbCmdClickFun=function(qbCmd){
				qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand(qbCmd, false, null);
				qbTextArea[0].querySelector("iframe").contentWindow.focus();
			}

			//Add Table Fun
			scope.qbAddTableFun=function(event){
				var qbTableModal=angular.element("<div class=\"qb-table-modal\" ><div class=\"qb-modal-row\">No of Rows<br><input type=\"number\" name=\"row\"></div><div class=\"qb-modal-row\">No of Columns<br><input type=\"number\" name=\"column\"></div><button class=\"qb-add-table-btn\" ng-click=\"qbCreateTableBtnClickFun($event)\" >Create Table</button></div>")
				scope.qbEditorModalOpenFun(qbAddTableBtn,qbTableModal);
			}

			scope.qbCreateTableBtnClickFun=function(event){
				var qbTableInputs=angular.element(event.target).parent()[0].querySelectorAll("input");
				var row=qbTableInputs[0].value;
				var column=qbTableInputs[1].value;

				var qbTable=angular.element("<table class=\"qb-editor-table\" style=\"border: 2px solid grey;\"></table>");
				for(let i=0; i<row; i++)
				{
					var qbRow="<tr class=\"qb-editor-table-row\"></tr>";
					qbTable.append(qbRow);
				}

				angular.forEach(qbTable.children(), function(qbTableRow,key){
					for(let j=0; j<column; j++)
					{
						var qbColumn="<td class=\"qb-editor-table-cell\">Enter Data</td>";
						angular.element(qbTableRow).append(qbColumn);
					}	
				});

				qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand('insertHTML', false, angular.element(qbTable)[0].outerHTML);
				qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand("insertHTML",false,"enter text");
				qbTextArea[0].querySelector("iframe").contentWindow.focus();
				scope.qbEditorModalCloseFun();
			}

			//Insert Icon Fun
			scope.qbInsertIconFun=function(event){				
				var qbSelectEle=angular.element("<select ng-change=\"qbInsertIconChangeFun($event)\" ng-model=\"qbInsertIconValue\" ></select>");
				for(let i=8704; i<=8959; i++)
				{
					qbSelectEle.append("<option value=\"&#"+i+"\">&#"+i+"</option>");
				}

				var qbInsertIconEle=angular.element("<div> <br></div>")
				qbInsertIconEle.prepend(qbSelectEle)
				qbTextArea[0].querySelector("iframe").contentWindow.focus();
				scope.qbEditorModalOpenFun(qbInsertIconBtn,qbInsertIconEle);
			}

			scope.qbInsertIconChangeFun=function(event){
				if(scope.qbInsertIconValue)
				{	
					qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand("insertHTML",false,scope.qbInsertIconValue);
					qbTextArea[0].querySelector("iframe").contentWindow.focus();
					scope.qbEditorModalCloseFun();
				}
			}

			//Set Font Size
			scope.qbFontSizeFun=function(event){
				var qbFontSizeContent=angular.element("<div class=\"qb-font-family\"></div>");
				var qbFontSizeSelect=angular.element("<select ng-change=\"qbFontSizeChangeFun($event)\" ng-model=\"qbFontSizeValue\"></select>");

				for(let i=01; i<=7; i++)
				{
					var qbOption="<option value=\""+i+"\">"+i+"</option>"
					qbFontSizeSelect.append(qbOption);					
				}

				qbFontSizeContent.prepend(qbFontSizeSelect);
				scope.qbEditorModalOpenFun(qbFontSizeBtn,qbFontSizeContent)
			}

			scope.qbFontSizeChangeFun=function(event){
				if(scope.qbFontSizeValue)
				{	
					qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand("fontSize",false,scope.qbFontSizeValue);
					qbTextArea[0].querySelector("iframe").contentWindow.focus();
					scope.qbEditorModalCloseFun();
				}
			}

			//Set Font Family
			scope.qbFontFamilyFun=function(event){
				var qbFontFamilyContent=angular.element("<div class=\"qb-font-family\"></div>");
				var qbFontSelect=angular.element("<select ng-change=\"qbFontFamilyChangeFun()\" ng-model=\"qbFontFamilyValue\"></select>");
				var qbFonts=[
					{value:"Lucida Console", text:"Lucida Console"},
					{value:"TypeWriter", text:"TypeWriter"},
					{value:"arial", text:"Arial"},
					{value:"Impact", text:"Impact"},
					{value:"Times New Roman", text:"Times New Roman"},
					{value:"Courier New", text:"Courier New"},
					{value:"Webdings", text:"Webdings"},
					{value:"Century Gothic", text:"Century Gothic"},
					{value:"Georgia", text:"Georgia"},
					{value:"Komika", text:"Komika"}
				];

				angular.forEach(qbFonts, function(qbFont,key){
					var qbOption="<option style=\"font-family:"+qbFont.value+"\" value=\""+qbFont.value+"\">"+qbFont.text+"</option>"
					qbFontSelect.append(qbOption);					
				});

				qbFontFamilyContent.prepend(qbFontSelect);
				scope.qbEditorModalOpenFun(qbFontFamilyBtn,qbFontFamilyContent)
			}

			scope.qbFontFamilyChangeFun=function(){
				if(scope.qbFontFamilyValue)
				{
					qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand("fontName",false,scope.qbFontFamilyValue);
					qbTextArea[0].querySelector("iframe").contentWindow.focus();
					scope.qbEditorModalCloseFun();
				}
			}

			scope.qbModalScreenClickFun=function(event){
				if(angular.element(event.target).hasClass("qb-editor-modal-screen-wrapper"))
				{
					scope.qbEditorModalCloseFun(event);
				}
			}

			scope.qbEditorModalOpenFun=function(qbCmdBtn,qbEditorModalContent){
				qbEditorModalScreenWrapper.css("display","block");
				qbEditorModal.css("top",qbCmdBtn[0].getBoundingClientRect().bottom+"px");
				qbEditorModal.css("left",qbCmdBtn[0].getBoundingClientRect().left+"px");
				qbEditorModal.append($compile(qbEditorModalContent)(scope));
			}

			scope.qbEditorModalCloseFun=function(event){
				qbEditorModalScreenWrapper.css("display","none");
				qbEditorModal.empty();
			}

			angular.forEach(qbCmds, function(qbCmdVal, qbCmdKey){
				if(qbCmdVal.icon)
				{
					var qbCmdBtn=angular.element("<div class=\"qb-editor-tool\" ng-click=\"qbCmdClickFun('"+qbCmdVal.cmd+"')\" ><i class=\""+qbCmdVal.icon+"\"></i></div>");
				}
				else if(qbCmdVal.text)
				{
					var qbCmdBtn=angular.element("<div class=\"qb-editor-tool\" ng-click=\"qbCmdClickFun('"+qbCmdVal.cmd+"')\" >"+qbCmdVal.text+"</div>");
				}
				angular.element(angular.element(element).children().children()[0]).append($compile(qbCmdBtn)(scope));
			});

			scope.qbInitShapeEditorFun=function(){
				console.log("inserted shape");
				var qbShapeEditorParams={
					qbShapeEditorId:qbBasics.findParent(element,"qb-text-editor").attr("qb-shape-editor-id"),
					qbTextEditorId:qbBasics.findParent(element,"qb-text-editor").attr("qb-text-editor-id")
				}
				qbShapeEditor.initFun(qbShapeEditorParams);
			}

			scope.qbInsertShapeFun=function(qbShapeCode){
				qbTextArea[0].querySelector("iframe").contentWindow.focus();
				qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand("insertHTML",false,qbShapeCode);
				qbTextArea[0].querySelector("iframe").contentWindow.document.execCommand("insertHTML",false,"ENTER TEXT");
			}
		},
		template: function(element,attr){
			return "<div class=\"qb-editor-tools\">"+
						"<div class=\"qb-editor-tools-without-arg\" style=\"display:inline-block\"></div>"+
						"<div class=\"qb-editor-tool qb-add-table-btn\" ng-click=\"qbAddTableFun($event)\"><i class=\"fas fa-table\"></i> Add Table</div>"+
						"<div class=\"qb-editor-tool qb-insert-icon-btn\" ng-click=\"qbInsertIconFun($event)\"><span style=\"font-weight:700\">&#937;&#934;</span> Insert Icon</div>"+
						"<div class=\"qb-editor-tool qb-font-size-btn\" ng-click=\"qbFontSizeFun($event)\">Font Size</div>"+
						"<div class=\"qb-editor-tool qb-font-family-btn\" ng-click=\"qbFontFamilyFun($event)\"><i class=\"fas fa-font\"></i> Font Family</div>"+
						"<div class=\"qb-editor-tool qb-insert-shape-btn\" ng-click=\"qbInitShapeEditorFun($event)\"><i class=\"fas fa-shapes\"></i> Insert Shape</div>"+
						"<div class=\"qb-editor-tools-with-arg\">"+
						"</div>"+
						"<div class=\"qb-editor-modal-screen-wrapper\" style=\"width:100%; height:100%; position:fixed; top:0; left:0; display:none;\" ng-click=\"qbModalScreenClickFun($event)\" >"+
							"<div class=\"qb-editor-modal\" style=\"padding: 20px;border: 3px solid #b2aeae;box-sizing: content-box; width: auto; height: auto; display:inline-block; background-color:white; position:absolute\">"+
							"</div>"+
						"</div>"+	
					"</div>";
		} 
	}   
}

myApp.directive('qbTextArea', ['qbBasics',function(qbBasics){
	return {
		scope:{},
		transclude:true,
		link: function(scope, element, attr, ctrl, transclude){
			angular.element(element).ready(function(){
				angular.element(element).children().children()[0].contentWindow.document.designMode="on";
			});
		},
		template: function(element,attr){
			return "<div class=\"qb-text-area\" ng-transclude>"+
						"<iframe name=\"qbRichTextField\" style=\"width:"+attr.qbWidth+"; height:"+attr.qbHeight+"\"></iframe>"+					
					"</div>";
		} 
	}
}]);