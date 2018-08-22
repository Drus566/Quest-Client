
class Api
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
    
    static loginRequest(email, password){
        return fetch(this.domen('/user_token'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth:{
                    email: email,
                    password: password
                }
            })
        })
        .then(response => {return response.json();})
        .then(response => {
            console.log('Success Login:', response.jwt); 
            return response
        })
        .catch(error => {
            console.log('Error Login:', error); 
            return error
        });
    }
    
    static checkUserRequest(token){
        return fetch(this.domen('/users/check_user'),{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(response => {
            console.log('Success Check user:', response.status); 
            return response
        })
        .catch(error => {
            console.log('Error Check user:', error); 
            return error
        })
    }
}

export default Api
