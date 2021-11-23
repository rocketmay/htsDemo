import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    localStorage: Storage = window.localStorage;
    sessionStorage: Storage = window.sessionStorage;

    constructor() { }

    removeSessionData(dataName: string) {
        this.sessionStorage.removeItem(dataName);
    }

    saveSessionData(dataName: string, dataString: string) {
        let data: string = dataString;
        this.sessionStorage.setItem(dataName, data);
    }

    loadSessionData(dataName: string) {
        return this.sessionStorage.getItem(dataName);
    }

    removeLocalData(dataName: string) {
        this.localStorage.removeItem(dataName);
    }

    saveLocalData(dataName: string, dataString: string) {
        let data: string = dataString;
        this.localStorage.setItem(dataName, data);
    }

    loadLocalData(dataName: string) {
        return this.localStorage.getItem(dataName);
    }
}
