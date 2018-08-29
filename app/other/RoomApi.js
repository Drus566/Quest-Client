
class RoomApi
{
    static domen(path){
        return 'https://zx-drus-zx-quest-api.herokuapp.com' + path
    }

    static randomPlayerRequest(token){
        return fetch(this.domen('/find_player'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
    }
}

export default RoomApi
