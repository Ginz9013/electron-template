import { Menu, BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: 'Warehouse Tool',
        submenu: [
          {
            label: 'Dashboard',
            click: () => {
              this.mainWindow.webContents.send('on-navigate', {
                path: '/dashboard',
              });
            },
          },
          {
            label: 'Log out',
            click: () => {
              // eslint-disable-next-line no-console
              console.log('log out!');
            },
          },
        ],
      },
      {
        label: 'Return',
        submenu: [
          {
            label: 'Weight',
            click: () => {
              this.mainWindow.webContents.send('on-navigate', {
                path: '/return/weight',
              });
            },
          },
          {
            label: 'Scan Log',
            click: () => {
              this.mainWindow.webContents.send('on-navigate', {
                path: '/return/scan_log',
              });
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
