
import { AsyncStorage } from "react-native"

class Storage {

    static storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value) 
            // console.log(value);
        } catch(error){
            console.log(error);
        }
    }

    static retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            // console.log(value);
            return value;
        } catch (error) {
            console.log(error)
        }
    }
}
export default Storage