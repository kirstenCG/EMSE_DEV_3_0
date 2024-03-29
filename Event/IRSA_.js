//CD Re-inspection3/9/2021

//var SCRIPT_VERSION = 3.0;
//eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
//eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
//eval(getScriptText("INCLUDES_BATCH"));
eval(getScriptText("INCLUDES_CUSTOM"));

//logDebug(inspId);
//logDebug(appTypeArray[0]);

//reschedule inspections
useParCapForRpt = true;


//reschedule inspections
try{
	//see if any records are set up--module can be specific or "ALL", look for both
	var sepScriptConfig = aa.cap.getCapIDsByAppSpecificInfoField("Module Name", appTypeArray[0]);
	if(sepScriptConfig.getSuccess()){
		var sepScriptConfigArr = sepScriptConfig.getOutput();
		if(sepScriptConfigArr.length<1){
			var sepScriptConfig = aa.cap.getCapIDsByAppSpecificInfoField("Module Name", "ALL");

			if(sepScriptConfig.getSuccess()){
				var sepScriptConfigArr = sepScriptConfig.getOutput();
			}
		}

		var capResult = aa.cap.getCap(capId);
		if (!capResult.getSuccess()) {
			logDebug("     " +"skipping, Record is deactivated");
		} else {
			var cap = capResult.getOutput();
			appTypeResult = cap.getCapType(); //create CapTypeModel object
			appTypeString = appTypeResult.toString();
			appTypeArray = appTypeString.split("/");
			if(sepScriptConfigArr.length>0){
				for(sep in sepScriptConfigArr){
					var cfgCapId = sepScriptConfigArr[sep].getCapID();
					var sepNotifList = loadASITable("RESCHEDULE INSPECTION",cfgCapId);
					for(row in sepNotifList){
						if(sepNotifList[row]["Active"]=="Yes"){
							//use vEventName to rule out InspectionResultModifyAfter
							if (vEventName!="InspectionResultModifyAfter")
							{
							sepReSchedInspection(sepNotifList[row]["Record Type"], sepNotifList[row]["Inspection Group"], sepNotifList[row]["Inspection Type"], sepNotifList[row]["Inspection Result"],  sepNotifList[row]["Pending/Schedule"], sepNotifList[row]["Custom Field Name"], sepNotifList[row]["Custom Field Value"], sepNotifList[row]["Months/Days"], sepNotifList[row]["When to Schedule"], sepNotifList[row]["Calendar/Work Days"], sepNotifList[row]["New Inspection Group"], sepNotifList[row]["New Inspection Type"], sepNotifList[row]["Inspector"], sepNotifList[row]["Custom Date Field Name"], sepNotifList[row]["Checklist Date Name"], sepNotifList[row]["Checklist Date Item"], sepNotifList[row]["Checklist Date Custom Group"], sepNotifList[row]["Checklist Date Custom Subgroup"], sepNotifList[row]["Checklist Date Custom Field Name"], sepNotifList[row]["Additional Query"], sepNotifList[row]["Addtl Action to Perform"]);						
							}
						}
					}
				}
			}
		}
	}
}catch(err){
	logDebug("A JavaScript Error occurred: IRSA:*/*/*/*: Reschedule Inspections: " + err.message);
	logDebug(err.stack)
}

//send notifications--should always be the last script, especially if the notification is based on fees or other logic.
try{
	//see if any records are set up--module can be specific or "ALL", look for both
	var sepScriptConfig = aa.cap.getCapIDsByAppSpecificInfoField("Module Name", appTypeArray[0]);
	if(sepScriptConfig.getSuccess()){
		var sepScriptConfigArr = sepScriptConfig.getOutput();
		if(sepScriptConfigArr.length<1){
			var sepScriptConfig = aa.cap.getCapIDsByAppSpecificInfoField("Module Name", "ALL");
			if(sepScriptConfig.getSuccess()){
				var sepScriptConfigArr = sepScriptConfig.getOutput();
			}
		}
		if(sepScriptConfigArr.length>0){
			for(sep in sepScriptConfigArr){
				var cfgCapId = sepScriptConfigArr[sep].getCapID();
				var sepNotifList = loadASITable("NOTIFICATIONS - INSPECTION",cfgCapId);
				for(row in sepNotifList){
					if(sepNotifList[row]["Active"]=="Yes"){
						sepEmailNotifContactInsp(sepNotifList[row]["Record Type"], sepNotifList[row]["Contact Type"], sepNotifList[row]["Respect Preferred Channel"], sepNotifList[row]["Notification Name"], sepNotifList[row]["Report Name"], sepNotifList[row]["Inspection Type"], sepNotifList[row]["Inspection Result"], getAppSpecific("Agency From Email",cfgCapId), sepNotifList[row]["Additional Query"]);
					}
				}
			}
		}
	}
}catch(err){
	logDebug("A JavaScript Error occurred: IRSA:*/*/*/*: Send Notifications: " + err.message);
	logDebug(err.stack)
}