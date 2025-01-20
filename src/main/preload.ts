// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import { curry } from 'ramda';

// export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    removeListener: ipcRenderer.removeListener,
    onNavigate: curry(ipcRenderer.on.bind(ipcRenderer))('on-navigate')
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
