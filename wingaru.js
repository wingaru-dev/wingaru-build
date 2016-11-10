String.prototype.plural=function(e){var t={"(quiz)$":"$1zes","^(ox)$":"$1en","([m|l])ouse$":"$1ice","(matr|vert|ind)ix|ex$":"$1ices","(x|ch|ss|sh)$":"$1es","([^aeiouy]|qu)y$":"$1ies","(hive)$":"$1s","(?:([^f])fe|([lr])f)$":"$1$2ves","(shea|lea|loa|thie)f$":"$1ves",sis$:"ses","([ti])um$":"$1a","(tomat|potat|ech|her|vet)o$":"$1oes","(bu)s$":"$1ses","(alias)$":"$1es","(octop)us$":"$1i","(ax|test)is$":"$1es","(us)$":"$1es","([^s]+)$":"$1s"},i={"(quiz)zes$":"$1","(matr)ices$":"$1ix","(vert|ind)ices$":"$1ex","^(ox)en$":"$1","(alias)es$":"$1","(octop|vir)i$":"$1us","(cris|ax|test)es$":"$1is","(shoe)s$":"$1","(o)es$":"$1","(bus)es$":"$1","([m|l])ice$":"$1ouse","(x|ch|ss|sh)es$":"$1","(m)ovies$":"$1ovie","(s)eries$":"$1eries","([^aeiouy]|qu)ies$":"$1y","([lr])ves$":"$1f","(tive)s$":"$1","(hive)s$":"$1","(li|wi|kni)ves$":"$1fe","(shea|loa|lea|thie)ves$":"$1f","(^analy)ses$":"$1sis","((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$":"$1$2sis","([ti])a$":"$1um","(n)ews$":"$1ews","(h|bl)ouses$":"$1ouse","(corpse)s$":"$1","(us)es$":"$1",s$:""},n={move:"moves",foot:"feet",goose:"geese",sex:"sexes",child:"children",man:"men",tooth:"teeth",person:"people"},a=["sheep","fish","deer","series","species","money","rice","information","equipment"];if(a.indexOf(this.toLowerCase())>=0)return this;for(word in n){if(e)var r=new RegExp(n[word]+"$","i"),o=word;else var r=new RegExp(word+"$","i"),o=n[word];if(r.test(this))return this.replace(r,o)}if(e)var s=i;else var s=t;for(reg in s){var r=new RegExp(reg,"i");if(r.test(this))return this.replace(r,s[reg])}return this};var wingaru=wingaru||{};wingaru.url="http://s3-ap-southeast-2.amazonaws.com/demos.wingaru.com.au/",wingaru.config=function(){return{displayLog:!0,assetsUrl:"http://s3-ap-southeast-2.amazonaws.com/demos.wingaru.com.au/",apiUrl:"http://dev-api.wingaru.com.au/",containerId:"wingaru-game",mode:"live"}}(),wingaru.util=function(){function e(){if(wingaru.config.displayLog){var e=Array.prototype.slice.call(arguments);e.map(function(e){console.log("Wingaru Log: ",e)})}}function t(e,t){return"undefined"==typeof window.localStorage[e]?JSON.parse(window.localStorage[e]):t}function i(e,t){window.localStorage[e]=JSON.stringify(t)}function n(){delete window.localStorage["wingaru.token"]}function a(e){window.localStorage["wingaru.isAuthed"]="true",window.localStorage["wingaru.token"]=e}function r(){return window.localStorage["wingaru.token"]}return{destroyToken:n,setToken:a,getToken:r,getData:t,setData:i,log:e}}(),wingaru.auth=function(){function e(e){var t=$.Deferred();return wingaru.api.request("POST","global/authenticate",e).done(function(e){e.status?(wingaru.util.setToken(e.token),t.resolve(e)):(wingaru.util.log("Authentication Failed"),t.reject(e))}),t.promise()}function t(){var e=window.localStorage["wingaru.isAuthed"];return"true"==e}function i(){var e=$.Deferred();try{delete window.localStorage["wingaru.isAuthed"],delete window.localStorage["wingaru.token"],delete window.localStorage["wingaru.profile"],e.resolve(!0)}catch(t){e.reject(t)}return e.promise()}function n(){var e=$.Deferred();if($profile=window.localStorage["wingaru.profile"],"undefined"!=$profile&&void 0!=$profile)try{$profile=JSON.parse($profile),e.resolve($profile)}catch(t){e.reject(t)}else wingaru.api.requestWithToken("GET","global/profile").done(function(t){t.status?(window.localStorage["wingaru.profile"]=JSON.stringify(t.profile),e.resolve(t.profile)):e.reject(t)});return e.promise()}return{login:e,logout:i,isAuthed:t,getUser:n}}(),wingaru.api=function(){function e(e,t,i){return $.ajax({method:e||"GET",data:i||{},url:wingaru.config.apiUrl+t,dataType:"json"})}function t(e,t,i){return $.ajax({method:e||"GET",data:i||{},url:wingaru.config.apiUrl+t,headers:{"X-Request-Token":wingaru.util.getToken()},dataType:"json"})}function i(e,t){function i(t){return"boolean"==typeof t&&0==t?e:e.plural()}function n(e,t){return wingaru.api.requestWithToken("GET",i(t),e||{})}function a(t){return wingaru.api.requestWithToken("GET",e+"/"+t,{})}function r(t,i){return wingaru.api.requestWithToken(t,e+"/"+i,{})}function o(e,t){return wingaru.api.requestWithToken("POST",i(t),e||{})}function s(t,i){return wingaru.api.requestWithToken("PUT",e+"/"+t,i||{})}function u(t,i){return wingaru.api.requestWithToken("DELETE",e+"/"+t,i||{})}return{all:n,get:a,custom:r,create:o,update:s,remove:u}}return{request:e,requestWithToken:t,createResource:i}}(),wingaru.game={},wingaru.games=function(){function e(e,t){if("object"==typeof e)for(var i in e)c[i]=e[i];else c[e]=t}function t(e,t,i,n){wingaru.game=new Phaser.Game(c.width,c.height,Phaser.AUTO,i||wingaru.config.containerId,c.state,c.transparent,c.antialias,c.physicsConfig);var a="";switch(wingaru.config.mode){case"local":wingaru.url="",a="games/"+e+".js";break;case"live":wingaru.url+=e+"/",a=wingaru.url+"assets/js/scripts.js"}return""!=wingaru.config.mode&&load.js(a,function(){wingaru.game.state.start(t)}),wingaru.util.setData("wingaru:game:id",e),wingaru.util.setData(e,{gameId:e,startState:t,div:i,transparent:n}),wingaru.game}function i(e){return window.localStorage[e]}function n(e,t){$[e]=t}function a(){$args=Array.prototype.slice.call(arguments),$name=$args.shift(),$[$name].apply(this,$args)}function r(e,t){config=wingaru.games.getConfig(e),t.apply(this,[$.init(config)])}function o(e,t){f[e]=value,$.toolbar(e,t)}function s(e){return"undefined"!=typeof e?"undefined"!=typeof f[e]&&f[e]:f}function u(e){wingaru.util.setData("wingaru:game:items",e),wingaru.util.setData("wingaru:game:itemIndex",0)}function l(){return wingaru.util.getData("wingaru:game:items",[])}function g(){return $index=wingaru.util.getData("wingaru:game:itemIndex",0),$items=wingaru.util.getData("wingaru:game:items",[]),$index+=1,wingaru.util.setData("wingaru:game.itemIndex",$index),$items[$index]}var c={width:800,height:600,state:null,transparent:!1,antialias:!0,physicsConfig:null},f={progress:0,timer:6e4,home:!0,next:!0},$={init:function(){},started:function(){},leveled:function(){},completed:function(){},flash:function(){},achieved:function(){},store:function(){},next:function(){},home:function(){},toolbar:function(){},changed:function(){}};return{add:t,setPhaserConfig:e,getConfig:i,setEvent:n,callEvent:a,getToolbar:s,setItems:u,getAllItems:l,getNextItem:g,on:{callNext:$.next,callHome:$.home,callInitialized:r,callStarted:$.started,callLeveled:$.leveled,callCompleted:$.completed,callFlash:$.flash,callAchieved:$.achieved,callStore:$.store,updateToolbar:o}}}();