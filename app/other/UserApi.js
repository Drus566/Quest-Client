
class UserApi
{
    static domen(path){
        return 'https://zx-drus-zx-quest-api.herokuapp.com' + path
    }

    static logupRequest(name, email, password){
        return fetch(this.domen('/users'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:{
                    name: name,
                    email: email,
                    password: password
                }
            }),
        })
        .then(response => {
            console.log('Success Logup:', response.status)
            return this.loginRequest(email, password)
        }).catch(error => {
            console.log('Error Logup:', error); 
            return error
        });
    }
}

export default UserApi
