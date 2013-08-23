chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "style-page": //样式
			var head = document.querySelector("head");
			var styleEle = document.createElement('style');
			styleEle.innerHTML = message.style;
			head.appendChild(styleEle);
		break;
		case 'load-dom': //显示html
			/*var bodyHTML = document.querySelector("body").innerHTML;
			chrome.extension.sendMessage({
		        type: "load-dom", 
		        data: {
		            dom: bodyHTML
		        }
		    });*/
		    
		    var xhr = new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if (xhr.readyState==4 && xhr.status==200){
					chrome.extension.sendMessage({
				        type: "load-dom", 
				        data: {
				            dom: xhr.responseText
				        }
				    });
				}
			}
			xhr.open("GET","http://dev.cs310.com/users/consult/",true);
			xhr.send();
		break;
		case "html-page": //html
			var body = document.querySelector("body");
			body.innerHTML = message.html;
		break;
	}
});

window.addEventListener("load", function() {
	var bodyHTML = document.querySelector("body").innerHTML;
    chrome.extension.sendMessage({
        type: "dom-loaded", 
        data: {
            myProperty: "value"
        }
    });
}, true);
