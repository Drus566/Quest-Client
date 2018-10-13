
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

    static getRoom(token, roomId){
        return fetch(this.domen('/rooms/' + roomId),{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
    }

    static createRoom(token, firstId, secondId){
        return fetch(this.domen('/rooms'),{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                room:{
                    first_user_id: firstId,
                    second_user_id: secondId
                }
            }),
        })
    }
}

export default RoomApi
