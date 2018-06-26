// ==UserScript==
// @name 			WME Chat addon
// @description 	removes duplicates messages, formats link and permalinks, and some stuffs for the Waze Map Editor Chat
// @namespace 		dummyd2
// @grant 			none
// @version 		1.1.b1
// @icon			data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94DDg83H1XMMOAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEQ0lEQVRYw+2XTUhcVxTHf0+dwcxUHawuxImtH0hbBEebGLCFutGFgSaBriImoXRRBLciqYuKza4bN21dVFcJgouE2IKolIJYP0BmFCwKoyJxksyMTGZ0Zvpax3u6eW+YD40abTftH+7mvnfv/3/OPfecc+G/Du0ca2sBJ5Bv7BMDXgDr/6Tgz4CfgAAQAaIGcQzYB8KAH/gZuHVRpAXAbeAlIIDk5uaKzWZTRUVFUlxcLMXFxVJUVCQ2m03y8vLE/A/wAV8Aljc9gk+AB8BHABUVFTQ0NHDt2jWuXLlCbW0tZWVlKKXw+/14vV4WFxdZWFhgaWlJdnZ2zP0XgF7g17NY/qXhUrHb7aq/v195PB45DZRSsrKyIgMDA2K1Wk1vhAxvnAq3AR2QiooKtba2JkqpNILTIJFIyMbGhqqvr1eGiEOg6yTyauBPQOrq6lQikTgTaaYnRET8fr80NzcLoAzDPn6dgBlA6uvrVTgcfmPyTBHb29tSU1NjHscvgP0o8k8BcTgcanp6+tzkmSJmZ2dNAQcGVxZ+A+TmzZvnZz0GHR0dZjwMAdZU8hLgldVqVUNDQxdmfSZmZmZML2wAhZl3fr+goEBWV1ezXHiUmNMIzLw94XBY7Ha7KaIkJ0XAW0COxWKhqqoqPVtpGpqmMTw8zN27d3ny5Ely/uHDh9y5c4epqSmUUiilePz4Mffu3WNychJN0xCRtH2MYMxKhNeBmMPhkN3d3SxLxsfHpbCwUABxOp3i8Xhkfn4+mXbz8/MlEAiI1+tNzmmaJj6fL22fcDgsNTU1ZhyUpnrgBXB4cHAgq6urAEnlAJubm8TjcQACgQCRSIS1tbXkd13XCYVCbG1tJedEhPX19OKo6zper1cD/jISU1pdeJ6TkyN9fX1ZHvD5fNLa2ipOp1M6OzslGAxKNBqVlpYWKS8vl46ODonH4xKNRqW9vV2cTqfcuHEjKxZGRkZM62ePygXDgDQ1NalgMJi1OBQKidvtlkgkkvy2v78vHo9HYrFYcm5vb0+Wl5dF1/WsQKyurjYF3AdyMgWUmOc3ODiYFv2ZEX/czTjqFpj/9fT0pJbpD49LxQ9MEXNzc+oiMqCIyNjYmFgsFmXUg+9eVwvyzXrQ1NR0IeSPHj0Sh8Nhun4JePukingLEJfLda6sFwwGpaurS9nt9lTyd0/TD1w/j4BQKCS9vb1SWloqmqaZ5z4JlGYS5R1BbgM+B7h8+bLouq6Nj48zOjoqT58+1RKJBC6Xi7a2NmlsbNQqKys5PDzk2bNneDweJiYmcLvd5l7K6Kq+B74GEqex/r7ZvXR3d6urV6+qlCZTjA5YThgxwA18C7x/lnfBV8A3Keo1Y0SM8jkLxI2u6YNj3gW/G2+DdeD5WZrQFoMo05ofgXeOSBoWg/ySMfJf134fh9QYuAT8YVjzEvgBGAFeHbP2wBgXivcAF//jX8TfP8rg1M0AqeYAAAAASUVORK5CYII=
// @updateURL   	https://greasyfork.org/scripts/2103-wme-chat-addon/code/WME%20Chat%20addon.user.js
// @downloadURL 	https://greasyfork.org/scripts/2103-wme-chat-addon/code/WME%20Chat%20addon.user.js
// @include         https://www.waze.com/editor/*
// @include         https://www.waze.com/*/editor/*
// @include         https://editor-beta.waze.com/*
// @copyright   	2015, dummyd2
// ==/UserScript==


/*******
 * 
 * Many thanks to Pawel Pyrczak (aka tkr85) for his script chat jumper compatible with this script
 * 
 *  You are free to:
 *   Share, copy, and redistribute the script in any medium or format
 *   under the following terms:
 *   Attribution - You must give appropriate credit. You may do so in any
 *     reasonable manner, but not in any way that suggests the licensor
 *     endorses you or your use.
 * 
 *   NonCommercial - You may not use the script for commercial purposes.
 *
 *   NoModifications - You may NOT MODIFY the script.
 * 
 *  You are invited to contact the author: dummyd2 on waze forum for more details.
 * 
********/


