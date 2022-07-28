import { Text, View ,StyleSheet} from 'react-native';
import AuroraButton from '../../components/AuroraButton';


function SourcesInformation({user,navigation}) {
  const Edit=()=>{
    navigation.navigate('Sources Edit Profile',{user:user})
  }
  const Charge=()=>{
    navigation.navigate('Sources Charge Balance',{user:user})
  }
  
  const SignOut=()=>{
    navigation.navigate('Main')
  }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.textsize}>User Information {"\n"}</Text>
        <Text style={styles.textsize}>AccountID: {user.AccountID}</Text>
        <Text style={styles.textsize}>Organization: {user.Organization}</Text>
        <Text style={styles.textsize}>Name: {user.patientName}</Text>
        <Text style={styles.textsize}>Phone Number: {user.phonenumber}</Text>
        <Text style={styles.textsize}>Account Balance: {user.checkingBalance}</Text>
        <View style={styles.container}>
        <AuroraButton buttonFunction={()=>Edit()} width="100%" height="100%"  bgcolor="rgb(134, 193, 217)" text="Edit profile" color={"black"} outline={false}/>
        <AuroraButton buttonFunction={()=>Charge()} width="100%" height="100%"  bgcolor="rgb(134, 193, 217)" text="Charge balance" color={"black"} outline={false}/>
        </View>
        <AuroraButton buttonFunction={()=>SignOut()} width="80%" height="8%"  bgcolor="rgb(134, 193, 217)" text="Sign Out" color={"black"} outline={false}/>
      </View>
    );
  }
  
  export default SourcesInformation;
  const styles = StyleSheet.create({
    textsize:{
      fontSize: 20
  },
    container:{
        marginTop:"5%",
        marginBottom:"2%",
        width:150,
        height:50,
        alignItems: "center", 
        justifyContent: "center",
        flexDirection:"row"
    }
  });