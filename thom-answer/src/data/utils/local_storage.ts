export function storageSetItem(key: string, value: string){
    localStorage.setItem(key, value);
}

export function storageGetItem(key: string){
    return localStorage.getItem(key);
}