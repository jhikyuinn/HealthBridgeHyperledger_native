import { StyleSheet,Text, View ,Image, ImageBackground} from 'react-native';
import AuroraButton from '../components/AuroraButton';

function Main({route,navigation}) {

    const WhoSignIn=(category)=>{
        navigation.navigate('SignIn',{category:category})
    
    }

    return (
    <>
      <View style={styles.firstcontainer}>
        <Text style={styles.maintext}>{"\n"}Health{"\n"}Bridge</Text>
        <ImageBackground resizeMode="stretch" style={styles.mainImage} imageStyle={{borderRadius: 15}}source={require('../assets/main.jpeg')}>
        </ImageBackground>
      </View>
      
      <View style={styles.secondcontainer}>
        <Text style={styles.secondtext}>Continue as</Text>
        <AuroraButton width="80%" height="20%" bgcolor="rgb(134, 193, 217)" text="PHR Owner" color={"white"} fontSize={20} outline={false} buttonFunction={()=>WhoSignIn("owner")}/>
        <AuroraButton width="80%" height="20%" bgcolor="rgb(134, 193, 217)" text="PHR User" color={"white"} fontSize={20} outline={false} buttonFunction={()=>WhoSignIn("user")}/>
        <AuroraButton width="80%" height="20%" bgcolor="rgb(134, 193, 217)" text="PHR Sources" color={"white"} fontSize={20} outline={false} buttonFunction={()=>WhoSignIn("sources")}/>
      </View>
    </>
    );
  }
  
  export default Main;

  const styles = StyleSheet.create({
    firstcontainer: {
        resizeMode:"stretch",
        flex: 3,
        flexDirection: 'row',
        backgroundColor:"white"
    },
    maintext:{
        marginTop:80,
        marginLeft:30,
        fontSize:50,
        color:"rgb(134, 193, 217)",
        fontWeight:"bold"
    },
    mainImage:{
        marginLeft:0,
        width:'70%',
        height:'100%',
        alignSelf:"flex-end"
    },
    secondcontainer:{
        backgroundColor:"white", 
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    secondtext:{
        fontSize:20,
        color:"rgb(134, 193, 217)",
        fontWeight:"bold"
    }

  });
