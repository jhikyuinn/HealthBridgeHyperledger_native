import { Text, View,ScrollView ,StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import AuroraButton from '../../components/AuroraButton';
function OwnerRequestRecordsDetails({route,navigation}){
    const {sender}=route.params
    const {data}=route.params


    async function Sendresponse(){
        await axios.put(`http://203.247.240.226:22650/api/responsePHR`,{
          "EHRNumber":"EHR1206",
          "doctor":"James",
          "token":1.64,
          "responsedata":"whole PHR"
        }).then((res) => {
            Alert.alert('Response Successfully sended')
        })
    }

    function Closeresponse(){
        navigation.navigate("Owner Notification")
    }
    return(
        <>
         <ScrollView>
        <View style={styles.input}>
            <Text style={styles.textsize}>PID: {data.id}</Text>
            <Text style={styles.textsize}>Name: {data.name[0].text}</Text>
            <Text style={styles.textsize}>Age: {data.extension[4].valueString}</Text>
            <Text style={styles.textsize}>Gender: {data.gender} </Text>
            <Text style={styles.textsize}>Mobile phone:{data.telecom[0].value}</Text>
            <Text style={styles.textsize}>Address: {data.address[0].text}</Text>
            <Text style={styles.textsize}>Relationship: {data.contact[0].relationship[0].text}</Text>
            <Text style={styles.textsize}>Next of Kin Name: {data.contact[0].name.text}</Text>
            <Text style={styles.textsize}>Next of Kin Mobile phone: {data.contact[0].telecom[0].value}</Text>
            <Text style={styles.textsize}>Next of Kin Address: {data.contact[0].address.text}</Text>
            <Text style={styles.textsize}>Symptom: {data.extension[0].valueString}</Text>
            <Text style={styles.textsize}>Adding comment: {data.extension[1].valueString}</Text>
            <Text style={styles.textsize}>Assigner: {data.extension[3].valueString}</Text>
            <Text style={styles.textsize}>Doctor name: {data.extension[2].valueString}</Text>
        </View>

            <View style={styles.container}>
                <AuroraButton text="reject" buttonFunction={() => Rejectresponse(user)} width="30%" height="100%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
                <AuroraButton text="send" buttonFunction={() => Sendresponse()} width="30%" height="100%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
                <AuroraButton text="close" buttonFunction={() => Closeresponse()} width="30%" height="100%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
            </View>

    
        </ScrollView>

        </>
    );
}

export default OwnerRequestRecordsDetails;

const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 400,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    textsize:{
        fontSize: 20
    },
    container:{
        margin: "5%",
        width:350,
        height: 50,
        flex: 1,
        alignItems: "center", 
        justifyContent: "center",
        flexDirection:"row"
    }
  });