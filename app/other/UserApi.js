
class UserApi
{
    static domen(path){
        return 'https://zx-drus-zx-quest-api.herokuapp.com' + path
    }

    static getUserRooms(token, id){
        return fetch(this.domen('/rooms/get_user_rooms/' + id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
    }
}

export default UserApi
