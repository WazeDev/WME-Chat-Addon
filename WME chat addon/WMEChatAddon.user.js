// ==UserScript==
// @name 			WME Chat addon
// @description 	removes duplicates messages, formats link and permalinks, and some stuffs
// @namespace 		dummyd2
// @version 		1.14
// @icon			data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94DDg83H1XMMOAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEQ0lEQVRYw+2XTUhcVxTHf0+dwcxUHawuxImtH0hbBEebGLCFutGFgSaBriImoXRRBLciqYuKza4bN21dVFcJgouE2IKolIJYP0BmFCwKoyJxksyMTGZ0Zvpax3u6eW+YD40abTftH+7mvnfv/3/OPfecc+G/Du0ca2sBJ5Bv7BMDXgDr/6Tgz4CfgAAQAaIGcQzYB8KAH/gZuHVRpAXAbeAlIIDk5uaKzWZTRUVFUlxcLMXFxVJUVCQ2m03y8vLE/A/wAV8Aljc9gk+AB8BHABUVFTQ0NHDt2jWuXLlCbW0tZWVlKKXw+/14vV4WFxdZWFhgaWlJdnZ2zP0XgF7g17NY/qXhUrHb7aq/v195PB45DZRSsrKyIgMDA2K1Wk1vhAxvnAq3AR2QiooKtba2JkqpNILTIJFIyMbGhqqvr1eGiEOg6yTyauBPQOrq6lQikTgTaaYnRET8fr80NzcLoAzDPn6dgBlA6uvrVTgcfmPyTBHb29tSU1NjHscvgP0o8k8BcTgcanp6+tzkmSJmZ2dNAQcGVxZ+A+TmzZvnZz0GHR0dZjwMAdZU8hLgldVqVUNDQxdmfSZmZmZML2wAhZl3fr+goEBWV1ezXHiUmNMIzLw94XBY7Ha7KaIkJ0XAW0COxWKhqqoqPVtpGpqmMTw8zN27d3ny5Ely/uHDh9y5c4epqSmUUiilePz4Mffu3WNychJN0xCRtH2MYMxKhNeBmMPhkN3d3SxLxsfHpbCwUABxOp3i8Xhkfn4+mXbz8/MlEAiI1+tNzmmaJj6fL22fcDgsNTU1ZhyUpnrgBXB4cHAgq6urAEnlAJubm8TjcQACgQCRSIS1tbXkd13XCYVCbG1tJedEhPX19OKo6zper1cD/jISU1pdeJ6TkyN9fX1ZHvD5fNLa2ipOp1M6OzslGAxKNBqVlpYWKS8vl46ODonH4xKNRqW9vV2cTqfcuHEjKxZGRkZM62ePygXDgDQ1NalgMJi1OBQKidvtlkgkkvy2v78vHo9HYrFYcm5vb0+Wl5dF1/WsQKyurjYF3AdyMgWUmOc3ODiYFv2ZEX/czTjqFpj/9fT0pJbpD49LxQ9MEXNzc+oiMqCIyNjYmFgsFmXUg+9eVwvyzXrQ1NR0IeSPHj0Sh8Nhun4JePukingLEJfLda6sFwwGpaurS9nt9lTyd0/TD1w/j4BQKCS9vb1SWloqmqaZ5z4JlGYS5R1BbgM+B7h8+bLouq6Nj48zOjoqT58+1RKJBC6Xi7a2NmlsbNQqKys5PDzk2bNneDweJiYmcLvd5l7K6Kq+B74GEqex/r7ZvXR3d6urV6+qlCZTjA5YThgxwA18C7x/lnfBV8A3Keo1Y0SM8jkLxI2u6YNj3gW/G2+DdeD5WZrQFoMo05ofgXeOSBoWg/ySMfJf134fh9QYuAT8YVjzEvgBGAFeHbP2wBgXivcAF//jX8TfP8rg1M0AqeYAAAAASUVORK5CYII=
// @updateURL   	https://greasyfork.org/scripts/2103-wme-chat-addon/code/WME%20Chat%20addon.user.js
// @downloadURL 	https://greasyfork.org/scripts/2103-wme-chat-addon/code/WME%20Chat%20addon.user.js
// @include         https://www.waze.com/editor/*
// @include         https://www.waze.com/*/editor/*
// @include         https://beta.waze.com/*
// @exclude         https://www.waze.com/user/*
// @exclude         https://www.waze.com/*/user/*
// @grant			GM_xmlhttpRequest
// @grant           unsafeWindow
// @author			Dummyd2
// @copyright       2016, dummyd2
// @connect         docs.google.com
// @connect         waze.lesduts.info
// @connect         code.responsivevoice.org
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

/**** DOWNLOAD HELPER **********************/
/******** AUTO INJECTED PART ***************/
function downloadHelperInjected()
{
    window.WMECADownloadHelper = {
        jobs: [],
        _waitForData: function (id)
        {
            //console.debug("TOTO wait for data this", this);
            //console.debug("Download list wait for data id = " + id, this.jobs[id].url);
            if (this.jobs.length<=id)
            {
                this.jobs[id].callback({url: null, data: null, callback: this.jobs[id].callback, status: "error", error: "Request not found"});
            }
            else
            {
                if (this.jobs[id].status=="success" || this.jobs[id].status=="error")
                    this.jobs[id].callback(this.jobs[id]);
                else
                {
                    if (this.jobs[id].status=="downloading" && this.jobs[id].progressCallback)
                    {
                        this.jobs[id].progressCallback(this.jobs[id]);
                    }
                    var _this=this;
                    window.setTimeout(function () { _this._waitForData(id); }, 500);
                }
            }
        },
        add: function (params, callback, progressCallback)
        {

            this.jobs.push({params: params, data: null, callback: callback, progressCallback: progressCallback, status: "added", progression: 0, error: ""});
            //console.debug("Download list: add " + url + ' @ ' + (this.jobs.length-1));
            var id = this.jobs.length-1;
            var _this=this;
            window.setTimeout(function () { _this._waitForData(id); }, 500);
        }
    };
}
var downloadHelperInjectedScript = document.createElement("script");
downloadHelperInjectedScript.textContent = '' + downloadHelperInjected.toString() + ' \n' + 'downloadHelperInjected();';
downloadHelperInjectedScript.setAttribute("type", "application/javascript");
document.body.appendChild(downloadHelperInjectedScript);

/******** SANDBOX PART ***************/
if (typeof unsafeWindow === "undefined" )//|| ! bGreasemonkeyServiceDefined)
{
    unsafeWindow    = ( function () {
        var dummyElem = document.createElement('p');
        dummyElem.setAttribute('onclick', 'return window;');
        return dummyElem.onclick();
    }) ();
}



function lookFordownloadHelperJob()
{
    //console.debug("TOTO lookForJob...");
    for (var i=0; i<unsafeWindow.WMECADownloadHelper.jobs.length; i++)
    {
        //console.debug("TOTO lookForJob: processing job " + i, unsafeWindow.downloadHelper.jobs[i]);
        if (unsafeWindow.WMECADownloadHelper.jobs[i].status=="added")
        {
            //console.debug("TOTO lookForJob: downloading job " + i);
            unsafeWindow.WMECADownloadHelper.jobs[i].status = cloneInto( "downloading", unsafeWindow.WMECADownloadHelper.jobs[i]);

            var f = function () {
                var job=i;
                GM_xmlhttpRequest ( {
                    method: unsafeWindow.WMECADownloadHelper.jobs[job].params.method,
                    headers: unsafeWindow.WMECADownloadHelper.jobs[job].params.headers, 
                    data: unsafeWindow.WMECADownloadHelper.jobs[job].params.data, 
                    synchronous: false,
                    timeout: 3000,
                    url:    unsafeWindow.WMECADownloadHelper.jobs[job].params.url,
                    //job: i,
                    onerror:    function(r) {
                        //console.error("Chat addon: Error while getting data from server: " , r);
                        unsafeWindow.WMECADownloadHelper.jobs[job].status = cloneInto( "error", unsafeWindow.WMECADownloadHelper.jobs[job]);
                    },
                    ontimeout:    function(r) {
                        //console.debug("TOTO Timeout while getting area from server: " , r);
                        unsafeWindow.WMECADownloadHelper.jobs[job].status = cloneInto( "error", unsafeWindow.WMECADownloadHelper.jobs[job]);
                    },
                    onload:		function(r) {
                        //console.debug("Download list: ok for id " + job);
                        unsafeWindow.WMECADownloadHelper.jobs[job].status = cloneInto( "success", unsafeWindow.WMECADownloadHelper.jobs[job]);
                        unsafeWindow.WMECADownloadHelper.jobs[job].data = cloneInto( r.responseText, unsafeWindow.WMECADownloadHelper.jobs[job]);
                    },
                    onprogress: function (r) {
                        //console.debug("TOTO progress!", job);
                        unsafeWindow.WMECADownloadHelper.jobs[job].progression = cloneInto( r.total==0?0:(r.loaded/r.total), unsafeWindow.WMECADownloadHelper.jobs[job]);
                    }
                } );
            }();
        }
    }
    window.setTimeout(lookFordownloadHelperJob, 2000);
}
window.setTimeout(lookFordownloadHelperJob);


