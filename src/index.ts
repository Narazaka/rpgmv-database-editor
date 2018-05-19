import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

if (process.env.ELECTRON_RELOAD) {
    // tslint:disable-next-line no-var-requires no-require-imports no-implicit-dependencies
    require("electron-reload")(__dirname);
}

let mainWindow: BrowserWindow | undefined;

app.on("ready", () => {
    mainWindow = new BrowserWindow();
    mainWindow.setTitle("データベース");
    // tslint:disable-next-line no-null-keyword
    mainWindow.setMenu(null);
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
