
// import { AsyncStorage } from "react-native"

// class Storage {
//     static token = null

//     // static Regist(){
//     //     data = this.retrieveData('jwt')
//     //     this.token = data
//     //     console.log('Regist ' + JSON.stringify(this.token))
//     //     return this.token
//     // }

//     static storeData = async (key, value) => {
//         try {
//             await AsyncStorage.setItem(key, value) 
//         } catch(error){
//             console.log(error);
//         }
//     }

//     static retrieveData = async () => {
//         try {
//             const value = await AsyncStorage.getItem('jwt');
//             return value
//         } catch (error) {
//             // Error retrieving data
//         }
//     }
// }
// export default Storage