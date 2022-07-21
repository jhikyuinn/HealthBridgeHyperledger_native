import axios from 'axios';
import { Text, View,ScrollView ,StyleSheet} from 'react-native';
import AuroraButton from '../../components/AuroraButton';
import { Header } from 'react-native-elements';

function OwnerNotification({route,navigation}) {
    
    function Back(){
        navigation.navigate('Records')
    }

    async function getRequestRecordsview(sender){
    await axios.get(`http://203.247.240.226:8080/fhir/Patient/HB1206`).then((res) => {
      console.log(res.data);
      sendRequestRecordDetails(sender,res.data)
    })
      function sendRequestRecordDetails(sender,data){
      navigation.navigate("Owner Request Records Details",{sender:sender,data:data})
    

    }
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
        <Text style={styles.textsize}>Doctor James sent a request for your PHR data.</Text>
        <AuroraButton text="View" buttonFunction={() => getRequestRecordsview("James")} width="20%" height="30%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
        </View>
        <View style={styles.input}>
        <Text style={styles.textsize}>Doctor Alice sent a request for your PHR data.</Text>
        <AuroraButton text="View" buttonFunction={() => getRequestRecordsview("Alice")} width="20%" height="30%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
      </View>
      </ScrollView>
      </>
    );
  }
  
  export default OwnerNotification;

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