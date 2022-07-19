import { Text, View } from 'react-native';
import AuroraButton from '../../components/AuroraButton';


function SourcesInformation({user,navigation}) {
  
  const SignOut=()=>{
    navigation.navigate('Main')
  }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User Information</Text>
        <Text>AccountID: {user.AccountID}</Text>
        <Text>Name: {user.patientName}</Text>
        <Text>Phone Number: {user.phonenumber}</Text>
        <Text>Account Balance: {user.checkingBalance}</Text>
        <AuroraButton buttonFunction={()=>SignOut()} width="80%" height="10%"  bgcolor="rgb(134, 193, 217)" text="Sign Out" color={"black"} outline={false}/>
      </View>
    );
  }
  
  export default SourcesInformation;