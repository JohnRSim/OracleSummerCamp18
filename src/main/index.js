import { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, protocol } from 'electron'; // eslint-disable-line
//import 'hazardous';
import { join, normalize } from 'path';
import { autoUpdater } from 'electron-updater';

const appVersion = '0.0.1';

//test
app.disableHardwareAcceleration();


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	//global.__static = join(__dirname, '/static');//.replace(/\\/g, '\\\\'); // eslint-disable-line
	global.__static = join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : 'hack://index.html';//`file://${__dirname}/index.html`;//


/**
 * Initialise and create application Window
 */
function createWindow() {
	//setup app ico
	const iconPath = join(__static, 'android-chrome-192x192.png');
	const iconTrayPath = join(__static, 'favicon-16x16.png');
	const appIcon = nativeImage.createFromPath(iconPath);
	//..To review
	const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png';

	//Initial window options
	mainWindow = new BrowserWindow({
		height: 216,//656,
		show: false,
		useContentSize: false,
		width: 216,//510,
		transparent: true,
		frame: false,
		resizable: false,
		icon: appIcon,
		maximizable: false,
		webPreferences: {
			backgroundThrottling: false,
			nodeIntegrationInWorker: true,
			//If backgroundThrottling is disabled, the visibility state will remain visible even if the window is minimized, occluded, or hidden.
		},
	});

	//clean display of page loader approach
	//prevent flicker and display of loader until DOM ready
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	//force debug window
	//mainWindow.webContents.openDevTools();

	//Load App
	mainWindow.loadURL(winURL);

	//add tray icon support
	const trayIcon = nativeImage.createFromPath(iconPath);
	//trayIcon = trayIcon.resize({ width: 16, height: 16 });
	//const nimage = nativeImage.createFromPath(trayIcon);
	const tray = new Tray(iconPath);//appIcon iconPath

	//mainWindow.hide();
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

//check if second instance is running.. and show focus current app if active
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	if (mainWindow) {
		//if minimised restore
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		//if in tray show
		if (!mainWindow.isVisible()) {
			mainWindow.show();
		}
		//focus on app
		mainWindow.focus();
	}
});

//found second instance close this as prior is now open
if (isSecondInstance) {
  app.quit();
}

//https://github.com/electron/electron/blob/master/docs/api/protocol.md
//change file protocal to enables recaptcha capabilities
protocol.registerStandardSchemes(['hack'], { secure: true });

//on ready initialise app
app.on('ready', () => {
	protocol.registerFileProtocol('hack', (request, callback) => {
		let url = request.url.substr(10);
		//strip index only needed onload.
		if (!url.endsWith('index.html/')) {
			url = url.replace(/index.html\//, '');
		}
		callback({
			path: normalize(`${__dirname}/${url}`),
		});
	}, (error) => {
		if (error) console.error('Failed to register protocol');
	});
	createWindow();
	//autoUpdater.checkForUpdatesAndNotify();
});

//quit app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

//create app
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
