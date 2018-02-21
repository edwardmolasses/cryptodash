import moment from 'moment';

export const apiEndPoints = {
    github: {
        code_frequency: (owner, repo) => 'https://api.github.com/repos/' + owner + '/' + repo + '/stats/code_frequency',
        punch_card: (owner, repo) => 'https://api.github.com/repos/' + owner + '/' + repo + '/stats/punch_card',
        commit_activity: (owner, repo) => 'https://api.github.com/repos/' + owner + '/' + repo + '/stats/commit_activity',
        commits: (owner, repo) => 'https://api.github.com/repos/' + owner + '/' + repo + '/commits',
        branches: (owner, repo) => 'https://api.github.com/repos/' + owner + '/' + repo + '/branches',
        contributors: (owner, repo) => 'https://api.github.com/repos/' + owner + '/' + repo + '/stats/contributors'
    }
};

export const coinRepoKeys = {
    IOTA: {
        name: 'Iota',
        owner: 'iotaledger',
        repo: 'wallet'
    },
    ETH: {
        name: 'Ethereum',
        owner: 'ethereum',
        repo: 'go-ethereum'
    },
    OMG: {
        name: 'OmiseGo',
        owner: 'omise',
        repo: 'omise-go'
    },
    DOGE: {
        name: 'Dogecoin',
        owner: 'dogecoin',
        repo: 'dogecoin'
    }
};


export const getBranchWeekly = function (owner, repo) {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`);
};

export const getBranchCommitsPerHour = function (owner, repo) {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/stats/punch_card`);
};

export const getBranchCommitYear = function (owner, repo) {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`);
};

export const getBranchCommits = function (owner, repo) {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
};

export const getRepoBranches = function (owner, repo) {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/branches`);
};

// e.g. DATA.getBranchContributors('iotaledger', 'wallet');
export const getBranchContributors = function (owner, repo) {
    //return fetch(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`);
    return fetch(apiEndPoints.github.contributors(owner, repo));
};

export const getBTCHistorical = function () {
    return fetch("http://coincap.io/history/365day/BTC");
};

export const getETHHistorical = function () {
    return fetch("http://coincap.io/history/365day/DASH");
};

export const setLocalStorage = function(key, value) {
    const localStorageItem = {};
    localStorageItem.timestamp = Date.now();
    localStorageItem.data = value;

    localStorage.setItem(key, JSON.stringify(localStorageItem));
};

export const getLocalStorage = function(key) {
    return !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : false;
};

export const setCached = function(key, value) {
//debugger;
    setLocalStorage(key, value);
};

export const getCached = function(key) {
    const localStorageItem = getLocalStorage(key);
    let minutesBeforeExpiry = 30;
    let nowMoment = moment();
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

export const callApi = async function (api, op, owner, repo) {
//debugger;
    const cacheKey = `${api}.${op}.${owner}`;
    let callResult = await getCached(cacheKey);

    if (!callResult) {
        let callResultObj = await fetch(apiEndPoints[api][op](owner, repo));
        callResult = await callResultObj.json();
        //let callResultJson = callResult.json();
//debugger;
        setCached(cacheKey, callResult);
    }
    //const callResult = cachedCall ? cachedCall : await fetch(apiEndPoints[api][op](owner, repo));

    return callResult;
    //return fetch(apiEndPoints[api][op](owner, repo));
};
