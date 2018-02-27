import React from 'react';
import moment from 'moment';

export const setLocalStorage = function(key, value) {
    const localStorageItem = {};
    localStorageItem.timestamp = Date.now();
    localStorageItem.data = value;

    localStorage.setItem(key, JSON.stringify(localStorageItem));
};

export const getLocalStorage = function(key) {
    return !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : false;
};

export const buildCacheKey = function(providerStr, opStr, idKey) {
    return `${providerStr}.${opStr}.${idKey}`;
};

export const setCached = function(key, value) {
    setLocalStorage(key, value);
};

export const getCached = function(key) {
    const localStorageItem = getLocalStorage(key);
    const minutesBeforeExpiry = 30;
    const nowMoment = moment();
    let cachedItemMoment;
    let cachedItemAge;
    let isCachedItemOld;

    if (!localStorageItem) {
        return false;
    }
    cachedItemMoment = moment(localStorageItem.timestamp);
    cachedItemAge = nowMoment.diff(cachedItemMoment);
    isCachedItemOld = cachedItemAge > 1000 * 60 * minutesBeforeExpiry;

    return isCachedItemOld ? false : localStorageItem;
};

export const passStateToChildren = function(children, childName, state) {
    return React.Children.map(children, (child) => {
        let childName = child.type.name;
        return childName === child.type.name
            ? React.cloneElement(child, state)
            : child;
    });
};
