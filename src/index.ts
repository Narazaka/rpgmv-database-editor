import {app, BrowserWindow} from "electron";
import * as url from "url";
import * as path from "path";

let mainWindow: BrowserWindow | undefined;

app.on("ready", () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
    }));
    mainWindow.on("closed", () => {
        mainWindow = undefined;
    });
});

app.on("window-all-closed", () => {
    app.quit();
});
