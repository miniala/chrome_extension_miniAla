window.onload = function() {
	var port = chrome.extension.connect({ name: "memo-port" });
	/*document.getElementById("submitstyle").onclick = function() {
		var styleVal = document.getElementById("stylearea").value;
    	port_style.postMessage({ type: "style-page", style: styleVal});
	}*/
	//向background提交style表单
	document.forms['style-form'].onsubmit = function(e){
		e.preventDefault();
		var styleVal = document.getElementById("stylearea").value;
		//向background传送表单里的样式
    	port.postMessage({type: "style-page", style: styleVal});
	}
	
	//向background提交html表单
	document.forms['html-form'].onsubmit = function(e){
		e.preventDefault();
		var htmlVal = document.getElementById("htmlarea").value;
		//向background传送表单里的样式
    	port.postMessage({type: "html-page", html: htmlVal});
	}
	//extension页面载入后向background发送load-dom信息
	port.postMessage({type: "load-dom"});
	//监听background返回信息
	port.onMessage.addListener(function (message) {
		switch(message.type){
			case "load-dom": 
				//alert(message.dom)
				//以字符串形式显示页面html
				//document.getElementById("html-wrap").appendChild(document.createTextNode(message.dom));
			break;
		}
    });
}
