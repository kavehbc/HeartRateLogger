var appStatus = false;
var appVibrate = false;

( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName == "back" ) {
			var page = document.getElementsByClassName( 'ui-page-active' )[0],
				pageid = page ? page.id : "";
			if( pageid === "main" ) {
				try {
					if (appStatus){
						//window.webapis.motion.stop("HRM");
						tizen.application.getCurrentApplication().hide();
					}else{
						tizen.power.release("CPU");
						tizen.power.release("SCREEN");
						
						tizen.application.getCurrentApplication().exit();
					}
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	} );
} () );

function onScreenStateChanged(previousState, changedState){
	if (changedState != "SCREEN_BRIGHT" || !tizen.power.isScreenOn()){
		tizen.power.turnScreenOn();
		//tizen.power.setScreenBrightness(1);
	}
}

var start;
//window.webapis.motion.start("HRM", onchangedCB);
var lblHR = document.getElementById("htmlHR");
var lblHRV = document.getElementById("htmlHRV");

tizen.power.request("CPU", "CPU_AWAKE");
tizen.power.request("SCREEN", "SCREEN_NORMAL");

tizen.power.setScreenStateChangeListener(onScreenStateChanged);

function btnStart_Click(){
	appStatus = true;
	window.webapis.motion.start("HRM", onchangedCB);
	start = +new Date();
	lblHR.innerHTML = "Initializing...";
	var btnStart = document.getElementById("btnStart");
	var btnStop = document.getElementById("btnStop");

	btnStart.setAttribute("disabled", "disabled");
	btnStop.removeAttribute("disabled");
	if (currentFileName.length < 4)
		NewDoc();
}

function btnStop_Click(){
	appStatus = false;
	window.webapis.motion.stop("HRM");
	var btnStart = document.getElementById("btnStart");
	var btnStop = document.getElementById("btnStop");

	btnStop.setAttribute("disabled", "disabled");
	btnStart.removeAttribute("disabled");
}

function onchangedCB(hrmInfo) 
{
	var log;
	var end = +new Date();
	var timestamp = end - start; 
   if(hrmInfo.heartRate > 0 && hrmInfo.rRInterval > 0) {
	   appVibrate = false;
	   log = timestamp + "," + hrmInfo.heartRate + "," + hrmInfo.rRInterval + "," + Math.round(60000 / hrmInfo.heartRate);
	   lblHR.innerHTML = "HR: " + hrmInfo.heartRate + " bpm";
	   lblHRV.innerHTML = "HRV: " + hrmInfo.rRInterval + " ms";

	   AppendDoc(currentFileName, log);
   } else if (hrmInfo.heartRate <= 0){
	   tizen.application.launch("ICABmS1hdU.HeartRate");
	   lblHR.innerHTML = "No HR signal.";
	   lblHRV.innerHTML = "Please align it...";
	   if (appVibrate == false)
	   {
		   appVibrate = true;
		   navigator.vibrate(700);
	   }
   }
}