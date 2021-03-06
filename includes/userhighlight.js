// ==UserScript==
// @include http://boards.endoftheinter.net/showmessages*
// @include https://boards.endoftheinter.net/showmessages*
// @include http://boards.endoftheinter.net/showtopics*
// @include https://boards.endoftheinter.net/showtopics*
// ==/UserScript==
/*
chrome.extension.sendRequest({need: "chromeLL_userhighlighton"}, function(response) {
  if(response.data == "true"){
  //document.addEventListener('DOMNodeInserted', reupdate, false);
  chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
    userhl(response.data);
});
}
});*/
window.addEventListener('DOMContentLoaded', function() {
	opera.extension.onmessage = function(event){
	  	if(event.data == "true"){
			opera.extension.postMessage('chromeLL_userhighlight');
		}
		if(event.data != 'true' && event.data != 'false'){
			userhl(event.data);
			window.localStorage.setItem('chromeLL_userhighlight', event.data);
		}
	};
	opera.extension.postMessage('chromeLL_userhighlighton');
}, false);
function userhl_init(){
    chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
        userhl(response.data);
    });
}
function reupdate(e){
    try{
        e.target.getElementsByClassName("message-top");
        if(e.target.getElementsByClassName("message-top").item(0) != null){
                userhl(window.localStorage.getItem('chromeLL_userhighlight'));
        }
    }catch(e){
        //return 0;
    }/*
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
            userhl(response.data);
		});
	}*/
}
function userhl(ulist){
var over = ulist.split(';');
var users = new Array();
var colors = new Array();
var textc = new Array();
var userstring = '';
for(var q = 0; over[q]; q++){
	users[q] = over[q].split(':')[0].toLowerCase();
	userstring += " " + over[q].split(':')[0].toLowerCase();
	colors[q] = over[q].split(':')[1].toLowerCase();
	textc[q] = over[q].split(':')[2].toLowerCase();
}
//console.log(users);
//console.log(colors);
//console.log("users to highlight: " + userstring);
var w = "" + window.location;
var index;
if(w.indexOf("showtopics") != -1){
	//window.opera.postError("test");
	var g = document.getElementsByTagName('tr');
	var tc = '';
	for(var i = 1; g[i]; i++){
        	index = -1;
		tc = g[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML.toLowerCase();
        // check if user is in highlight string before finding color
		if(userstring.indexOf(tc) != -1){
			for(var e = 0; users[e]; e++){
				if(users[e] == tc){
					index = e;
					//window.opera.postError("found tc to highlight: " + e);
				}
			}
            if(index != -1){
                for(var s = 0; g[i].getElementsByTagName('td')[s]; s++){
                    g.item(i).getElementsByTagName('td')[s].style.background = "#" + colors[index];
                    //window.opera.postError("highlighing tc \"" + tc + "\" color " + colors[index] + " section " + s);
                }
            }
		}
	}
}
if(w.indexOf("showmessages") != -1){
    try{
	var s = document.getElementsByClassName('message-container');
	var tc;
	for(var i = 0; s.item(i); i++){
		for(var y = 0; s[i].getElementsByClassName('message-top')[y]; y++){
			tc = s[i].getElementsByClassName('message-top')[y].getElementsByTagName('a').item(0).innerHTML.toLowerCase();
			try{
				for(var e = 0; users[e]; e++){
					if(users[e] == tc){
						s[i].getElementsByClassName('message-top')[y].style.background = "#" + colors[e];
						s[i].getElementsByClassName('message-body')[y].style.color = "#" + textc[e];
						//console.log("found tc to highlight: " + e);
					}
				}
			}catch(e){}
		}
		//s.item(i).style.background = "#" + colors[index];
		//document.getElementsByClassName('message')[i].style.color = '#' + textc[index];
		//console.log("(topic) " + i + " - " + tc);
	}
    }catch(e){console.log('userhl died ' + e);}
}
if(w.indexOf("main.php") != -1){
	var g = document.getElementsByTagName('tr');
	var tc = '';
	for(var i = 2; g.item(i); i++){
		tc = g.item(i).getElementsByTagName('td').item(1).getElementsByTagName('a').item(0).innerHTML.toLowerCase();
		if(userstring.indexOf(tc) != -1){
			for(var e = 0; users[e]; e++){
				if(users[e] == tc){
					index = e;
					//console.log("found tc to highlight: " + e);
				}
			}
			for(var s = 0; g.item(i).getElementsByTagName('td').item(s); s++){
				g.item(i).getElementsByTagName('td').item(s).style.background = "#" + colors[index];
				//console.log("highlighing tc \"" + tc + "\" color " + colors[index] + " section " + s);
			}
		}
		//console.log("(homepage) " + i + " - " + tc + " (" + userstring.indexOf(tc) + ")");
	}
}
document.addEventListener('DOMNodeInserted', reupdate /*function(event){ update_hl(ulist, event) }*/, false);
}
function update_hl(ul, e){/*
	try{e.target.getElementsByClassName("message-top").item(0);}
	catch (e){
        console.log('userhl update dying: ' + e);
		return 0;
	}
	var over = ul.split(';');
	var users = new Array();
	var colors = new Array();
	var userstring = '';
	for(var q = 0; over[q]; q++){
		users[q] = over[q].split(':')[0].toLowerCase();
		colors[q] = over[q].split(':')[1].toLowerCase();
	}
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		var es = e.target.getElementsByClassName("message-top");
		var s = es.item(0);
		//console.log(s.getElementsByTagName('a').item(0).innerHTML);
		for(var index = 0; users[index]; index++){
			if(s.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == users[index]){
				s.style.background = colors[index];
			}
		}
	}*/
    //userhl(ul);
}
