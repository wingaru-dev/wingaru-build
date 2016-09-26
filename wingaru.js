String.prototype.plural=function(e){var n={"(quiz)$":"$1zes","^(ox)$":"$1en","([m|l])ouse$":"$1ice","(matr|vert|ind)ix|ex$":"$1ices","(x|ch|ss|sh)$":"$1es","([^aeiouy]|qu)y$":"$1ies","(hive)$":"$1s","(?:([^f])fe|([lr])f)$":"$1$2ves","(shea|lea|loa|thie)f$":"$1ves",sis$:"ses","([ti])um$":"$1a","(tomat|potat|ech|her|vet)o$":"$1oes","(bu)s$":"$1ses","(alias)$":"$1es","(octop)us$":"$1i","(ax|test)is$":"$1es","(us)$":"$1es","([^s]+)$":"$1s"},i={"(quiz)zes$":"$1","(matr)ices$":"$1ix","(vert|ind)ices$":"$1ex","^(ox)en$":"$1","(alias)es$":"$1","(octop|vir)i$":"$1us","(cris|ax|test)es$":"$1is","(shoe)s$":"$1","(o)es$":"$1","(bus)es$":"$1","([m|l])ice$":"$1ouse","(x|ch|ss|sh)es$":"$1","(m)ovies$":"$1ovie","(s)eries$":"$1eries","([^aeiouy]|qu)ies$":"$1y","([lr])ves$":"$1f","(tive)s$":"$1","(hive)s$":"$1","(li|wi|kni)ves$":"$1fe","(shea|loa|lea|thie)ves$":"$1f","(^analy)ses$":"$1sis","((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$":"$1$2sis","([ti])a$":"$1um","(n)ews$":"$1ews","(h|bl)ouses$":"$1ouse","(corpse)s$":"$1","(us)es$":"$1",s$:""},t={move:"moves",foot:"feet",goose:"geese",sex:"sexes",child:"children",man:"men",tooth:"teeth",person:"people"},r=["sheep","fish","deer","series","species","money","rice","information","equipment"];if(r.indexOf(this.toLowerCase())>=0)return this;for(word in t){if(e)var o=new RegExp(t[word]+"$","i"),a=word;else var o=new RegExp(word+"$","i"),a=t[word];if(o.test(this))return this.replace(o,a)}if(e)var s=i;else var s=n;for(reg in s){var o=new RegExp(reg,"i");if(o.test(this))return this.replace(o,s[reg])}return this};var wingaru=wingaru||{};wingaru.game={},wingaru.config=function(){return{displayLog:!0,gameUrl:"http://s3-ap-southeast-2.amazonaws.com/demos.wingaru.com.au/",apiUrl:"http://dev-api.wingaru.com.au/",containerId:"wingaru-container",logId:"wingaru-log",mode:"prod"}}(),wingaru.util=function(){function e(){if(wingaru.config.displayLog){var e=Array.prototype.slice.call(arguments);e.map(function(e){console.log("Wingaru Log: ",e)}),console.log("\n")}}function n(){delete window.localStorage["wingaru.token"]}function i(e){window.localStorage["wingaru.isAuthed"]="true",window.localStorage["wingaru.token"]=e}function t(){return window.localStorage["wingaru.token"]}return{setToken:i,getToken:t,destroyToken:n,log:e}}(),wingaru.auth=function(){function e(e){var n=$.Deferred();return wingaru.api.request("POST","global/authenticate",e).done(function(e){e.status?(wingaru.util.setToken(e.token),n.resolve(e)):(wingaru.util.log("Authentication Failed"),n.reject(e))}),n.promise()}function n(){var e=window.localStorage["wingaru.isAuthed"];return"true"==e}function i(){var e=$.Deferred();try{delete window.localStorage["wingaru.isAuthed"],delete window.localStorage["wingaru.token"],delete window.localStorage["wingaru.profile"],e.resolve(!0)}catch(n){e.reject(n)}return e.promise()}function t(){var e=$.Deferred();if($profile=window.localStorage["wingaru.profile"],"undefined"!=$profile&&void 0!=$profile)try{$profile=JSON.parse($profile),e.resolve($profile)}catch(n){e.reject(n)}else wingaru.api.requestWithToken("GET","global/profile").done(function(n){n.status?(window.localStorage["wingaru.profile"]=JSON.stringify(n.profile),e.resolve(n.profile)):e.reject(n)});return e.promise()}return{login:e,logout:i,isAuthed:n,getUser:t}}(),wingaru.api=function(){function e(e,n,i){return $.ajax({method:e||"GET",data:i||{},url:wingaru.config.apiUrl+n,dataType:"json"})}function n(e,n,i){return $.ajax({method:e||"GET",data:i||{},url:wingaru.config.apiUrl+n,headers:{"X-Request-Token":wingaru.util.getToken()},dataType:"json"})}function i(e,n){function i(n){return"boolean"==typeof n&&0==n?e:e.plural()}function t(e,n){return wingaru.api.requestWithToken("GET",i(n),e||{})}function r(n){return wingaru.api.requestWithToken("GET",e+"/"+n,{})}function o(n,i){return wingaru.api.requestWithToken(n,e+"/"+i,{})}function a(e,n){return wingaru.api.requestWithToken("POST",i(n),e||{})}function s(n,i){return wingaru.api.requestWithToken("PUT",e+"/"+n,i||{})}function u(n,i){return wingaru.api.requestWithToken("DELETE",e+"/"+n,i||{})}return{all:t,get:r,custom:o,create:a,update:s,remove:u}}return{request:e,requestWithToken:n,createResource:i}}(),wingaru.game={},wingaru.games=function(){function e(e,n){return credentials}function n(e,n,i){return!0}function i(e,n,i,t,r,o){return wingaru.game=new Phaser.Game(800,600,Phaser.AUTO,i||wingaru.config.containerId),load.js("http://localhost:9000/games/quiz.js",function(){wingaru.game.state.start(n)}),m[e]={gameId:e,assignmentId:r,uri:o},wingaru.game}function t(e){return"object"==typeof m[e]?m[e]:(console.log("Game Not Found"),!1)}function r(e){if(wingaru.auth.isAuthed())return{score:"98"}}function o(e){if(wingaru.auth.isAuthed())return[{name:"John Doe",score:"98"}]}function a(e,n){if(wingaru.auth.isAuthed())return{score:"98"}}function s(e,n){if(wingaru.auth.isAuthed())return[{score:"98"}]}function u(e,n){callbacks[e]=n}function l(e,n){}function c(){$args=Array.prototype.slice.call(arguments),$name=$args.shift(),callbacks[$name].apply(this,$args)}function g(e,n){config=wingaru.games.getConfig(e),n.apply(this,[callbacks.init(config)])}function $(e,n,i){i.apply(this,[callbacks.next(e,n)])}function f(e,n,i){callbacks.started(m[e],n,i)}function d(e,n,i){callbacks.leveled(m[e],n,i)}function w(e,n,i){callbacks.completed(m[e],n,i)}function h(e,n){callbacks.flash(e,n)}function p(e,n,i){callbacks.achieved(m[e],n,i)}var m={};return callbacks={next:function(){},init:function(){},started:function(){},leveled:function(){},completed:function(){},flash:function(){},achieved:function(){}},{add:i,getKey:e,setKey:n,getConfig:t,setEvent:u,callEvent:c,setDimension:l,getHighScore:r,getLeaderBoard:o,getMyHighScore:a,getMyPreviousScores:s,on:{callInitialized:g,callStarted:f,callLeveled:d,callCompleted:w,callFlash:h,callAchieved:p,callNext:$}}}();