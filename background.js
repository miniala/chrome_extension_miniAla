// 监听 devtools 信息
chrome.extension.onConnect.addListener(function (port) {
	//监听devtools连接信息
    port.onMessage.addListener(function (message) {
       	/*switch(port.name) {
			case "style-page-port":
				style(message.style);
			break;
		}*/
		switch(message.type){
			case "style-page":
				style(message.style);
			break;
			case "html-page":
				html(message.html)
			break;
			case "load-dom":
				loadDom();
			break;
		}
    });
    //向devtools传送dom
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	    switch(request.type) {
	        case "load-dom":
	          //alert(request.data.dom);
	          //向devtools传送dom
	          port.postMessage({type: "load-dom", dom: request.data.dom});
	        break;
	    }
	    return true;
	});
});



// 给 content script 发送信息
var style = function(messageStyle) {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "style-page", style: messageStyle});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "style-page!"});
	});
}
// 给 content script 发送信息
var html = function(messageHtml) {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "html-page", html: messageHtml});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "html-page!"});
	});
}

//devtools的load-dom回调
var loadDom = function(){
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "load-dom"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "load-dom!"});
	});
}
