String.prototype.plural=function(e){var t={"(quiz)$":"$1zes","^(ox)$":"$1en","([m|l])ouse$":"$1ice","(matr|vert|ind)ix|ex$":"$1ices","(x|ch|ss|sh)$":"$1es","([^aeiouy]|qu)y$":"$1ies","(hive)$":"$1s","(?:([^f])fe|([lr])f)$":"$1$2ves","(shea|lea|loa|thie)f$":"$1ves",sis$:"ses","([ti])um$":"$1a","(tomat|potat|ech|her|vet)o$":"$1oes","(bu)s$":"$1ses","(alias)$":"$1es","(octop)us$":"$1i","(ax|test)is$":"$1es","(us)$":"$1es","([^s]+)$":"$1s"},n={"(quiz)zes$":"$1","(matr)ices$":"$1ix","(vert|ind)ices$":"$1ex","^(ox)en$":"$1","(alias)es$":"$1","(octop|vir)i$":"$1us","(cris|ax|test)es$":"$1is","(shoe)s$":"$1","(o)es$":"$1","(bus)es$":"$1","([m|l])ice$":"$1ouse","(x|ch|ss|sh)es$":"$1","(m)ovies$":"$1ovie","(s)eries$":"$1eries","([^aeiouy]|qu)ies$":"$1y","([lr])ves$":"$1f","(tive)s$":"$1","(hive)s$":"$1","(li|wi|kni)ves$":"$1fe","(shea|loa|lea|thie)ves$":"$1f","(^analy)ses$":"$1sis","((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$":"$1$2sis","([ti])a$":"$1um","(n)ews$":"$1ews","(h|bl)ouses$":"$1ouse","(corpse)s$":"$1","(us)es$":"$1",s$:""},r={move:"moves",foot:"feet",goose:"geese",sex:"sexes",child:"children",man:"men",tooth:"teeth",person:"people"},i=["sheep","fish","deer","series","species","money","rice","information","equipment"];if(i.indexOf(this.toLowerCase())>=0)return this;for(word in r){if(e)var a=new RegExp(r[word]+"$","i"),o=word;else var a=new RegExp(word+"$","i"),o=r[word];if(a.test(this))return this.replace(a,o)}if(e)var s=n;else var s=t;for(reg in s){var a=new RegExp(reg,"i");if(a.test(this))return this.replace(a,s[reg])}return this};var wingaru=wingaru||{};wingaru.config=function(){var e="http://s3-ap-southeast-2.amazonaws.com/",t="demos.wingaru.com.au/",n="icon.wingaru.com.au/";return{displayLog:!0,assetsUrl:e+t,apiUrl:"http://dev-api.wingaru.com.au/",scriptUrl:"",containerId:"wingaru-game",mode:"live",iconUrl:function(t){return e+n+t+".png"},contentUrl:function(n,r){return e+t+n+r}}}(),wingaru.util=function(){function e(){if(wingaru.config.displayLog){var e=Array.prototype.slice.call(arguments);e.map(function(e){console.log("Wingaru Log: ",e)})}}function t(e,t){return"undefined"!=typeof window.localStorage[e]?JSON.parse(window.localStorage[e]):t}function n(e,t){window.localStorage[e]=JSON.stringify(t)}function r(){delete window.localStorage["wingaru.token"]}function i(e){window.localStorage["wingaru.isAuthed"]="true",window.localStorage["wingaru.token"]=e}function a(){return window.localStorage["wingaru.token"]}return{destroyToken:r,setToken:i,getToken:a,getData:t,setData:n,log:e}}(),wingaru.auth=function(){function e(e){var t=$.Deferred();return wingaru.api.request("POST","global/authenticate",e).done(function(e){e.status?(wingaru.util.setToken(e.token),t.resolve(e)):(wingaru.util.log("Authentication Failed"),t.reject(e))}),t.promise()}function t(){var e=window.localStorage["wingaru.isAuthed"];return"true"==e}function n(){var e=$.Deferred();try{delete window.localStorage["wingaru.isAuthed"],delete window.localStorage["wingaru.token"],delete window.localStorage["wingaru.profile"],e.resolve(!0)}catch(t){e.reject(t)}return e.promise()}function r(){var e=$.Deferred();if($profile=window.localStorage["wingaru.profile"],"undefined"!=$profile&&void 0!=$profile)try{$profile=JSON.parse($profile),e.resolve($profile)}catch(t){e.reject(t)}else wingaru.api.requestWithToken("GET","global/profile").done(function(t){t.status?(window.localStorage["wingaru.profile"]=JSON.stringify(t.profile),e.resolve(t.profile)):e.reject(t)});return e.promise()}return{login:e,logout:n,isAuthed:t,getUser:r}}(),wingaru.api=function(){function e(e,t,n){return $.ajax({method:e||"GET",data:n||{},url:wingaru.config.apiUrl+t,dataType:"json"})}function t(e,t,n){return $.ajax({method:e||"GET",data:n||{},url:wingaru.config.apiUrl+t,headers:{"X-Request-Token":wingaru.util.getToken()},dataType:"json"})}function n(e,t){function n(t){return"boolean"==typeof t&&0==t?e:e.plural()}function r(e,t){return wingaru.api.requestWithToken("GET",n(t),e||{})}function i(t){return wingaru.api.requestWithToken("GET",e+"/"+t,{})}function a(t,n){return wingaru.api.requestWithToken(t,e+"/"+n,{})}function o(e,t){return wingaru.api.requestWithToken("POST",n(t),e||{})}function s(t,n){return wingaru.api.requestWithToken("PUT",e+"/"+t,n||{})}function u(t,n){return wingaru.api.requestWithToken("DELETE",e+"/"+t,n||{})}return{all:r,get:i,custom:a,create:o,update:s,remove:u}}return{request:e,requestWithToken:t,createResource:n}}(),wingaru.game={},wingaru.games=function(){function e(e,t){if("object"==typeof e)for(var n in e)d[n]=e[n];else d[e]=t}function t(e,t,n,r){switch(wingaru.game=new Phaser.Game(d.width,d.height,Phaser.AUTO,n||wingaru.config.containerId,d.state,d.transparent,d.antialias,d.physicsConfig),wingaru.config.mode){case"local":wingaru.config.assetsUrl="",wingaru.config.scriptUrl="games/"+e+".js";break;case"live":wingaru.config.assetsUrl="http://s3-ap-southeast-2.amazonaws.com/demos.wingaru.com.au/"+e+"/",wingaru.config.scriptUrl=wingaru.config.assetsUrl+"assets/js/scripts.js"}return""!=wingaru.config.mode&&load.js(wingaru.config.scriptUrl,function(){wingaru.game.state.start(t)}),wingaru.util.setData("wingaru:game:id",e),wingaru.util.setData(e,{gameId:e,startState:t,div:n,transparent:r}),wingaru.game}function n(e){return window.localStorage[e]}function r(e,t){m[e]=t}function i(){$args=Array.prototype.slice.call(arguments),$name=$args.shift(),m[$name].apply(this,$args)}function a(e,t){config=wingaru.games.getConfig(e),t.apply(this,[m.init(config)])}function o(e,t,n){n.apply(this,[m.next(e,t)])}function s(e,t){y[e]=value,m.toolbar(e,t)}function u(e){return"undefined"!=typeof e?"undefined"!=typeof y[e]&&y[e]:y}function o(e){$args=Array.prototype.slice.call(arguments),m.next.apply(this,$args)}function l(e){$args=Array.prototype.slice.call(arguments),m.home.apply(this,$args)}function c(e,t){m.change(e,t)}function g(e){$args=Array.prototype.slice.call(arguments),m.started.apply(this,$args)}function f(e){$args=Array.prototype.slice.call(arguments),m.leveled.apply(this,$args)}function p(e){$args=Array.prototype.slice.call(arguments),m.completed.apply(this,$args)}function $(e){$args=Array.prototype.slice.call(arguments),m.flash.apply(this,$args)}function w(e){$args=Array.prototype.slice.call(arguments),m.achieved.apply(this,$args)}function h(e){$args=Array.prototype.slice.call(arguments),m.store.apply(this,$args)}var d={width:800,height:600,state:null,transparent:!1,antialias:!0,physicsConfig:null},y={progress:0,timer:6e4,home:!0,next:!0},m={init:function(){},started:function(){},leveled:function(){},completed:function(){},flash:function(){},achieved:function(){},store:function(){},toolbar:function(){},next:function(){},home:function(){},change:function(){}};return{add:t,setPhaserConfig:e,getConfig:n,setEvent:r,callEvent:i,getToolbar:u,on:{callNext:o,callHome:l,callChange:c,callInitialized:a,callStarted:g,callLeveled:f,callCompleted:p,callFlash:$,callAchieved:w,callStore:h,updateToolbar:s}}}(),wingaru.items=function(){function e(e){u=e,l=0}function t(){return u||[]}function n(e,t){"undefined"!=typeof r()&&("object"==typeof e?u[l]=e:u[l][e]=t)}function r(){return u[l]}function i(){l=0}function a(){return l+=1}function o(){return("object"==typeof u||"array"==typeof u)&&u.length>=l+1}function s(){console.log("Cleared items"),u=[],l=0}var u,l;return{reset:i,clearAll:s,setAll:e,getAll:t,getCurrent:r,updateCurrent:n,moveToNext:a,hasNext:o}}(),wingaru.stats=function(){function e(e){if(wingaru.auth.isAuthed())return{score:"98"}}function t(e){if(wingaru.auth.isAuthed())return[{name:"John Doe",score:"98"}]}function n(e,t){if(wingaru.auth.isAuthed())return{score:"98"}}function r(e,t){if(wingaru.auth.isAuthed())return[{score:"98"}]}return{getHighScore:e,getLeaderBoard:t,getMyHighScore:n,getMyPreviousScores:r}}();