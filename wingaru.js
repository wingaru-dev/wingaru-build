String.prototype.plural=function(e){var n={"(quiz)$":"$1zes","^(ox)$":"$1en","([m|l])ouse$":"$1ice","(matr|vert|ind)ix|ex$":"$1ices","(x|ch|ss|sh)$":"$1es","([^aeiouy]|qu)y$":"$1ies","(hive)$":"$1s","(?:([^f])fe|([lr])f)$":"$1$2ves","(shea|lea|loa|thie)f$":"$1ves",sis$:"ses","([ti])um$":"$1a","(tomat|potat|ech|her|vet)o$":"$1oes","(bu)s$":"$1ses","(alias)$":"$1es","(octop)us$":"$1i","(ax|test)is$":"$1es","(us)$":"$1es","([^s]+)$":"$1s"},i={"(quiz)zes$":"$1","(matr)ices$":"$1ix","(vert|ind)ices$":"$1ex","^(ox)en$":"$1","(alias)es$":"$1","(octop|vir)i$":"$1us","(cris|ax|test)es$":"$1is","(shoe)s$":"$1","(o)es$":"$1","(bus)es$":"$1","([m|l])ice$":"$1ouse","(x|ch|ss|sh)es$":"$1","(m)ovies$":"$1ovie","(s)eries$":"$1eries","([^aeiouy]|qu)ies$":"$1y","([lr])ves$":"$1f","(tive)s$":"$1","(hive)s$":"$1","(li|wi|kni)ves$":"$1fe","(shea|loa|lea|thie)ves$":"$1f","(^analy)ses$":"$1sis","((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$":"$1$2sis","([ti])a$":"$1um","(n)ews$":"$1ews","(h|bl)ouses$":"$1ouse","(corpse)s$":"$1","(us)es$":"$1",s$:""},t={move:"moves",foot:"feet",goose:"geese",sex:"sexes",child:"children",man:"men",tooth:"teeth",person:"people"},o=["sheep","fish","deer","series","species","money","rice","information","equipment"];if(o.indexOf(this.toLowerCase())>=0)return this;for(word in t){if(e)var r=new RegExp(t[word]+"$","i"),a=word;else var r=new RegExp(word+"$","i"),a=t[word];if(r.test(this))return this.replace(r,a)}if(e)var s=i;else var s=n;for(reg in s){var r=new RegExp(reg,"i");if(r.test(this))return this.replace(r,s[reg])}return this};var wingaru=wingaru||{};wingaru.config=function(){return{displayLog:!0,gameUrl:"http://s3-ap-southeast-2.amazonaws.com/demos.wingaru.com.au/",apiUrl:"http://dev-api.wingaru.com.au/",containerId:"wingaru-container",logId:"wingaru-log",mode:"prod"}}(),wingaru.util=function(){function e(){if(wingaru.config.displayLog){var e=Array.prototype.slice.call(arguments);e.map(function(e){console.log("Wingaru Log: ",e)}),console.log("\n")}}function n(){delete window.localStorage["wingaru.token"]}function i(e){window.localStorage["wingaru.isAuthed"]="true",window.localStorage["wingaru.token"]=e}function t(){return window.localStorage["wingaru.token"]}return{setToken:i,getToken:t,destroyToken:n,log:e}}(),wingaru.auth=function(){function e(e){var n=$.Deferred();return wingaru.api.request("POST","global/authenticate",e).done(function(e){e.status?(wingaru.util.setToken(e.token),n.resolve(e)):(wingaru.util.log("Authentication Failed"),n.reject(e))}),n.promise()}function n(){var e=window.localStorage["wingaru.isAuthed"];return"true"==e}function i(){var e=$.Deferred();try{delete window.localStorage["wingaru.isAuthed"],delete window.localStorage["wingaru.token"],delete window.localStorage["wingaru.profile"],e.resolve(!0)}catch(n){e.reject(n)}return e.promise()}function t(){var e=$.Deferred();if($profile=window.localStorage["wingaru.profile"],"undefined"!=$profile&&void 0!=$profile)try{$profile=JSON.parse($profile),e.resolve($profile)}catch(n){e.reject(n)}else wingaru.api.requestWithToken("GET","global/profile").done(function(n){n.status?(window.localStorage["wingaru.profile"]=JSON.stringify(n.profile),e.resolve(n.profile)):e.reject(n)});return e.promise()}return{login:e,logout:i,isAuthed:n,getUser:t}}(),wingaru.api=function(){function e(e,n,i){return $.ajax({method:e||"GET",data:i||{},url:wingaru.config.apiUrl+n,dataType:"json"})}function n(e,n,i){return $.ajax({method:e||"GET",data:i||{},url:wingaru.config.apiUrl+n,headers:{"X-Request-Token":wingaru.util.getToken()},dataType:"json"})}function i(e,n){function i(n){return"boolean"==typeof n&&0==n?e:e.plural()}function t(e,n){return wingaru.api.requestWithToken("GET",i(n),e||{})}function o(n){return wingaru.api.requestWithToken("GET",e+"/"+n,{})}function r(e,n){return wingaru.api.requestWithToken("POST",i(n),e||{})}function a(n,i){return wingaru.api.requestWithToken("PUT",e+"/"+n,i||{})}function s(n,i){return wingaru.api.requestWithToken("DELETE",e+"/"+n,i||{})}return{all:t,get:o,create:r,update:a,remove:s}}return{request:e,requestWithToken:n,createResource:i}}(),wingaru.games=function(){function e(e){T=document.createElement("iframe"),T.style.width="100%",T.style.height="100%",T.style.display="none",T.style.borderWidth="0px",T.style.display="block",document.getElementById(e||wingaru.config.containerId).appendChild(T)}function n(e,n){return credentials}function i(e,n,i){return!0}function t(e,n,i,t,o){if(E[e]={gameId:e,assignmentId:n,uri:i,startState:t,div:wingaru.config.containerId,config:{}},void 0!=typeof T){if(document.getElementById(wingaru.config.logId).innerHTML=e,"dev"==wingaru.config.mode)var r=wingaru.config.gameUrl+e+".html";else var r=wingaru.config.gameUrl+e+"/index.html";return T.src=r,wingaru.config.containerId}}function o(e){return"object"==typeof E[e]?E[e]:void console.log("Game Not Found")}function r(e){return{score:"98"}}function a(e){return[{name:"John Doe",score:"98"}]}function s(e,n){return{score:"98"}}function u(e,n){return[{score:"98"}]}function l(e,n){config=wingaru.games.getConfig(e),n.apply(this,[callbacks.init(config)])}function c(e,n){n.apply(this,[callbacks.listen(e)])}function g(e,n){callbacks[e]=n}function f(e,n){}function d(){return"object"==typeof window.top.wingaru}function $(){$args=Array.prototype.slice.call(arguments),$name=$args.shift(),callbacks[$name].apply(this,$args)}function w(e,n,i){var t=E[e];callbacks.started(t),d()&&window.top.wingaru.games.callEvent("started",e,n,i)}function p(e,n,i){E[e];callbacks.leveled(),d()&&window.top.wingaru.games.callEvent("leveled",e,n,i)}function h(e,n,i){E[e];callbacks.completed(),d()&&window.top.wingaru.games.callEvent("completed",e,n,i)}function m(e,n){callbacks.flash(),d()&&window.top.wingaru.games.callEvent("flash",e,n)}function v(e,n,i){E[e];callbacks.achieved(),d()&&window.top.wingaru.games.callEvent("achieved",e,n,i)}function y(e,n){d()&&window.top.wingaru.games.callEvent("initialized",e,n)}function k(e,n){d()&&window.top.wingaru.games.callEvent("listened",e,n)}var T,E={};return callbacks={initialized:l,listened:c,listen:function(){},init:function(){},started:function(){},leveled:function(){},completed:function(){},flash:function(){},achieved:function(){}},{add:t,getKey:n,setKey:i,getConfig:o,setEvent:g,callEvent:$,setDimension:f,createFrame:e,getHighScore:r,getLeaderBoard:a,getMyHighScore:s,getMyPreviousScores:u,on:{callInitialized:y,callStarted:w,callLeveled:p,callCompleted:h,callFlash:m,callAchieved:v,callListener:k}}}();