function run_CA ()
{

    var ca_version="1.14";
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
    var CMList=null;
    var userAlertList={};
    var isResponsiveVoiceOK=false;
    var history=[];
    var msgCountPerUpload=1;
    var wazeRequires={};

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
    translations.fr['You are already registered as CM for chat addon.']="Vous \352tes d\351j\340 enregistr\351 en tant que CM dans chat addon.";
    translations.fr['Message from Chat addon:\n\nYou are Country Manager.\nDo you allow chat addon to upload to a private server your username and the country(ies) you manage?\nIf you do so, all editors using chat addon will see your name colored in red.\nIf you answer no, you can still change your mind in chat addon settings.\nThanks.']="Message de Chat addon:\n\nVous \352tes Country Manager.\nAutorisez-vous chat addon \340 envoyer votre pseudo et les pays que vous managez sur un serveur priv\351?\nSi oui, tous les \351diteurs qui utilisent chat addon verront votre pseudo en rouge.\nSi non, vous pourrez changer d'avis dans les paramètres de chat addon.\nMerci.";
    translations.fr['Add me to CM List']="M'ajouter &agrave; la liste des CM";
    translations.fr['Format: username:messageIn:soundIn:messageOut:soundOut,a_google_doc_key_here,username2:messageIn2:soundIn2:messageOut2:soundOut2...\nmessage or sound can be null to disable.\n\nSounds available: door or TTStext to speach']="Format: username:messageEntree:sonEntree:messageSortie:sonSortie,une_clef_google_doc,username2:messageEntree2:sonEntree2:messageSortie2:sonSortie2...\nmessage ou son peut \352tre null pour d\351sactiver.\n\nLes sons disponibles sont: door ou TTStexte pour que le TTS dise texte";
    translations.fr['Usernames messages and sounds']="Noms et sons";
    translations.fr['Play sounds']="Jouer les sons";
    translations.fr['TTS is powered by']="Le TTS est fourni par";
    translations.fr['Text to speech speed']="Vitesse du TTS";
    translations.fr['TTS playback rate (0.5 to 2.0)']="Vitesse du TTS (0.5 &agrave; 2.0)";
    translations.fr['Discussion is uploaded to a server and other users will get the 10 last messages on login'] = "Les discussions sont envoy&eacute;es sur un serveur et les autres r&eacute;cup&egrave;rent les 10 derniers messages lorsqu'ils se connectent";
    translations.fr['Contribute to history']="Contribuer &agrave; l'historique";
    translations.fr["Default to prod chat on WME Beta"] = "Prod Chat par défaut sur WME Beta";

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
    translations.de['You are already registered as CM for chat addon.']="Du bist schon als CM beim Chat Addon registriert.";
    translations.de['Message from Chat addon:\n\nYou are Country Manager.\nDo you allow chat addon to upload to a private server your username and the country(ies) you manage?\nIf you do so, all editors using chat addon will see your name colored in red.\nIf you answer no, you can still change your mind in chat addon settings.\nThanks.']="Nachricht vom Chat Addon:\n\nDu bist Country Manager.\nErlaubst du, dass Chat Addon deinen Usernamen an einen privaten Server \374bertr\344gt, sowie die L\344nder, die du managst?\nFalls ja, werden alle Chat Addon-User deinen Namen in rot sehen.\nFalls nein, kannst du jederzeit deine Entscheidung in den Einstellungen vom Chat Addon \344ndern.\nDanke.";
    translations.de['Add me to CM List']="F&uuml;ge mich zur CM-Liste hinzu";
    translations.de['Format: username:messageIn:soundIn:messageOut:soundOut,a_google_doc_key_here,username2:messageIn2:soundIn2:messageOut2:soundOut2...\nmessage or sound can be null to disable.\n\nSounds available: door or TTStext to speach']="Format: Username:NachrichtEingang:TonEingang:NachrichtAusgang:TonAusgang,Google_Doc_Schl&uuml;ssel_hier,Username2:NachrichtEingang2:TonEingang2:NachrichtAusgang2:TonAusgang2...\nNachricht oder Ton auf null setzen, um diese(n) zu deaktivieren.\n\nVerfügbare T&ouml;ne sind: door oder TTStext";
    translations.de['Usernames messages and sounds']="Usernamen und T&ouml;ne";
    translations.de['Play sounds']="T&ouml;ne abspielen";
    translations.de['TTS is powered by']="Das TTS wird bereitgestellt durch";
    translations.de['Text to speech speed']="TTS-Geschwindigkeit";
    translations.de['TTS playback rate (0.5 to 2.0)']="TTS-Geschwindigkeit (0.5 bis 2.0)";
    translations.de['Discussion is uploaded to a server and other users will get the 10 last messages on login'] = "Der Chat wird auf einen Server hochgeladen und User k&ouml;nnen die letzten 10 Nachrichten sehen nach ihrem Login";
    translations.de['Contribute to history']="Zur Chat-Historie beitragen";
    translations.de["Default to prod chat on WME Beta"] = "Immer prod. Chat in Beta WME einstellen";

    var CA_Settings=null;

    var baseURLs = [new RegExp('https://www.waze.com/editor/'),
                    new RegExp('https://www.waze.com/[^/]+/editor/'),
                    new RegExp('https://beta.waze.com/')];


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

    function logError(msg, obj)
    {
        if (obj == null)
        {
            console.error("Chat addon v" + ca_version + " - " + msg);
        }
        else
        {
            console.error("Chat addon v" + ca_version + " - " + msg + " ", obj);
        }
    }

    function log(msg, obj)
    {
        if (obj==null)
            console.log("Chat addon v" + ca_version + " - " + msg);
        else
            console.debug("Chat addon v" + ca_version + " - " + msg + " " ,obj);
    }

/*    function waitForObject(object)
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
            obj=eval("typeof(window." + object.o.replace(/\//g, '.') + ")");
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
*/
    function initializeWazeObjects()
    {
        /*
    var bGreasemonkeyServiceDefined = false;

    try {
        bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
    }
    catch (err) {  }*/

        /*if (typeof unsafeWindow === "undefined")// || ! bGreasemonkeyServiceDefined)
        {
            unsafeWindow    = ( function () {
                var dummyElem = document.createElement('p');
                dummyElem.setAttribute('onclick', 'return window;');
                return dummyElem.onclick();
            }) ();
        }*/
        var objectToCheck = ["Waze",
                             "Waze.model",
                             "Waze.Config",
                             "Waze.map",
                             "Waze.model.chat",
                             "Waze.selectionManager",
                             "Waze.loginManager.user.userName",
//                             "Waze/Model/ChatMessage",
                             "localStorage"
                            ];
        
        for (var i=0; i<objectToCheck.length; i++)
        {
            if (objectToCheck[i].indexOf('/')!=-1) // require!
            {
                var varName=objectToCheck[i].replace(/\//g, '');
                wazeRequires[varName]=require(objectToCheck[i]);
                //log("varName", varName);
                //log("wazeRequires", wazeRequires);
            }
            else
            {
                var path=objectToCheck[i].split('.');
                var object=window;
                for (var j=0; j<path.length; j++)
                {
                    object=object[path[j]];
                    if (typeof object == "undefined" || object == null)
                    {
                        window.setTimeout(initializeWazeObjects, 1000);
                        return;
                    }
                }
            }
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
    }

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

    function addMyselfToCMList()
    {
        log ("Add myself to CM list...");
        if (Waze.loginManager.user.isCountryManager())
        {
            if (isRegisteredAsCM(Waze.loginManager.user.userName, Waze.loginManager.user.editableCountryIDs))
                alert(tr("You are already registered as CM for chat addon."));
            else
            {
                if (confirm(tr("Message from Chat addon:\n\nYou are Country Manager.\nDo you allow chat addon to upload to a private server your username and the country(ies) you manage?\nIf you do so, all editors using chat addon will see your name colored in red.\nIf you answer no, you can still change your mind in chat addon settings.\nThanks.")))
                {
                    var params={url: 'http://waze.lesduts.info/userInfo/set.php?status=CM&username=' + Waze.loginManager.user.userName + '&clist=' + Waze.loginManager.user.editableCountryIDs.join(','),
                                headers: {"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
                                data: null,
                                method: 'GET'
                               };
                    WMECADownloadHelper.add(params, function (data) {}, null);
                    CA_Settings.allowUploadStatus=true;
                    saveSettings();
                }
                else
                {
                    CA_Settings.allowUploadStatus=false;
                    saveSettings();
                }
            }
        }
    }

    function updateCMList()
    {
        // download CM list:
        var params={url: 'http://waze.lesduts.info/userInfo/get.php?status=CM',
                    headers: {"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
                    data: null,
                    method: 'GET'
                   };
        WMECADownloadHelper.add(params, function (data) {
            if (data.status=='success')
            {
                try
                {
                    CMList = JSON.parse(data.data);
                    if (Waze.loginManager.user.isCountryManager() && isRegisteredAsCM(Waze.loginManager.user.userName, Waze.loginManager.user.editableCountryIDs)==false && (CA_Settings.allowUploadStatus==null || CA_Settings.allowUploadStatus==true))
                    {
                        addMyselfToCMList();
                    }
                }
                catch (e)
                {
                    log ("Error while getting CM list from server!", e);
                    log ("data", data.data);
                }
                //log("Hide CM buton?:", isCM(Waze.loginManager.user.userName));
                if (Waze.loginManager.user.isCountryManager() && isRegisteredAsCM(Waze.loginManager.user.userName, Waze.loginManager.user.editableCountryIDs))
                    getId('CA-opt-addMeToCMList').style.display="none";
            }
        }, null);
    }

    function setupTTS ()
    {
        // setup options:
        log('setup TTS Lang');
        var langSelectEl = getId('CA-opt-ttslanguage');
        //log('langSelectEl', langSelectEl);
        if (langSelectEl!==null)
        {
            for (var i=0; i<responsiveVoice.responsivevoices.length; i++)
            {
                log('responsiveVoice', responsiveVoice.responsivevoices[i].name);
                var opt = document.createElement('option');
                opt.value=responsiveVoice.responsivevoices[i].name;
                opt.innerHTML=responsiveVoice.responsivevoices[i].name;
                if (CA_Settings.tts_language==opt.value)
                {
                    opt.selected=true;
                    //responsiveVoice.setDefaultVoice(responsiveVoice.responsivevoices[i].name);
                }
                langSelectEl.appendChild(opt);
            }
        }
        tts_audio=new Audio();
        tts_audio.addEventListener('ended', processTTS);
        tts_audio.addEventListener('error', processTTS);
        tts_audio.addEventListener('stalled', processTTS);
        tts_audio.addEventListener('abort', processTTS);
        tts_audio.defaultPlaybackRate=CA_Settings.tts_playbackrate;

        responsiveVoice.mapRVs();
        responsiveVoice.fallback_playbackrate=CA_Settings.tts_playbackrate;


        window.setTimeout(processTTS);
    }

    function initialiseCA()
    {

        // patch sendmessage:
        var oriSendMessage = Waze.model.chat.sendMessage;
        Waze.model.chat.sendMessage = function (m) { 
            if (Waze.Config.marx.server=="https://marx.waze.com:443" &&
                document.location.host.indexOf("beta")!=-1 &&
                m.search(baseURLs[2])!=-1)
            {
                m=m.replace("https://beta.waze.com/", "https://www.waze.com/");
                log ("beta perma changed to prod: " + m);
            }
            oriSendMessage.call(Waze.model.chat, m);
        }

        Waze.model.chat.messages._events.register("messageUpdated", null, function () {
            try {
                iSendAMessage.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });
        //Waze.model.chat.messages._events.register("beforeMessageUpdated", null, beforeNewMessage);
        Waze.model.chat.messages._events.register("add", null, function () {
            try {
                iSendAMessage.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });
        Waze.model.chat._events.register("change:open", null, function () {
            try {
                openChatGUI.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });
        Waze.model.chat._events.register("change:visible", null, function () {
            try {
                updateInvisibleHeaderColor.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });
        Waze.model.chat._events.register("change:room", null, function () {
            try {
                roomChanged.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });

        Waze.model.chat.users._events.register("add", null, function () {
            try {
                userEnter.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });
        Waze.model.chat.users._events.register("remove", null, function () {
            try {
                userLeave.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });


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
            plbutton.className=" fa fa-link permalink";
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
        updateCMList();
        setupOptionPanel();

        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
        var fakeMsg=document.createElement('div');
        fakeMsg.className="message system-message";
        fakeMsg.innerHTML='<div class="from"></div><div class="body"><div style="direction: ltr; text-align: left;">Chat addon v' + ca_version + ' rocks!</div></div>';
        messageList.appendChild(fakeMsg);

        var settingsDiv=document.createElement('div');
        settingsDiv.style.cssFloat='right';
        var iconList='';

        if (document.location.host.indexOf("beta")!=-1)
        {
            iconList+='<a href="#" style="color: white;" id="CA-switchBeta" title="' + tr('Switch beta') + '"><img id="CA-switchBetaIcon" style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + betaIcon + '" /></a>';
            iconList+='&nbsp;';
        }

        iconList+='<a href="#" style="color: white;" id="CA-reloadRoom" title="' + tr('Reload room') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + reloadIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" style="color: white;" id="CA-joinRoom" title="' + tr('Join room') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + meetIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" style="color: white;" id="CA-exportMessages" title="' + tr('Export messages') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + exportIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" style="color: white;" id="CA-clearchat" title="' + tr('Clear chat') + '"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + trashIcon + '" /></a>';
        iconList+='&nbsp;';
        iconList+='<a href="#" id="CA-opensettings"><i class="fa fa-gear icon-cog" style="color: white;"></i></a>';
        settingsDiv.innerHTML=iconList;
        var chatHelper=getChatHelper();
        chatHelper.header.appendChild(settingsDiv);



        getId('CA-opensettings').onclick=function (e) { getId('CA-settingsPanel').style.display="block"; };
        getId('CA-clearchat').onclick=clearChat;
        getId('CA-exportMessages').onclick=exportMessages;
        getId('CA-joinRoom').onclick=joinRoom;
        getId('CA-reloadRoom').onclick=reloadRoom;
        if (document.location.host.indexOf("beta")!=-1)
            getId('CA-switchBeta').onclick=switchBeta;

        var params={url: 'http://code.responsivevoice.org/responsivevoice.js',
                    headers: {"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
                    data: null,
                    method: 'GET'
                   };
        WMECADownloadHelper.add(params, function (data) {
            if (data.status=='success')
            {
                try
                {
                    var TTSscript = document.createElement("script"); 
                    TTSscript.textContent=data.data;
                    TTSscript.setAttribute("type", "application/javascript");
                    document.body.appendChild(TTSscript);
                    window.setTimeout(setupTTS);
                    isResponsiveVoiceOK=true;

                }
                catch (e)
                {
                    logError("Error while getting TTS Script!", e);
                    isResponsiveVoiceOK=false;
                }

                //log("Hide CM buton?:", isCM(Waze.loginManager.user.userName));
            }
        }, null);

        window.setInterval(watch, 1000);



        var userListDiv=getId('chat').getElementsByClassName('users')[0];
        userListDiv.onmouseenter=function () { sortUserListDisbled=true; log('Sort User List Disbled'); };
        userListDiv.onmouseleave=function () { sortUserListDisbled=false; log('Sort User List Enabled'); sortUserList(); };

        //getId('chat').getElementsByClassName('messages')[0].addEventListener("resize", updateUnreadMessagesDivWidth);
        getId('chat').getElementsByClassName('message-list')[0].style.maxHeight="290px";

        Waze.model.liveUsers.users._events.register("add", null, function () {
            try {
                liveUserAdded.apply(this, arguments);
            }
            catch (e)
            {
                logError("Error: ", e);
            }
        });

        if (navigator.userAgent.indexOf('Firefox')!=-1)
        {
            messageList.addEventListener("DOMMouseScroll", onFirefoxEltMouseWheel, false);
            userListDiv.addEventListener("DOMMouseScroll", onFirefoxEltMouseWheel, false);
        }

        setupBells();
        if (document.location.host.indexOf("beta")!=-1 && CA_Settings.defaultProdChatBetaWME)
            switchBeta();

        log("Init done");
    }        

    function switchBeta()
    {
        if (Waze.Config.marx.server=="https://marx.waze.com:443")
        {
            Waze.Config.marx.server="https://marx-beta.waze.com:443";
            reloadRoom();
            var icon = document.getElementById('CA-switchBetaIcon');
            if (icon)
                icon.src = "data:image/png;base64," + betaIcon;
        }
        else if (Waze.Config.marx.server=="https://marx-beta.waze.com:443")
        {
            Waze.Config.marx.server="https://marx.waze.com:443";
            reloadRoom();
            var icon = document.getElementById('CA-switchBetaIcon');
            if (icon)
                icon.src = "data:image/png;base64," + notBetaIcon;
        }
    }

    function reloadRoom()
    {
        /*var data="";
        data+='data:text/html;charset=UTF-8,';
        data+='<html><body>';

        data+="<h1>Reload room report</h1>";
		data+="If the reload was successful, copy-paste this report and send it as PM to dummyd2. Thanks. <br>"
        data+="<br>";
		for (var key in Waze.model.chat._marx.socket.socket)
        {
            if (Waze.model.chat._marx.socket.socket.hasOwnProperty(key))
            {
                if (typeof Waze.model.chat._marx.socket.socket[key] == "boolean" ||
                    typeof Waze.model.chat._marx.socket.socket[key] == "number" ||
                    typeof Waze.model.chat._marx.socket.socket[key] == "string")
                    data+="Socket " + key + ": " + Waze.model.chat._marx.socket.socket[key] + "<br>";
            }
        }
		for (var key in Waze.model.chat._marx.socket.socket.options)
        {
            if (Waze.model.chat._marx.socket.socket.options.hasOwnProperty(key))
            {
                if (typeof Waze.model.chat._marx.socket.socket.options[key] == "boolean" ||
                    typeof Waze.model.chat._marx.socket.socket.options[key] == "number" ||
                    typeof Waze.model.chat._marx.socket.socket.options[key] == "string")
                    data+="Socket option " + key + ": " + Waze.model.chat._marx.socket.socket.options[key] + "<br>";
            }
        }
        data+="</body></html>";
        window.open(data,'_blank');
*/
        resetChatSocket();
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

        var theRoom = Waze.model.chat._findOrCreateRoom(roomName);
        //Waze.model.chat.attributes.room=theRoom;
        //Waze.model.chat.trigger('change:room');

        /*
        for (var s in io.sockets)
        {
            if (io.sockets.hasOwnProperty(s))
            {
                io.sockets[s].disconnect();
                delete (io.sockets[s]);
            }
        }
        var status = {
                    NotConnected: 0,
                    FirstConnection: 1,
                    Reconnection: 2
                };
        var t = {};
        t.sessionId=$.cookie('_web_session');
        var address = Waze.Config.marx.server + "/chat?" + $.param(t);
        var socket = io.connect(address, {"try multiple transports": !1, 'force new connection': true, 'forceNew': true});
        socket.on("connect", function(e) {
            return function() {
                return e.mode === status.NotConnected ? (e.mode = status.FirstConnection, e.trigger("firstConnect")) : (e.mode = status.Reconnection, e.trigger("reconnect"))
            }
        }(Waze.model.chat._marx));
        socket.on("disconnect", function(e) {
            return function() {
                return e.trigger("disconnect")
            }
        }(Waze.model.chat._marx));

        Waze.model.chat._marx.socket=socket;
        Waze.model.liveUsers._marx.socket=socket;

        Waze.model.chat._registerSocketEvents();
        Waze.model.chat._marx.activate();
        Waze.model.chat._activate();
*/
        Waze.model.chat.set("room", theRoom);

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
            if (Waze.model.chat.attributes.visible==true)
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

        for (var i=0; i<Waze.model.chat.messages.models.length; i++)
        {
            var message=Waze.model.chat.messages.models[i];
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
        Waze.model.chat.messages.reset([]);
    }

    function liveUserAdded(u)
    {
        /*
        var found=false;
        for (var i=0; i < Waze.model.liveUsers.users.models.lentgh; i++)
        {
            if (Waze.model.liveUsers.users.models[i].attributes.id==u.attributes.id)
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
        if (userName==Waze.loginManager.user.userName)
            return;
        var user=null;
        for (var i=0; i<Waze.model.chat.users.models.length; i++)
        {
            //log('init activity test user' + Waze.model.chat.users.models[i]);
            if (Waze.model.chat.users.models[i].attributes.name==userName)
            {
                user=Waze.model.chat.users.models[i];
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
        for (var i=0; i<Waze.model.chat.users.models.length; i++)
        {
            var user=Waze.model.chat.users.models[i];
            if (user.attributes.name==Waze.loginManager.user.userName)
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
                    if (Waze.model.chat.attributes.visible==true)
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
        //tts_messages=[];
        //return;

        if (tts_audio.error!=null)
            log("tts_audio.error", tts_audio.error);
        if (isResponsiveVoiceOK==false)
        {
            tts_messages=[];
            return;
        }
        if ((tts_audio.ended || tts_audio.currentSrc=='' || tts_audio.error!=null) && tts_messages.length!=0 &&
            ((responsiveVoice.voiceSupport() && !responsiveVoice.isPlaying()) || !responsiveVoice.voiceSupport()))
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

            /*if (text.length>90)
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
            }*/

            //var textCleaned=text.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, '');
            var textCleaned = encodeURIComponent(text);

            //log("clean text " + textCleaned);
            //audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=fr&q=de%20' + lastUserName + ",%20" + textCleaned;
            //audio.play();

            //tts_audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=' + CA_Settings.tts_language + '&q=' + textCleaned;
            //tts_audio.play();

            // responsiveVoice.responsivevoices[13].name
            //responsiveVoice.speak(text);

            /*if (responsiveVoice.voiceSupport())
            {
                responsiveVoice.speak(text, CA_Settings.tts_language, {rate: CA_Settings.tts_playbackrate});
            }
            else*/
            {
                for (var i=0; i<responsiveVoice.responsivevoices.length; i++)
                {
                    if (responsiveVoice.responsivevoices[i].name == CA_Settings.tts_language)
                    {
                        if (responsiveVoice.responsivevoices[i].hasOwnProperty('mappedProfile')==false)
                            continue;
                        if (responsiveVoice.responsivevoices[i].mappedProfile.hasOwnProperty('collectionvoice')==false)
                            continue;
                        var cv = responsiveVoice.responsivevoices[i].mappedProfile.collectionvoice;

                        var TTSurl = "http://code.responsivevoice.org/getvoice.php?t=" + textCleaned +
                            "&tl=" + (cv.lang || "en-US") + 
                            "&sv=" + (cv.service || "") + 
                            "&vn=" + (cv.voicename || "");


                        //tts_audio.src ='http://code.responsivevoice.org/getvoice.php?tl=' + CA_Settings.tts_language + '&t=' + textCleaned;
                        tts_audio.src = TTSurl;
                        tts_audio.play();

                        break;
                    }
                }
            }
            tts_messages.splice(0,1);
        }

        if (tts_messages.length==0)
            window.setTimeout(processTTS, 500);
        else
            window.setTimeout(processTTS);

    }

    /*
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
*/
    function loadSettings()
    {
        CA_Settings={showDate: true,
                     messageSound: false,
                     messageBGColor: 'A1DCF5',
                     alertBGColor: '880000',
                     alertMatch: Waze.loginManager.user.userName,
                     alertSound: false,
                     removeInvisible: false,
                     bipPattern: '@{userName}?',
                     systemMessageOnJoinLeave: false,
                     usernamesMatch: "",
                     usernamesMatchPlaySound: true,
                     sortUserList: 0,
                     forceRoom: '',
                     tts: false,
                     tts_language: 'en',
                     tts_fromPrefix: 'from {userName}',
                     tts_linkTo: 'link to {link}',
                     tts_playbackrate: 1.0,
                     sortUserListActivity: false,
                     defaultProdChatBetaWME:false,
                     allowUploadStatus: null,
                     contributeToHistory: false
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
            if (typeof(settings.usernamesMatch)!=="undefined") CA_Settings.usernamesMatch = settings.usernamesMatch;
            if (typeof(settings.usernamesMatchPlaySound)!=="undefined") CA_Settings.usernamesMatchPlaySound = settings.usernamesMatchPlaySound;
            if (typeof(settings.sortUserList)!=="undefined") CA_Settings.sortUserList = settings.sortUserList;
            if (typeof(settings.forceRoom)!=="undefined") CA_Settings.forceRoom = settings.forceRoom;
            if (typeof(settings.tts)!=="undefined") CA_Settings.tts = settings.tts;
            if (typeof(settings.tts_language)!=="undefined") CA_Settings.tts_language = settings.tts_language;
            if (typeof(settings.tts_fromPrefix)!=="undefined") CA_Settings.tts_fromPrefix = settings.tts_fromPrefix;
            if (typeof(settings.tts_linkTo)!=="undefined") CA_Settings.tts_linkTo = settings.tts_linkTo;
            if (typeof(settings.tts_playbackrate)!=="undefined") CA_Settings.tts_playbackrate = settings.tts_playbackrate;
            if (typeof(settings.sortUserListActivity)!=="undefined") CA_Settings.sortUserListActivity = settings.sortUserListActivity;
            if (typeof settings.defaultProdChatBetaWME !== "undefined") CA_Settings.defaultProdChatBetaWME = settings.defaultProdChatBetaWME;
            if (typeof(settings.allowUploadStatus)!=="undefined") CA_Settings.allowUploadStatus = settings.allowUploadStatus;
            if (typeof(settings.contributeToHistory)!=="undefined") CA_Settings.contributeToHistory = settings.contributeToHistory;

        }
        if (CA_Settings.tts_playbackrate < 0.5) CA_Settings.tts_playbackrate=0.5;
        if (CA_Settings.tts_playbackrate > 2.0) CA_Settings.tts_playbackrate=2.0;
        var users=CA_Settings.usernamesMatch.split(',');
        for (var i=0; i<users.length; i++)
        {
            var details = users[i].split(':');
            if (details.length>1) // manual list
            {
                if (userAlertList.hasOwnProperty(details[0])==false)
                {
                    userAlertList[details[0]]={
                        inMessage: [details[1]],
                        inSound: [details[2]],
                        outMessage: [details[3]],
                        outSound: [details[4]],
                        color: (details.length>5?details[5]:"")
                    };
                }
                else
                {
                    userAlertList[details[0]].inMessage.push(details[1]);
                    userAlertList[details[0]].inSound.push(details[2]);
                    userAlertList[details[0]].outMessage.push(details[3]);
                    userAlertList[details[0]].outSound.push(details[4]);
                }

            }
            if (details.length==1) // google spreadsheet
            {
                // download the sheet
                var params={url: 'https://docs.google.com/spreadsheets/d/' + users[i] +'/export?format=csv',
                            headers: {"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
                            data: null,
                            method: 'GET'
                           };

                //var url = 'https://docs.google.com/spreadsheets/d/' + users[i] +'/export?format=csv';
                log("download", params.url);
                WMECADownloadHelper.add(params, function (data) {
                    if (data.status=='success')
                    {
                        try
                        {
                            var list = data.data.split('\n');
                            for (var j=0; j<list.length; j++)
                            {
                                var details=list[j].split(',');
                                if (details.length>=5 && details[0]!="UserName")
                                {
                                    if (userAlertList.hasOwnProperty(details[0])==false)
                                    {
                                        userAlertList[details[0]]={
                                            inMessage: [details[1]],
                                            inSound: [details[2]],
                                            outMessage: [details[3]],
                                            outSound: [details[4]],
                                            color: (details.length>5?details[5]:"")
                                        };
                                    }
                                    else
                                    {
                                        userAlertList[details[0]].inMessage.push(details[1]);
                                        userAlertList[details[0]].inSound.push(details[2]);
                                        userAlertList[details[0]].outMessage.push(details[3]);
                                        userAlertList[details[0]].outSound.push(details[4]);
                                    }

                                }
                            }

                        }
                        catch (e)
                        {
                            log ("Error while getting user name list!", e);
                        }
                        //log("Hide CM buton?:", isCM(Waze.loginManager.user.userName));
                    }
                }, null);

            }
        }
        log("Settings loaded");
        //log("user alerts:", userAlertList);
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
        var tts_playbackrate = parseFloat(getId('CA-opt-ttsplaybackrate').value);
        if (isNaN(tts_playbackrate))
            tts_playbackrate=1.0;
        if (CA_Settings.tts_playbackrate < 0.5) CA_Settings.tts_playbackrate=0.5;
        if (CA_Settings.tts_playbackrate > 2.0) CA_Settings.tts_playbackrate=2.0;

        CA_Settings={messageSound: getId('CA-opt-messagesound').checked,
                     showDate: getId('CA-opt-showdate').checked,
                     messageBGColor: messageBG,
                     alertBGColor: alertBG,
                     alertMatch: getId('CA-opt-alertmatch').value,
                     alertSound: getId('CA-opt-alertsound').checked,
                     removeInvisible: getId('CA-opt-removeinvisibles').checked,
                     bipPattern: bipPattern,
                     systemMessageOnJoinLeave: getId('CA-opt-systemmessageonjoinleave').checked,
                     usernamesMatch: getId('CA-opt-usernamesmatch').value,
                     usernamesMatchPlaySound: getId('CA-opt-usernamesmatchplaysound').checked,
                     sortUserList: getId('CA-opt-sortUserList0').checked?0:(getId('CA-opt-sortUserList1').checked?1:(getId('CA-opt-sortUserList2').checked?2:3)),
                     forceRoom: getId('CA-opt-forceroom').value,
                     tts: getId('CA-opt-tts').checked,
                     tts_language: getId('CA-opt-ttslanguage').value,
                     tts_fromPrefix: getId('CA-opt-ttsfromprefix').value,
                     tts_linkTo: getId('CA-opt-ttslinkto').value,
                     tts_playbackrate: tts_playbackrate,
                     sortUserListActivity: getId('CA-opt-sortUserListActivity').checked,
                     //defaultProdChatBetaWME: (document.location.host.indexOf("beta")!=-1?getId("CA-opt-defaultProdChatBetaWME").checked:false),
                     contributeToHistory: (document.location.host.indexOf("beta")==-1?getId('CA-opt-contributeToHistory').checked:false)
                    };
        if (document.location.host.indexOf("beta")!=-1)
            CA_Settings.defaultProdChatBetaWME=getId("CA-opt-defaultProdChatBetaWME").checked;

        if (isResponsiveVoiceOK==true)
        {
            responsiveVoice.fallback_playbackrate=CA_Settings.tts_playbackrate;
            tts_audio.defaultPlaybackRate=CA_Settings.tts_playbackrate;
        }

        sortUserList();
        return null;   
    }

    function setupOptionPanel()
    {
        var panel = document.createElement('div');
        panel.id = "CA-settingsPanel";
        panel.setAttribute('style', 'border: 1px solid black; background-color: #FFFFFF; padding: 5px; position: absolute; top: 15px; right: 15px; z-index: 9999; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; display: none;');
        var panelHTML = '<center style="font-weight: bold; size: bigger;">' + tr('Chat addon settings') + '</center><br/>';
        panelHTML += '<span>' + tr('TTS is powered by') + ' <a href="http://responsivevoice.org">ResponsiveVoice-NonCommercial</a> licensed under <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img title="ResponsiveVoice Text To Speech" src="https://responsivevoice.org/wp-content/uploads/2014/08/95x15.png" alt="95x15" width="95" height="15" /></a></span><br/>';
        panelHTML += '<label><input type="checkbox" id="CA-opt-messagesound"' + (CA_Settings.messageSound?' checked':'') + '> ' + tr('Play sound on new message') + '</input></Label><br />';
        panelHTML += '<label title="' + tr('Text to speech speed') + '">' + tr('TTS playback rate (0.5 to 2.0)') + ': <input style="height: 25px;" type="text" size="10" maxlength="10" id="CA-opt-ttsplaybackrate" value="' + CA_Settings.tts_playbackrate + '" /></Label><br/>';
        panelHTML += '<label title="' + tr('Text to speech on messages') + '"><input type="checkbox" id="CA-opt-tts"' + (CA_Settings.tts?' checked':'') + '> TTS</input></Label> <label>' + tr('language') + ': <select style="height: 25px;" id="CA-opt-ttslanguage" /></select></Label><br/>';
        //panelHTML += '<label title="' + tr('Text to speech on messages') + '"><input type="checkbox" id="CA-opt-tts"' + (CA_Settings.tts?' checked':'') + '> TTS</input></Label> <label>' + tr('language') + ': <input type="text" style="height: 25px;" id="CA-opt-ttslanguage" value="' + CA_Settings.tts_language + '"/></Label><br/>';
        panelHTML += '<label title="' + tr('Text to speech on from username') + '">' + tr('TTS from username') + ': <input style="height: 25px;" type="text" size="20" maxlength="100" id="CA-opt-ttsfromprefix" value="' + CA_Settings.tts_fromPrefix + '" /></Label><br/>';
        panelHTML += '<label title="' + tr('Text to speech on internet link') + '">' + tr('TTS link to') + ': <input style="height: 25px;" type="text" size="20" maxlength="100" id="CA-opt-ttslinkto" value="' + CA_Settings.tts_linkTo + '" /></Label><br/>';

        panelHTML += '<label><input type="checkbox" id="CA-opt-showdate"' + (CA_Settings.showDate?' checked':'') + '> ' + tr('Show message date (uncheck for time only)') + '</input></Label><br />';
        panelHTML += '<label>' + tr('My message background color') + ': <input style="height: 25px;" type="text" size="6" maxlength="6" id="CA-opt-messagebg" value="' + CA_Settings.messageBGColor + '" /></Label><br />';
        panelHTML += '<label>' + tr('Alert color') + ': <input style="height: 25px;" type="text" size="6" maxlength="6" id="CA-opt-alertbg" value="' + CA_Settings.alertBGColor + '" /></Label><br />';
        panelHTML += '<label title="' + tr('words separated by a comma\nCase unsensitive\nBegin and end with $ to match exact word') + '\n\n' + tr('eg') + ':\n' + Waze.loginManager.user.userName + '\n' + tr('or') + '\n' + Waze.loginManager.user.userName + ',' + tr('userNameOfAFriend,$unlock$') + '">' + tr('Alert match') + ': <input style="height: 25px;" type="text" size="30" id="CA-opt-alertmatch" value="' + CA_Settings.alertMatch + '" /></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-alertsound"' + (CA_Settings.alertSound?' checked':'') + '> ' + tr('Play sound on new alert') + '</input></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-removeinvisibles"' + (CA_Settings.removeInvisible?' checked':'') + '> ' + tr('Remove messages of users not in the users list of the room') + '</input></Label><br />';
        panelHTML += '<label title="' + tr('{userName} will be replaced by the user\'s name you click on\n\nEg:\nHey {userName}, come here please!\nor\n@{userName}?') + '">' + tr('Bip pattern (must contain {userName})') + ': <input style="height: 25px;" type="text" size="15" id="CA-opt-bippattern" value="' + CA_Settings.bipPattern + '" /></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-systemmessageonjoinleave"' + (CA_Settings.systemMessageOnJoinLeave?' checked':'') + '> ' + tr('Add system message when a user join or leave the chat room') + '</input></Label><br />';
        panelHTML += '<label title="' + tr('Format: username:messageIn:soundIn:messageOut:soundOut,a_google_doc_key_here,username2:messageIn2:soundIn2:messageOut2:soundOut2...\nmessage or sound can be null to disable.\n\nSounds available: door or TTStext to speach') + '\n\n' + tr('eg') + ':\ndummyd2:<-- say hello to this guy!:door:bye bye:TTSdummyd2 has left' + '">' + tr('Usernames messages and sounds') + ': <input style="height: 25px;" type="text" size="30" id="CA-opt-usernamesmatch" value="' + CA_Settings.usernamesMatch + '" /></Label> <label><input type="checkbox" id="CA-opt-usernamesmatchplaysound"' + (CA_Settings.usernamesMatchPlaySound?' checked':'') + '> ' + tr('Play sounds') + '</input></Label><br />';
        panelHTML += '<label><input type="checkbox" id="CA-opt-sortUserListActivity"' + (CA_Settings.sortUserListActivity?' checked':'') + '> ' + tr('Sort user list on user\'s activity. Sort below will be the secondary sort') + '.</input></Label><br />';
        panelHTML += '<b>' + tr('Sort user list') + ':</b> <label><input type="radio" id="CA-opt-sortUserList0" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==0?' checked':'') + '>' + tr('No sort') + '</input></label> <label><input type="radio" id="CA-opt-sortUserList1" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==1?' checked':'') + '>' + tr('User name') + '</input></label> <label><input type="radio" id="CA-opt-sortUserList2" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==2?' checked':'') + '>' + tr('User rank') + '</input></Label><label><input type="radio" id="CA-opt-sortUserList3" name="CA-opt-sortUserList"' + (CA_Settings.sortUserList==3?' checked':'') + '>' + tr('Distance') + '</input></Label><br />';
        panelHTML += '<label title="' + tr('Set the room name exactly as it appear in the room list\n\nLet blank to disable this feature') + '">' + tr('Force room') + ': <input style="height: 25px;" type="text" size="15" id="CA-opt-forceroom" value="' + CA_Settings.forceRoom + '" /></Label><br />';
        if (document.location.host.indexOf("beta") != -1) {
            panelHTML += '<label><input type="checkbox" id="CA-opt-defaultProdChatBetaWME"' + (CA_Settings.defaultProdChatBetaWME ? " checked" : "") + "> " + tr("Default to prod chat on WME Beta") + "</input></Label><br />";
        }
        if (document.location.host.indexOf("beta")==-1)
            panelHTML += '<label title="' + tr("Discussion is uploaded to a server and other users will get the 10 last messages on login") + '"><input type="checkbox" id="CA-opt-contributeToHistory"' + (CA_Settings.contributeToHistory?' checked':'') + '> ' + tr('Contribute to history') + '.</input></Label><br />';
        //log ("CM button creation");
        if (Waze.loginManager.user.isCountryManager())
            panelHTML += '<button id="CA-opt-addMeToCMList">' + tr('Add me to CM List') + '</button><br />';
        panelHTML += '<button id="CA-opt-close">' + tr('Save') + '</button>';
        panel.innerHTML = panelHTML;
        getId('map').appendChild(panel);

        if (Waze.loginManager.user.isCountryManager())
            getId('CA-opt-addMeToCMList').onclick=addMyselfToCMList;

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
        //log ("chat att", Waze.model.chat.attributes);
        //log ("to bgcolor:", typeof(chatHelper.header.style.backgroundColor));
        //log ("bgcolor:", chatHelper.header.style.backgroundColor);

        if (Waze.model.chat.attributes.visible==false && chatHelper.header.style.backgroundColor=="")
        {
            chatHelper.header.style.backgroundColor="#c2c2c2";
        }
        if (Waze.model.chat.attributes.visible==true)
        {
            if (chatHelper.header.style.backgroundColor=="rgb(194, 194, 194)")
                chatHelper.header.style.backgroundColor="";
        }

    }

    function addHistory(msg)
    {
        if (!CA_Settings.contributeToHistory) return;
        history.push({room: Waze.model.chat.attributes.roomName,
                      username: msg.attributes.from.name,
                      datetime: msg.attributes.from.lastUpdate,
                      message: msg.attributes.body});
        if (history.length>=msgCountPerUpload)
        {
            uploadHistory();
        }
    }

    function uploadHistory()
    {
        if (!CA_Settings.contributeToHistory) return;
        var params={url: "http://waze.lesduts.info/clog/postHistory.php",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(history),
                    method: 'POST'
                   };
        WMECADownloadHelper.add(params, function(data) {});
        history=[];

    }
    function iSendAMessage(e)
    {
        if (e.attributes.type!="system" && document.location.host.indexOf("beta")==-1)
            addHistory(e);
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
            if (userName!=Waze.loginManager.user.userName)
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
        //if (Waze.model.chat.attributes.visible==true)
        setupBells();
        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
        var scrollDown =(messageList.offsetHeight + messageList.scrollTop >= messageList.scrollHeight);


        logDebug("ALERT ME iSendAMessage event:", e);
        updateInvisibleHeaderColor();
        if (e.attributes.from.name==Waze.loginManager.user.userName)
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

            if (Waze.model.chat.attributes.visible==true)
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
                if (divPerma.children[i].className=='fa fa-link permalink')// ||
                    //divPerma.children[i].className=='fa fa-link')
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
                    if (userInfos.length!=1 && liveUserName!=Waze.loginManager.user.userName)
                        liveUserName=children[j].firstChild.innerHTML;
                    logDebug("live username:" , liveUserName);

                    if (liveUserName==Waze.loginManager.user.userName)
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
                        if (liveUserName!=Waze.loginManager.user.userName && liveUserName!="")
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
                    if (lastUserName==Waze.loginManager.user.userName)
                        children[j].style.backgroundColor='#' + CA_Settings.messageBGColor;

                    var list=children[j].children;

                    var textForTTS='';

                    for (var k=0; k<list.length; k++)
                    {
                        //logDebug("list["+k+"]:", list[k]);
                        logDebug("attribute alertMe:" + chatHelper.header.getAttribute("CA-alertme"));
                        logDebug("i+1/messlength:" + (i+1) +  "/" + messages.length);

                        var text=list[k].innerHTML;

                        if ((i+1)==messages.length && lastUserName!=Waze.loginManager.user.userName && CA_Settings.tts==true)
                        {   
                            var newFromUserName=CA_Settings.tts_fromPrefix.replace(/\{userName\}/gi, lastUserName);
                            lastUserName.replace('-', '');
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
                        if ((i+1)==messages.length && lastUserName!=Waze.loginManager.user.userName && doNotNotifyNext==false)
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
                                //if (text.toLowerCase().indexOf(Waze.loginManager.user.userName.toLowerCase())!=-1)
                                if (alertMatch==true)// && liveUserName!=Waze.loginManager.user.userName)
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
        //logDebug("New message (/" + Waze.model.chat.messages.models.length + "):", Waze.model.chat.messages.models[Waze.model.chat.messages.models.length-1]);
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
                            if (lastUserName==Waze.loginManager.user.userName)
                            {
                                children[j].innerHTML=children[j].innerHTML + ' (' + (Waze.loginManager.user.rank+1) + ')';
                            }
                            else
                            {
                                separator=' ';
                                var liveUserRank = getRankOfLiveUser(lastUserName);
                                children[j].innerHTML='<a href="#" id="CA-bip-' + bipCount + '">' + lastUserName + '</a> (' + (liveUserRank!=null?liveUserRank+1:'?') + ')' + ' <a href="#" id="CA-t-' + targetCount + '"><i class="crosshair fa fa-crosshairs icon-screenshot"></i></a>';
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
                        if (userInfos.length!=1 && lastUserName!=Waze.loginManager.user.userName)
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

                                    newMessage=newMessage.replace(permalink.permalink, '<a href="#"' + (elements!=0?(' title="' + elements + ' ' + elType + '"'):'') + ' id="CA-t-' + targetCount + '"><i class="crosshair fa fa-crosshairs icon-screenshot"></i></a>');
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

        //if (lastMessageFrom==Waze.loginManager.user.userName || Waze.model.chat.messages.models.last().attributes.type=="system")
        if (lastMessageFrom == Waze.loginManager.user.userName || Waze.model.chat.messages.models.isEmpty() == false && Waze.model.chat.messages.models.last().attributes.type == "system")
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
        for (var i=0; i<Waze.model.chat.messages.models.length; i++)
        {
            res=Waze.model.chat.messages.models[i];
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
    logDebug("Before new message (/" + Waze.model.chat.messages.models.length + "):", Waze.model.chat.messages.models[Waze.model.chat.messages.models.length-1]);
}
*/

    function getRankOfLiveUser(userName)
    {
        for (var i=0; i<Waze.model.chat.users.models.length; i++)
        {
            if (Waze.model.chat.users.models[i].attributes.name==userName)
                return Waze.model.chat.users.models[i].attributes.rank;
        }
        return null;
    }

    function jumpToUser(userName)
    {
        var user=null;
        for (var i=0; i<Waze.model.chat.users.models.length; i++)
        {
            user=Waze.model.chat.users.models[i];
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

        Waze.selectionManager.unselectAll();
        // force chat jumper init:
        //    chatJumperRetry=chatJumperMaxRetry;
        //    ChatJumper_init();

        if (typeof(ChatJumper)!=='undefined')
        {
            if (ChatJumper.isLast) { // Plese, dont erase Jump whet jumping again
            } else {
                var c = Waze.map.getCenter(); // Gets yours center of view and remeber it
                var zoom = Waze.map.getZoom(); // Gets zoom level
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
            Waze.model.events.register("mergestart", null, mergestart);
        }

        var xy = OpenLayers.Layer.SphericalMercator.forwardMercator(jumpSet.lon, jumpSet.lat);
        if (jumpSet.zoom)
            Waze.map.setCenter(xy, jumpSet.zoom);
        else
            Waze.map.setCenter(xy);

        if (jumpSet.segments || jumpSet.nodes || jumpSet.venues || jumpSet.mapUpdateRequest)
        {
            window.setTimeout(getFunctionWithArgs(selectData, [jumpSet]), 500);
        }
    }

    function mergestart ()
    {
        try {
            log("Permalink is far!");
            selectDataWaitForMergeEnd=true;
            Waze.model.events.unregister("mergestart", null, mergestart);
            Waze.model.events.register("mergeend", null, mergeend);
        }
        catch (e)
        {
            logError("Error:", e);
        }
    }

    function mergeend ()
    {
        try {
            log("Data loaded, now, try to select data if any...");
            Waze.model.events.unregister("mergeend", null, mergeend);
            selectDataWaitForMergeEnd=false;
            selectData(currentJumpSet);
        }
        catch (e)
        {
            logError("Error:", e);
        }
    }

    function selectData(jumpSet)
    {
        /*if (arguments.length==0)
    {
        var jumpSet=currentJumpSet;
        currentJumpSet=null;
        Waze.model.events.unregister("mergeend", null, selectData);
    //}*/

        if (selectDataWaitForMergeEnd==true)
        {
            log ("waiting for data...");
            return;
        }
        Waze.model.events.unregister("mergestart", null, mergestart);
        Waze.model.events.unregister("mergeend", null, mergeend);

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
                if (typeof(Waze.model.segments.objects[segId])==='undefined')
                {
                    success=false;
                    notFound.push(segId);
                }
                else
                    segs.push(Waze.model.segments.objects[segId]);
            }
            //if (success)
            elements=jumpSet.segments.length;
            Waze.selectionManager.select(segs); 
        }
        if (jumpSet.nodes)
        {
            var nodes=[];
            for (var i=0; i<jumpSet.nodes.length; i++)
            {
                var nodeId=parseInt(jumpSet.nodes[i]);
                if (typeof(Waze.model.nodes.objects[nodeId])==='undefined')
                {
                    success=false;
                    notFound.push(nodeId);
                }
                else
                    nodes.push(Waze.model.nodes.objects[nodeId]);
            }
            //if (success)
            elements=jumpSet.nodes.length;
            Waze.selectionManager.select(nodes); 
        }
        if (jumpSet.venues)
        {
            Waze.map.landmarkLayer.setVisibility(true);
            var venues=[];
            for (var i=0; i<jumpSet.venues.length; i++)
            {
                var venueId=jumpSet.venues[i];
                if (typeof(Waze.model.venues.objects[venueId])==='undefined')
                {
                    success=false;
                    notFound.push(venueId);
                }
                else
                    venues.push(Waze.model.venues.objects[venueId]);
            }
            //if (success)
            elements=jumpSet.venues.length;
            Waze.selectionManager.select(venues); 
        }

        if (jumpSet.mapUpdateRequest && jumpSet.mapUpdateRequest.length>=1 && !jumpSet.segments && !jumpSet.nodes && !jumpSet.venues)
        {
            var mp = Waze.model.problems.objects[parseInt(jumpSet.mapUpdateRequest[0])];
            var tp=null;

            if (mp==null)
                tp = Waze.model.turnProblems.objects[parseInt(jumpSet.mapUpdateRequest[0])];

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
                if (confirm('Some elements can\'t be found.\nSelection: ' + Waze.selectionManager.selectedItems.length + '/' + elements + '\nNot found: ' + (notFound.length!=0?('Elements ids: ' + notFound.join(', ') + '\n'):'') + 'Try again to select elements?'))
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
            if (users.length==0 || (users.length==1 && Waze.model.chat.attributes.visible))
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
                    for (var i=0; i<Waze.model.chat.users.models.length; i++)
                        if (Waze.model.chat.users.models[i].attributes.id==userId)
                        {
                            userName=Waze.model.chat.users.models[i].attributes.name;
                            break;
                        }

                    //log("userName", userName);
                    if (userName!=Waze.loginManager.user.userName && userName!="")
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
                        if (Waze.model.chat.attributes.visible==true)
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
                            for (var i=0; i<Waze.model.chat.users.models.length; i++)
                            {
                                if (Waze.model.chat.users.models[i].attributes.id==userId)
                                {
                                    userName=Waze.model.chat.users.models[i].attributes.name;
                                    break;
                                }
                            }
                            //log("userName", userName);
                            if (userName!=Waze.loginManager.user.userName && userName!="")
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
        //if (Waze.model.chat.attributes.visible==true)
        //{
        setupBells();
        //}
        var messageDisplayed=false;
        //        log("CA_Settings.usernamesMatch", CA_Settings.usernamesMatch);
        if (e.attributes.name!=Waze.loginManager.user.userName && CA_Settings.usernamesMatch.length!=0)
        {
            if (userAlertList.hasOwnProperty(e.attributes.name)==true)
            {
                var details=userAlertList[e.attributes.name];
                for (var i=0; i<details.inMessage.length; i++)
                    if (details.inMessage[i]!="null" &&
                        details.inMessage[i]!="")
                    {
                        addSystemMessage(e.attributes.name + ' (' + (e.attributes.rank+1) + ') ' + details.inMessage[i]);
                        messageDisplayed=true;
                    }
                //log("usernamesMatchPlaySound", CA_Settings.usernamesMatchPlaySound);
                for (var i=0; i<details.inSound.length; i++)
                {
                    if (details.inSound[i]!="null" && details.inSound[i]!="" && inoutSounds.hasOwnProperty(details.inSound[i]) && CA_Settings.usernamesMatchPlaySound==true)
                    {
                        var snd = new Audio("data:audio/mp3;base64," + inoutSounds[details.inSound[i]].in);
                        snd.play();
                    }
                    if (details.inSound[i]!="null" && details.inSound[i]!="" && details.inSound[i].substr(0, 3)=="TTS" && CA_Settings.usernamesMatchPlaySound==true)
                    {
                        tts_messages.push(details.inSound[i].substr(3));
                    }
                }
            }
        }

        if (e.attributes.name!=Waze.loginManager.user.userName && CA_Settings.systemMessageOnJoinLeave==true && !messageDisplayed)
        {
            addSystemMessage(e.attributes.name + ' (' + (e.attributes.rank+1) + ') ' + tr('has joined'));
        }


        if (e.attributes.name==Waze.loginManager.user.userName)
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

        var messageDisplayed=false;
        if (e.item.attributes.name!=Waze.loginManager.user.userName && CA_Settings.usernamesMatch.length!=0)
        {
            if (userAlertList.hasOwnProperty(e.item.attributes.name)==true)
            {
                var details=userAlertList[e.item.attributes.name];
                for (var i=0; i<details.outMessage.length; i++)
                    if (details.outMessage[i]!="null" &&
                        details.outMessage[i]!="")
                    {
                        addSystemMessage(e.item.attributes.name + ' (' + (e.item.attributes.rank+1) + ') ' + details.outMessage[i]);
                        messageDisplayed=true;
                    }
                for (var i=0; i<details.outSound.length; i++)
                {
                    if (details.outSound[i]!="null" && details.outSound[i]!="" && inoutSounds.hasOwnProperty(details.outSound[i]) && CA_Settings.usernamesMatchPlaySound==true)
                    {
                        var snd = new Audio("data:audio/mp3;base64," + inoutSounds[details.outSound[i]].out);
                        snd.play();
                    }
                    if (details.outSound[i]!="null" && details.outSound[i]!="" && details.outSound[i].substr(0, 3)=="TTS" && CA_Settings.usernamesMatchPlaySound==true)
                    {
                        tts_messages.push(details.outSound[i].substr(3));
                    }
                }
            }
        }
        if (e.item.attributes.name!=Waze.loginManager.user.userName && CA_Settings.systemMessageOnJoinLeave==true && !messageDisplayed)
        {
            addSystemMessage(e.item.attributes.name  + ' (' + (e.item.attributes.rank+1) + ') ' + tr('has left'));
        }

        if (e.item.attributes.name==Waze.loginManager.user.userName)
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
        //Waze.model.chat.messages.add(new wazeRequires.WazeModelChatMessage.ChatMessage({type: 'system', body: message, from:{}})); 
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

    function isRegisteredAsCM(username, countriesList)
    {
        var registeredCountries=0;
        for (var i=0; i<countriesList.length; i++)
        {
            if (CMList.hasOwnProperty(''+countriesList[i]) && CMList[''+countriesList[i]].indexOf(username)!=-1)
                registeredCountries++;
        }
        if (registeredCountries==countriesList.length)
            return true;
        return false;
        /*        for (var c in CMList)
        {
            if (CMList.hasOwnProperty(c) && CMList[c].indexOf(username)!=-1)
                return true;
        }
        return false;*/
    }


    function isCM(username)
    {
        /*for (var c in CMList)
            {
                if (CMList.hasOwnProperty(c) && CMList[c].indexOf(username)!=-1)
                    return true;
            }*/
        if (CMList!=null &&
            Waze.model.hasOwnProperty("countries") &&
            Waze.model.countries &&
            Waze.model.countries.hasOwnProperty("top") &&
            Waze.model.countries.top &&
            Waze.model.countries.top.hasOwnProperty("id") &&
            CMList.hasOwnProperty(Waze.model.countries.top.id) &&
            CMList[Waze.model.countries.top.id].indexOf(username)!=-1)
            return true;
        return false;
    }

    function sortUserList()
    {
        // setup custom chat rooms:
        if (Waze.model.hasOwnProperty("countries") &&
            Waze.model.countries &&
            Waze.model.countries.hasOwnProperty("top") &&
            Waze.model.countries.top &&
            Waze.model.countries.top.hasOwnProperty("id") &&
            Waze.model.countries.top.id==73)
            Waze.model.chat._findOrCreateRoom("MapRaid France");

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
        
        for (var i=0; i<users.length-1; i++)
        {
            if (users[i].hasChildNodes()==false) continue;
            var realUserName=getElementsByClassName('username', users[i])[0].innerHTML;
            if (isCM(realUserName))
            {
                getElementsByClassName('username', users[i])[0].style.color='crimson';
                getElementsByClassName('username', users[i])[0].style.textDecoration='underline';
            }
            else
            {
                if (userAlertList.hasOwnProperty(realUserName)==true && 
                    userAlertList[realUserName].hasOwnProperty('color') && 
                    userAlertList[realUserName].color!="")
                {
                    getElementsByClassName('username', users[i])[0].style.color=userAlertList[realUserName].color;
                }
                else
                {
                    getElementsByClassName('username', users[i])[0].style.color='';
                }
                getElementsByClassName('username', users[i])[0].style.textDecoration='';
            }
        }

        
        setupBells();
        if (sortUserListDisbled==true) return;
        var now = new Date();
        var sortMode=CA_Settings.sortUserList;
        if (sortMode==0 && CA_Settings.sortUserListActivity==false) return;



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

                        for (var u=0; u<Waze.model.chat.users.models.length; u++)
                        {
                            if (Waze.model.chat.users.models[u].attributes.name==realUserName)
                            {
                                userObj=Waze.model.chat.users.models[u];
                                if (nextuserObj!=null)
                                    break;
                                continue;
                            }
                            if (Waze.model.chat.users.models[u].attributes.name==nextRealUserName)
                            {
                                nextuserObj=Waze.model.chat.users.models[u];
                                if (userObj!=null)
                                    break;
                                continue;
                            }
                        }
                        if (userObj!=null && nextuserObj!=null)
                        {
                            var du=0;
                            var dnu=0;
                            var myPosition=OpenLayers.Layer.SphericalMercator.inverseMercator(Waze.map.getCenter().lon, Waze.map.getCenter().lat);
                            //log("myPosition", myPosition);
                            if (userObj.attributes.name==Waze.loginManager.user.userName)
                                continue;
                            if (nextuserObj.attributes.name==Waze.loginManager.user.userName)
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

                var hrs = users[next].getElementsByTagName("hr");
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


    function resetChatSocket(room)
    {
        //log ("Reset chat socket");


        Waze.model.chat._marx.socket.removeAllListeners();
        try
        {
            Waze.model.chat._marx.socket.socket.disconnect();
        }
        catch (e)
        { }
        if (Waze.model.chat._marx.socket.socket.connected==true || Waze.model.chat._marx.socket.socket.open==true)
        {
            log ("wait for disconnection...");
            window.setTimeout(function () {resetChatSocket(room); window.setTimeout(setupBells); });
            return;
        }

        delete (io.sockets[Waze.Config.marx.server]);
        var status = {
            NotConnected: 0,
            FirstConnection: 1,
            Reconnection: 2
        };
        var t = {};
        //var wazeLoginManager;
        /*if (document.location.host.indexOf("beta")==-1)
            wazeLoginManager=require ("Waze/LoginManager");
        else*/
        //wazeLoginManager=require ("Waze/App/LoginManager");
        t.sessionId=$.cookie(Waze.loginManager.__proto__.COOKIE_NAME);
        var address = Waze.Config.marx.server + "/chat?" + $.param(t);
        var socket = io.connect(address, {"try multiple transports": !1, 'force new connection': true, 'forceNew': true});
        //log ("socket.socket.open", socket.socket.open);
        socket.on("connect", function(e) {
            return function() {
                //                return status.FirstConnection;
                return e.mode === status.NotConnected ? (e.mode = status.FirstConnection, e.trigger("firstConnect")) : (e.mode = status.Reconnection, e.trigger("reconnect"))
            }
        }(Waze.model.chat._marx));
        socket.on("disconnect", function(e) {
            return function() {
                return e.trigger("disconnect")
            }
        }(Waze.model.chat._marx));
        socket.on("connect_error", function(e) {
            return function() {
                log("socket connection error: " , e);
            }
        }(Waze.model.chat._marx));


        io.sockets[Waze.Config.marx.server]=socket.socket;

        Waze.model.chat._marx.socket=socket;
        Waze.model.liveUsers._marx.socket=socket;

        Waze.model.chat._registerSocketEvents();
        Waze.model.liveUsers._registerMarxEvents();
        //Waze.model.chat._activate();
    }

    function roomChanged(e)
    {

        window.setTimeout(function () { resetChatSocket(e.newValue); window.setTimeout(setupBells); });        
        log("ROOM Changed:" , e);

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
        if (document.location.host.indexOf("beta")==-1)
        {
            var params={url: 'http://waze.lesduts.info/clog/getHistory.php?room=' + e.newValue.attributes.name,
                        headers: {"User-Agent": "Mozilla/5.0", "Accept": "text/plain"},
                        data: null,
                        method: 'GET'
                       };
            WMECADownloadHelper.add(params, function (data) {
                if (data.status=='success')
                {
                    var wasTTS = CA_Settings.tts;
                    CA_Settings.tts = false;
                    try
                    {
                        var msgs = JSON.parse(data.data);
                        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
                        for (var i=0; i<msgs.length; i++)
                        {
                            var fakeMsg=document.createElement('div');
                            fakeMsg.className="message normal-message";
                            fakeMsg.style.fontStyle='italic';
                            var utcTS = new Date(msgs[i].datetime + " UTC").getTime();
                            var localDT = new Date(utcTS).toLocaleString();
                            //fakeMsg.innerHTML='<div class="from">' + msgs[i].username + '<span style="float: right; color: #A0A0A0; font-size: smaller;">' + localDT + '</span></div><div class="body"><div style="direction: ltr; text-align: left; color: #A0A0A0">' + msgs[i].message.replace('\n', '<br>') + '</div></div>';
                            fakeMsg.innerHTML = '<div class="from">' + msgs[i].username + '<span style="float: right; color: #A0A0A0; font-size: smaller;">' + localDT + '</span></div><div class="body"><div style="direction: ltr; text-align: left; color: #A0A0A0">' + msgs[i].message.replace("\n", "<br>") + "</div></div>";
                            messageList.appendChild(fakeMsg);

                            //Waze.model.chat.messages.add(new wazeRequires.WazeModelChatMessage.ChatMessage({type: 'system', body: msgs[i].datetime + " - " + msgs[i].username + " - " + msgs[i].message, from:{}})); 
                        }
                        processMessages();
                    }
                    catch (e)
                    {
                        log ("Error while getting history from server!", e);
                        log ("data", data.data);
                    }
                    CA_Settings.tts = wasTTS;
                }
            }, null);
        }
        //            Waze.model.chat._events.unregister("change:room", null, roomChanged);
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

    /*
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
        }

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
        }

        function setTriggerInnerHTML (htmltext)
        {
            this.pannelTrigger_elt.innerHTML=htmltext;
        }

        function setContentsInnerHTML (htmltext)
        {
            this.pannelContents_elt.innerHTML=htmltext;
        }

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
        }
    }
    */
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
    var alertSound="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4jKQIiEAhAmZ9zXONKALIZ2jlSWJgjv/kTQ2MCo0CX9H+N3X//tUZOMAEQ4eU2lGLYQi48nVFe1CBPR7SaOs8hCYjyn01BbCkL2uJ3AQWABJpDTZ2erI4nhaW2rmJi0BUPbWHE+sssv0sjUUiyxOJQrzT9T+goMByQAT5o040p3awmNTzWvKAyho0/lvMPnqgcNGjZkJCwsKrYZMGtYt7mAwGZcO1xmy00aUWNMjVgoYE4l20NIlUGphqqgxcWBokhIky4vNk44uAsLCwZMxYXZWK8VFG/qF/8UVTEFNRTMuOTgu//tUZOeAETweVmiiUPwnI8oqNAeghRR7Q6Uk8ICUjylwcx7GMlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OC4yVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tUZOcAETQeVWjpPY4mo9rNHSexhOB7VaOM5TiXDyj0dJ7GVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tUROgFAT8XTDGDNKAsIbpaGCNig3Q7ACMEbih6hWEAYJhAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tUZO6P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    var inoutSounds={"door":
                     { in: "//OEZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAqAAAo+AAEBA4OFBQUHBwlJTAwMDk5RERETk5XV2BgYGhobm50dHR4eH19fYGBhoaLi4uPj5SUmZmZnp6ioqKnp6urs7Ozu7vExMTMzNDQ1dXV2trf3+Xl5enp7u7u8vL39/v7+/////8AAAA5TEFNRTMuOTlyAm4AAAAALFQAABRGJAMwzgAARgAAKPjb9uVMAAAAAAAAAAAAAAAAAAAA//N0ZAAMOJUEA6MMAAuwAi4/QRAAAQpMmTJp7ERd37s8mFgAABBAgQiOiJ/wIBgYG+iIjvxAAAEEif/EA3c/64AAAgCAIFAQcsHwQdgmD4P/lDkuD4IAgCAIAmD4P0ggCAIHBICH1AgCb+3/8uD7//h+QgmH+H5cHQGBbjlYPxA7DFWflwfD6S4IOWD/z9QY/xB+Q4Pn/0f/KBj/gg7Ln/qDH/Lh9bsL//PUZAIbwhdhK8xQASc0LrJfmJAChcGwpggQgwYDA7/VzuMOpOcP9+GmAhqAn/icvA1Sn/LZOJh+IGdHgAAPJ8lBwDeAxAkDRqgNEdA1Fd2vc0KibhEcAaRCEOAUMACN/qRNyugmHrBf0MXA3SBumDaH8rmCDOgaB8gONANHADhoN1g6oyf/ToLd1YGsFAaUuG/ASIhe4LBCNAumBJr/+pBvvwDnwDQ0DFCwCgwXIGQD4xAQZgUYVELhf//2//hjYQlEKkMFzsUyGFgvmiL1Hf////t//iUwvaG1jYFyjlCvjVIAOe5Dx0DNEEIIQAiBFxKJBKGxDSaQEQSGhGI/+G5cMpN8v+HHkQEiAf/G9GBxxfycOm4YyAHgd/kuVExzyKEXJgurfqQPOgRIjRSIxxAb+aPQzpADNjT/7OggRhERmymUCbJb/rTem/E3kGFlC5RtjiHgg5r///vuUioThmbppFxRuXD3//oMmpu38d5BDxeLR5JaKTeZ////bb/7/J8plI8umtOpnagXDqmt6IYO+KVZSgjoJkIyPSOAX2bNzM5LtlYWH1exFuLqsXmm//OUZCIUEgFPQ+esABE7/rLPzxAAmrY0kTr5th5JM6dMlu1jUm2dD0O42NjY8ytzzUmpt2uSaitBKJR2Dy8VKrWwkHoBICYPRmTmnaZw7n7PGw6gQgJgHw6VnO2z8Oja374dd33fcfw6/jn4v/uLdDf+a///////3O91FRNY42Nl63bodcta13P/////8OSNnO4Vq/+LfoBICVhVqpBsg2Q5TRUBTVrWD9etfXMm/a26f/9f/lYu///6/T0qVWKX//Tt/T////////////8pS8pf/////6dBSnbWoBOWG95N455nsuoUNrWKvHC+Hll3//OkZBcUNf9DA6egAZTD/q43TBADdQR3tdbaCjpHEDRwmOLD1RUQwoNDoIxcPBBBsE4ckkCUPQ4QJVGHEMOVWEi2KYilZzSUdTCfMOIEEXOsYIouKh81m41TIEhxYlGSh4Cp42e+Kj+OOe6/xxTzVfPXMUuvXzxc0y/DfSd///////83LjBlXw9Rcf1HP8X18LtMpKcs3WaIU2h4PAgU3f/s/xSCXaZsR3zcTII8YVP6xZtZP1z4nqUZkLqUY49WK7zK3+5TWdNjPdHXW7X2/zlK////////5S0Xv/b7tR3r////9WQxi0e6f//6//1RViRdv1/v2ThDAggkqVhEeGBgsfoDKEbucVCdsHGTRqlITRAUwKI4ycDEVKLEnGOO//PEZC0cUhNfK8w8ASeCTq7/m3gC0HYR7K+oxIxFmWGBCVzM3ahRX1nC5bC4KhDidduNKeXeO/XBoIQuiCFg0+N5hmhXzH3reTzPxCDLsyOcFWvcvdQd0v7Z3fScUBpqOO/nZCFk9MnMF7huW4z7ULU1q7trOyXs7Gh7nSkR/ujOwnKxK5my9rmsHNtf/6////5c3OVXx4n1e/+NYrWv//////z///////////cnBcEIQuRkUcel8RH9/SlP+pE6dMWta5rX+DaFLCZ3eGdDwNAgEAYEApNIAExSGKGhoxoBUwxEsfKMg54NgjjGxyyxB2y4jBIkw4JeNEYsB5rnKywEftDaPKY3jfxhpbWuBEw8ieE9exZmB+9tEj7979rZXv1iSWFukaW7/dKU3rD6uoMJUNLE8WNNsakB4zx76vu6enywssj6N6a172zLSuM/0prf1ffzWDypFolUUp8ua////wQ/5Uj+pe7/61kAgAP/9irbcUAmqOb5DaR0YMjT//PUZBccBhM8ysS8ACtDdnmNg3gAKYQuqsEPONuDwWIujKQQmKRTEEoj+OhEpAetvUYtpooQQKOh7fBJwIRQbgCkg0TCJyXYw1SrFCbsQHahpKlGfJYDhYmBTq9PoUuS9Iem2JYaaJKCiZaKInygL+2uCMTxIYDMXp3AVkh2ouCTplQ1iRTMdJ0QjEb4jLVv06gx31Fwxxsr760814D6OwqqLB2/xue+bfPtj////L353W3/////mvbed/////lFZXV+t5/+8ValVHaN//Hzr/////+Wb//7///////gy/9//ikj/vgKbqgrZLhzDoWCUyjU5/oYyEZLypnJslhIruLcw2PdmfxnkJ24PJIy8/amxqWDBe3gJ2RUsrZMr2JRQnq4ivnzM5Ro7KubsqImV8WXwKbvD0aNIM94LZi66QqFPqNEjvmR5J7Rp64lnxdxxevxnUsCsXMnxH1/F/zFrmu861unzXGv///9b+fWv////xrePj////+z6Sev1///b4jGEerE34CdV/Wql23+sZSCAgQQiNaDVa3NqbiMmYYVdgxvwEbOGYMicVMy5BpR//PEZCQcVgFVK808AacL8tb/mVEiAwY4hHtCNN5yG4WBEkmITbLJQTAzx1gq4ZOSZMrOzxl0yvmROOn4kwkZLhXSCYYn0lYEFXx0enFQTkthYhHi1Fhti82Pc4F9nUcakYlI4R9LpDpT+zG3W+e67z6h7v/gV8lh+sDtib1WhTczwWaDSkbd74ZI+Z6f/dNUOVSKFXQcyXhZrB1fNL/////5h3j///49Pu8OaNa2f/959cVjf//////////7c3mZr7j41T/////pwnyRiPaWhJeiHrO0vEwiyO0xCMJBIyT53N9oXH1BxVc0Er0wvc7RwekZtj6ID4YhEidEMRBEgCBUfkYhCcRImFCARIXaAE+gvHwxIBBGMLBV+0LoKQbC4dKg3kQsCoabf21WtDDXY3+bVLplCw0Izz2d0NNZzl3dn6K2x7ue706mIqJes1yUlIzXv0pQnMmf2sYZ//0uv/9fmj8iGg8U8/dLTtexpdqya7bBtupMyNMKXf0aMAUi//PUZBAcHc1DL8Y8AClT0nGFi2gAWQshXHMC89dPb+fIhJeheoafA/lakhXkqljSihxLmZVnWji7GyjTSKYupSns0DnUKYsfajJQhey5IiHEJ6nienyNhHizsIyEsUx5pNXHMjm6AyItjOtnXlVHZE/EjKmOhxps5OVDbO7HqEdX3a5Q1svKpGV4cBKiVoeXhhQoakdKm83KFFLllrSSNteVuGOR9O+gVtz+XRwK6keRkg6l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",
                      out: "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dKNrps1UHKZG3dJHMzqynaHZXIxZUmBGMaiWLI9TtcyHSQp1f0vtvWeFdHq5709ifkY1kRG1VFrp7ohCN6////0c0YHtKDt1vBXJhg23Xf3X/9fmT0zfaUglgWzvGdSWBARQlPqslxWtZb/Oeloqal+236jlGl39/Wp4LjpArQWWhJNgfMWqXb/////tESEr///YDhcru9jZRCcuUUUN0ig6BOnSLV3T//N0ZBIMpgNXF6QcAY/sArovQjgDiBQKHmRUxLLVjkMOZ1ZDkNo5x9jC1jnnz3VEXWy0Ze1PfnLM/7abtNONfP7Os7v513VNk6Z/193z0/////zGQnzDP//9DtfurIOECBBo0ASBcngNtdXiALtx2RSi8WyqRj3BI5ua5iaKYj0//93p9H////////////////9VRkv////9bHsyX////9f90jgiA4aR//OkZAAU9c1ze8w0AY1A8wJfjBACaHeIdVrWShOkktZEFgwwIVBRLcmXfYA21cs9cKSve+8czpRxDmJQuAqgvlFRCGWOUfzYYQe4vLOF4yMxlqQNRxnCGOA8mXTFi8keUaKclCRHORSkMApJdFT2Q5eHgPclS/L9T6K0EFdRomMYomh03WcL5aiZKSXorP3QqQst3EwYgD3LiR1NNRocZL////KJLmKaD0FX9///Zn/+pjnzE6YMYXScUCyv/H/3iHAoHAgFAAAAwFKEIcWj6ZCsupZ2Vaxa7fbwO5v+5//4skML/f/1Sd3////////R/IKqBh0lLnG2fLJGqItVJPlU8tWuRglm85JyJEjUkQUAonJHEWJEiWyaR00iRRlq//N0ZC4LQMcWAOMYABRQsiwNwxgA2vk+nlvVVVORR00ijM+kgEDQFBV3EpU6SUDJGdiWHdJIqRESwVyzxL///hoKhT2ZmZlJjVeqx9EghQUoGcmpcWATkGAmLDyx4sAgdIhoFniUJA0Goi4NaxhUsOQREoKrOlSwGErg0o7Iz0ksJAqEgqdELslDv8s//8e7/+WqTEFNRTMuOTkuNaqqqqqqqqqqqqqq//MUZBUAAADoAAAAAAAAAcgAAAAAqqqq" 
                     }
                    };
    var bellIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HHQwgJFQuvboAAAEPSURBVDjLpZXBSgMxFEVPBmmhlOpClKEbP8QuxG1/tP/QXTfiH7iTLtpdbKEqgvR28wJjTGbS6YVAePNyJnnvhjhJol1b4N3mD0Ddmq28vKRnSRNJ2JhYzOcW5YAvkgb23TWAYT6wnH9yiSP/ACPg2FGKCvgChnEw1qoAhuWsUn+J5SmXLwHuzgDuSoCvgCuAOcv9G4ya8guMrTElGgIH4Cq3w9kZsOCIWc7Yi4TvukbIXaR8eAPs6afr0KBw5KXBXA+Ys7XLJvAtVKAHUE1GANZcrjq2zbHnkcMuK5r+SVjoA9hkAPfAbVRHYmDqFj0mrlcFrNsWtVnBA3PgzsYT8A1Msy0veAIAPq1O467EE9tUEhXo3s4oAAAAAElFTkSuQmCC";
    var zzzIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HHgcwOWMKgz0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA20lEQVQ4y7XUMUoDURAA0BdttDCNpLLJFWJhI6ltvIddBKtgEYJ4C1u7VLFIm8raAyikMAELOzEaEDbNFIvouuF/B6b4u8NjZnb5/FPc4CVygb0caAMTXOXqso97bOfAjvGKdpyLH/JzE/ABS8wjW6V3lwEOc3TexjuesJMDHEd3Jzmw08BGFXv9nr/GLmZ4w0FN8LEKvI6iiz+muI26FQ6rClc1RjorPT9P3W8HH4HdpWLN2FeBZ+yngqPAvtBNxXqlvQ1SsaPSx5piKxWc1fmxGxuARc07NW+sAZr/UijoWUzlAAAAAElFTkSuQmCC";
    var chipIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IBQwJBtL1ixQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABUUlEQVQ4y62VPU5CQRSFv5kgEaUwoonBBnagdroKY0MncRe4KbEzboDaxrABIBjUUOEfemwO+jJCwZOTvObNu1/uzJx7XpAk/moKjIAhMAYmQABKwBawB+wChbQwffEFPAJ3QBvoAP0EuA8cA2fAAbADxB+CfvUhqSupJakuaU1SSDuQFLxW97dd10qSZsBPL1xIKs8DLQCXJTWz0BnwQdKlpDJLytCWGcLkW28h5AAG195Ieou+zTbQCyFoWaBresA1MIq2RsdWyaupGcNon/XzdJd0OQDGEXjx819NgNfIihXt/tIKWBvAevRsVvNYJmsdoApsRQ/6ybxBX0IFz/feqoxdyxq74NRoAJs5z64BHAHFNByaOcLhXNJ9Gg554qs2L75CktjZgL3yOA1s2tn2qr7EU+AQqGQvNCz4BbwDT57zZwMjsA5s2xkVoJgWfgNFOVw1goaxDwAAAABJRU5ErkJggg==";
    var trashIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94LDA4tIiYyb1cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEH0lEQVR42u2cO2tUQRTHf5NMYqKJ8RVBIz4g4koKISgKgg9QFG33C9iIgpDG0o+QJiAIfobUthY2FhZWvrARWQTjg2gkJtnkWMzZsF7vxpvNPmbvntNcdie5u/PbM3P+c+6ZAbP8mohMiUgx5u/oIwVXBK4C54CPIjLmnJsxgNnh3QAuAweAQ4AXEWKE6COEdxO4DuzT79cHnNH26CD6CD3vOjAK9GpTD7ArVog+InjXdNjuq4JH7BB9RPCuAAc3+E5RQvSRwev/z79EB9F3ELwoIfoOgxcdRN+B8KKC6NsA72oD4NWCuOyce5RnDzwFnAV2AkvAcgqQAb0mbQ34rdek9QIngPMiMuecm80rwF/AS+AN4FLa9+r6d0dK2yLwHPha496rwFyrh7Br0xxYy04Dt4HdKW3fgcfAi5qdaaHntS2IbNRJESkAUqsZWGgHpP9NwmYG0AAaQANoZgANYB4AikhRRG4Zmn+43EpbBPjEH00BF4EDIjIJfHDOTXc5uPvAEV0lfUo+YvUJeEVgAhgECsBXTRNNdzG8O7pGH9CExWh16sxXrU8vKbyRqqyIA453Kbyi9n0vIWUGsE0ZfRGRknNutjIHjindocS8OARc01+i2+wS4THrcPVSXpmcUGbrsAY1A5J8nNirNxjpQoALhLRab0rc2KPM1gF6Qna4lqxZ7VKAaZkhR6iW8JvRgWUTMiakDaABNIBNt7IGrOTkLbEGstgALgLzKbBW9f2fBnBjKxEeec6rN67p9Ye+X4oNYFQVqs65WREZ1ZcFVf0LCu9JbE/kogOoEB+JyJwulQZ1WJdihLclgCJyV5d4zf4RhoGCiDxoYuCar7emxtcJ7yFwAdivy5pOthVgTkQmnHP3mg5QPe8CME5I73S6lhRCsRMiMrXZErl6Oj9CyJHlAV4lObBN+zTYChkzT6iQWqJ2HUuneeCS9mmx6UNYo+SEvszDHFgGPgPP6qlwrSuIOOfutTAKt8J+1lsebMmE4IHLLdWBJmNMxpiMMRljMsZkjMkYkzEmY0zGmIwxGWMyxmSMyRiTMSZjTMaYjDEZYzImm6eajNnkEO4BtnehjBkiw5EIPiPkwyJSrNSn5F3G6B6Ro1n6lqXz/cBJDRp/CeocS5txQnVYfyMA9gHHCBtuAN7HWim15ckweN444WSlY40C6AgbTiYJG0xei8hpQt1enmxIh21B4TVsDqwEkuGqm5dzEoGTjuJV0vSR8Uwdv8kP6Gfr513lynoS68E1Q5JJN64os3WAi4SjlVaNTybd+K0iuisAS8BbDQzmhRt73wLwTpmFOVCr48cIJ+hOaATytOFwsojBlQmnz70CnlaknK8SxjOq874QNhTvycEyrVG2osP2ncKbqY6saWKyssXAG7v1eS/q7RYda38AEijX5bBAp60AAAAASUVORK5CYII=";
    var exportIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94LDA4pKdWMc9sAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVR42u3dv09UQRDA8e9wT3PoIfEHJgqGqI2lhYWWJpoogUQTa3sLYmNhQeEfQGMo+CdI1FhYUFNZ2WljcjHEEEM0gpGCYyxuSYDcHdw939tZ3kxDIHA/Pje7O2/eZhFKCFV9AdSxF1siMp/nAbIS8BaAaeCMQcANVZ0UkVmTgCHzpoGJMj6sAWIUeKSqDIo4VPALrIfMs4gHUAMuBcQFi4ApRC7EGJnRAjbD17Lj3BEQ+xrOMQA3gTdAE9gu6TnPA087fJC1vIixMrApIq/KekJVnevw4+8BLBdirDlwm/jRCIitPHNilReRHWA5L2LVV+GvwNs8iJUvY8I8NzCi14E5ER0wJ6ID5kR0wJyIWYWtasD1LkX2Wihx7vcotmdUtVllwAbw+JBrculxxTIC1KuegaNH+L2zXkgXGFUB3AI2KKCFVokhLCLzqjoJzIS5q++HAJQO/cTKzIEiMquqTQa7O9ipn1gtwN1MHOTvupQ6voj4IuKADuiATuCADphymK8DVfUlcBr4JCJLDtgf3hPgBnATuBhudi85YH9RB67Qbj0NWUNMAVCAE8Bl4F7ITDOIqVwLC3DSImJqzQRziEUDrgML/3knlinEQgFFZPG4Z2LWo3wYB4YjD/MG7Wbm0CGItViIWQe8Z8BUqL9G2X87L9biUe+RiRPAQ0BiIGYdMm8KuLMHTxK4mhoDHrTfQrmIB4fG+J7MyxLA240acAG4S3s3QbRmwnCYd1JsMmS0dxDcVtXnsQD/0t5Fv5Mg4A7wB/gGrMYCXAU+A79pbwTXhPB+AR+B5TLnwOxA3bakqmPhW0ur8HCPaWUv3gcReR21jBGRRVX9ERaUkciZ1QBuharglDW8roW0lU5HKKuudpmTo+NBui19E3iFA6rqnKqu6/5Y77VVIiW8FDPQFF5qgObwUgJsWcTrugobxPsJfLGGZz4DQzm1BqwA76zhpZKBK5Zq0+QArcKlXkg7oAN6OKADOqADOqATOKADOqADejigAzpgJSNGP7DXgTdW4xpdtrjEADzKgTfWohZet5kMHD0uQ9jnQOOAhR14Ezla4X1tFb4HOhwTN+iBN1ZjA3gvIrOlbCI3/O8wBh5Zu2fQ/AOz2kvo8tJpFgAAAABJRU5ErkJggg==";
    var meetIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94LERccEncyT/QAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEIElEQVR42u2bz0tUURTHv9fsl1lhWQrlD5w2hYQE4kaoXKSrMKgQXLkQAoVWbtwK0qo2Llr5F7hqY21SchMt2mhtKjAUQcrclD/S+rbwBja9gRnnnPvO473vShjnvDOfd86933fuDJApU6ZMmTJlypQpU6ZMmUoUyUMk20mOkXzDPf3wf4/51w5lpP4H50jeZ/G6T9Jl5Pbg1ZCcY+maI1kjmYtLILyzAJYBHDtgiC0AF51zaxL5VCRtvQMwWwY8+PfOpnJdJDlEOQ2lqoVJHgewIRy2yjm3mZYWvq4Q82aa1sCrALaFY941D1DQ6L4GsASAgul1pcbokmwh+ZzkpuBGspMao0vyMMlukh9I/hYCuGiuhb3RXQHQeYC3dwJY8TH+tQvO7QD4COCT4Fr40hTAAEZ3CcAT/yQisRZOWavABwBaBeK0+lj5VfjTw5OqwBkzAL3RnRC8GRM+5n+XEoo/XK6Jlq7Am5BXVEyJ6lsA8NTaMOGuAsComItlQtwCcMM598uadVmkvBYLXOsUyVcW5oGSAHcUAO6EMuqxT2N8tTQJ5/fZOddchHW6BuA2gG4A7X5q8w7ACwDPALw117IRH2RSoQInrU84JDeRKYX8pqwDlGxhkwPPxFSg/6DDgrkNW4enNfubF1j75qOehUlWkDxf4AmlmPxOkLzj55H9ViGeLXNmtxk1jYmYCU6T7CN5iWQ1yYoI2NX+9T7///m6nKZ54BGSt4TngWskK61CTMJEmiQfJmFdLPtMhOQVkguC1bdftWnYoHJKFUiSj9MA8CjJGyRnSG5ZqcLEnAs757axd7T5CPLHmwAwmBavqdnKR2KtQJL3vFE9oWh0pQ+W9qszzsq4nHc31YyuYhVOxzJM8GZ0FcAZ4fvyDUCdc24331Rj77xkAkAOst8yO+mc+x66hYcU4MHHHIrYUH5C/pD9rzpCt24t9VVb4NFO+qseJQ9xJSpwNMB9Gg1YhQP567XaGugr40ugYj/nnPsaaC284JxbCVGBIc3nYIEqXFZYB9vUW9jf/fGAAMcLGN1NBYhd6gBjMp1R11xWMNa9IQCOxABwJFAb54odtFYcsH2rAfTEALDHXztEG5/WrMAOxKeOQG1crwkwzhOt/kBt3KgC0JvMgRgBFjK60pOZZq0KrEf8CpFDixbANgMAo3LYEm7jJi2AFn7d0xVgI2nQAthrAGBvgI2kThygN5c5AwALGV3JjaRGowJPw460c6nSAFhvCKB2LiqPco2GAGrnsqsBsNkQQO1cNjQAthgCqJ3LugbAJkMAtXNZ1QDYYAigdi5LYjtNqeYykOoizPR7yPzctmiVWoGWfmdmIpdSAVYZAliVRICWvpBdmUSAu4YA7iYR4IYhgBtJBLhuCOB6EgGuGgK4mkSAS4YAmsjlD0uxljZd9GXaAAAAAElFTkSuQmCC";
    var reloadIcon="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";
    var betaIcon="iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3woVCzoa1lVztAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAFLUlEQVR42u2cTWhcVRTHz51xZpIJSVMikWoajSF+tUEDGrEo4hd+gF8LXYiItrqwC0FE3GlUqEsXFRcSF0oFOypdtBCxVYKmC21qpXRSbCA+jJ2ZTDrppEnevLx37/+6aNSkxHTOfL+P/zb3nnn3d8+599zz7gtRoECBAgUKFKg+EvX8ccMwYl1dXfcJIQaEELcS0U1E1E5Em4iolYgUEVlENEdEGSKa1FqfAnDUMIxjfX19ti9nzXGcewB8BmBelygA5wF8atv2bb4BZ9v2NgCHdIUF4EChUOj2NDyl1KsAlnWVBCAvpXzcc+ASiUQIwLCugQBIpdTzngII4GNdQwFwpJQPeiVsX9N1EIDMwsJCh6vhWZbVA2BJ10kAPnJ76H6l6ygAy7XwwlA1jBYKha1E9DS3n9b6JICXLMu6dmJiIjo/P79ZKfWA1vpr9glBiGg8Hn/Wrd43VILHfDI6OhreKA0qweY3bgV4nDnQxNDQkCjC7udMu2dcBy+Xy7UCUJy0w7KsniKPgHcwAS64bg1sa2sbEEJw7I40NTX9UUzD2dnZU8zHibkOYCgU2sbcOH4utm00Gg0zH2fOdQCFEL3MLmcY3n0d0/afbkxjtjI3nFSxbcPh8L3MZznqRoBbmABzDO9+gWn7OzcCZGX/Usp8kTvwoBBikLG2nh0bG6s6wGrkgH9xUo25ubm2Iu3uZ6Yw77g1iT7PGahhGJdNNSzLuh6AZMDL5fP5TbUYbzVCuInT2DAMWUT68qYQIswI3z3t7e3zbgUY4TQeHR3FRn9fWlq6ioheZMCbnJqa2uvaMhb3wF/EkvA+x56U8jFX1wErCXB6eroJwCxj7Rsht6uSAJVSOzkvlGzbvqXW4w018mQIIXYymu+LRqMTgQf+l7r0cuw4jrOjHuNtWA+MRCJPcdpnMplfA4Brw/ch1vmxo6MjALhW/ZzGsVjsmbpMdDXWQKanif/J/5aFEFHG754rFArbW1paZgIPvKgUcyKubG5uPpDJZOIBwIs6UsK6eVdnZ+fBVCrV7Ps0hvsG7pKk+rBrIVbyJALgYBkQv89msy2+BmhZVm85F5QA/FRswdaz1Ril1O4yLxn9ks/n230LcCWU9/sGYjUAZjKZOIAT5UJ0RThXAyARkWmaWwAYZUI8Mjk5GfUlQCKi5eXlGwBkyoT4hW8BEv37rUm2HIhKqdd9C3AF4nYAM2V4oe04zqBvAa6E880A0mVAPLHRjVjPA1yBeCOAVBmh/IqvAa6CmC7RC38v5mqxpwGuCufZUiA6jnO3V8tZnGr0aaXUI1rrRW7fcDj8hO8BEhFFIpHjWutdJXQd9H0IX3Ju/oG5DqYDD1wLkHuxaHMAcG0NcYzZRQQAVymdTnPvBV7wBUDbtvsBfCulfHSjdt3d3T1M04anN5GVMtbwP5+PATi90bVgAO8yN5FhTwLMZrMtAIYALK4z6C/XO0E4jnMngALzOPecpwAmEomQUmrX5c64AEYcx7k9mUxGTNO8Rin1BoAFpveZuVyu1TMApZQPAzjppn8L0FCbSCgUelkI0V+jiV60LOsDTwE0TXO31jpdI4BvxePxs54rZ9m2PQDgQpVDd1/D5muV2IUdx9kB4FyV4B1KJpMRTwNcqfH1AfitwvCGx8fHr2joE0MlE+lkMhkB8B43t1sH3EzD5Xu1LGeZpnk1gL0A8txSlVLq7Vp9eNjwMgwjJqV8EsCHAH4EMA1gEYAEsABgCsBhAHuklPc35Fu3QIECBQoUKFCgxtDfgVacfcUlaCUAAAAASUVORK5CYII=";
    var notBetaIcon="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";

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
