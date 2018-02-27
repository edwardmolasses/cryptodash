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
