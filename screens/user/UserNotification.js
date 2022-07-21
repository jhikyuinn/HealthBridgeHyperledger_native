import axios from 'axios';
import { Text, View,ScrollView ,StyleSheet,Alert} from 'react-native';
import AuroraButton from '../../components/AuroraButton';
import { Header } from 'react-native-elements';

function UserNotification({route,navigation}) {
    
    function Back(){
        navigation.navigate('Records')
    }

    async function getResponseRecordsview(){
        await axios.post(`http://203.247.240.226:22650/api/sendPayment`, {
            "SenderName": "EHR1",
            "ReceiverName": "EHR1206",
            "Price": 100
        }).then((res) => {
            Alert.alert('Successful Transaction ')
        })

    }
    return (
        <>
        <Header
      backgroundColor='rgb(134, 193, 217)'
      leftComponent={{text:"HealthBridge",style:{width:200,fontSize:30,fontWeight: 'bold'}}}
      rightComponent={{ icon:"notifications",size:30,onPress: () => Back() }}
      />
      <ScrollView>
      <View style={styles.input}>
        <Text style={styles.textsize}>PID: EHR1206 response ok</Text>
        <AuroraButton text="View" buttonFunction={() => getResponseRecordsview()} width="20%" height="40%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
        </View>
        <View style={styles.input}>
        <Text style={styles.textsize}>PID:  response ok</Text>
        <AuroraButton text="View" buttonFunction={() => getResponseRecordsview()} width="20%" height="40%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
      </View>
      </ScrollView>
      </>
    );
  }
  
  export default UserNotification;

  const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    textsize:{
        fontSize: 20
    },
  });