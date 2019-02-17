const ipc = require('electron').ipcRenderer
const remote = require('electron').remote
const gamepad = require('jsgamepad').gamepad
const mousetrap = require('mousetrap')
const {	exec } = require('child_process')

const settings = require('../settings')
// import gamepad from "jsgamepad"

const radialMenu = settings.shortcuts
var curActionIndex = 0
var rmUpAction = document.getElementById("radialMenu_UpAction")
var rmDnAction = document.getElementById("radialMenu_DownAction")
var rmCurAction = document.getElementById("radialMenu_ActiveAction")

function radialMenu_GoUp () {
	if (curActionIndex === 0) {
		curActionIndex = radialMenu.length - 1
	}
	else {
		curActionIndex = curActionIndex - 1
	}
	updateRadialMenu()
}

function radialMenu_GoDown () {
	if (curActionIndex === radialMenu.length - 1) {
		curActionIndex = 0
	}
	else {
		curActionIndex = curActionIndex + 1
	}
	updateRadialMenu()
}

function getAppNameAndIcon (app) {
	var appIcon = app.icon
	if (appIcon === undefined || appIcon === "") { appIcon = "fas fa-external-link-alt fa-fw" }
	return '<span class="icon"><i class="' + appIcon + '"></i></span><span>&nbsp;&nbsp;' + app.name + '</span>'
}

function updateRadialMenu () {
	var curApp = radialMenu[curActionIndex]
	var dnApp = (curActionIndex == radialMenu.length - 1) ? radialMenu[0] : radialMenu[curActionIndex + 1]
	var upApp = (curActionIndex == 0) ? radialMenu[radialMenu.length - 1] : radialMenu[curActionIndex - 1]

	rmCurAction.innerHTML = getAppNameAndIcon(curApp)
	rmDnAction.innerHTML = getAppNameAndIcon(dnApp)
	rmUpAction.innerHTML = getAppNameAndIcon(upApp)
}

function runActiveSelection () {
	var entry = settings.shortcuts[curActionIndex]
	if (entry.type === "app") {
		runApp(entry)
	}
	else if (entry.type === "quitcmd")
	{ quit() }
}

function runApp (app) {
	if (app.args === "")
	{
		exec(app.path, (error, stdout, stderr) => {
			if (error) {
	    		throw error
	  		}
	  		console.log(stdout)
		})
	}
	else
	{
		exec(app.path, app.args.split(' '), (error, stdout, stderr) => {
			if (error) {
	    		throw error
	  		}
	  		console.log(stdout)
		})
	}
}

function quit () {
	remote.getCurrentWindow().close()
}

// keyboard binds
mousetrap.bind('up', function() { radialMenu_GoUp() })
mousetrap.bind('down', function() { radialMenu_GoDown() })
mousetrap.bind('enter', function() { runActiveSelection() })

// gamepad binds
gamepad.on("connected", (gamepad) => {
	console.log("connected " + gamepad.id);
}).on("disconnected", (gamepad) => {
  	console.log("disconnected " + gamepad.index);
}).on("buttonPressed", ({ button, buttonIndex, gamepad }) => {
}).on("buttonReleased", ({ button, buttonIndex, gamepad }) => {
  	if (buttonIndex === 12) { radialMenu_GoUp() }
  	else if (buttonIndex === 13) { radialMenu_GoDown() }
  	else if (buttonIndex === 0) { runActiveSelection() }
});
 
// start loop for buttons and axes detection
gamepad.watch();
updateRadialMenu()