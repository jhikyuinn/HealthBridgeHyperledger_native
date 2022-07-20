import { Text, View,ScrollView ,StyleSheet} from 'react-native';
function OwnerRequestRecordsDetails({route,navigation}){
    const {sender}=route.params
    const {data}=route.params

    console.log(sender,data)
    return(
        <>
        <View>
            <Text>

            </Text>
        </View>

        </>
    );
}

export default OwnerRequestRecordsDetails;