// ==UserScript==
// @name 			WME CLog
// @description 	internal use only
// @namespace 		dummyd2
// @version 		1.1
// @include         https://www.waze.com/editor/*
// @include         https://www.waze.com/*/editor/*
// @include         https://editor-beta.waze.com/*
// @grant			GM_xmlhttpRequest
// @author			Dummyd2
// ==/UserScript==



/**** DOWNLOAD HELPER **********************/
/******** AUTO INJECTED PART ***************/
function downloadHelperInjected()
{
    window.WMECLogDownloadHelper = {
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
    for (var i=0; i<unsafeWindow.WMECLogDownloadHelper.jobs.length; i++)
    {
        //console.debug("TOTO lookForJob: processing job " + i, unsafeWindow.downloadHelper.jobs[i]);
        if (unsafeWindow.WMECLogDownloadHelper.jobs[i].status=="added")
        {
            //console.debug("TOTO lookForJob: downloading job " + i);
            unsafeWindow.WMECLogDownloadHelper.jobs[i].status = cloneInto( "downloading", unsafeWindow.WMECLogDownloadHelper.jobs[i]);

            var f = function () {
                var job=i;
                GM_xmlhttpRequest ( {
                    method: unsafeWindow.WMECLogDownloadHelper.jobs[job].params.method,
                    headers: unsafeWindow.WMECLogDownloadHelper.jobs[job].params.headers, 
                    data: unsafeWindow.WMECLogDownloadHelper.jobs[job].params.data, 
                    synchronous: false,
                    timeout: 3000,
                    url:    unsafeWindow.WMECLogDownloadHelper.jobs[job].params.url,
                    //job: i,
                    onerror:    function(r) {
                        console.error("TOTO Error while getting area from server: " , r);
                        unsafeWindow.WMECLogDownloadHelper.jobs[job].status = cloneInto( "error", unsafeWindow.WMECLogDownloadHelper.jobs[job]);
                    },
                    ontimeout:    function(r) {
                        //console.debug("TOTO Timeout while getting area from server: " , r);
                        unsafeWindow.WMECLogDownloadHelper.jobs[job].status = cloneInto( "error", unsafeWindow.WMECLogDownloadHelper.jobs[job]);
                    },
                    onload:		function(r) {
                        //console.debug("Download list: ok for id " + job);
                        unsafeWindow.WMECLogDownloadHelper.jobs[job].status = cloneInto( "success", unsafeWindow.WMECLogDownloadHelper.jobs[job]);
                        unsafeWindow.WMECLogDownloadHelper.jobs[job].data = cloneInto( r.responseText, unsafeWindow.WMECLogDownloadHelper.jobs[job]);
                    },
                    onprogress: function (r) {
                        //console.debug("TOTO progress!", job);
                        unsafeWindow.WMECLogDownloadHelper.jobs[job].progression = cloneInto( r.total==0?0:(r.loaded/r.total), unsafeWindow.WMECLogDownloadHelper.jobs[job]);
                    }
                } );
            }();
        }
    }
    window.setTimeout(lookFordownloadHelperJob, 2000);
}
window.setTimeout(lookFordownloadHelperJob);


function run_Clog ()
{

    var clog_version="1"; 
    var history=[];
    var msgCountPerUpload=1;
    
    var clog_Settings=null;



    function log(msg, obj)
    {
        if (obj==null)
            console.log("clog v" + clog_version + " - " + msg);
        else
            console.info("clog v" + clog_version + " - " + msg + " " ,obj);
    }

    function waitForObject(varName) {
        var objPath = varName.split('.');
        var obj=window;
        for (var i=0; i<objPath; i++)
        {
            if (obj.hasOwnProperty(objPath[i]))
                obj=obj[objPath[i]];
            else
                return false;
        }
        return true;
    }

    function initializeWazeObjects()
    {
        var objectToCheck = ["Waze.model.chat", "Waze.Config.api_base", "Waze.loginManager.user", "localStorage"];
        for (var i=0; i<objectToCheck.length; i++) {
            if (!waitForObject(objectToCheck[i])) return;
        }
        initialiseClog();
    }


    function initialiseClog()
    {
        
        Waze.model.chat.messages._events.register("messageUpdated", null, newMessage);
        Waze.model.chat.messages._events.register("add", null, newMessage);
        //window.addEventListener("beforeunload", uploadHistory, false);

        log("Init done");
    }        

    function newMessage(e)
    {
        //log("message: ", e);
        if (e.attributes.type!="system")
            addHistory(e);
    }
    
    function addHistory(msg)
    {
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
        var params={url: "http://waze.lesduts.info/clog/postHistory.php",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(history),
                    method: 'POST'
                   };
        WMECLogDownloadHelper.add(params, function(data) {});
        history=[];
        
    }

    initializeWazeObjects();
}

var Clogscript = document.createElement("script");
Clogscript.textContent = '' + run_Clog.toString() + ' \n' + 'run_Clog();';
Clogscript.setAttribute("type", "application/javascript");
document.body.appendChild(Clogscript);