function run_CA ()
{
    
    var ca_version="1.1.b1";
    var isDebug=false;
    var targetCount=0;
    var bipCount=0;
    var divPerma=null;
    var divChat=null;
    var doNotNotifyNext=false;
    var lastMessageFrom="";
    var hasUnreadMessages=false;
    var tts_audio=null;
    var tts_messages=[];
    var systemMessageDates=[];
    var userActivity={}; // { userName: { lastMove: timestamp, lastPosition: lonlat } }
    var sortUserListDisbled=false;
    var currentJumpSet=null;
    var selectDataWaitForMergeEnd=false;
    var roomForced=false;
    var socketReconnection=false;
    var lastRoomName=null;

    var icons={};    
    
    var translations={};
    // FRENCH
    translations.fr={};
    translations.fr['Error: Message background color must be a HTML format string\nwith exact length of 6 hexadecimal characters']="Erreur: la couleur de fond de message doit &ecirc;tre au format HTML\nsoit une suite de 6 caract&egrave;res hexad&eacute;cimaux";
    translations.fr['Error: Alert background color must be a HTML format string\nwith exact length of 6 hexadecimal characters']="Erreur: la couleur de fond d'alerte doit &ecirc;tre au format HTML\nsoit une suite de 6 caract&egrave;res hexad&eacute;cimaux";
    translations.fr['Error: bip pattern must contain {userName}']="Erreur: le mod&egrave;le de bip doit contenir {userName}";
    translations.fr['has joined']="est entr\351";
    translations.fr['has left']="est parti";
    translations.fr['Chat addon settings']="Options de chat addon";
    translations.fr['Play sound on new message']="Jouer un son &agrave; chaque nouveau message";
    translations.fr['Text to speech on messages']="Lecture des messages";
    translations.fr['language']="Langue";
    translations.fr['Text to speech on from username']="Texte &agrave; lire pour le nom d'exp&eacute;diteur";
    translations.fr['TTS from username']="TTS de l'exp&eacute;diteur";
    translations.fr['Text to speech on internet link']="Texte &agrave; lire pour un lien internet";
    translations.fr['TTS link to']="TTS lien vers";
    translations.fr['Show message date (uncheck for time only)']="Afficher la date (d&eacute;cocher pour l'heure seulement)";
    translations.fr['My message background color']="Couleur de fond de mes messages";
    translations.fr['Alert color']="Couleur d'alerte";
    translations.fr['words separated by a comma\nCase unsensitive\nBegin and end with $ to match exact word']="mots s&eacute;par&eacute;s par des virgules\nInsensible &agrave; la casse\nCommencer et finir par un $ pour capter le mot exact";
    translations.fr['eg']="ex";
    translations.fr['or']="ou";
    translations.fr['userNameOfAFriend,$unlock$']="nomdunamis,$d&eacute;lock$";
    translations.fr['Alert match']="Alerte sur";
    translations.fr['Play sound on new alert']="Jouer un son sur l'alerte";
    translations.fr['Remove messages of users not in the users list of the room']="Supprimer les messages des utilisateurs hors tchat";
    translations.fr['{userName} will be replaced by the user\'s name you click on\n\nEg:\nHey {userName}, come here please!\nor\n@{userName}?']="{userName} sera remplac&eacute; par le nom de l'utilisateur que vous aurez cliqu&eacute;\n\nEx:\nSalut {userName}, tu peux venir ici STP!\nou\n@{userName}?";
    translations.fr['Bip pattern (must contain {userName})']="Mod&egrave;le pour le bip (doit contenir {userName})";
    translations.fr['Add system message when a user join or leave the chat room']="Afficher un message quand un utilisateur joint ou quitte la salle";
    translations.fr['Sort user list on user\'s activity. Sort below will be the secondary sort']="Trier les utilsateurs selon leur activit&eacute;. Le tri ci dessous sera utilis&eacute; comme tri secondaire";
    translations.fr['Sort user list']="Tri des utilisateurs";
    translations.fr['No sort']="Pas de tri";
    translations.fr['User name']="Nom de l'utilisateur";
    translations.fr['User rank']="Niveau de l'utilisateur";
    translations.fr['Distance']="Distance";
    translations.fr['Set the room name exactly as it appear in the room list\n\nLet blank to disable this feature']="Saisir le nom de la salle exactement comme il apparait dans la liste des salles\nLaisser vide pour ne pas utiliser cette fonctionnalit&eacute;";
    translations.fr['Force room']="Forcer la salle";
    translations.fr['Save']="Sauvegarder";
    translations.fr['Clear chat']="Effacer les messages";
    translations.fr['Export messages']="Exporter les messages";
    translations.fr['Join room']="Rejoindre une salle";
    translations.fr['Enter the name of the room to join']="Entrez le nom de la salle \340 rejoindre";
    
    // GERMAN
    translations.de={};
    translations.de['Error: Message background color must be a HTML format string\nwith exact length of 6 hexadecimal characters']="Fehler: die Hintergrundfarbe der Nachricht muss ein HTML-Format-String\nmit exakt 6 hexadezimalen Zeichen sein";
    translations.de['Error: Alert background color must be a HTML format string\nwith exact length of 6 hexadecimal characters']="Fehler: die Hintergrundfarbe eines Alarms muss ein HTML-Format-String\nmit exakt 6 hexadezimalen Zeichen sein";
    translations.de['Error: bip pattern must contain {userName}']="Fehler: Alarmierungs-Muster muss {userName} enthalten";
    translations.de['has joined']="ist gekommen";
    translations.de['has left']="ist gegangen";
    translations.de['Chat addon settings']="Chat addon Einstellungen";
    translations.de['Play sound on new message']="Ton bei neuer Nachricht";
    translations.de['Text to speech on messages']="Nachrichten vorlesen";
    translations.de['language']="Sprache";
    translations.de['Text to speech on from username']="TTS bei Nachricht von User";
    translations.de['TTS from username']="TTS von User";
    translations.de['Text to speech on internet link']="TTS bei Internet-Link";
    translations.de['TTS link to']="TTS Link zu";
    translations.de['Show message date (uncheck for time only)']="Zeige Datum der Nachrichten (deaktiviert: nur Uhrzeit)";
    translations.de['My message background color']="Hintergrundfarbe meiner Nachrichten";
    translations.de['Alert color']="Alarm-Farbe";
    translations.de['words separated by a comma\nCase unsensitive\nBegin and end with $ to match exact word']="Durch Kommata getrennte Wortliste\nGro&szlig;-/Kleinschreibung egal\n$ vor und hinter Suchwort f&uuml;r exakte Wortsuche";
    translations.de['eg']="Bsp";
    translations.de['or']="oder";
    translations.de['userNameOfAFriend,$unlock$']="UsernameEinesFreundes,$entsperre$";
    translations.de['Alert match']="Alarm bei";
    translations.de['Play sound on new alert']="Ton bei neuem Alarm";
    translations.de['Remove messages of users not in the users list of the room']="Unterdr&uuml;cke Nachrichten von Usern aus anderen Chatr&auml;umen";
    translations.de['{userName} will be replaced by the user\'s name you click on\n\nEg:\nHey {userName}, come here please!\nor\n@{userName}?']="{userName} wird ersetzt durch den angeklickten Usernamen\n\nBsp:\nHallo {userName}, kommst du bitte mal zu mir?!\noder\n@{userName}?";
    translations.de['Bip pattern (must contain {userName})']="Alarmierungs-Muster (muss {userName} enthalten)";
    translations.de['Add system message when a user join or leave the chat room']="Zeige Systemnachricht, wenn ein User den Chatraum betritt oder verl&auml;sst";
    translations.de['Sort user list on user\'s activity. Sort below will be the secondary sort']="Sortiere Userliste nach deren Aktivit&auml;t. Nach folgendem Kriterium wird dann sekund&auml;r sortiert";
    translations.de['Sort user list']="Sortiere die Userliste";
    translations.de['No sort']="Keine Sortierung";
    translations.de['User name']="Username";
    translations.de['User rank']="User Level";
    translations.de['Distance']="Entfernung";
    translations.de['Set the room name exactly as it appear in the room list\n\nLet blank to disable this feature']="Setze den Namen des Chatraums genau so wie er in der Liste angezeigt wird\nLeer lassen um dieses Feature zu deaktivieren";
    translations.de['Force room']="Chatraum forcieren";
    translations.de['Save']="Speichern";
    translations.de['Clear chat']="Chat l&ouml;schen";
    translations.de['Export messages']="Nachrichten exportieren";
    translations.de['Join room']="Chatraum betreten";
    translations.de['Enter the name of the room to join']="Namen des zu betretenden Chatraums angeben";
    
    var CA_Settings=null;
    
    var baseURLs = [new RegExp('https://www.waze.com/editor/'),
                    new RegExp('https://www.waze.com/[^/]+/editor/'),
                    new RegExp('https://editor-beta.waze.com/')];
    
    
    function tr(str)
    {
        if (translations.hasOwnProperty(I18n.locale) && translations[I18n.locale].hasOwnProperty(str))
            return translations[I18n.locale][str];
        return str;
    }
    
    //var chatJumperRetry=0;
    //var chatJumperMaxRetry=10;
    
    function getElementsByClassName(classname, node) {
        if(!node) node = document.getElementsByTagName("body")[0];
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName("*");
        for (var i=0,j=els.length; i<j; i++)
            if (re.test(els[i].className)) a.push(els[i]);
            return a;
    }
    
    
    function getId(node) {
        return document.getElementById(node);
    }
    
    function logBeta(msg, obj)
    {
        //log("Beta - " + msg, obj);
    }
    
    function logDebug(msg, obj)
    {
        if (isDebug) log("DEBUG - " + msg, obj);
    }
    
    
    function log(msg, obj)
    {
        if (obj==null)
            console.log("Chat addon v" + ca_version + " - " + msg);
        else
            console.debug("Chat addon v" + ca_version + " - " + msg + " " ,obj);
    }
    
    function waitForObject(object)
    {
        var obj=null;
        //log ("eval: " + "typeof(unsafeWindow." + object.o.replace(/\//g, '.') + ")");
        if (object.r==true)
        {
            eval ((object.s!=null?object.s:'dummy') + '=require("' + object.o + '")');
            eval ("obj=" + (object.s!=null?object.s:'dummy'));
        }
            //obj=require(object.o);
		else
            obj=eval("typeof(unsafeWindow." + object.o.replace(/\//g, '.') + ")");
        //log("obj", obj);
        if(obj === "undefined")
        {
            log(object.o + ' KO');
            window.setTimeout(waitForObject.caller, 500);
            return false;
        }
        logBeta(object.s + ' OK');


        if (object.s!=null && object.r==false)
            eval (object.s + "=" + object.o.replace(/\//g, '.'));

        return true;
    }
    
    function initializeWazeObjects()
    {
        /*
    var bGreasemonkeyServiceDefined = false;
    
    try {
        bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
    }
    catch (err) {  }*/
        
        if (typeof unsafeWindow === "undefined")// || ! bGreasemonkeyServiceDefined)
        {
            unsafeWindow    = ( function () {
                var dummyElem = document.createElement('p');
                dummyElem.setAttribute('onclick', 'return window;');
                return dummyElem.onclick();
            }) ();
        }
        var objectToCheck = [{o: "Waze",												s: null,					r: false},
                             {o: "Waze.model",											s: "wazeModel",				r: false},
                             {o: "Waze.Config",											s: "wazeConfig",			r: false},
                             {o: "Waze.map",											s: "wazeMap",				r: false},
                             {o: "Waze.model.chat",										s: "wazeChat",				r: false},
                             {o: "Waze.loginManager",									s: "loginManager",			r: false},
                             {o: "Waze.selectionManager",								s: "selectionManager",		r: false},
                             {o: "Waze.loginManager.user",								s: "me",					r: false},
                             {o: "Waze/Model/ChatMessage",								s: "WazeModelChatMessage",	r: true},
                             {o: "localStorage",										s: null,					r: false}
                            ];
        for (var i=0; i<objectToCheck.length; i++)
        {
            if (!waitForObject(objectToCheck[i])) return;    
        }
        initialiseCA();
    }
    
    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    };
        
    function changeIconUserStatus(element, newStatus)
    {
        /*element.src=newStatus.src;
        element.style.width="15px";
        element.style.cssFloat="left";*/
        for (var i=0; i<3; i++)
        {
            if (i==newStatus)
                element.childNodes[i].style.display="block";
            else
				element.childNodes[i].style.display="none";
        }
    }
    
    function initialiseCA()
    {
        wazeChat.messages._events.register("messageUpdated", null, iSendAMessage);
        //wazeChat.messages._events.register("beforeMessageUpdated", null, beforeNewMessage);
        wazeChat.messages._events.register("add", null, iSendAMessage);
        wazeChat._events.register("change:open", null, openChatGUI);
        wazeChat._events.register("change:visible", null, updateInvisibleHeaderColor);
        wazeChat._events.register("change:room", null, roomChanged);
        
        wazeChat.users._events.register("add", null, userEnter);
        wazeChat.users._events.register("remove", null, userLeave);


        icons.bell=document.createElement('img');
        icons.bell.src='data:image/png;base64,' + bellIcon;
        icons.bell.style.width="15px";
        icons.bell.style.cssFloat="left";
        
        icons.chip=document.createElement('img');
        icons.chip.src='data:image/png;base64,' + chipIcon;
        icons.chip.style.width="15px";
        icons.chip.style.cssFloat="left";

        icons.zzz=document.createElement('img');
        icons.zzz.src='data:image/png;base64,' + zzzIcon;
        icons.zzz.style.width="15px";
        icons.zzz.style.cssFloat="left";
        
        var newmessage_elts = getElementsByClassName("new-message", getId("chat"));
        if (newmessage_elts.length!=1)
            log("Error: cannot detect input message element");
        else
        {
            var newmessage=newmessage_elts[0];
            newmessage.style.paddingRight="30px";
            
            var newMessageAddon = document.createElement('div');
            newMessageAddon.style.cssFloat="right";
            newMessageAddon.style.position="relative";
            newMessageAddon.style.left="25px";
            newMessageAddon.style.marginTop="-20px";
            newMessageAddon.style.display="block";
            
            var plbutton = document.createElement('a');
            plbutton.innerHTML="+";
            plbutton.className="icon-link";
            plbutton.onclick=insertPermalink;
            
            newMessageAddon.appendChild(plbutton);
            
            //var smileysEl = document.createElement('div');
            //setupSmileysGUI(smileysEl);
            //newMessageAddon.appendChild(smileysEl);
            
            
            
            newmessage.appendChild(newMessageAddon);
            
        }
        
        var mapFooter = getElementsByClassName("WazeControlPermalink");
        if (mapFooter.length==0)
        {
            log("error: can't find permalink container");
        }
        else
        {
            divPerma=mapFooter[0];
        }
        
        //ChatJumper_init(); 
        
        
        // load settings
        loadSettings();
        
        setupOptionPanel();
        
        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
        var fakeMsg=document.createElement('div');
        fakeMsg.className="message system-message";
        fakeMsg.innerHTML='<div class="from"></div><div class="body"><div style="direction: ltr; text-align: left;">Chat addon v' + ca_version + ' rocks!</div></div>';
        messageList.appendChild(fakeMsg);
        
        var settingsDiv=document.createElement('div');
        settingsDiv.style.cssFloat='right';
        var iconList='';
        iconList+='<a href="#" style="color: white;" id="CA-reloadRoom" title="' + tr('Reload room') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + reloadIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" style="color: white;" id="CA-joinRoom" title="' + tr('Join room') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + meetIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" style="color: white;" id="CA-exportMessages" title="' + tr('Export messages') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + exportIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" style="color: white;" id="CA-clearchat" title="' + tr('Clear chat') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + trashIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" id="CA-opensettings"><i class="icon-cog" style="color: white;"></i></a>';
        settingsDiv.innerHTML=iconList;
        var chatHelper=getChatHelper();
        chatHelper.header.appendChild(settingsDiv);
        
        
        
        getId('CA-opensettings').onclick=function (e) { getId('CA-settingsPanel').style.display="block"; };
        getId('CA-clearchat').onclick=clearChat;
        getId('CA-exportMessages').onclick=exportMessages;
        getId('CA-joinRoom').onclick=joinRoom;
        getId('CA-reloadRoom').onclick=reloadRoom
        
        tts_audio=new Audio();
        tts_audio.addEventListener('ended', processTTS);
        tts_audio.addEventListener('error', processTTS);
        tts_audio.addEventListener('stalled', processTTS);
        tts_audio.addEventListener('abort', processTTS);
        window.setTimeout(processTTS);
        
        window.setInterval(watch, 1000);
        
        
        
        var userListDiv=getId('chat').getElementsByClassName('users')[0];
        userListDiv.onmouseenter=function () { sortUserListDisbled=true; log('Sort User List Disbled'); };
        userListDiv.onmouseleave=function () { sortUserListDisbled=false; log('Sort User List Enabled'); sortUserList(); };
        
        //getId('chat').getElementsByClassName('messages')[0].addEventListener("resize", updateUnreadMessagesDivWidth);
        getId('chat').getElementsByClassName('message-list')[0].style.maxHeight="290px";
        
        wazeModel.liveUsers.users._events.register("add", null, liveUserAdded);
        
        if (navigator.userAgent.indexOf('Firefox')!=-1)
        {
            messageList.addEventListener("DOMMouseScroll", onFirefoxEltMouseWheel, false);
            userListDiv.addEventListener("DOMMouseScroll", onFirefoxEltMouseWheel, false);
        }
        
        wazeChat._marx.socket.on("me:change:room", $.proxy(function (e) { resetChatSocket(e.room.name, false, "socket patched", false);}, wazeChat));
        
        setupBells();
        
        log("Init done");
        
    }
    
    function reloadRoom()
    {
        var data="";
        data+='data:text/html;charset=UTF-8,';
        data+='<html><body>';
        
        data+="<h1>Reload room report</h1>";
		data+="If the reload was successful, copy-paste this report and send it as PM to dummyd2. Thanks. <br>"
        data+="<br>";
		for (var key in wazeModel.chat._marx.socket.socket)
        {
            if (wazeModel.chat._marx.socket.socket.hasOwnProperty(key))
            {
                if (typeof wazeModel.chat._marx.socket.socket[key] == "boolean" ||
                    typeof wazeModel.chat._marx.socket.socket[key] == "number" ||
                    typeof wazeModel.chat._marx.socket.socket[key] == "string")
                    data+="Socket " + key + ": " + wazeModel.chat._marx.socket.socket[key] + "<br>";
            }
        }
		for (var key in wazeModel.chat._marx.socket.socket.options)
        {
            if (wazeModel.chat._marx.socket.socket.options.hasOwnProperty(key))
            {
                if (typeof wazeModel.chat._marx.socket.socket.options[key] == "boolean" ||
                    typeof wazeModel.chat._marx.socket.socket.options[key] == "number" ||
                    typeof wazeModel.chat._marx.socket.socket.options[key] == "string")
                    data+="Socket option " + key + ": " + wazeModel.chat._marx.socket.socket.options[key] + "<br>";
            }
        }
        data+="</body></html>";
        window.open(data,'_blank');

        resetChatSocket(wazeChat._getCurrentRoomName(), true, "Reload room manually", true);
    }
    
    function onFirefoxEltMouseWheel(e)
    {
        //log ("mouse wheel event:", e);
        this.scrollTop+=e.detail*10;
    }
    
    function joinRoom()
    {
        var roomName=window.prompt(tr("Enter the name of the room to join"));
        if (roomName==null) return;

        var theRoom = wazeModel.chat._findOrCreateRoom(roomName);
        patchManualRoomChange();
        resetChatSocket(roomName, true, "Manual join room", true);
        
        
        //wazeModel.chat.set("room", theRoom);
        
    }
    
    function updateUnreadMessagesDivWidth()
    {
        //log("urmd resize!");
        var messageDiv=getId('chat').getElementsByClassName('messages');
        var unreadMessageDiv=getId('chat').getElementsByClassName('unread-messages-notification');
        if (messageDiv.lentgh!=0 && unreadMessageDiv.lentgh!=0)
        {
            messageDiv=messageDiv[0];
            unreadMessageDiv=unreadMessageDiv[0];
			
            var unreadMessageDivWidth = parseInt(messageDiv.offsetWidth)-20;
            //log("urmd:" , unreadMessageDiv);
            //log("urmdw:" , unreadMessageDivWidth);
            if (wazeChat.attributes.visible==true)
            	unreadMessageDiv.style.width=(unreadMessageDivWidth) + 'px';
            else
                unreadMessageDiv.style.width='';
        }
    }
    
    function exportMessages()
    {
        var data="";
        data+='data:text/html;charset=UTF-8,';
        data+='<html><body>';
        
        var datatxt="";
        var databb=""; // [quote="blabla"]123[/quote]
        
        for (var i=0; i<wazeModel.chat.messages.models.length; i++)
        {
            var message=wazeModel.chat.messages.models[i];
            var date=null;
            if (message.hasOwnProperty('chatAddonTimeStamp'))
                date=message.chatAddonTimeStamp.toLocaleString();

            datatxt+="From: ";
            databb+="[quote=";
            if (message.attributes.type=="system")
            {
                datatxt+='System' + (date!=null?' - ' + date:'') + '<br>';
                databb+='"System' + (date!=null?' - ' + date:'') + '"]';
            }
            else
            {
                datatxt+=message.attributes.from.name + (date!=null?' - ' + date:'') + '<br>';
                databb+='"' + message.attributes.from.name + (date!=null?' - ' + date:'') + '"]';
            }
            datatxt+="&nbsp;&nbsp;" + message.attributes.body.replace(/\n/gi, '<br>&nbsp;&nbsp;') + "<br>";
            databb+=message.attributes.body.replace(/\n/gi, '<br>') + "[/quote]<br/>";
        }
        data+="<h1>Text</h1>";
        data+=datatxt;
        data+="<h1>BB code</h1>";
        data+=databb;
        data+="</body></html>";
        window.open(data,'_blank');
    }
    
    function clearChat()
    {
        log("Clear chat!");
        var messages=getElementsByClassName("message-list", getId("chat"));
        while (messages[0].hasChildNodes())
        {
            messages[0].removeChild(messages[0].lastChild);
        }
        wazeModel.chat.messages.reset([]);
    }
    
    function liveUserAdded(u)
    {
        /*
        var found=false;
        for (var i=0; i < wazeModel.liveUsers.users.models.lentgh; i++)
        {
            if (wazeModel.liveUsers.users.models[i].attributes.id==u.attributes.id)
            {
                found=true;
                break;
            }
        }
        if (!found)
            return;*/
        
        //var usrRank=getRankOfLiveUser(u.attributes.name);
        var usrRank=u.attributes.rank;
        if (usrRank==null)
        {
            window.setTimeout(function () { liveUserAdded(u); }, 500);
            log ("User not loaded yet. Wait and try later...");
            return;
        }
        else
            usrRank++;
        
        if (u._events.listeners.moved[0].obj.icon.$div[0].childNodes.length!=0)
            return;
        var nameMarker=document.createElement('div');
        nameMarker.className="tooltip fade top in";
        //nameMarker.style.position='relative';
        nameMarker.style.top='-30px';
        nameMarker.style.backgroundColor='black';
        nameMarker.style.color='white';
        nameMarker.style.borderRadius='5px';
        nameMarker.style.padding='5px';
        nameMarker.style.zIndex=3;
        //u._events.listeners.moved[0].obj.icon.$div[0].style.textAlign="center";

        
        nameMarker.innerHTML=u.attributes.name.replace(/-/gi, '&#x2011;') + '&nbsp;(' + usrRank + ')<div style="top: 27px;" class="tooltip-arrow"></div>';
        //nameMarker.innerHTML=u.attributes.name + '<div style="top: 25px;" class="tooltip-arrow"></div>';
        
        //log ("Live user added: ", u);
        u._events.listeners.moved[0].obj.icon.$div[0].appendChild(nameMarker);
        u._events.listeners.moved[0].obj.icon.$div[0].onmouseover=mouseOverLiveUser;
        /*
        u._events.listeners.moved[0].obj.icon.$div.unbind("mousemove");
        u._events.listeners.moved[0].obj.icon.$div.unbind("mouseover");
        u._events.listeners.moved[0].obj.icon.$div.unbind("mousenter");
        u._events.listeners.moved[0].obj.icon.$div.unbind("mouseleave");
        u._events.listeners.moved[0].obj.icon.$div.unbind("touchstart");
        u._events.listeners.moved[0].obj.icon.$div.unbind("touchmove");
        u._events.listeners.moved[0].obj.icon.$div.unbind("touchend");
        u._events.listeners.moved[0].obj.icon.$div.unbind("focus");*/
        //u._events.listeners.moved[0].obj.events.clearMouseListener();
        
        nameMarker.style.left=parseInt((u._events.listeners.moved[0].obj.icon.$div[0].offsetWidth / 2) - (nameMarker.offsetWidth / 2)) + "px";

        //u._events.register("moved", null, liveUserMoved);
        
    }
    function mouseOverLiveUser()
    {
        //log("this", this);
        var n=this.nextElementSibling;
        //log("n", n);
        if (n.className=="tooltip fade top in")
            n.style.display="none";
    }
    /*
    function liveUserMoved(u)
    {
        //log ("Live user moved: ", u);
        //window.setTimeout(getFunctionWithArgs(liveUserMovedEnd, [u.object._events.listeners.moved[0].obj.icon.$div[0]]));
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("mouseover");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("mousemove");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("mousenter");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("mouseleave");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("touchstart");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("touchmove");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("touchend");
        u.object._events.listeners.moved[0].obj.icon.$div.unbind("focus");
        u.object._events.listeners.moved[0].obj.events.clearMouseListener();
    }*/
    /*
    function liveUserMovedEnd(u)
    {
        log ("Live user moved end: ", u);
        u.trigger("mouseover");
    }
    */
    function resetUserActivity(userName)
    {
        if (userName==me.userName)
            return;
        var user=null;
        for (var i=0; i<wazeChat.users.models.length; i++)
        {
            //log('init activity test user' + wazeChat.users.models[i]);
            if (wazeChat.users.models[i].attributes.name==userName)
            {
                user=wazeChat.users.models[i];
                //log('init activity found user' + user.attributes.name);
                break;
            }
        }
        if (user!=null)
            userActivity[userName]={lastPost: new Date(0), lastMove: new Date(0), lastPosition: {lon: user.attributes.center.lon, lat: user.attributes.center.lat}};
        else
            userActivity[userName]={lastPost: new Date(0), lastMove: new Date(0), lastPosition: {lon: 0, lat: 0}};
    }
    
    function updateUserActivity()
    {
        for (var i=0; i<wazeChat.users.models.length; i++)
        {
            var user=wazeChat.users.models[i];
            if (user.attributes.name==me.userName)
                continue;
            //log('user:', user);
            if (!userActivity.hasOwnProperty(user.attributes.name))
            {
                //userActivity[user.attributes.name]={lastMove: new Date(), lastPosition: {lon: 0, lat: 0}};
                resetUserActivity(user.attributes.name);
            }
            if (userActivity[user.attributes.name].lastPosition.lon!=user.attributes.center.lon ||
                userActivity[user.attributes.name].lastPosition.lat!=user.attributes.center.lat)
            {
                userActivity[user.attributes.name].lastPosition.lon=user.attributes.center.lon;
                userActivity[user.attributes.name].lastPosition.lat=user.attributes.center.lat;
                userActivity[user.attributes.name].lastMove=new Date();
                //log ('User ' + user.attributes.name + ' has moved: ', userActivity[user.attributes.name].lastPosition);
            }
        }
    }
    
    function decimalToHex(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
        
        while (hex.length < padding) {
            hex = "0" + hex;
        }
        
        return hex;
    }
    
    function watch()
    {
        var greenToOrange=8;
        var orangeToRed=9;
        
        updateUserActivity();
        var now=new Date();
        for (var userName in userActivity)
        {
            if (userActivity.hasOwnProperty(userName))
            {
                var bell=getId('CA-bell-' + userName);
                if (bell!=null)
                {
                    var lastMove=null;
                    var lastPost=null;
                    if (userActivity[userName].hasOwnProperty('lastMove'))
                    {
                        lastMove=userActivity[userName].lastMove;
                    }
                    if (userActivity[userName].hasOwnProperty('lastPost'))
                    {
                        lastPost=userActivity[userName].lastPost;
                    }
                    
                    var inactivityTime=0;
                    if (lastMove!=null && lastPost!=null)
                    {
                        inactivityTime=Math.min(now.getTime()-lastMove.getTime(), now.getTime()-lastPost.getTime());
                    }
                    else 
                    {
                        if (lastMove!=null)
                        {
                            inactivityTime=now.getTime()-lastMove.getTime();
                        }
                        if (lastPost!=null)
                        {
                            inactivityTime=now.getTime()-lastPost.getTime();
                        }
                    }
                    
                    inactivityTime/=1000; // convert to seconds
                    if (inactivityTime>1200) // more than 20 min
                    {
                        bell.style.removeProperty('background-color');
                        changeIconUserStatus(bell, 2);
                        //bell.firstChild.src=icons.bell.src;
                        //bell.firstChild.src='data:image/png;base64,' + zzzIcon;
                        continue;
                    }
                    inactivityTime=Math.sqrt(inactivityTime);
                    var r=0;
                    var g=255;
                    var b=0;
                    if (inactivityTime<=greenToOrange)
                    {
                        r=Math.floor(inactivityTime*240.0/greenToOrange);
                        g=Math.floor(255.0-(inactivityTime*15.0/greenToOrange));
                        if (r<0) r=0;
                        if (r>240) r=240;
                        if (g<240) g=240;
                        if (g>255) g=255;
                        bell.style.backgroundColor='#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
                    }
                    if (inactivityTime>greenToOrange && inactivityTime<=(greenToOrange+orangeToRed))
                    {
                        r=Math.floor(240.0+((inactivityTime-greenToOrange)*15.0/orangeToRed));
                        g=Math.floor(240.0-((inactivityTime-greenToOrange)*240.0/(orangeToRed)));
                        if (r<240) r=240;
                        if (r>255) r=255;
                        if (g<0) g=0;
                        if (g>240) g=240;
                        bell.style.backgroundColor='#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);                    
                    }
                    if (inactivityTime>(greenToOrange+orangeToRed))
                    {
                        bell.style.backgroundColor='#FF0000';
                    }
                    if (wazeChat.attributes.visible==true)
                        changeIconUserStatus(bell, 1);//bell.firstChild.src='data:image/png;base64,' + bellIcon;
                    else
                        changeIconUserStatus(bell, 0);//bell.firstChild.src='data:image/png;base64,' + chipIcon;
                }
            }
        }
        sortUserList();    
    }
    
    function processTTS()
    {
        //log("process tts: ", tts_messages);
        /*tts_messages = tts_messages.filter(function(elem, pos, self) {
        if (self.indexOf(elem) != pos)
        {
            return false;
        }
        return true;
        //return self.indexOf(elem) == pos;
    });*/

        if (tts_audio.error!=null)
        	log("tts_audio.error", tts_audio.error);
        if ((tts_audio.ended || tts_audio.currentSrc=='' || tts_audio.error!=null) && tts_messages.length!=0)
        {
            //var audio = new Audio();
            var text=tts_messages[0];
            
            var urls = text.match(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g);
            if (urls!=null)
            {
                //log('tts urls:', urls);
                for (var i=0; i<urls.length; i++)
                {
                    for (var j=0; j<baseURLs.length; j++)
                    {
                        var permalink=null;
                        do
                        {
                            permalink = getFirstPermalink(text);
                            if (permalink)
                                text=text.replace(permalink.permalink, ' permalink');
                        } while (permalink);
                    }
                }
            }
            var urls = text.match(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g);
            if (urls!=null)
            {
                //log('tts urls:', urls);
                for (var i=0; i<urls.length; i++)
                {
                    var url = document.createElement('a');
                    url.href = urls[i];
                    var newUrlText=CA_Settings.tts_linkTo.replace(/\{link\}/gi, url.hostname.replace('www.', ''));
                    text=text.replace(urls[i], ' ' + newUrlText + ' ');
                }
            }
            //text=text.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, '');
            //log('texte tts: ' + text);
            
            if (text.length>90)
            {
                if (text.indexOf(' ')==-1 || text.indexOf(' ')>=90)
                {
                    // cut @ 90:
                    tts_messages[0]=text.substr(0, 90);
                    tts_messages.splice(1, 0, text.substring(90));
                    text=tts_messages[0];
                }
                else
                {
                    //log("process tts need a split!: ", tts_messages);
                    var newLength=0;
                    var pos=0;
                    var chunks=text.split(' ');
                    while (newLength<90 && pos<chunks.length)
                    {
                        newLength += chunks[pos].length + 3;
                        pos++;
                    }
                    var firstPart = chunks.slice(0);
                    firstPart.splice(pos, chunks.length-pos);
                    //log("process tts need a split 1st part: ", firstPart);
                    text=firstPart.join(' ');
                    tts_messages[0]=text;
                    var theRest=chunks.slice(0);
                    theRest.splice(0, pos);
                    //log("process tts need a split rest: ", theRest);
                    tts_messages.splice(1, 0, theRest.join(' '));
                }
            }
            
            //var textCleaned=text.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, '');
            textCleaned = encodeURIComponent(text);
            
            //log("clean text " + textCleaned);
            //audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=fr&q=de%20' + lastUserName + ",%20" + textCleaned;
            //audio.play();
            
            tts_audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=' + CA_Settings.tts_language + '&q=' + textCleaned;
            //log("tts text sent to google: " + textCleaned);
            tts_audio.play();
            tts_messages.splice(0,1);
            window.setTimeout(processTTS);
        }
        
        if (tts_messages.length==0)
        {
            window.setTimeout(processTTS, 500);
        }
        
    }
    
    function setupSmileysGUI(elt)
    {
        var content='<ul class="CA-smileys-list">';
        for (var i in smileys)
        {
            if (smileys.hasOwnProperty(i)) 
            {
                content+='<li><img title="' + i + '" src="' + smileys[i] + '" /></li>';
            }
        }
        
        content+='</ul>';
        
        var pannel=new PopupPannel("CA_smileys", "100px", "100px", "#A0A0A0", "15px", "17px", -1, -1);
        pannel.setTriggerInnerHTML('<img title="add smiley" src="https://www.waze.com/forum/images/smilies/icon_e_smile.gif" />');
        pannel.setContentsInnerHTML(content);
        pannel.installInside(elt);
        
    }
    
    function loadSettings()
    {
        CA_Settings={showDate: true,
                     messageSound: false,
                     messageBGColor: 'A1DCF5',
                     alertBGColor: '880000',
                     alertMatch: me.userName,
                     alertSound: false,
                     removeInvisible: false,
                     bipPattern: '@{userName}?',
                     systemMessageOnJoinLeave: false,
                     sortUserList: 0,
                     forceRoom: '',
                     tts: false,
                     tts_language: 'en',
                     tts_fromPrefix: 'from {userName}',
                     tts_linkTo: 'link to {link}',
                     sortUserListActivity: false
                    };
        
        if (typeof(localStorage.WMEChatAddon_settings)!=="undefined")
        {
            var settings=JSON.parse(localStorage.WMEChatAddon_settings);
            logDebug("Loading local storage settings:", settings);
            if (typeof(settings.messageSound)!=="undefined") CA_Settings.messageSound = settings.messageSound;
            if (typeof(settings.showDate)!=="undefined") CA_Settings.showDate = settings.showDate;
            if (typeof(settings.messageBGColor)!=="undefined") CA_Settings.messageBGColor = settings.messageBGColor;
            if (typeof(settings.alertBGColor)!=="undefined") CA_Settings.alertBGColor = settings.alertBGColor;
            if (typeof(settings.alertMatch)!=="undefined") CA_Settings.alertMatch = settings.alertMatch;
            if (typeof(settings.alertSound)!=="undefined") CA_Settings.alertSound = settings.alertSound;
            if (typeof(settings.removeInvisible)!=="undefined") CA_Settings.removeInvisible = settings.removeInvisible;
            if (typeof(settings.bipPattern)!=="undefined") CA_Settings.bipPattern = settings.bipPattern;
            if (typeof(settings.systemMessageOnJoinLeave)!=="undefined") CA_Settings.systemMessageOnJoinLeave = settings.systemMessageOnJoinLeave;
            if (typeof(settings.sortUserList)!=="undefined") CA_Settings.sortUserList = settings.sortUserList;
            if (typeof(settings.forceRoom)!=="undefined") CA_Settings.forceRoom = settings.forceRoom;
            if (typeof(settings.tts)!=="undefined") CA_Settings.tts = settings.tts;
            if (typeof(settings.tts_language)!=="undefined") CA_Settings.tts_language = settings.tts_language;
            if (typeof(settings.tts_fromPrefix)!=="undefined") CA_Settings.tts_fromPrefix = settings.tts_fromPrefix;
            if (typeof(settings.tts_linkTo)!=="undefined") CA_Settings.tts_linkTo = settings.tts_linkTo;
            if (typeof(settings.sortUserListActivity)!=="undefined") CA_Settings.sortUserListActivity = settings.sortUserListActivity;
            
        }
        log("Settings loaded");
    }
    
    function saveSettings()
    {
        logDebug("Saving local storage settings:", CA_Settings);
        localStorage.WMEChatAddon_settings = JSON.stringify(CA_Settings);
        log("Settings saved");
    }
    
    function applySettings()
    {
        var messageBG = getId('CA-opt-messagebg').value;
        if (messageBG.match(/^[0-9a-f]{6}$/i)==null)
            return tr("Error: Message background color must be a HTML format string\nwith exact length of 6 hexadecimal characters");
        
        var alertBG = getId('CA-opt-alertbg').value;
        if (alertBG.match(/^[0-9a-f]{6}$/i)==null)
            return tr("Error: Alert background color must be a HTML format string\nwith exact length of 6 hexadecimal characters");
        
        var bipPattern = getId('CA-opt-bippattern').value;
        if (bipPattern.indexOf('{userName}')==-1)
            return tr("Error: bip pattern must contain {userName}");
        
        //var tts_language = getId('CA-opt-ttslanguage').value;
        
        CA_Settings={messageSound: getId('CA-opt-messagesound').checked,
                     showDate: getId('CA-opt-showdate').checked,
                     messageBGColor: messageBG,
                     alertBGColor: alertBG,
                     alertMatch: getId('CA-opt-alertmatch').value,
                     alertSound: getId('CA-opt-alertsound').checked,
                     removeInvisible: getId('CA-opt-removeinvisibles').checked,
                     bipPattern: bipPattern,
                     systemMessageOnJoinLeave: getId('CA-opt-systemmessageonjoinleave').checked,
                     sortUserList: getId('CA-opt-sortUserList0').checked?0:(getId('CA-opt-sortUserList1').checked?1:(getId('CA-opt-sortUserList2').checked?2:3)),
                     forceRoom: getId('CA-opt-forceroom').value,
                     tts: getId('CA-opt-tts').checked,
                     tts_language: getId('CA-opt-ttslanguage').value,
                     tts_fromPrefix: getId('CA-opt-ttsfromprefix').value,
                     tts_linkTo: getId('CA-opt-ttslinkto').value,
                     sortUserListActivity: getId('CA-opt-sortUserListActivity').checked
                    };
        sortUserList();
        return null;   
    }
    
    function setupOptionPanel()
    {
        var panel = document.createElement('div');
        panel.id = "CA-settingsPanel";
        panel.setAttribute('style', 'border: 1px solid black; background-color: #FFFFFF; padding: 5px; position: absolute; top: 15px; right: 15px; z-index: 9999; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; display: none;');
        var panelHTML = '<center style="font-weight: bold; size: bigger;">' + tr('Chat addon settings') + '</center><br/>';
        panelHTML += '<label><input type="checkbox" id="CA-opt-messagesound"' + (CA_Settings.messageSound?' checked':'') + '> ' + tr('Play sound on new message') + '</input></Label><br />';
        panelHTML += '<label title"' + tr('Text to speech on messages') + '"><input type="checkbox" id="CA-opt-tts"' + (CA_Settings.tts?' checked':'') + '> TTS</input></Label> <label>' + tr('language') + ': <input style="height: 25px;" type="text" size="6" maxlength="6" id="CA-opt-ttslanguage" value="' + CA_Settings.tts_language + '" /></Label><br/>';
        panelHTML += '<label title"' + tr('Text to speech on from username') + '">' + tr('TTS from username') + ': <input style="height: 25px;" type="text" size="20" maxlength="100" id="CA-opt-ttsfromprefix" value="' + CA_Settings.tts_fromPrefix + '" /></Label><br/>';
        panelHTML += '<label title"' + tr('Text to speech on internet link') + '">' + tr('TTS link to') + ': <input style="height: 25px;" type="text" size="20" maxlength="100" id="CA-opt-ttslinkto" value="' + CA_Settings.tts_linkTo + '" /></Label><br/>';
        
        panelHTML += '<label><input type="checkbox" id="CA-opt-showdate"' + (CA_Settings.showDate?' checked':'') + '> ' + tr('Show message date (uncheck for time only)') + '</input></Label><br />';
        panelHTML += '<label>' + tr('My message background color') + ': <input style="height: 25px;" type="text" size="6" maxlength="6" id="CA-opt-messagebg" value="' + CA_Settings.messageBGColor + '" /></Label><br />';
        panelHTML += '<label>' + tr('Alert color') + ': <input style="height: 25px;" type="text" size="6" maxlength="6" id="CA-opt-alertbg" value="' + CA_Settings.alertBGColor + '" /></Label><br />';
        panelHTML += '<label title="' + tr('words separated by a comma\nCase unsensitive\nBegin and end with $ to match exact word') + '\n\n' + tr('eg') + ':\n' + me.userName + '\n' + tr('or') + '\n' + me.userName + ',' + tr('userNameOfAFriend,$unlock$') + '">' + tr('Alert match') + ': <input style="height: 25px;" type="text" size="30" id="CA-opt-alertmatch" value="' + CA_Settings.alertMatch + '" /></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-alertsound"' + (CA_Settings.alertSound?' checked':'') + '> ' + tr('Play sound on new alert') + '</input></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-removeinvisibles"' + (CA_Settings.removeInvisible?' checked':'') + '> ' + tr('Remove messages of users not in the users list of the room') + '</input></Label><br />';
        panelHTML += '<label title="' + tr('{userName} will be replaced by the user\'s name you click on\n\nEg:\nHey {userName}, come here please!\nor\n@{userName}?') + '">' + tr('Bip pattern (must contain {userName})') + ': <input style="height: 25px;" type="text" size="15" id="CA-opt-bippattern" value="' + CA_Settings.bipPattern + '" /></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-systemmessageonjoinleave"' + (CA_Settings.systemMessageOnJoinLeave?' checked':'') + '> ' + tr('Add system message when a user join or leave the chat room') + '</input></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-sortUserListActivity"' + (CA_Settings.sortUserListActivity?' checked':'') + '> ' + tr('Sort user list on user\'s activity. Sort below will be the secondary sort') + '.</input></Label><br />';
        panelHTML += '<b>' + tr('Sort user list') + ':</b> <label><input type="radio" id="CA-opt-sortUserList0" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==0?' checked':'') + '>' + tr('No sort') + '</input></label> <label><input type="radio" id="CA-opt-sortUserList1" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==1?' checked':'') + '>' + tr('User name') + '</input></label> <label><input type="radio" id="CA-opt-sortUserList2" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==2?' checked':'') + '>' + tr('User rank') + '</input></Label><label><input type="radio" id="CA-opt-sortUserList3" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==3?' checked':'') + '>' + tr('Distance') + '</input></Label><br />';
        panelHTML += '<label title="' + tr('Set the room name exactly as it appear in the room list\n\nLet blank to disable this feature') + '">' + tr('Force room') + ': <input style="height: 25px;" type="text" size="15" id="CA-opt-forceroom" value="' + CA_Settings.forceRoom + '" /></Label><br />';
        panelHTML += '<button id="CA-opt-close">' + tr('Save') + '</button>';
        panel.innerHTML = panelHTML;
        getId('map').appendChild(panel);
        
        
        
        getId('CA-opt-close').onclick=function() { 
            var error=applySettings();
            if (error!=null)
                alert(error);
            else
            {
                saveSettings();
                getId('CA-settingsPanel').style.display="none";
            }
        };
    }
    
    function updateInvisibleHeaderColor()
    {
        var chatHelper=getChatHelper();
        //log ("chat att", wazeChat.attributes);
        //log ("to bgcolor:", typeof(chatHelper.header.style.backgroundColor));
        //log ("bgcolor:", chatHelper.header.style.backgroundColor);
        
        if (wazeChat.attributes.visible==false && chatHelper.header.style.backgroundColor=="")
        {
            chatHelper.header.style.backgroundColor="#c2c2c2";
        }
        if (wazeChat.attributes.visible==true)
        {
            if (chatHelper.header.style.backgroundColor=="rgb(194, 194, 194)")
                chatHelper.header.style.backgroundColor="";
        }
        
    }
    
    function iSendAMessage(e)
    {
        updateUnreadMessagesDivWidth();
        e.chatAddonTimeStamp=new Date();
        if (e.isSystem())
        {
            // datetime only  
            var messages=getElementsByClassName("message system-message", getId("chat"));
            var message=messages[messages.length-1];
            if (message.nextSibling==null) // last message is system message!
            {
                var subList=message.children[1].children;
                if (subList.length==1) // one submessage, so this is the last message posted: reset date array
                    systemMessageDates=[];
                systemMessageDates.push(new Date());
                for (var i=0; i<subList.length; i++)
                {
                    var subMessage=subList[i];
                    if (subMessage.childElementCount==0)
                    {
                        subMessage.innerHTML+='<span style="float: right; color: #A0A0A0; font-size: smaller;">' + (CA_Settings.showDate?(systemMessageDates[i].toLocaleString()):(systemMessageDates[i].toLocaleTimeString())) + '</span>';
                    }
                }
            }
            return;
        }
        else
        {
            var userName=e.attributes.from.name;
            if (userName!=me.userName)
            {
                if (!userActivity.hasOwnProperty(userName))
                {
                    
                    resetUserActivity(userName);
                }
                userActivity[userName].lastPost=new Date();
            }
        }
        //log("handler message:", e);
        sortUserList();
        //if (wazeChat.attributes.visible==true)
        setupBells();
        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
        var scrollDown =(messageList.offsetHeight + messageList.scrollTop >= messageList.scrollHeight);
        
        
        logDebug("ALERT ME iSendAMessage event:", e);
        updateInvisibleHeaderColor();
        if (e.attributes.from.name==me.userName)
        {
            removeAlert();
        }
        newMessage();
        
        var messageNotifications = getElementsByClassName("unread-messages-notification", getId("chat"));
        if (messageNotifications.length==1 && messageNotifications[0].style.display=="none" && scrollDown==true)
            setTimeout(scrollToBottom, 500);
        
    }
    
    function removeAlert()
    {
        var chatHelper=getChatHelper();
        
        if (chatHelper.button!=null && chatHelper.header!=null)
        {
            chatHelper.header.setAttribute("CA-alertme","false");
            
            if (wazeChat.attributes.visible==true)
            {
                chatHelper.button.style.backgroundColor="";
                chatHelper.header.style.backgroundColor="";
            }
            else
            {
                chatHelper.button.style.backgroundColor="";
                chatHelper.header.style.backgroundColor="";
                updateInvisibleHeaderColor();
            }
        }
    }
    
    function openChatGUI(e)
    {
        hasUnreadMessages=false;
        if (e.newValue==true)
        {
            logDebug("ALERT chat opens");
            updateInvisibleHeaderColor();
        }
        else
        {
            removeAlert();
        }
    }
    
    
    function setFocusOnInputMessage()
    {
        var inputmessage_elts = getElementsByClassName("message-input", getId("chat"));
        if (inputmessage_elts.length!=1)
            log("Error: cannot detect input message element");
        else
        {
            var inputmessage=inputmessage_elts[0];
            inputmessage.focus();
        }    
    }
    
    
    function insertPermalink()
    {
        var inputmessage_elts = getElementsByClassName("message-input", getId("chat"));
        if (inputmessage_elts.length!=1)
            log("Error: cannot detect input message element");
        else
        {
            var inputmessage=inputmessage_elts[0];
            var curPermalink=null;
            // bug fix with house number helper... :X
            for (var i=0; i<divPerma.children.length; i++)
            {
                //log('toto', divPerma.children[i]);
                if (divPerma.children[i].className=='icon-link')
                {
                    curPermalink=divPerma.children[i].href;
                    break;
                }
            }
            
            
            inputmessage.value+=curPermalink;
            window.setTimeout(setFocusOnInputMessage, 100);
            
        }
    }
    
    function getChatHelper()
    {
        divChat=getId("chat-overlay");
        var chatHelper={button: null, open: null, header:null};
        
        if (divChat)
        {
            if (divChat.className.indexOf("open")!=-1)
                chatHelper.open=true;
            var chatButtons=getElementsByClassName("toggle", divChat);
            logDebug("ALERT ME chatButtons: ", chatButtons);
            if (chatButtons.length>=1)
                chatHelper.button=chatButtons[0];
            var chatHeaders=getElementsByClassName("header", divChat);
            if (chatHeaders.length>=1)
                chatHelper.header=chatHeaders[0];
        }
        //log('chat helper:', chatHelper);
        return(chatHelper);
    }
    
    function isInsideLink(text, pos)
    {
        var res=false;
        var tmp=text.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, function () {
            var position=arguments[arguments.length-2];
            if (pos >= position && pos<(position+arguments[0].length))
                res=true;
        });
        return res;
    }
    
    function removeDuplicates()
    {
        var chatHelper=getChatHelper();
        var lastUserName='';
        var messages=getElementsByClassName("message normal-message", getId("chat"));
        var ttsok=true;
        
        for (var i=0; i<messages.length; i++)
        {
            /*        if (messages[i].style.display=="none")
            continue;
        if (messages[i].className=="message system-message")
            continue;
 */       
            //logDebug("messages["+i+"]:", messages[i]);
            var children=messages[i].children;
            for (var j=0; j<children.length; j++)
            {
                //logDebug("children["+j+"]:", children[j]);
                
                if (children[j].className=="from")
                {
                    var userInfos=children[j].innerHTML.split(' ');
                    var liveUserName=userInfos[0];
                    lastUserName=liveUserName;
                    logDebug("live user infos:" , userInfos);
                    if (userInfos.length!=1 && liveUserName!=me.userName)
                        liveUserName=children[j].firstChild.innerHTML;
                    logDebug("live username:" , liveUserName);
                    
                    if (liveUserName==me.userName)
                    {
                        doNotNotifyNext=true;
                        //log ("message from me! Do not notify...");
                    }
                    else
                    {
                        //log ("message not from me! Notify...");
                        doNotNotifyNext=false;
                    }
                    lastMessageFrom=liveUserName;
                    
                    if (CA_Settings.removeInvisible==true && i+1>=messages.length)
                    {
                        if (liveUserName!=me.userName && liveUserName!="")
                        {
                            if (getRankOfLiveUser(liveUserName)==null) // live user not in list
                            {
                                messages[i].style.display="none";
                                //log ("message from user not in the list! Do not notify...");
                                //if (i+1==messages.length) // last message?
                                doNotNotifyNext=true;
                                ttsok=false;
                                continue;
                            }
                        }
                    }
                }
                
                if (children[j].className=="body")
                {
                    if (lastUserName==me.userName)
                        children[j].style.backgroundColor='#' + CA_Settings.messageBGColor;
                    
                    var list=children[j].children;
                    
                    var textForTTS='';
                    
                    for (var k=0; k<list.length; k++)
                    {
                        //logDebug("list["+k+"]:", list[k]);
                        logDebug("attribute alertMe:" + chatHelper.header.getAttribute("CA-alertme"));
                        logDebug("i+1/messlength:" + (i+1) +  "/" + messages.length);
                        
                        var text=list[k].innerHTML;
                        
                        if ((i+1)==messages.length && liveUserName!=me.userName && CA_Settings.tts==true)
                        {   
                            var newFromUserName=CA_Settings.tts_fromPrefix.replace(/\{userName\}/gi, lastUserName);
                            textForTTS=newFromUserName + ': ' + text;
                        }
                        
                        
                        var inputs=text.split('\n');
                        if (inputs.lentgh>1)
                        {
                            //log("CR inside message:", text);
                            var newInputs = inputs.filter(function(elem, pos, self) {
                                if (self.indexOf(elem) != pos)
                                {
                                    log('Text duplicated: "' + elem.innerHTML + '" removed');
                                    return false;
                                }
                                return true;
                                //return self.indexOf(elem) == pos;
                            });
                            if (text!=newInputs.join('\n'))
                                list[k].innerHTML=newInputs.join('\n');
                        }
                        
                        //logDebug("new inputs:", newInputs);
                        //if (k!=0 && k==list.length-1)
                        if (k!=0)
                        {
                            //logDebug("Test with previous: " + list[k].innerHTML + "==" + list[k-1].innerHTML);
                            var removeTags=/<[^>]*>?/g;
                            if (list[k].textContent==list[k-1].textContent)
                            {
                                if (list[k].style.display!="none")
                                {
                                    list[k].style.display="none";
                                    log('Message duplicated: "' + list[k].textContent + '" removed');
                                    //log ("message duplicated! Do not notify...");
                                    doNotNotifyNext=true;
                                    ttsok=false;
                                }
                            }
                        }
                        if ((i+1)==messages.length && liveUserName!=me.userName && doNotNotifyNext==false)
                        {
                            //var originalText=text;
                            
                            
                            logDebug("ALERT ME UNDEFINED on " + text);
                            var alertMatch=false;
                            var alertPatterns=CA_Settings.alertMatch.split(',');
                            
                            for (var l=0; l<alertPatterns.length; l++)
                            {
                                
                                if (alertPatterns[l].charAt(0)=='$' && alertPatterns[l].charAt(alertPatterns[l].length-1)=='$')
                                {
                                    alertPatterns[l]='(^|\\s)' + alertPatterns[l].toLowerCase().substr(1, alertPatterns[l].length-2) + '(\\s|$)';
                                    if (text.match(new RegExp(alertPatterns[l], 'i'))!=null)
                                    {
                                        alertMatch=true;
                                        break;
                                    }
                                }
                                else if (text.toLowerCase().indexOf(alertPatterns[l].toLowerCase())!=-1)
                                {
                                    alertMatch=true;
                                    break;
                                }                            
                                    }
                            
                            var regex = new RegExp('(' + alertPatterns.join(')|(') + ')', "gi");
                            //log("bg alert regexp ", regex);
                            /*text=text.replace(regex, function(matched){
                            return '<font class="CA-alertKW" style="background-color: #' + CA_Settings.alertBGColor + '; color: #ffffff;">' + matched + '</font>';
                        });
                        */
                            
                            text=text.replace(regex, function () {
                                if (isInsideLink(arguments[arguments.length-1], arguments[arguments.length-2]))
                                    return arguments[0];
                                else
                                    return '<font class="CA-alertKW" style="background-color: #' + CA_Settings.alertBGColor + '; color: #ffffff;">' + arguments[0] + '</font>';
                            });
                            
                            list[k].innerHTML=text;
                            //log("bg alert: " + text);
                            
                            //if (chatHelper.header.getAttribute("CA-alertme")==null || chatHelper.header.getAttribute("CA-alertme")=="false")
                            {
                                //if (text.toLowerCase().indexOf(me.userName.toLowerCase())!=-1)
                                if (alertMatch==true)// && liveUserName!=me.userName)
                                {
                                    logDebug("ALERT ME found chatHelper: ", chatHelper);
                                    // s.o. is talking about me...
                                    //children[j].alertMe=true;
                                    
                                    if (chatHelper.button!=null && chatHelper.header!=null)
                                    {
                                        chatHelper.header.setAttribute("CA-alertme","true");
                                        logDebug("ALERT ME setup bg color");
                                        chatHelper.button.style.backgroundColor='#' + CA_Settings.alertBGColor;
                                        chatHelper.header.style.backgroundColor='#' + CA_Settings.alertBGColor;
                                        if (CA_Settings.alertSound==true && doNotNotifyNext==false)
                                        {
                                            //log("Playing sound for alert...");
                                            var snd = new Audio("data:audio/mp3;base64," + alertSound);
                                            snd.play();
                                        }
                                        //log ("Playing alert! Do not notify...");
                                        doNotNotifyNext=true;
                                    }
                                }
                            }
                        }
                    }
                    if (ttsok==true && textForTTS!='')
                        tts_messages.push(textForTTS);
                    
                }
            }
        }
        
    }
    
    function convertPermalinksAndLinks()
    {
        //var baseURL=[location.protocol, '//', location.host, location.pathname].join('');
        
        //logDebug(baseURLs);
        var lastUserName="";
        
        var jumpTargets=[];
        var jumpUserTargets=[];
        var bipUserTargets=[];
        //logDebug("New message (/" + wazeChat.messages.models.length + "):", wazeChat.messages.models[wazeChat.messages.models.length-1]);
        //var messages=getElementsByClassName("message", getId("chat"));
        var messages=getElementsByClassName("message normal-message", getId("chat"));
        for (var i=0; i<messages.length; i++)
        {
            //logDebug("messages["+i+"]:", messages[i]);
            var children=messages[i].children;
            for (var j=0; j<children.length; j++)
            {
                //logDebug("children["+j+"]:", children[j]);
                if (children[j].className=="from")
                {
                    var userInfos=children[j].innerHTML.split(' ');
                    if (userInfos.length==1)
                    {
                        lastUserName=children[j].innerHTML;
                        if (lastUserName!="")
                        {
                            //var separator=' - ';
                            var separator='';
                            if (lastUserName==me.userName)
                            {
                                children[j].innerHTML=children[j].innerHTML + ' (' + (me.rank+1) + ')';
                            }
                            else
                            {
                                separator=' ';
                                var liveUserRank = getRankOfLiveUser(lastUserName);
                                children[j].innerHTML='<a href="#" id="CA-bip-' + bipCount + '">' + lastUserName + '</a> (' + (liveUserRank!=null?liveUserRank+1:'?') + ')' + ' <a href="#" id="CA-t-' + targetCount + '"><i class="crosshair icon-screenshot"></i></a>';
                                //logDebug("jump to user on a element: ", children[j].firstChild);
                                //logDebug("jump to user: ", lastUserName);
                                jumpUserTargets.push({id: targetCount, userName: lastUserName});
                                bipUserTargets.push({id: bipCount, userName: lastUserName});
                                targetCount++;
                                bipCount++;
                            }
                            children[j].innerHTML=children[j].innerHTML + separator + '<span style="float: right; color: #A0A0A0; font-size: smaller;">' + (CA_Settings.showDate?(new Date().toLocaleString()):(new Date().toLocaleTimeString())) + '</span>';                            
                        }
                    }
                    else
                    {
                        var userInfos=children[j].innerHTML.split(' ');
                        var lastUserName=userInfos[0];
                        //logDebug("live user infos:" , userInfos);
                        if (userInfos.length!=1 && lastUserName!=me.userName)
                            lastUserName=children[j].firstChild.innerHTML;
                    }
                    
                    //    lastUserName=userInfos[0].innerHTML;
                }
                if (children[j].className=="body")
                {
                    
                    var list=children[j].children;
                    
                    for (var k=0; k<list.length; k++)
                    {
                        //logDebug("list["+k+"]:", list[k]);
                        if (typeof(list[k].chatAddonOk)!=='undefined')
                            continue;
                        list[k].chatAddonOk=true;
                        var newMessage=list[k].innerHTML;
                        var pos=0;
                        var remainigMessage=newMessage;
                        while (remainigMessage.length>0)
                        {
                            var permalink=getFirstPermalink(remainigMessage);
                            if (permalink)
                            {
                                var details=getJumpSetFromPermalink(permalink.permalink);
                                if (details.lon && details.lat)
                                {
                                    var elements=0;
                                    var elType='';
                                    if (details.segments!=null)
                                    {
                                        elements=details.segments.length;
                                        elType='segment' + (elements>1?'s':'');
                                    }
                                    else if (details.nodes!=null)
                                    {
                                        elements=details.nodes.length;
                                        elType='node' + (elements>1?'s':'');
                                    }
                                        else if (details.venues!=null)
                                        {
                                            elements=details.venues.length;
                                            elType='venue' + (elements>1?'s':'');
                                        }
                                        
                                        newMessage=newMessage.replace(permalink.permalink, '<a href="#"' + (elements!=0?(' title="' + elements + ' ' + elType + '"'):'') + ' id="CA-t-' + targetCount + '"><i class="crosshair icon-screenshot"></i></a>');
                                    jumpTargets.push({id: targetCount, jumpDetails: details});
                                    log("permalink replaced by target on message posted by " + lastUserName);
                                    //logDebug("jumpTargets", jumpTargets);
                                    targetCount++;
                                    remainigMessage=remainigMessage.substring(permalink.end);
                                    continue;
                                }
                                else
                                    log("Bad permalink: no lon or lat: " + newMessage);
                            }
                            
                            remainigMessage=remainigMessage.substring(1);
                        }
                        
                        // convert normal links
                        //newMessage=newMessage.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, '<a target="_blank" href="$1">$1</a>');
                        newMessage=newMessage.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, function(match, contents, offset, s)
                                                      {
                                                          return ('<a target="_blank" href="' + (match.indexOf('://')!=-1?match:'http://' + match) + '">' + match + '</a>');
                                                      });
                        newMessage=replaceSmileys(newMessage);
                        
                        if (list[k].innerHTML!=newMessage)
                            list[k].innerHTML=newMessage;
                        
                    }
                }
            }
        }
        //logDebug("jumpTargets for onclick", jumpTargets);
        for (var i=0; i<jumpTargets.length; i++)
        {
            //logDebug("target elt:", getId("CA-t-" + jumpTargets[i].id));
            getId("CA-t-" + jumpTargets[i].id).onclick=getFunctionWithArgs(jumpTo, [jumpTargets[i].jumpDetails]);
        }
        for (var i=0; i<jumpUserTargets.length; i++)
        {
            //logDebug("target user: " + jumpUserTargets[i].userName, getId("CA-t-" + jumpUserTargets[i].id));
            getId('CA-t-' + jumpUserTargets[i].id).onclick=getFunctionWithArgs(jumpToUser, [jumpUserTargets[i].userName]);
        }
        for (var i=0; i<bipUserTargets.length; i++)
        {
            //logDebug("Bip user: " + bipUserTargets[i].userName, getId("CA-bip-" + bipUserTargets[i].id));
            getId('CA-bip-' + bipUserTargets[i].id).onclick=getFunctionWithArgs(bipUser, [bipUserTargets[i].userName]);
        }
        
    }
    
    function setupStopAlertOnKeywords()
    {
        var patches=getElementsByClassName("CA-alertKW", getId("chat"));
        //log("patches: ", patches); 
        for (var i=0; i<patches.length; i++)
        {
            
            patches[i].onclick=removeAlert;
        }
    }
    
    function processMessages()
    {
        /*splitLastPost();
    removeMultiples();*/
        
        removeDuplicates();
        
        convertPermalinksAndLinks();
        setupStopAlertOnKeywords();
        // detect if last is from me:
        logDebug("Last message: " + lastMessageFrom);
        
        if (lastMessageFrom==me.userName || wazeChat.messages.models.last().attributes.type=="system")
        {
            //log ("message from me or from system! Do not notify...");
            doNotNotifyNext=true;
        }
        
    }
    /*
function splitLastPost()
{
    var messages=getElementsByClassName("message normal-message", getId("chat"));
    if (messages.length==0) return;
    var message=messages[messages.length-1];
    if (message.hasAttribute('messageCount')) // visited
    {
        // cut
        var body=message.children[1];
        var userName=message.firstChild.innerHTML;
        //var userName=message.fisrtChild.firstChild.innerHTML; // TODO
        
        
        var divMsg=document.createElement('div');
        divMsg.className="message normal-message";
        
        var divFrom=document.createElement('div');
        divFrom.className="from";
        divFrom.innerHTML=userName;
        divMsg.appendChild(divFrom);
        
        var divBody=document.createElement('div');
        divBody.className="body";
        
        
        
        for (var i=parseInt(message.getAttribute('messageCount')); i<body.children.length; i++)
        {
            divBody.innerHTML+=body.children[i].innerHTML;
            //log("T2 add splitted:", body.children[i].innerHTML);
        }
        divMsg.appendChild(divBody);
        message.parentNode.appendChild(divMsg);
    }
    // check if last post need to be splitted
}
*/
    /*
function removeMultiples()
{
    var messages=getElementsByClassName("message normal-message", getId("chat"));
    for (var i=0; i<messages.length; i++)
    {
        var checkedCount=0;
        if (messages[i].hasAttribute('messageCount'))
            checkedCount=messages[i].getAttribute('messageCount');
        
        var body=messages[i].getElementsByClassName('body');
        if (body.length!=1)
            continue;
        var subList=body[0].children;
        if (subList.length!=checkedCount)
            log("T2 New sub message not checked: " + (subList.length-checkedCount));
        for (var j=0; j<subList.length; j++)
        {
        }
        messages[i].setAttribute('messageCount', subList.length);
    }
}
*/
    function newMessage()
    {
        //log("has unread message bot:", hasUnreadMessages);
        logDebug("newMessage called");
        //log ("Init notification! Notify...");
        doNotNotifyNext=false;
        processMessages();
        var chatHelper=getChatHelper();
        if (doNotNotifyNext==false)
        {
            if (CA_Settings.messageSound==true)
            {
                //log("Playing sound for new message...");
                var snd = new Audio("data:audio/mp3;base64," + notificationSound);
                snd.play();
            }
        }
        else
        {
            if (hasUnreadMessages==false)
            {
                //log("has unread message: remove class");
                //var savedHandler=chatHelper.button.parentNode.parentNode.onclick;
                chatHelper.button.parentNode.parentNode.classList.remove('has-unread-messages');
                //chatHelper.button.parentNode.parentNode.onclick=savedHandler;
            }
            
        }
        hasUnreadMessages=chatHelper.button.parentNode.parentNode.className.indexOf(' has-unread-messages')!=-1;
        //log("has unread message eot:", hasUnreadMessages);
        //log ("end of process! Notify...");
        doNotNotifyNext=false;
    }
    /*
function setupJumpTargetOnclicks(jumpTargets) 
{
    logDebug("jumpTargets for onclick", jumpTargets);
    for (var i=0; i<jumpTargets.length; i++)
    {
        logDebug("target elt:", getId("CA-t-" + jumpTargets[i].id));
        getId("CA-t-" + jumpTargets[i].id).onclick=getFunctionWithArgs(jumpTo, [jumpTargets[i].jumpDetails]);
    }
}*/
    
    function bipUser(userName)
    {
        var inputmessage_elts = getElementsByClassName("message-input", getId("chat"));
        if (inputmessage_elts.length!=1)
            log("Error: Bip user: cannot detect input message element");
        else
        {
            var inputmessage=inputmessage_elts[0];
            var bipMessage=CA_Settings.bipPattern.replace(/\{userName\}/gi, userName);
            inputmessage.value+=bipMessage;
            window.setTimeout(setFocusOnInputMessage, 100);
        }
    }
    
    function getMessageObjectFromData(userName, message)
    {
        var res=null;
        for (var i=0; i<wazeModel.chat.messages.models.length; i++)
        {
            res=wazeModel.chat.messages.models[i];
            if (res.attributes.body==message && res.attributes.from.name==userName)
                return res;
        }
        return null;
    }
    
    function getFirstPermalink(str)
    {
        //var start=str.indexOf(baseURL);
        for (var i=0; i<baseURLs.length; i++)
        {
            //var start=str.indexOf(baseURL);
            var start=str.search(baseURLs[i]);
            if (start==-1)
                //return null;
                continue;
            var end=start+1;
            while (end<str.length && str.charAt(end)!=" " && str.charAt(end)!="\n") end++;
            //var permalink=
            return {start: start, end: end, permalink: str.substring(start, end)};
        }
        return null;
    }
    
    function getJumpSetFromPermalink(permalink)
    {
        logDebug("permalink: ", permalink);
        var lon=permalink.match(/lon=([\-]?[0-9]*[.]?[0-9]*)/);
        var lat=permalink.match(/lat=([\-]?[0-9]*[.]?[0-9]*)/);
        var zoom=permalink.match(/zoom=([0-9]+)/);
        var segments=permalink.match(/segments=(([0-9]+[,]?)+)+/);
        var nodes=permalink.match(/nodes=(([0-9]+[,]?)+)+/);
        var venues=permalink.match(/venues=(([0-9|\.|\-]+[,]?)+)+/);
        var mapUpdateRequest=permalink.match(/mapUpdateRequest=([0-9]*)/);
        logDebug("lon: ", lon);
        logDebug("lat: ", lat);
        logDebug("zoom: ", zoom);
        logDebug("segments: ", segments);
        logDebug("nodes: ", nodes);
        logDebug("venues: ", venues);
        logDebug("mapUpdateRequest: ", mapUpdateRequest);
        return {lon: (lon==null)?null:(lon.length==2?parseFloat(lon[1]):null),
                lat: (lat==null)?null:(lat.length==2?parseFloat(lat[1]):null),
                zoom: (zoom==null)?null:(zoom.length==2?parseFloat(zoom[1]):null),
                segments: segments?(segments[1].split(',')):null,
                nodes: nodes?(nodes[1].split(',')):null,
                venues: venues?(venues[1].split(',')):null,
                mapUpdateRequest: mapUpdateRequest?(mapUpdateRequest[1].split(',')):null
               };
    }
    
    
    /*function beforeNewMessage()
{
    logDebug("Before new message (/" + wazeChat.messages.models.length + "):", wazeChat.messages.models[wazeChat.messages.models.length-1]);
}
*/
    
    function getRankOfLiveUser(userName)
    {
        for (var i=0; i<wazeChat.users.models.length; i++)
        {
            if (wazeChat.users.models[i].attributes.name==userName)
                return wazeChat.users.models[i].attributes.rank;
        }
        /*for (var i=0; i<wazeModel.liveUsers.users.models.length; i++)
        {
            if (wazeModel.liveUsers.users.models[i].attributes.name==userName)
                return wazeModel.liveUsers.users.models[i].attributes.rank;
        }*/
        return null;
    }
    
    function jumpToUser(userName)
    {
        var user=null;
        for (var i=0; i<wazeChat.users.models.length; i++)
        {
            user=wazeChat.users.models[i];
            if (user.attributes.name==userName)
                break;
            else
                user=null;
        }
        if (user)
        {
            jumpTo({lon: user.attributes.center.lon, lat: user.attributes.center.lat, zoom: null, segments: null, nodes: null, venues: null, mapUpdateRequest: null});
        }
        else
        {
            log("Can't find user: loggued out or invisible???");
        }
        return false;
    }
    
    function jumpTo(jumpSet)
    {
        logDebug("jumping to: " , jumpSet);
        
        selectionManager.unselectAll();
        // force chat jumper init:
        //    chatJumperRetry=chatJumperMaxRetry;
        //    ChatJumper_init();
        
        if (typeof(ChatJumper)!=='undefined')
        {
            if (ChatJumper.isLast) { // Plese, dont erase Jump whet jumping again
            } else {
                var c = wazeMap.getCenter(); // Gets yours center of view and remeber it
                var zoom = wazeMap.getZoom(); // Gets zoom level
                ChatJumper.last = [c.lon,c.lat];
                ChatJumper.zoom = zoom;
                ChatJumper.isLast = true;
                ChatJumper.saveLS();
                ChatJumper.showButton(); //add in chat window new "back" button
            }
        }
        selectDataWaitForMergeEnd=false;
        if (jumpSet.segments || jumpSet.nodes || jumpSet.venues || jumpSet.mapUpdateRequest)
        {
            currentJumpSet=jumpSet;
            wazeModel.events.register("mergestart", null, mergestart);
        }
        
        var xy = OpenLayers.Layer.SphericalMercator.forwardMercator(jumpSet.lon, jumpSet.lat);
        if (jumpSet.zoom)
            wazeMap.setCenter(xy, jumpSet.zoom);
        else
            wazeMap.setCenter(xy);
        
        if (jumpSet.segments || jumpSet.nodes || jumpSet.venues || jumpSet.mapUpdateRequest)
        {
            window.setTimeout(getFunctionWithArgs(selectData, [jumpSet]), 500);
        }
    }
    
    function mergestart ()
    {
        log("Permalink is far!");
        selectDataWaitForMergeEnd=true;
        wazeModel.events.unregister("mergestart", null, mergestart);
        wazeModel.events.register("mergeend", null, mergeend);
    }
    
    function mergeend ()
    {
        log("Data loaded, now, try to select data if any...");
        wazeModel.events.unregister("mergeend", null, mergeend);
        selectDataWaitForMergeEnd=false;
        selectData(currentJumpSet);
    }
    
    function selectData(jumpSet)
    {
        /*if (arguments.length==0)
    {
        var jumpSet=currentJumpSet;
        currentJumpSet=null;
        wazeModel.events.unregister("mergeend", null, selectData);
    //}*/
        
        if (selectDataWaitForMergeEnd==true)
        {
            log ("waiting for data...");
            return;
        }
        wazeModel.events.unregister("mergestart", null, mergestart);
        wazeModel.events.unregister("mergeend", null, mergeend);
        
        //log ('Jump set: ', jumpSet);
        var success=true;
        var notFound=[];
        var elements=0;
        if (jumpSet.segments)
        {
            var segs=[];
            for (var i=0; i<jumpSet.segments.length; i++)
            {
                var segId=parseInt(jumpSet.segments[i]);
                if (typeof(wazeModel.segments.objects[segId])==='undefined')
                {
                    success=false;
                    notFound.push(segId);
                }
                else
                    segs.push(wazeModel.segments.objects[segId]);
            }
            //if (success)
            elements=jumpSet.segments.length;
            selectionManager.select(segs); 
        }
        if (jumpSet.nodes)
        {
            var nodes=[];
            for (var i=0; i<jumpSet.nodes.length; i++)
            {
                var nodeId=parseInt(jumpSet.nodes[i]);
                if (typeof(wazeModel.nodes.objects[nodeId])==='undefined')
                {
                    success=false;
                    notFound.push(nodeId);
                }
                else
                    nodes.push(wazeModel.nodes.objects[nodeId]);
            }
            //if (success)
            elements=jumpSet.nodes.length;
            selectionManager.select(nodes); 
        }
        if (jumpSet.venues)
        {
            wazeMap.landmarxLayer.setVisibility(true);
            var venues=[];
            for (var i=0; i<jumpSet.venues.length; i++)
            {
                var venueId=jumpSet.venues[i];
                if (typeof(wazeModel.venues.objects[venueId])==='undefined')
                {
                    success=false;
                    notFound.push(venueId);
                }
                else
                    venues.push(wazeModel.venues.objects[venueId]);
            }
            //if (success)
            elements=jumpSet.venues.length;
            selectionManager.select(venues); 
        }
        
        if (jumpSet.mapUpdateRequest && jumpSet.mapUpdateRequest.length>=1 && !jumpSet.segments && !jumpSet.nodes && !jumpSet.venues)
        {
            var mp = wazeModel.problems.objects[parseInt(jumpSet.mapUpdateRequest[0])];
            var tp=null;
            
            if (mp==null)
                tp = wazeModel.turnProblems.objects[parseInt(jumpSet.mapUpdateRequest[0])];
            
            logDebug("mp :" , mp);
            logDebug("tp :" , tp);
            if (mp!=null)
            {
                problemsControl.selectProblem(mp);
                success=true;
            }
            if (tp!=null)
            {
                problemsControl.selectProblem(tp);
                success=true;
            }
        }
        if (!success)
        {
            if (jumpSet.hasOwnProperty('attempt') && jumpSet.attempt>=2)
            {
                log("Select data failed...");
                if (confirm('Some elements can\'t be found.\nSelection: ' + selectionManager.selectedItems.length + '/' + elements + '\nNot found: ' + (notFound.length!=0?('Elements ids: ' + notFound.join(', ') + '\n'):'') + 'Try again to select elements?'))
                {
                    //currentJumpSet=jumpSet;
                    //window.setTimeout(selectData, 500);
                    window.setTimeout(getFunctionWithArgs(selectData, [jumpSet]), 500);
                    //return;
                }
                return;
            }
            if (jumpSet.hasOwnProperty('attempt'))
                jumpSet.attempt++;
            else
                jumpSet.attempt=0;
            log ("select data: attempt: " + jumpSet.attempt);
            window.setTimeout(getFunctionWithArgs(selectData, [jumpSet]), 500);
        }
        else
            log("Data selected...:", jumpSet);
    }
    
    function setupBells()
    {
        var userLists = getElementsByClassName("list-unstyled user-list", getId("chat"));
        if (userLists.length==1)
        {
            var userList=userLists[0];
            var users=userList.children;
            //log("userlist:", userList);
            //log("users:", users);
            //log ("setupBells users.length", users.length);
            if (users.length==0 || (users.length==1 && wazeChat.attributes.visible))
            {
                window.setTimeout(setupBells, 500);
                return;
            }
            for (var u=0; u<users.length; u++)
            {
                var user=users[u];
                //log("user", user);
                //log("user child nodes count", user.childNodes.length);
                if (user.childNodes.length==1 || (user.childNodes.length==2 && user.childNodes[1].nodeName=='HR'))
                {
                    var userId=user.firstChild.getAttribute('data-id');
                    var userName="";
                    for (var i=0; i<wazeChat.users.models.length; i++)
                        if (wazeChat.users.models[i].attributes.id==userId)
                        {
                            userName=wazeChat.users.models[i].attributes.name;
                            break;
                        }
                        
                        //log("userName", userName);
                        if (userName!=me.userName && userName!="")
                        {
                            // ok add the bell
                            //log ('bell added');
                            var bell = document.createElement("a");
                            bell.href="#";
                            bell.id='CA-bell-' + userName;
                            var i0 = document.createElement('img');
                            i0.src="data:image/png;base64," + chipIcon;
                            i0.style.width="15px";
                            i0.style.cssFloat="left";
                            
                            var i1 = document.createElement('img');
                            i1.src="data:image/png;base64," + bellIcon;
                            i1.style.width="15px";
                            i1.style.cssFloat="left";
                            
                            var i2 = document.createElement('img');
                            i2.src="data:image/png;base64," + zzzIcon;
                            i2.style.width="15px";
                            i2.style.cssFloat="left";
                            
                            bell.appendChild(i0);
                            bell.appendChild(i1);
                            bell.appendChild(i2);
                            changeIconUserStatus(bell, 2);
                            //bell.innerHTML='<img src="data:image/png;base64,' + zzzIcon + '" style="width: 15px; float: left;" />';
                            bell.style.cssFloat='left';
                            bell.style.margin='0px';
                            bell.style.padding='0px';
                            bell.style.marginLeft='-15px';
                            //bell.style.backgroundColor='#585858';
                            if (wazeChat.attributes.visible==true)
                                bell.onclick=getFunctionWithArgs(bipUser, [userName]);
                            user.insertBefore(bell, user.firstChild);
                        }
                }
                else
                {
                    if (user.childNodes.length==2)
                    {
                        var bell = user.firstChild;
                        if (bell.onclick==null)
                        {
                            var userId=user.childNodes[1].getAttribute('data-id');
                            var userName="";
                            for (var i=0; i<wazeChat.users.models.length; i++)
                            {
                                if (wazeChat.users.models[i].attributes.id==userId)
                                {
                                    userName=wazeChat.users.models[i].attributes.name;
                                    break;
                                }
                            }
                            //log("userName", userName);
                            if (userName!=me.userName && userName!="")
                            {
                                bell.onclick=getFunctionWithArgs(bipUser, [userName]);
                                //log("Bell looses handler!", user);
                            }
                        }
                    }
                }
            }
        }
    }
    
    function userEnter(e)
    {
        log(e.attributes.name + " has joined");
        // we log into chat room
        // check and add bells
        //if (wazeChat.attributes.visible==true)
        //{
        setupBells();
        //}
        if (e.attributes.name!=me.userName && CA_Settings.systemMessageOnJoinLeave==true)
            addSystemMessage(e.attributes.name + ' (' + (e.attributes.rank+1) + ') ' + tr('has joined'));
        
        if (e.attributes.name==me.userName)
            getId('chat').getElementsByClassName('message-list')[0].style.maxHeight="250px";
        
        sortUserList();
    }
    
    function removeBells()
    {
        // remove bells
        var userLists = getElementsByClassName("list-unstyled user-list", getId("chat"));
        if (userLists.length==1)
        {
            var userList=userLists[0];
            var users=userList.children;
            //log("userlist:", userList);
            //log("users:", users);
            for (var u=0; u<users.length; u++)
            {
                var user=users[u];
                if (user.children.length>1)
                {
                    //log ("remove bells: ", user);
                    //log ("remove bells 1st child: ", user.firstChild);
                    user.removeChild(user.firstChild);
                }
            }
        }
    }
    function userLeave(e)
    {
        log(e.item.attributes.name + " has left");
        var bell=getId('CA-bell-' + e.item.attributes.name);
        if (bell!=null)
            bell.parentNode.removeChild(bell);
        if (e.item.attributes.name!=me.userName && CA_Settings.systemMessageOnJoinLeave==true)
            addSystemMessage(e.item.attributes.name  + ' (' + (e.item.attributes.rank+1) + ') ' + tr('has left'));
        if (e.item.attributes.name==me.userName)
        {
            getId('chat').getElementsByClassName('message-list')[0].style.maxHeight="290px";
            setupBells();
        }
    }
    
    function addSystemMessage(message)
    {
        /*
    var messageList = getElementsByClassName("message-list", getId("chat"))[0];
    //var scrollDown=messageList.scrollTop >= messageList.scrollHeight;
    var scrollDown =(messageList.offsetHeight + messageList.scrollTop >= messageList.scrollHeight);
    var fakeMsg=document.createElement('div');
    fakeMsg.className="message system-message";
    fakeMsg.innerHTML='<div class="from"></div><div class="body"><div style="direction: ltr; text-align: left;">' + message + '<span style="float: right; color: #A0A0A0; font-size: smaller;">' + (CA_Settings.showDate?(new Date().toLocaleString()):(new Date().toLocaleTimeString())) + '</span>' + '</div></div>';
    messageList.appendChild(fakeMsg);
    var messageNotifications = getElementsByClassName("unread-messages-notification", getId("chat"));
    if (messageNotifications.length==1 && messageNotifications[0].style.display=="none" && scrollDown==true)
    	setTimeout(scrollToBottom, 500);*/
        wazeChat.messages.add(new WazeModelChatMessage.ChatMessage({type: 'system', body: message, from:{}})); 
    }
    
    function scrollToBottom()
    {
        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
        messageList.scrollTop = messageList.scrollHeight;
    }
    
    function escapeRegExp(str)
    {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    
    function replaceSmileys(text)
    {
        var regex;
        for (var k in smileys)
        {
            if (smileys.hasOwnProperty(k)) 
            {
                
                regex = new RegExp(escapeRegExp(k), "g");
                //text=text.replace(regex, '<img title="' + k + '" src="' + smileys[k] + '" />');
                text=text.replace(regex, function () {
                    if (isInsideLink(arguments[arguments.length-1], arguments[arguments.length-2]))
                        return arguments[0];
                    else
                        return '<img title="' + arguments[0] + '" src="' + smileys[arguments[0]] + '" />';
                });
            }
        }
        regex = new RegExp('emoji([0-9]{1,3})', "g");
        text=text.replace(regex, function () {
            if (isInsideLink(arguments[arguments.length-1], arguments[arguments.length-2]))
                return arguments[0];
            else
                return '<img title="' + arguments[0] + '" src="https://s3.amazonaws.com/tapatalk-emoji/' + arguments[0] + '.png" />';
        });
        return text;
    }
    
    function sortUserList()
    {
        setupBells();
        if (sortUserListDisbled==true) return;
        var now = new Date();
        var sortMode=CA_Settings.sortUserList;
        if (sortMode==0 && CA_Settings.sortUserListActivity==false) return;
        
        var userList=getElementsByClassName('list-unstyled user-list', getId('chat'))[0];
        var users=userList.children;
        
        
        for (var i=0; i<users.length; i++)
        {
            if (users[i].getElementsByClassName('user').length==0)
            {
                while (users[i].firstChild)
                {
                    users[i].removeChild(users[i].firstChild);
                }
            }
        }
        
        
        var changed=true;
        while (changed==true)
        {
            changed=false;
            for (var i=0; i<users.length-1; i++)
            {
                var next=i+1;
                
                if (users[i].hasChildNodes()==false) continue;
                var realUserName=getElementsByClassName('username', users[i])[0].innerHTML;
                getElementsByClassName('username', users[i])[0].setAttribute('title', realUserName);
                var userName=realUserName.toLowerCase();
                var userRank=getElementsByClassName('rank', users[i])[0].innerHTML;
                userRank=userRank.replace(/\s/g, '');
                
                while (next<users.length && users[next].hasChildNodes()==false) next++;
                if (next>=users.length) continue;
                
                var nextRealUserName=getElementsByClassName('username', users[next])[0].innerHTML;
                var nextUserName=nextRealUserName.toLowerCase();
                var nextUserRank=getElementsByClassName('rank', users[next])[0].innerHTML;
                nextUserRank=nextUserRank.replace(/\s/g, '');
                
                var useSecondarySort=!CA_Settings.sortUserListActivity;
                
                if (CA_Settings.sortUserListActivity==true)
                {
                    var idleTime1=now.getTime();
                    var idleTime2=now.getTime();
                    var idleTime3=now.getTime();
                    var idleTime4=now.getTime();
                    if (userActivity.hasOwnProperty(realUserName))
                    {
                        idleTime1-=userActivity[realUserName].lastMove.getTime();
                        idleTime2-=userActivity[realUserName].lastPost.getTime();
                    }
                    if (userActivity.hasOwnProperty(nextRealUserName))
                    {
                        idleTime3-=userActivity[nextRealUserName].lastMove.getTime();
                        idleTime4-=userActivity[nextRealUserName].lastPost.getTime();
                    }
                    
                    var idleTimeU1=Math.min(idleTime1, idleTime2);
                    var idleTimeU2=Math.min(idleTime3, idleTime4);
                    
                    //if (idleTimeU1/1000 >= 1200 && idleTimeU2/1000 >= 1200) // Zzz users
                    //    useSecondarySort=true;
                    
                    // group by color
                    if (idleTimeU1/1000<60)idleTimeU1=0;
                    else if (idleTimeU1/1000<120)idleTimeU1=1;
                        else if (idleTimeU1/1000<300)idleTimeU1=2;
                        else if (idleTimeU1/1000<1200)idleTimeU1=3;
                            else idleTimeU1=4;
                    
                    if (idleTimeU2/1000<60)idleTimeU2=0;
                    else if (idleTimeU2/1000<120)idleTimeU2=1;
                        else if (idleTimeU2/1000<300)idleTimeU2=2;
                        else if (idleTimeU2/1000<1200)idleTimeU2=3;
                            else idleTimeU2=4;
                    
                    users[i].setAttribute('iddleTime', idleTimeU1);
                    
                    if (idleTimeU1==idleTimeU2)
                        useSecondarySort=true;
                    
                    if (idleTimeU1>idleTimeU2)
                    {
                        //log ('sort activity: ' + userName, userActivity[userName]);
                        //log ('sort activity next: ' + nextUserName, userActivity[nextUserName]);
                        //log ('sort activity: ' + userName + ' ' + idleTime1 + ' ' + idleTime2);
                        //log ('sort activity: ' + nextUserName + ' ' + idleTime3 + ' ' + idleTime4);
                        //log ('sort activity: invert! ' + realUserName + ' ' + nextRealUserName );
                        userList.insertBefore(users[next], users[i]);
                        //log ("sort: invert " + userName + " " + userRank + " <-> " +  nextUserName + " " + nextUserRank);
                        changed=true; 
                        //useSecondarySort=false;
                        continue;
                        //                        return;
                    }
                    
                }
                
                if (useSecondarySort==true)
                {
                    if (sortMode==1 || (sortMode==2 && userRank==nextUserRank)) // userName (or rank equal)
                    {
                        if (userName>nextUserName)
                        {
                            userList.insertBefore(users[next], users[i]);
                            //log ("sort: invert " + userName + " " + userRank + " <-> " +  nextUserName + " " + nextUserRank);
                            changed=true;
                        }
                    }
                    else if (sortMode==2)
                    {
                        if (userRank<nextUserRank)
                        {
                            userList.insertBefore(users[next], users[i]);
                            //log ("sort: invert " + userName + " " + userRank + " <-> " +  nextUserName + " " + nextUserRank);
                            changed=true;
                        }
                        
                    }
                    else if (sortMode==3)
                    {
                        var userObj=null;
                        var nextuserObj=null;
                        
                        for (var u=0; u<wazeChat.users.models.length; u++)
                        {
                            if (wazeChat.users.models[u].attributes.name==realUserName)
                            {
                                userObj=wazeChat.users.models[u];
                                if (nextuserObj!=null)
                                    break;
                                continue;
                            }
                            if (wazeChat.users.models[u].attributes.name==nextRealUserName)
                            {
                                nextuserObj=wazeChat.users.models[u];
                                if (userObj!=null)
                                    break;
                                continue;
                            }
                        }
                        if (userObj!=null && nextuserObj!=null)
                        {
                            var du=0;
                            var dnu=0;
                            var myPosition=OpenLayers.Layer.SphericalMercator.inverseMercator(wazeMap.getCenter().lon, wazeMap.getCenter().lat);
                            //log("myPosition", myPosition);
                            if (userObj.attributes.name==me.userName)
                                continue;
                            if (nextuserObj.attributes.name==me.userName)
                                dnu=0;
                            else
                                dnu=(myPosition.lon-nextuserObj.attributes.center.lon)*(myPosition.lon-nextuserObj.attributes.center.lon)+(myPosition.lat-nextuserObj.attributes.center.lat)*(myPosition.lat-nextuserObj.attributes.center.lat);                            

                            du=(myPosition.lon-userObj.attributes.center.lon)*(myPosition.lon-userObj.attributes.center.lon)+(myPosition.lat-userObj.attributes.center.lat)*(myPosition.lat-userObj.attributes.center.lat);
                            //log("d " + realUserName + " " + du  + " d " + nextRealUserName + " " + dnu);
                            if (du>dnu)
                            {
                                userList.insertBefore(users[next], users[i]);
                                //log ("sort: invert " + userName + " " + userRank + " <-> " +  nextUserName + " " + nextUserRank);
                                changed=true;
                            }
                        }
                        
                    }
                }
            }
        }
        
        // remove separators
        for (var i=0; i<users.length; i++)
        {
            var next=i+1;
            if (users[i].hasChildNodes()==false) continue;
            
            var hrs = users[i].getElementsByTagName("hr");
            for (var hr=0; hr<hrs.length; hr++)
                users[i].removeChild(hrs[hr]);
        }

        // add separator if sort by activity
        if (CA_Settings.sortUserListActivity==true)
        {
            for (var i=0; i<users.length-1; i++)
            {
                var next=i+1;
                if (users[i].hasChildNodes()==false) continue;
                
                /*var hrs = users[i].getElementsByTagName("hr");
                for (var hr=0; hr<hrs.length; hr++)
                    users[i].removeChild(hrs[hr]);
                */
                while (next<users.length && users[next].hasChildNodes()==false) next++;
                if (next>=users.length) continue;
                
                hrs = users[next].getElementsByTagName("hr");
                for (var hr=0; hr<hrs.length; hr++)
                    users[next].removeChild(hrs[hr]);
                
                if (users[i].getAttribute('iddleTime')!=users[next].getAttribute('iddleTime'))
                {
                    var hr=document.createElement('hr');
                    hr.style.margin='0px';
                    hr.style.color='black';
                    hr.style.backgroundColor='black';
                    hr.style.height='1px';
                    users[i].appendChild(hr);
                }
            }
        }
        //log ("sort: ", userList);
    }
    
    function disconnectSocket()
    {
        log ("Reset chat socket");
        wazeChat._marx.socket.removeAllListeners();
        wazeChat._marx.socket.on("disconnect", function(e) {
            return function() {
                log("Socket disconnected.");
            }
        }(wazeChat._marx));
        
        try
        {
            wazeChat._marx.socket.socket.disconnect();
            wazeChat._marx.socket.socket.transport.websocket.close();
            //wazeChat._marx.socket.socket.onDisconnect("booted");
        }
        catch (err)
        {
            log ("Socket deconnection error: ", err);
            log("error wazeChat._marx.socket", wazeChat._marx.socket);
        }
        /*
        if (wazeChat._marx.socket.socket.connected==true || wazeChat._marx.socket.socket.open==true)
        {
            log ("wait for disconnection...");
            window.setTimeout(function () {disconnectSocket(roomName); window.setTimeout(setupBells); }, 1000);
            return;
        }*/
        
        delete (io.sockets[wazeConfig.marx.server]);

    }
    
    function reconnectSocket()
    {
        var status = {
            NotConnected: 0,
            FirstConnection: 1,
            Reconnection: 2
        };
        var t = {};
        
        var wazeLoginManager=require ("Waze/LoginManager");
        t.sessionId=$.cookie(wazeLoginManager.prototype.COOKIE_NAME);
        var address = wazeConfig.marx.server + "/chat?" + $.param(t);
        var socket = io.connect(address, {"try multiple transports": !1, 'force new connection': true, 'forceNew': true});
        //log ("socket.socket.open", socket.socket.open);
        socket.on("connect", function(e) {
            return function() {
                log("Socket connection.");
//                return status.FirstConnection;
                return e.mode === status.NotConnected ? (e.mode = status.FirstConnection, e.trigger("firstConnect")) : (e.mode = status.Reconnection, e.trigger("reconnect"))
            }
        }(wazeChat._marx));
        socket.on("disconnect", function(e) {
            return function() {
                log("Socket disconnected.");
                return e.trigger("disconnect")
            }
        }(wazeChat._marx));
        socket.on("connect_error", function(e) {
            return function() {
                log("socket connection error: " , e);
            }
        }(wazeChat._marx));
        
        io.sockets[wazeConfig.marx.server]=socket.socket;
        
        wazeChat._marx.socket=socket;
        wazeModel.liveUsers._marx.socket=socket;
    }
    
    function resetChatSocket(roomName, force, from, local)
    {
        var keepRoomName=getKeepRoomName();
        if (keepRoomName==null || keepRoomName=='null')
        {
            setKeepRoomName(roomName);
            keepRoomName=roomName;
        }
        //log ("Call to reset chat socket. Room: " + roomName + " already reseting: " + (socketReconnection?"yes -> exiting":"no -> reseting!") );
        //if (socketReconnection) return;
        
        log ("Call to reset chat socket. FROM " + (lastRoomName==null?"NOT SET YET":lastRoomName) + "  TO " + roomName + " - Force: " + force + " - from: " + from + " - local "  + local);
        
        if (!force)
        {
/*            if (!local && keepRoomName!=roomName)
            {
                resetChatSocket(keepRoomName, true, "force keep room name", true);
                return;
            }*/
            if (lastRoomName!=null && roomName==lastRoomName) return;
            if (lastRoomName==null)
            {
                lastRoomName=roomName;
                return;
            }
        }
        lastRoomName=roomName;
        if (local)
        	setKeepRoomName(roomName);
        
        socketReconnection=true;
        disconnectSocket();
        userActivity={};
        wazeModel.chat.set("room", wazeModel.chat._findOrCreateRoom(roomName), {pushToServer: false});
        window.setTimeout(function () {
            reconnectSocket();
            window.setTimeout(function () {
                wazeChat._registerSocketEvents();
                wazeModel.liveUsers._registerMarxEvents();
                // replace chage:room signal:
                wazeChat._marx.socket.on("me:change:room", $.proxy(function (e) { resetChatSocket(e.room.name, false, "socket patched", false);}, wazeChat));
                
                /*wazeChat._marx.socket.emit("user:change:roomName", {
                    roomName: roomName
                });*/
                
                //window.setTimeout(function () { socketReconnection=false; }, 3000);
                socketReconnection=false;
                //wazeModel.chat.set("room", wazeModel.chat._findOrCreateRoom(roomName));
                
            }, 500);
        }, 500);
        //wazeChat._activate();
    }
    
    
    function patchManualRoomChange()
    {
        var rooms=getElementsByClassName('dropdown-menu rooms', getId('chat'))[0].children;
        //log("ROOM Changed: rooms: ", rooms);
        for (var i=0; i<rooms.length; i++)
        {
            var aelement=rooms[i].firstChild;
            log("Patching: ", aelement.innerHTML);
            aelement.onclick=getFunctionWithArgs(resetChatSocket, [aelement.innerHTML, false, "menu click " + aelement.innerHTML + " patched", true]);
        }
   
    }
    
    function getKeepRoomName()
    {
        if (typeof(localStorage.WMEChatAddon_keepRoom)==="undefined")
            return null;
        return (localStorage.WMEChatAddon_keepRoom);
    }

    function setKeepRoomName(roomName)
    {
        localStorage.WMEChatAddon_keepRoom=roomName;
    }

    
    function roomChanged(e)
    {
		patchManualRoomChange();
        //window.setTimeout(function () { resetChatSocket(e.newValue.attributes.name, false, "Room change triggered on chat object"); window.setTimeout(setupBells, 2000); });        
        
        window.setTimeout(setupBells, 1000);
		log("Room changed to: " + e.newValue.attributes.name);
        
        //setupBells();
        if (!roomForced)
        {
            roomForced=true;
            
            //log("ROOM Changed:" , e);
            if (CA_Settings.forceRoom!='')
            {
                //log("ROOM Changed: I am in : " + e.newValue.attributes.name);
                if (CA_Settings.forceRoom!=e.newValue.attributes.name)
                {
                    //log("ROOM Changed: force to: " + CA_Settings.forceRoom);
                    // setup list of available rooms:
                    var rooms=getElementsByClassName('dropdown-menu rooms', getId('chat'))[0].children;
                    //log("ROOM Changed: rooms: ", rooms);
                    for (var i=0; i<rooms.length; i++)
                    {
                        var aelement=rooms[i].firstChild;
                        //log("ROOM Changed: a el: ", aelement);
                        if (aelement.innerHTML==CA_Settings.forceRoom)
                        {
                            log("Force room change to " + aelement.innerHTML);
                            aelement.click();
                            break;
                        }
                    }
                }
            }
        }
//            wazeChat._events.unregister("change:room", null, roomChanged);
    }
    
    function getFunctionWithArgs(func, args)
    {
        return (
            function ()
            {
                var json_args = JSON.stringify(args);
                return function()
                {
                    var args = JSON.parse(json_args);
                    func.apply(this, args);
                }
            }
        )();
    }
    
    
    function PopupPannel(name, w, h, bgcolor, titleW, titleH, directionX, directionY)
    {
        this.name=name;
        this.w=w;
        this.h=h;
        
        this.tw=titleW;
        this.th=titleH;
        
        this.dx=directionX;
        this.dy=directionY;
        
        
        this.pannel_elt = document.createElement("div");
        this.pannel_elt.id = 'popup-pannel-' + name;
        this.pannel_elt.className = 'popup-pannel-class-' + name;
        this.pannel_elt.style.width = titleW;
        //this.pannel_elt.onmouseleave = getFunctionWithArgs(pannel_mouseleave, [name]);
        
        
        this.pannelTrigger_elt = document.createElement("div");
        this.pannelTrigger_elt.id = 'popup-pannel-trigger-' + name;
        this.pannelTrigger_elt.className = 'popup-pannel-trigger-class-' + name;
        this.pannelTrigger_elt.onclick = getFunctionWithArgs(trigger_mouseover, [name, w, h, titleW, titleH, directionX, directionY]);
        this.pannelTrigger_elt.style.backgroundColor = bgcolor;
        this.pannelTrigger_elt.style.width=titleW;
        this.pannelTrigger_elt.style.height=titleH;
        
        this.pannelContents_elt = document.createElement("div");
        this.pannelContents_elt.id = 'popup-pannel-contents-' + name;
        this.pannelContents_elt.className = 'popup-pannel-contents-closed-class-' + name;
        this.pannelContents_elt.style.backgroundColor = bgcolor;
        
        
        this.pannel_elt.appendChild(this.pannelTrigger_elt);
        this.pannel_elt.appendChild(this.pannelContents_elt);
        
        this.installInside=installInside;
        this.setTriggerInnerHTML=setTriggerInnerHTML;
        this.setContentsInnerHTML=setContentsInnerHTML;
        
        function trigger_mouseover (name, w, h, tw, th, dx, dy)
        {
            var elt = document.getElementById('popup-pannel-contents-' + name);
            elt.style.width = w;
            elt.style.height = h;
            if (dx<0)
            {
                elt.style.left= "-" + w;
                elt.style.marginLeft=tw;
            }
            if (dy<0)
            {
                elt.style.top= "-" + h;
                //elt.style.marginTop = "-" + h;
            }
            else
                elt.style.marginBottom = "-" + h;
            elt.className='popup-pannel-contents-open-class-' + name;
            document.getElementById('popup-pannel-contents-' + name).onmouseleave = getFunctionWithArgs(pannel_mouseleave, [name]);
            var triggerElt = document.getElementById('popup-pannel-trigger-' + name);
            if (dy<0)
            {
                triggerElt.style.borderTopRightRadius= "0px";
                triggerElt.style.borderTopLeftRadius= "0px";
            }
            else
            {
                triggerElt.style.borderBottomRightRadius= "0px";
                triggerElt.style.borderBottomLeftRadius= "0px";
            }   
        };
        
        function pannel_mouseleave (name)
        {
            var elt = document.getElementById('popup-pannel-contents-' + name);
            elt.style.width = "0px";
            elt.style.height = "0px";
            elt.className='popup-pannel-contents-closed-class-' + name;
            var triggerElt = document.getElementById('popup-pannel-trigger-' + name);
            if (this.dy==-1)
            {
                triggerElt.style.borderTopRightRadius= "5px";
                triggerElt.style.borderTopLeftRadius= "5px";
            }
            else
            {
                triggerElt.style.borderBottomRightRadius= "5px";
                triggerElt.style.borderBottomLeftRadius= "5px";
            }   
            document.getElementById('popup-pannel-contents-' + name).onmouseleave=null;
        };
        
        function setTriggerInnerHTML (htmltext)
        {
            this.pannelTrigger_elt.innerHTML=htmltext;
        };
        
        function setContentsInnerHTML (htmltext)
        {
            this.pannelContents_elt.innerHTML=htmltext;
        };
        
        function installInside (node)
        {
            //var cssElt=document.getElementById("popup-pannel-css");
            //if (cssElt==null)
            //{
            var cssElt = document.createElement("style");
            cssElt.type = "text/css";
            var css="";
            css += '.popup-pannel-class-' + this.name + ' { margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-bottom: 2px; padding-top: 2px; padding-left: 5px; padding-right: 5px; }';
            css += '.popup-pannel-trigger-class-' + this.name + ' { cursor: pointer; align: right; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; padding-bottom: 2px; padding-top: 2px; padding-left: 5px; padding-right: 5px;}';
            css += '.popup-pannel-contents-closed-class-' + this.name + ' { float: left; position: relative; left: 0px; width: 0px; height: 0px; overflow: hidden;}';
            css += '.popup-pannel-contents-open-class-' + this.name + ' { float: left; position: relative; left: 0px; width: 0px; height: 0px; overflow: hidden; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; padding-bottom: 2px; padding-top: 2px; padding-left: 5px; padding-right: 5px;}';
            cssElt.innerHTML = css;
            document.body.appendChild(cssElt);
            //}
            
            node.appendChild(this.pannel_elt);
        };
    }
    
    /************************** CHAT JUMPER *****************************
 * 
 */
    /*
function ChatJumper_init()
{
    if (typeof(ChatJumper)==='undefined')
    {
//        if (chatJumperRetry<chatJumperMaxRetry)
//        {
 //           chatJumperRetry++;
//            log("Can't find chat jumper. Waiting...");
//            window.setTimeout(ChatJumper_init, 1000);
//            return;
//        }
        log("Chat jumper not installed, or not loaded yet...");
        log("Using internal chat jumper copy...");
        ChatJumper =  { 
            last: new Array(),
            isLast: false,
            isLSsupported: false,
            zoom: false
        };
        
        ChatJumper.init = function() {
            // first presave oryginalcode
            unsafeWindow.W.Presenter.ChatUser.prototype._onClickChatJumper = unsafeWindow.W.Presenter.ChatUser.prototype._onClick;
            
            // then change it to new
            unsafeWindow.W.Presenter.ChatUser.prototype._onClick = function (e){
                var t;
                if (ChatJumper.isLast) { // Plese, dont erase Jump whet jumping again
                } else {
                    var c = this.map.getCenter(); // Gets yours center of view and remeber it
                    var zoom = this.map.getZoom(); // Gets zoom level
                    ChatJumper.last = [c.lon,c.lat];
                    ChatJumper.zoom = zoom;
                    ChatJumper.isLast = true;
                    ChatJumper.saveLS();
                    ChatJumper.showButton(); //add in chat window new "back" button
                }
                this._onClickChatJumper(e)  };  /// call oryginal presaved function
            
            
            try { // check if localStorage is supported in this browser
                if ('localStorage' in window && window['localStorage'] !== null)
                    this.isLSsupported = true;
            } catch (e) {
                this.isLSsupported = false;
            }
            this.loadLS();
            setTimeout(ChatJumper.loadTimer, 1000);
        }
        
        ChatJumper.loadTimer = function() {
            try {
                if ($("#chat .header")) {
                    ChatJumper.showButton();				
                } else {
                    setTimeout(ChatJumper.loadTimer, 1000);
                }
            } catch(err) {
                setTimeout(ChatJumper.loadTimer, 1000);
            }
            
        }
        
        ChatJumper.loadLS = function() {
            if (this.isLSsupported) {
                
                try {
                    if ("string" == typeof localStorage.ChatJumper) {
                        var s = JSON.parse(localStorage.ChatJumper);
                        this.isLast = s.isLast;
                        this.last = s.last;
                        if ("undefined" != typeof s.zoom) {
                            this.zoom = s.zoom;
                        }
                    }
                    
                } catch (err) {
                    
                }
            }
        }
        
        ChatJumper.saveLS = function() {
            if (this.isLSsupported) {
                var s = {};
                s.isLast = this.isLast;
                s.last = this.last;
                s.zoom = this.zoom;
                localStorage.ChatJumper=JSON.stringify(s);
            }
        }
        
        
        ChatJumper.showButton = function() {
            if (!this.isLast) return; // dont know where to jump, so do nothing :( No jumps ;(
            
            try{
                if(document.getElementById('ChatJumper-JUMP') != null) return;
            }
            catch(e){ }
            
            var b = $('<button id="ChatJumper-JUMP" class="ChatJumper" style="float:none;color:#55ff55" title="JUMP" type="button">jump</button>');
            b.click (ChatJumper.JUMP);
            var c = $('<button id="ChatJumper-JUMP-clear" class="ChatJumper" style="padding-left:0px;float:none;color:red" title="Clear JUMP" type="button">X</button>');
            c.click (ChatJumper.Clear);
            $("#chat .header").append(b);
            $("#chat .header").append(c);
        }
        
        
        ChatJumper.JUMP = function(e) {
            if (!ChatJumper.isLast) return; // dont know where to jump, so do nothing :( No jumps ;(
            if (ChatJumper.zoom != false) {
                unsafeWindow.Waze.map.setCenter(ChatJumper.last,ChatJumper.zoom); // 3 ... 2 ... 1 ... JUMP !!!
            } else {
                unsafeWindow.Waze.map.setCenter(ChatJumper.last); // 3 ... 2 ... 1 ... JUMP !!!
            }
            ChatJumper.Clear();
        }
        
        ChatJumper.Clear = function(e) {
            ChatJumper.isLast = false;
            ChatJumper.saveLS();
            document.getElementById('ChatJumper-JUMP').parentNode.removeChild(document.getElementById('ChatJumper-JUMP'));
            document.getElementById('ChatJumper-JUMP-clear').parentNode.removeChild(document.getElementById('ChatJumper-JUMP-clear'));
        }
        
        
        ChatJumper.startcode = function () {
            // Check if WME is loaded, if not, waiting a moment and checks again. if yes init ChatJumper
            try {
                if ("undefined" != typeof unsafeWindow.W.Presenter.ChatUser ) {
                    logDebug("ChatJumper ready to jump :)");
                    this.init()
                } else {
                    logDebug("ChatJumper NOT ready to jump :(");
                    setTimeout(ChatJumper.startcode, 1000);
                }
            } catch(err) {
                setTimeout(ChatJumper.startcode, 1000);
            }
        }
        
        
        ChatJumper.startcode();

    }
    else
    {
        log("Mmm... Piece of cake... Chat jumper rocks!");
    }
}
*/
    
    var notificationSound="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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+1JkkQ/xoxRS6GYTJiBhKhoAIwLAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7UmS9D/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
    var alertSound="//tUZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAlAAAcgAAGBg0NDRQUFBsbIiIiKSkpMDA3Nzc+Pj5FRUVMTFNTU1lZWWBgZ2dnbm5udXV8fHyDg4OKioqRkZiYmJ+fn6amrKyss7OzurrBwcHIyMjPz8/W1t3d3eTk5Ovr8vLy+fn5//8AAAA5TEFNRTMuOThyAW4AAAAAAAAAABRAJAfvjgAAQAAAHIBduAD+//tUZAAAATsVTA0MYAAUwAp8oAgBhph7gbjaIBCJiu63CnACAgDFnEREL/d3DgYAAAAhO6BwMDd3/6BgYGLVWD4P5QEDkuD///+CAYAgGAjDgJTq72/l/KO///7+UBAMUCgYDAYDAYDAQAAAAAAYw9vKbeEqJ75FA4nxTiPGO/JcQHAxyD8UqKBSYgX/mZuR5YCX7T+AwGAwGAwGAwAAAAAAAM/jX8DifmJ5h5/6gSAp9xgyW+NFlZbI0AkABJKA//tUZAQAAS4z2O8E4AQlQott4JwBhQBVRqmN8ICPii50IB2GQjngcJYsMF5c45zraf8Sm////ob87Ws////NIs+u7URgNIBCIAAk2FLc/sAgsax7PrfRU4mf/UT/4lNrUONGrVxZ7RABwe+mkUxmDW9JEbpsM8APQLSgpkq4Qj+E93hhDpVNr1z39mV2/+jf1yAOByWQACdGYgeHHJdYL7/v/zAlM2XX1G8IJ7ZP/umFyNabMOgBtMIOABkeess4//tUZAaAAUQUW2igPAwkIotcCSVxhOhRa6KA7DCrCmu0V5TkI8h+gGbmtdd+F35C3/1f+q1R6xi4qInknLvaiWAAAFaX+DW15R/rkDD2/efnXg/+XCPeAJZkN/0Tk4JxRJAvRNQJQG0G5EgAyZZeND5l4ht+zed5TXsJYnyqAVMXBpAaAT8sLe+j2/YAEAUhS2QAEZ7tWUFwqq7/xA+AG5YXu7A338F9HknogpM9bqetPIe9zUVWgBANgC22gFrp//tUZAUAARUeWWlAHgQmQUt9DAchhMRbb6KA9DCfBuz0dgnCP5A9/wkOb+//lfmVgYQbAqpFP3s+ih2nXdQCAHAJbZABvSpCwx/UDS2P+n8BTQBGRAdZSfptahSUvvImctpXPwBAGgnBIAAWXTpk/F2fQhH+FJjIQekfUCCQO3+ijl3xOQe5lhCaABAJMAS7AEc6lEBeMV68ApG2ocW1du6CD/+oEPKPhj4gpNbwff+plwAAAQQctAAsdd+Pt9cH//tUZAeAEUAW2OjgLQQjotttBAchhPDFX6UAWhCYi600cB6GL+EQRqX8PtGBIDv7r3UEhK1msAcqZpJ/krsAgA2AA5AAqocFRv9MXs7UFY2f//jwhN/9f93Cj4Is6oudTNAAwAGQJcABrQibxJXO+A99RO9Xp5uiGf+/9KXpchi136BxqVPkhl9AAAZCAhKY7H1kRn64DXayGlvxysVAu/8JPeGsacPorvqvXtKGFYxIBCDkgAf16JcLdJr0Qxoo//tUZAiAASoW1lGgRQQmItqdFxIyBSBbceKA7DCjC2x0oBaCJ5FHJb6BhGaQ/d3baiZxPLuQ+roowAAAAAmwAAMvWWbHGNti7aDlgCPHDhEMsEz/+X+dFPOe37qM/QsMoCgERtq2wAA87UlohC6A8eX0DPq/4r5gOPWxCcXJnFn1v31O+CGDlsADABDAuwAJzrIlIThxzHbqE9kLbjvJgRMoQ/8OB+jonNouT1h/SUcqMiAYARIDEAAbolHjEQWi//tUZAeBESgXVuivOhQiouudCCcfg+iJXUEw6BCGkSu00A9CzatMNMofiAA9SZ9Hf408J//mv//Xld6AKAq4QLAALny40wMvBJYhCAxn05+NmqUE///33RV/xFiyAGAphwf95xQNi0zwWuVGdRdnPd/gmZOHxE/99PrFDSQAMAFICEdFSE3ugDGiL60k6qgvTFTco0a9vk3pD9/6B1qfACgAKgfgADbVDrxeCIOUTwrReTck/f4s1cwV/+wV3/Vd//tUZBEAEQkh1ulAFoAiotrNDe00BChbZaEYqHB/C6rkV6jmABgA6hsAAJxyuD0SE1y1nrm9YOFZUnlRL3vU1+YePv2+OuoAwAZZDoAAGzMz9RQZJp8TjeMAX9/gNooCf9AUf+itSLwIAUwMucyy5D8JuVzvWPX4F0jC4d42+jfHWzgyb0ZGjRAYBajAABlFakmKhUyVXl9jp/MxzLT2v8m+Sf5cpyclAFBUkbQAAH0K/BhhiueQcqWygbV9pLbJ//tURByBEP8XV2BhaJwiQtt9CAdhg+h7YYKI8TCBj2uwJRTkNyWo5EAICeXNyQAQEqVg1ZpKQGAjFcngVwb8Ysx5X+C8A/bzbgveWXfgAwAtLHnmzxwA4LJ3TC+YaGah5L53+vt/m5SgKPqGLlGAEACiQAAS7kzYHOeE1dV6ASlW0NQwgY1/n+T//qKHyE9AEAAJRUAAEQI6t8YGnHdPCOO7UI1f09//8PPX+vY+kOABAADDKsfPQKV9Nb4XYqW7//tURCmBEQkeVWCvOaQgY9stCSUzg8B5VWK85nh6Dyy0cBcG0tf8s/Lf/qYAS8qbx0ACABRBIYovwsEDKp/iihbRZQbnHDosrz/+UE0fjmo/zuGeETsoSQ50hYRX0QBAdGIaaoqH0Zvit0Jv/rMENeAAM3QAGXY2nRgJsjXw+yDu+DPUd9Tn2+vTYgHYy//KOQAEkqHgc6zfRQfdbEo/h5o7jsWarP42mX/0WwAMXpDAADO8AG7Y9ASYkC38Ba1u//tURDiBAQUeUYMDUpAgg8sJFSUzg+x7XYOwprCICupkJ5zgJ8nTHEAxqlRY2W/jjp/s0f6qMgAKBevQA6RrhkPNBGBnxGg7Q+GMYjfEJnm//oFuod/ovwABJkVckAA3cdnhQz4gfhqeJoFaQb+mCYot7smHdtP/6jGAAwXDxfelIuApxHFxoSCG1FFIHRbff1/o3mDXbKsq5AACAuaDnOfYD+d/BRBwmE4x9HwaokHdBIPO5fXwzXuAS201LaAA//tUREUBEQgeV+AqKTwiAtttGAIhg/x7WYOMTDB7CKvwF5TWG1kThYpxEH4uwzPW6p+tMn84jqcOnIQBRfoooABSKdsgAAP7cKBD4cZ8AcEPQhPp/pQqekIKd84p64c17EABgIFo/60KFyvuAiBbh10yh4Jrz/04gAAP95MM3CrEAASAgoAB+vhhoM1CpMzGzXzhsoTn+J3d/7coXHBhjAAATMAH7rB1PAZXGp86PcnVH6I+hDVf7ksttMFfCGU7//tURFIBARIeWmihFIwiw8tdFKIHg9xfV0E8poB7huzwI5kmSH+EoAAAAAZ+AD/phTsjS8HQiCT47l8eCf/1JmXxM/9/tX0//JEbQAAyAAKIAAYbesPiKYHNjbNZI6PQqISz/5CvUBReBNK3fy7tAABAJtACVKH8Q4jKQxTNxm+oN/6h1a4Tfv0rkAp3jiqCAAJABh2gAG+nCxBygF1L8s99Bb5w8ARMQAf/X+upFfs9FkOCFlgACQAZiYAAPtPy//tURF6AASIW1MhMaaAjRRr8Cec1BGxdV6alSICEC6ywdhUOvIxMUl916YfZX1BP/YKHsVnEP5R6caREfdf/xhqAABAAGLsAAb9IDmlrh8mKUnVfKBv/0HRuazQeLrSier19v/yjMUAAAEAx0AAv18YEw3DIWyUu21eUC9//fn43sz04noH/2jvVNoABBJATlACw3wuzh3dutXecC9qycR4vwTUh8hzia84FJP/ukVCAAAMzKJNOQBOc/S4wNSaQ//tURGaAAS4o1+jgLQQoBRstFYVFhKyjWaKw6ECMFKx0oIqizq2gbyaz4WDT2HlzXr+lP+iD5A//zW6DIAAEAATYADvLVAmPjXWx8CQ0Prjr4r7R1uALurxR8lLxr6BYlFGhZqgJv+qfMAEJCV+CkkKoE+H3L+lrDTBMc+FrNkXOK7Lbq08ScpGUVrTepVIAAAiAS3AAeto8Zy2dQU9ZkBrTqhDEZrV6BhSgz9TffGD6OqSQX/leNf4AABSASgYB//tURGkAASgZ2GgnERQoAzufFCKjhaBbY6KxDgCWBW6wEJiWaobfsJNx7A01tRx5+vO07Impdr63SzgkXgKn/x6a/q/4JALYJbkgAC6oVeQU1vMQcvj65oL/T/80bEH1fzxi9Ok8gQBqdrpC9/AAAMRJEYAac87lTXKunUD2tlAes7N/ir2//r9xnI1769lamwABCQv/gP7rKHsVLWXCj25dP/hj1/3TicYOuSpvt76tJn9EtAAAJArgC+zpxGGU//tURGcAAU4d2WmhVCQnwbuNDAphhRx5d6EA9DCNFG50cA+GYHrSaGxZ+pZPgA+70RLfb7HjnZLc7XBAAAAwOgASbpwo45QYVphOWRsqURP/Bc3T1binTs0dAPu/fRRgAAFAS3AwDc5OYI6DooCXNfQSTnT/hM6/zBQNkP2xqk7U//pqowAAAKANwADenCz1oUhWzXz+N12Fg6jFl2o3qBvk8W1ChCYGtp5m4DAAAFgFSCAercqY8v6CCVfR/wvn//tUZGYAAR0d2+BgOQwiwotMKAWhhIB7ZYKcy/CTii30IB2G//qAPgYgB7SgcqZ//4k4AADAbAmF/4eK4rzjJ67wTLYgbMPWtG/FHkP99DUE64dAgAAAQDQB8/hpRo2UFulhFzUrKGs2//Fx+XP/qqKTc1exe5e7AEEAgiSAAB16X6qxQ/TGbFH7/gduf/mcznAQex5o10R1GBAALBLkAAv14oPcTfXBXEQzUd9RHbk//ocgVwDn/NwYAggMRyA3//tUZGwBATwW12jvOjAiw8udHAKhhCB7YaE86MCOkKxwFjTWv1dkHrXFKD9SepQEiWspMomvpf1mzJD9AtAAACKvpN4GJrEoNSgExijmhL/9AES7XE030m/kW9tCmwCIBYBe4ABtJOFCrjRZPAdhg/Mep+G8M/8NYFNUIzxVtEFAAIB6/ABd08UkmOBNJlAJYf1BGVD/sZD+Fr6lBOwL9b/AAAAAD5DalIPgRc8yy4IjImD9301A/we/qbjir3+i//tUZHKBEQ0e22lALQwgA8ttFAehg/h5b6KBtDCBDyywcykObACItwAAVqGOEqkkMfC7KM/ucQBg5H3n9nW7Q7xg94rVeoABAIAlwAAtmH34XI2LLTC1C/bbhH4r/9oY9UQdsrP0zAABAGtxwABZQpInEylx1R/fgVLnLWJbxTLrENJFktT1UuwBBAIAq0AAjZZ/Co+jsY74py/XP7+J+s4tshLlxQU/0i0AAAGMEWgDVJOGIa4w1+ATBYtyPZ0I//tURH+BQREW2uigFQQhA8s8HCKVg/RbW6OA9ACBiC00EByGJvkZ+Jv+hBQh/8mCbneXgAABDwAX58YlGpCcOu2YA48qCWz9v6hC+hPpmg5FzOrGljZN40YABAKMtxgAE9epHKGDH4jG9LbR0+R55n0cCYFSyRcix3p0pnV4rgAIQAkEAB/8KHxRRNkw1ho/FSUT/hXp/CDDJXDabRE+qqz/0wAABACjoAL/g0cCEuMfBQY2b5L9i6/yIeOjUUOC//tURIuAAQkeWOjgFQQhwttdBAUThCBvY6OAVBCYjax0IxUK7rPxZYBKQwARuAD/7QjOCNaZRtWwsWT/awfKl2/jwQhHuKV83/6qodXgAABABHQAPpYTdK4o0fQSBP/sLt1/iYYQ0Te2L7PVuAwGPuAAX1+QO5gpKVSJEqOZCHHbxS+j/x0NqrJG7Mkv6nsEAOsByKuJIKxcyviYHf/47v4ZEqRbhrdr/qfShK0D2oAEsiCQAe2kMyL+F1HZgZui//tURJSAASce1UgsOcImw4tdFCeThIh/XUKUy9CCjiywIJ5WonhH/+CEMACisB3f4hZ9QHQB/ybJB70xKZBjHACX/+v/rHA8y2nkNXvlvWMKyQAkhFwZbUXZfAj2wmJM0rfwZv/iYMyJr9sCN1n0lWLAAgAAY2AAvRqVko6t2iPQtlA3//T2/lwhBLbsrSElP8wqm0yAAMKkoAALzlNUsbNbUt9fx3zPpDIFzyqWtS90h2MfJUCAAAAMccABP2op//tUZJoEQSop2eBDKU4eo3s8CAUFhER7X6UA9AB7CiywEB2GwUZzObguFxc1BmA0zeZu/8ROc+oGF/9EGgAAYGN96seP4xQmsUQT5RJQec8Rf+rzB+33UMcYKOSbGAAIAADcAAXu3RaliiJj5ij5CHH+v/rKF5vDO7f3F3JqgFIAAUY+AAAf96w4YNLVbgEDI42o9zffQk3f6xWNZJnjj8MMCkAgG7gAfzBKiIw7cQ0L1EwVvKTzkihtl+0XHInB//tURKWBARMeWmhFElwcA9sCBOZfhBR5ZaCVK/CIj2x0FSV+lVkGPAAAAwLB/rSrCwYcrpwSKIJnrFnVE3477fSLA0pViNRJihAEAC/gCWi4lChpcv+AFoO7hs3/zvO+khPnpUc+rjikCWojgAABAHbgAE9OtwYen0VujB+gd//TOEAwUP8PAhQ11Btws/+lAVAAAIhy1gN9UpURFvwiZS+VGnsv/YoQ/4SPftDUph+/azf///7AmQ9AAAAY9GG2//tURLKBAQ8c2eggOwwiw8rNKAWgBCBvSyKyKECCjyv0oB6GrlT4sGTq4SjKDOcM9qjiDojiD1/Kyijwad23qO2sggAstxEAbWaajXHR+F2Uvwz6P80x5UIhM9FqMyv3HXiRbDjf/ilCQEABNhwAADvXWrxkP1wgLlR3EYBNX2T6vSMxh/j2MdLKevAAA1xgAAF/mwCkstMBRYo+FwGTT9uk5KyzhW//0C91yW4hcaAAAXBgfZOsReBQbTQDMHZe//tURL0BARseVWhIOhAhI8sMBOVZhChxU6K87iCNEWtwEylWlCZms5jqugpqpQRf6NzWIMZAgAAFA5AAHrt0eNi3wuWQvoLe/6pAbmFcX/zjKPNCbnKv9Cp8SAAALC8AABurdY48IzF+it0TlsdDFu3MzLEBSD7+pG9UFbNK4PSAAFGH+AAG/WsocwIC2/AiTQZoMBu9xk/k4RAD+N/DM9/9CGBiEf9c49w8I2rDZIY0i9M0AlbrX+kDnbQCL6Hm//tURMaBASYbVeisK4AoB0rtHCLUhIRvU6OBtAigC6v0I5muyF/kEAyIQAXCAy3nNKHOHn3XQZUZ3D22+MDVIS4T8+z/H2BAgQC6EAAAAMO0eLQzriguoxUeAvevsPkiLmIVLi7+j/H2PwQAFeEAAA3/VbjBwoMp5QZKksTgstn1sRTleA4S9czfFGLgAQBMIBJVK0qDoqhyY2oDMfAtq7H+c4+phwVDH+3qIjKSAggFQILU2pMRJd7/KF1f2CX7//tUZMgBARob1ejqHEQig8q6BOhaRFR7U6Kk7kCPDys0cZ7C4njSWOqxOTAW+meanOCdEwNAAMoYAAAMvmcoeNwHDPxBh1JGc6ztPET2QAYb+k38aqSEhAExAABlmrSthYTuuVlGoVApZyoAEKcOLB//4GGIkCAkgZgABNeVYY6CFffKMg5s502l/PqeQgZC4/p+b6lIpP6GOKCFFwlXT8AABAqAABDdLx1zTD/Nbq2SjoeDdEGABF/+xqmORBNB//tUZM+FESoeVGjsO4AkI8qNHSWQBCB5RyaNVgB6Dyp0cZbAUZ9jfxUwaDp7sGJxU+oMRAIAiBQAAE9n23qXOnPlGFxPkAbt/nYgg0C4Av/+E9xFACABtvwldgCNrNXaszHRgjNIoJhzVL+7rZU4Bhn39Ez+soBiMhEJwG0AAPsnNRpgOQxczcYHg/EUBKu9eiO5zxcH//452samwsXQlJCAYoeKfVZ6piPy99bKPYzBIU1t+NMOUlCgNCX+/x+O//tUZNkBERQeVOjAOBQig8p9DOVYBDR7S6WA4ACIjyp0FZ12BwA0obVC6swlCm2gAA3obLMONd9cepoo/9xoU3FUaf+j1APCYSUBxraXHvFU9hBDDkAALfWmqcMioOaf2yuVJ1GQpslYaHmTFCABv9NGqMbm/ntSkoAIBlG+AAHGtQ07lQJB7s8hnR7pliv3KvYXp8RNXQH/+io+Dgl/WhOQIIBWW9WdnekuCRer6uhfE4LprkD/oExeXaQOm/t8//tUROKAAQ8eUmjmPYAeg8qsHAKhhYCjTaEoS9i4Dyioh6lCffeRIa1qYFiEaTqlAAAd9TqUV6naOJzNw10d+rFChdKxsIPT/YXO/KI0/u84B7DEnMraAAz+adKMVFmxveM5oM6P7R8NTYtVUCq/q9eED0LsZdSwNIKFHTbAAAY3qeWzHoAzlRigRgATd/MuyTREHf/8RXO/Oq6c4jKQIiEAhAmZ9zXONKALIZ2jlSWJgjv/kTQ2MCo0CX9H+N3X//tUZOMAEQ4eU2lGLYQi48nVFe1CBPR7SaOs8hCYjyn01BbCkL2uJ3AQWABJpDTZ2erI4nhaW2rmJi0BUPbWHE+sssv0sjUUiyxOJQrzT9T+goMByQAT5o040p3awmNTzWvKAyho0/lvMPnqgcNGjZkJCwsKrYZMGtYt7mAwGZcO1xmy00aUWNMjVgoYE4l20NIlUGphqqgxcWBokhIky4vNk44uAsLCwZMxYXZWK8VFG/qF/8UVTEFNRTMuOTgu//tUZOeAETweVmiiUPwnI8oqNAeghRR7Q6Uk8ICUjylwcx7GMlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OC4yVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tUZOcAETQeVWjpPY4mo9rNHSexhOB7VaOM5TiXDyj0dJ7GVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tUROgFAT8XTDGDNKAsIbpaGCNig3Q7ACMEbih6hWEAYJhAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tUZO6P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    var bellIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HHQwgJFQuvboAAAEPSURBVDjLpZXBSgMxFEVPBmmhlOpClKEbP8QuxG1/tP/QXTfiH7iTLtpdbKEqgvR28wJjTGbS6YVAePNyJnnvhjhJol1b4N3mD0Ddmq28vKRnSRNJ2JhYzOcW5YAvkgb23TWAYT6wnH9yiSP/ACPg2FGKCvgChnEw1qoAhuWsUn+J5SmXLwHuzgDuSoCvgCuAOcv9G4ya8guMrTElGgIH4Cq3w9kZsOCIWc7Yi4TvukbIXaR8eAPs6afr0KBw5KXBXA+Ys7XLJvAtVKAHUE1GANZcrjq2zbHnkcMuK5r+SVjoA9hkAPfAbVRHYmDqFj0mrlcFrNsWtVnBA3PgzsYT8A1Msy0veAIAPq1O467EE9tUEhXo3s4oAAAAAElFTkSuQmCC";
    var zzzIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HHgcwOWMKgz0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA20lEQVQ4y7XUMUoDURAA0BdttDCNpLLJFWJhI6ltvIddBKtgEYJ4C1u7VLFIm8raAyikMAELOzEaEDbNFIvouuF/B6b4u8NjZnb5/FPc4CVygb0caAMTXOXqso97bOfAjvGKdpyLH/JzE/ABS8wjW6V3lwEOc3TexjuesJMDHEd3Jzmw08BGFXv9nr/GLmZ4w0FN8LEKvI6iiz+muI26FQ6rClc1RjorPT9P3W8HH4HdpWLN2FeBZ+yngqPAvtBNxXqlvQ1SsaPSx5piKxWc1fmxGxuARc07NW+sAZr/UijoWUzlAAAAAElFTkSuQmCC";
    var chipIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IBQwJBtL1ixQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABUUlEQVQ4y62VPU5CQRSFv5kgEaUwoonBBnagdroKY0MncRe4KbEzboDaxrABIBjUUOEfemwO+jJCwZOTvObNu1/uzJx7XpAk/moKjIAhMAYmQABKwBawB+wChbQwffEFPAJ3QBvoAP0EuA8cA2fAAbADxB+CfvUhqSupJakuaU1SSDuQFLxW97dd10qSZsBPL1xIKs8DLQCXJTWz0BnwQdKlpDJLytCWGcLkW28h5AAG195Ieou+zTbQCyFoWaBresA1MIq2RsdWyaupGcNon/XzdJd0OQDGEXjx819NgNfIihXt/tIKWBvAevRsVvNYJmsdoApsRQ/6ybxBX0IFz/feqoxdyxq74NRoAJs5z64BHAHFNByaOcLhXNJ9Gg554qs2L75CktjZgL3yOA1s2tn2qr7EU+AQqGQvNCz4BbwDT57zZwMjsA5s2xkVoJgWfgNFOVw1goaxDwAAAABJRU5ErkJggg==";
	var trashIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94LDA4tIiYyb1cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEH0lEQVR42u2cO2tUQRTHf5NMYqKJ8RVBIz4g4koKISgKgg9QFG33C9iIgpDG0o+QJiAIfobUthY2FhZWvrARWQTjg2gkJtnkWMzZsF7vxpvNPmbvntNcdie5u/PbM3P+c+6ZAbP8mohMiUgx5u/oIwVXBK4C54CPIjLmnJsxgNnh3QAuAweAQ4AXEWKE6COEdxO4DuzT79cHnNH26CD6CD3vOjAK9GpTD7ArVog+InjXdNjuq4JH7BB9RPCuAAc3+E5RQvSRwev/z79EB9F3ELwoIfoOgxcdRN+B8KKC6NsA72oD4NWCuOyce5RnDzwFnAV2AkvAcgqQAb0mbQ34rdek9QIngPMiMuecm80rwF/AS+AN4FLa9+r6d0dK2yLwHPha496rwFyrh7Br0xxYy04Dt4HdKW3fgcfAi5qdaaHntS2IbNRJESkAUqsZWGgHpP9NwmYG0AAaQANoZgANYB4AikhRRG4Zmn+43EpbBPjEH00BF4EDIjIJfHDOTXc5uPvAEV0lfUo+YvUJeEVgAhgECsBXTRNNdzG8O7pGH9CExWh16sxXrU8vKbyRqqyIA453Kbyi9n0vIWUGsE0ZfRGRknNutjIHjindocS8OARc01+i2+wS4THrcPVSXpmcUGbrsAY1A5J8nNirNxjpQoALhLRab0rc2KPM1gF6Qna4lqxZ7VKAaZkhR6iW8JvRgWUTMiakDaABNIBNt7IGrOTkLbEGstgALgLzKbBW9f2fBnBjKxEeec6rN67p9Ye+X4oNYFQVqs65WREZ1ZcFVf0LCu9JbE/kogOoEB+JyJwulQZ1WJdihLclgCJyV5d4zf4RhoGCiDxoYuCar7emxtcJ7yFwAdivy5pOthVgTkQmnHP3mg5QPe8CME5I73S6lhRCsRMiMrXZErl6Oj9CyJHlAV4lObBN+zTYChkzT6iQWqJ2HUuneeCS9mmx6UNYo+SEvszDHFgGPgPP6qlwrSuIOOfutTAKt8J+1lsebMmE4IHLLdWBJmNMxpiMMRljMsZkjMkYkzEmY0zGmIwxGWMyxmSMyRiTMSZjTMaYjDEZYzImm6eajNnkEO4BtnehjBkiw5EIPiPkwyJSrNSn5F3G6B6Ro1n6lqXz/cBJDRp/CeocS5txQnVYfyMA9gHHCBtuAN7HWim15ckweN444WSlY40C6AgbTiYJG0xei8hpQt1enmxIh21B4TVsDqwEkuGqm5dzEoGTjuJV0vSR8Uwdv8kP6Gfr513lynoS68E1Q5JJN64os3WAi4SjlVaNTybd+K0iuisAS8BbDQzmhRt73wLwTpmFOVCr48cIJ+hOaATytOFwsojBlQmnz70CnlaknK8SxjOq874QNhTvycEyrVG2osP2ncKbqY6saWKyssXAG7v1eS/q7RYda38AEijX5bBAp60AAAAASUVORK5CYII=";
    var exportIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94LDA4pKdWMc9sAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVR42u3dv09UQRDA8e9wT3PoIfEHJgqGqI2lhYWWJpoogUQTa3sLYmNhQeEfQGMo+CdI1FhYUFNZ2WljcjHEEEM0gpGCYyxuSYDcHdw939tZ3kxDIHA/Pje7O2/eZhFKCFV9AdSxF1siMp/nAbIS8BaAaeCMQcANVZ0UkVmTgCHzpoGJMj6sAWIUeKSqDIo4VPALrIfMs4gHUAMuBcQFi4ApRC7EGJnRAjbD17Lj3BEQ+xrOMQA3gTdAE9gu6TnPA087fJC1vIixMrApIq/KekJVnevw4+8BLBdirDlwm/jRCIitPHNilReRHWA5L2LVV+GvwNs8iJUvY8I8NzCi14E5ER0wJ6ID5kR0wJyIWYWtasD1LkX2Wihx7vcotmdUtVllwAbw+JBrculxxTIC1KuegaNH+L2zXkgXGFUB3AI2KKCFVokhLCLzqjoJzIS5q++HAJQO/cTKzIEiMquqTQa7O9ipn1gtwN1MHOTvupQ6voj4IuKADuiATuCADphymK8DVfUlcBr4JCJLDtgf3hPgBnATuBhudi85YH9RB67Qbj0NWUNMAVCAE8Bl4F7ITDOIqVwLC3DSImJqzQRziEUDrgML/3knlinEQgFFZPG4Z2LWo3wYB4YjD/MG7Wbm0CGItViIWQe8Z8BUqL9G2X87L9biUe+RiRPAQ0BiIGYdMm8KuLMHTxK4mhoDHrTfQrmIB4fG+J7MyxLA240acAG4S3s3QbRmwnCYd1JsMmS0dxDcVtXnsQD/0t5Fv5Mg4A7wB/gGrMYCXAU+A79pbwTXhPB+AR+B5TLnwOxA3bakqmPhW0ur8HCPaWUv3gcReR21jBGRRVX9ERaUkciZ1QBuharglDW8roW0lU5HKKuudpmTo+NBui19E3iFA6rqnKqu6/5Y77VVIiW8FDPQFF5qgObwUgJsWcTrugobxPsJfLGGZz4DQzm1BqwA76zhpZKBK5Zq0+QArcKlXkg7oAN6OKADOqADOqATOKADOqADejigAzpgJSNGP7DXgTdW4xpdtrjEADzKgTfWohZet5kMHD0uQ9jnQOOAhR14Ezla4X1tFb4HOhwTN+iBN1ZjA3gvIrOlbCI3/O8wBh5Zu2fQ/AOz2kvo8tJpFgAAAABJRU5ErkJggg==";
    var meetIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94LERccEncyT/QAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEIElEQVR42u2bz0tUURTHv9fsl1lhWQrlD5w2hYQE4kaoXKSrMKgQXLkQAoVWbtwK0qo2Llr5F7hqY21SchMt2mhtKjAUQcrclD/S+rbwBja9gRnnnPvO473vShjnvDOfd86933fuDJApU6ZMmTJlypQpU6ZMmUoUyUMk20mOkXzDPf3wf4/51w5lpP4H50jeZ/G6T9Jl5Pbg1ZCcY+maI1kjmYtLILyzAJYBHDtgiC0AF51zaxL5VCRtvQMwWwY8+PfOpnJdJDlEOQ2lqoVJHgewIRy2yjm3mZYWvq4Q82aa1sCrALaFY941D1DQ6L4GsASAgul1pcbokmwh+ZzkpuBGspMao0vyMMlukh9I/hYCuGiuhb3RXQHQeYC3dwJY8TH+tQvO7QD4COCT4Fr40hTAAEZ3CcAT/yQisRZOWavABwBaBeK0+lj5VfjTw5OqwBkzAL3RnRC8GRM+5n+XEoo/XK6Jlq7Am5BXVEyJ6lsA8NTaMOGuAsComItlQtwCcMM598uadVmkvBYLXOsUyVcW5oGSAHcUAO6EMuqxT2N8tTQJ5/fZOddchHW6BuA2gG4A7X5q8w7ACwDPALw117IRH2RSoQInrU84JDeRKYX8pqwDlGxhkwPPxFSg/6DDgrkNW4enNfubF1j75qOehUlWkDxf4AmlmPxOkLzj55H9ViGeLXNmtxk1jYmYCU6T7CN5iWQ1yYoI2NX+9T7///m6nKZ54BGSt4TngWskK61CTMJEmiQfJmFdLPtMhOQVkguC1bdftWnYoHJKFUiSj9MA8CjJGyRnSG5ZqcLEnAs757axd7T5CPLHmwAwmBavqdnKR2KtQJL3vFE9oWh0pQ+W9qszzsq4nHc31YyuYhVOxzJM8GZ0FcAZ4fvyDUCdc24331Rj77xkAkAOst8yO+mc+x66hYcU4MHHHIrYUH5C/pD9rzpCt24t9VVb4NFO+qseJQ9xJSpwNMB9Gg1YhQP567XaGugr40ugYj/nnPsaaC284JxbCVGBIc3nYIEqXFZYB9vUW9jf/fGAAMcLGN1NBYhd6gBjMp1R11xWMNa9IQCOxABwJFAb54odtFYcsH2rAfTEALDHXztEG5/WrMAOxKeOQG1crwkwzhOt/kBt3KgC0JvMgRgBFjK60pOZZq0KrEf8CpFDixbANgMAo3LYEm7jJi2AFn7d0xVgI2nQAthrAGBvgI2kThygN5c5AwALGV3JjaRGowJPw460c6nSAFhvCKB2LiqPco2GAGrnsqsBsNkQQO1cNjQAthgCqJ3LugbAJkMAtXNZ1QDYYAigdi5LYjtNqeYykOoizPR7yPzctmiVWoGWfmdmIpdSAVYZAliVRICWvpBdmUSAu4YA7iYR4IYhgBtJBLhuCOB6EgGuGgK4mkSAS4YAmsjlD0uxljZd9GXaAAAAAElFTkSuQmCC";
    var reloadIcon="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";
    
    var smileys={':)': 'https://www.waze.com/forum/images/smilies/icon_e_smile.gif',
                 ':D': 'https://www.waze.com/forum/images/smilies/icon_e_biggrin.gif',
                 ';)': 'https://www.waze.com/forum/images/smilies/icon_e_wink.gif',
                 ':(': 'https://www.waze.com/forum/images/smilies/icon_e_sad.gif',
                 ':o': 'https://www.waze.com/forum/images/smilies/icon_e_surprised.gif',
                 ':?': 'https://www.waze.com/forum/images/smilies/icon_e_confused.gif',
                 ':S': 'https://www.waze.com/forum/images/smilies/icon_e_confused.gif',
                 '8-)': 'https://www.waze.com/forum/images/smilies/icon_cool.gif',
                 ':x': 'https://www.waze.com/forum/images/smilies/icon_mad.gif',
                 ':P': 'https://www.waze.com/forum/images/smilies/icon_razz.gif',
                 ':p': 'https://www.waze.com/forum/images/smilies/icon_razz.gif',
                 ':|': 'https://www.waze.com/forum/images/smilies/icon_neutral.gif',
                 ':lol:': 'https://www.waze.com/forum/images/smilies/icon_lol.gif',
                 '=D': 'https://www.waze.com/forum/images/smilies/icon_lol.gif',
                 'oO': 'https://www.waze.com/forum/images/smilies/icon_eek.gif',
                 ':shock:': 'https://www.waze.com/forum/images/smilies/icon_eek.gif',
                 ':oops:': 'https://www.waze.com/forum/images/smilies/icon_redface.gif',
                 ':°': 'https://www.waze.com/forum/images/smilies/icon_redface.gif',
                 ':cry:': 'https://www.waze.com/forum/images/smilies/icon_cry.gif',
                 ':\'': 'https://www.waze.com/forum/images/smilies/icon_cry.gif',
                 ':evil:': 'https://www.waze.com/forum/images/smilies/icon_evil.gif',
                 '>:(': 'https://www.waze.com/forum/images/smilies/icon_evil.gif',
                 ':twisted:': 'https://www.waze.com/forum/images/smilies/icon_twisted.gif',
                 '>:)': 'https://www.waze.com/forum/images/smilies/icon_evil.gif',
                 ':roll:': 'https://www.waze.com/forum/images/smilies/icon_rolleyes.gif',
                 '°°': 'https://www.waze.com/forum/images/smilies/icon_rolleyes.gif',
                 ':!:': 'https://www.waze.com/forum/images/smilies/icon_exclaim.gif',
                 ':?:': 'https://www.waze.com/forum/images/smilies/icon_question.gif',
                 ':idea:': 'https://www.waze.com/forum/images/smilies/icon_idea.gif',
                 ':arrow:': 'https://www.waze.com/forum/images/smilies/icon_arrow.gif',
                 '->>': 'https://www.waze.com/forum/images/smilies/icon_arrow.gif',
                 ':mrgreen': 'https://www.waze.com/forum/images/smilies/icon_mrgreen.gif',
                 '^^': 'https://www.waze.com/forum/images/smilies/icon_mrgreen.gif',
                 ':geek:': 'https://www.waze.com/forum/images/smilies/icon_e_geek.gif',
                 'B|': 'https://www.waze.com/forum/images/smilies/icon_e_geek.gif',
                 'ugeek': 'https://www.waze.com/forum/images/smilies/icon_e_ugeek.gif',
                 'B|-': 'https://www.waze.com/forum/images/smilies/icon_e_ugeek.gif',
                 'xD': 'https://s3.amazonaws.com/tapatalk-emoji/emoji38.png' // special aimto xD
                 };
    // emoji list: 
    // http://club.myce.com/f34/tapatalk-emoji-smiley-set-how-insert-even-your-web-browser-337619/
    
    initializeWazeObjects();
}

var CAscript = document.createElement("script");
CAscript.textContent = '' + run_CA.toString() + ' \n' + 'run_CA();';
CAscript.setAttribute("type", "application/javascript");
document.body.appendChild(CAscript);
