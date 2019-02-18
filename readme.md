## Welcome to htctl!
htctl is a cross-platform application for home theater PCs to launch shortcuts using a controller or gamepad.

### Disclaimer and license
This program was created very quickly and specific to my purposes. I take no responsibility for anything that may impact your system in any shape, way, or form.

htctl is licensed under the [GNU General Public License v3.0](https://github.com/zackdevine/htctl/blob/master/LICENSE).

### How to run
There are no binaries available yet, so you'll need to have nodejs installed and compile everything yourself.

Steps to compile and run htctl:

1. Clone the repo
2. Run `npm i` to install all dependencies
3. Configure `settings.json` with your shortcuts (see below)
4. Run `npm start` to start htctl

### Changing settings and modifying shortcuts
All settings and shortcuts are defined in the `settings.json` file, found in the root directory of the project. Below is an example of said file:

```json
{
	"width": 1280,
	"height": 800,
	"isFullscreen": false,
	"dev": false,
	"shortcuts": [
		{
			"name": "firefox",
			"type": "app",
			"icon": "fab fa-firefox fa-fw",
			"path": "\"C:\\Program Files\\Mozilla Firefox\\firefox.exe\"",
			"args": ""
		},
		{
			"name": "steam",
			"type": "app",
			"icon": "fab fa-steam fa-fw",
			"path": "\"C:\\Program Files (x86)\\Steam\\Steam.exe\"",
			"args": ""
		},
		{
			"name": "steam big picture mode",
			"type": "site",
			"icon": "fab fa-steam fa-fw",
			"path": "steam://open/bigpicture",
			"args": ""
		},
		{
			"name": "quit",
			"type": "quitcmd",
			"icon": "fas fa-times fa-fw",
			"path": "",
			"args": ""
		}
	]
}
```

Lets look at what each setting does:

`width` - the default width of the app window when not fullscreened

`height` - the default height of the app window when not fullscreened

`isFullscreen` - whether or not to start the app in fullscreen

`dev` - whether or not to show the dev tools on startup

---

The shortcuts list defines what shortcuts to show in the app menu. Each entry should be its own json array, with (most) of the following properties defined:
```json
{
    "name": "app name to show in the list",
    "type": "shortcut type",
    "icon": "fontawesome.com icon to show in the list",
    "path": "the path to the executable or site",
    "args": "additional arguments to pass to an app shortcut"
}
```

The `type` property can have one of the three following types:

- `app` (executable application)
- `site` (website address)
- `quitcmd` (when selected, it quits the application)

Feel free to add as many entries as you want, but keep in mind only three will be shown at a given time, so you might want to keep the list a bit short!

Icons can be found for shortcuts at [fontawesome](https://fontawesome.com). Keep in mind only the free icons are currently used.

### Modifying the design
If you want to make changes to the design of htctl, there are Sass files located under `src/sass` that you may change. Make sure to install `node-sass` globally (using `npm i -g node-sass`) and the following command to update the dist css: `node-sass src/sass/app.sass dist/app.css`.

The html and js files can easily be changed within the `pages` subfolder with no compilation command needed.

### Contributing

If you would like to contribute to this project, feel free to fork the repository, make changes, and submit pull requests with detailed info on what you added/changed/removed.

### Credits
- NodeJS & npm
- Electron
- Bulma
- node-sass
- jsgamepad
- mousetrap
- opn