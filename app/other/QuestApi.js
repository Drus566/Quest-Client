class QuestApi
{
    static domen(path){
        return 'https://zx-drus-zx-quest-api.herokuapp.com' + path
    }

    static questsRequest(token, number){
        return fetch(this.domen(`/quests/${number}`), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
    }
}

export default QuestApi
