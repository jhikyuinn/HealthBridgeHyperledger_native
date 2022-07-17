import { Text, View } from 'react-native';
import AuroraButton from '../../components/AuroraButton';


function Information({navigation:{navigate}}) {
  const SignOut=()=>{
    navigate('Main')
  }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User Information</Text>
        <AuroraButton buttonFunction={()=>SignOut()} bgcolor="white" text="Sign Out" color={"black"} outline={false}/>
      </View>
    );
  }
  
  export default Information;