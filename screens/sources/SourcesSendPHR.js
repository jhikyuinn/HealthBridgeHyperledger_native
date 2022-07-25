import { KeyboardAvoidingView,Text, View,TextInput, StyleSheet, Alert,ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import crypto from 'crypto-js';
import axios from 'axios';
import {useState} from 'react'
import AuroraButton from '../../components/AuroraButton';

function SourcesSendPHR({user,center,navigation}) {
  const BASE_URL = "http://203.247.240.226:8080/fhir"

  const [formData, setFormData] = useState({
    pid: "",
    assigner: "",
    name: "",
    age: "",
    telecome: {
        myPhone: "",
    },
    gender: "",
    birthdate:"",
    address: "",
    contact: {
        name: "",
        phone: "",
        relationship: "",
        address: "",
        gender: "",
    },
    symptom: "",
    comment: "",
    doctorName: "",
    createdAt: " "
});

const sendPHR = async () => {
  await axios.put(`${BASE_URL}/Patient/${formData.pid}`, {
     "resourceType": "Patient",
     "id": formData.pid,
     "text": {
         "status": "generated",
         "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><tbody/></table></div>"
     },
     "identifier": [
         {
             "use": "usual",
             "assigner": {
                 "display": formData.assigner,
             }
         }
     ],
     "name": [
         {
             "text": formData.name
         }
     ],
     "age": formData.age,
     "address" : [
         {
             "use": "home",
             "text": formData.address
         }
     ],
     "telecom": [
         {
             "system": "phone",
             "value": formData.telecome.myPhone,
             "use": "mobile"
         }
     ],
     "gender": formData.gender,
     "contact": [
         {
             "relationship":[
                 {
                     "text":formData.contact.relationship
                 }
             ],
             "name": {
                 "text": formData.contact.name
             },
             "gender": formData.contact.gender,
             "telecom": [
                 {
                     "system": "phone",
                     "value": formData.contact.phone,
                     "use": "mobile"
                 }
             ],
             "address": [
                 {
                     "use":"home",
                     "text": formData.contact.address
                 }
             ]
         }
     ],
     "extension" : [
         {
             "url": "symptom",
             "valueString": formData.symptom
         },
         {
             "url": "comment",
             "valueString": formData.comment
         },
         {
             "url": "doctor",
             "valueString": formData.doctorName
         },
         {
             "url": "assigner",
             "valueString": formData.assigner
         },
         {
             "url": "age",
             "valueString": formData.age
         },
         {
             "url": "createdAt",
             "valueString": formData.createdAt
         }
     ],
     "generalPractitioner": {
         "reference": `Practitioner/${formData.doctorName}`
     },
     "managingOrganization":{
         "reference": `Organization/${formData.assigner}`
     }
  }).then((res) => {
     console.log("from server: ", res);
     postCondition(res);
 })
}

const postCondition = async (prevResult) => {
  if(prevResult !== undefined) {
      await axios.put(`http://203.247.240.226:8080/fhir/Condition/${formData.pid}`, {
          "resourceType": "Condition",
          "id": formData.pid,
          "extension": [
              {
                  "url": "doctor",
                  "valueString": formData.doctorName
              },
              {
                  "url": "assigner",
                  "valueString": formData.assigner
              },
              {
                  "url": "createdAt",
                  "valueString": formData.createdAt
              }
          ],
          "clinicalStatus": {
              "coding": [
              {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active"
              }
           ]
          },
          "verificationStatus": {
              "coding": [
              {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed"
              }
           ]
          },
          "category": [
              {
              "coding": [
                  {
                      "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                      "code": "encounter-diagnosis",
                      "display": "Encounter Diagnosis"
                  }
               ]
              }
          ],
          "code": {
              "text": formData.symptom
          },
          "subject": {
              "reference": `Patient/${formData.pid}`
          }
      }).then((res) => {
          console.log(res);
      })
  }
}
const phrHash = (pid) => {
  const PHRhash = crypto.SHA256(pid, 'INLab');
  return PHRhash
}

const postOnChain = async () => {
  console.log(formData)
  const PHRhash = phrHash(formData.pid);
  console.log(formData);
  await axios.post(`http://203.247.240.226:22650/api/create`, {
          "EHRNumber" : formData.pid,
          "AccountID": formData.pid,
          "DateTime": formData.createdAt,
          "Organization": formData.assigner,
          "patientName": formData.name,
          "Function": "Create",
          "data": "Patient EHR",
          "PHRHash": PHRhash,
          "checkingBalance":10000000,
          "phonenumber" : formData.telecome.myPhone

  }).then(console.log);
}

const telChangeHandler = (keyvalue,e) => {
  console.log(e)
  setFormData({
      ...formData,
      telecome: {
          ...formData.telecome,
          [keyvalue]: e,
      }
  })
}

const conChangeHandler = (keyvalue,e) => {
  console.log(e)
  setFormData({
      ...formData,
      contact: {
          ...formData.contact,
          [keyvalue]: e,
      }
  })
  console.log(formData)
}

const changeHandler = (keyvalue,e) => {
  console.log(e)
  const date = new Date().toLocaleString();
  setFormData({
      ...formData,
      createdAt: date,
      [keyvalue]: e
  })
  console.log(formData)
}

const resetForm = () => {
  setFormData({
      pid: "",
      assigner: "",
      name: "",
      age: "",
      telecome: {
          myPhone: "",
      },
      gender: "",
      birthdate: "",
      address: "",
      contact: {
          name: "",
          phone: "",
          relationship: "",
          address: "",
          gender: "",
      },
      symptom: "",
      comment: "",
      doctorName: "",
      createdAt: ""
  })
}

const onClickSendHandler = async() => {
  await sendPHR().then(() => {
    Alert.alert("Success1")
  })
  await postOnChain().then(() => {
      Alert.alert("Success2")
      resetForm();
  })
}

    return (
      <>
          <ScrollView>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> PID:  </Text>
              <TextInput style={styles.input} type="text" placeholder="Enter" name="pid" value={formData.pid} onChangeText={(e) => changeHandler("pid", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Name:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter name" name="name" value={formData.name} onChangeText={(e) => changeHandler("name", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Age:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter age" name="age" value={formData.age} onChangeText={(e) => changeHandler("age", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Gender:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter gender" name="gender" value={formData.gender} onChangeText={(e) => changeHandler("gender", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Mobile phone:  </Text>
              <TextInput  style={styles.input}  type="text" placeholder="Enter your phone number" name="myPhone" value={formData.telecome.myPhone} onChangeText={(e) => telChangeHandler("myPhone", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Address:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter your home address" name="address" value={formData.address} onChangeText={(e) => changeHandler("address", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Relationship:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Relationship with patient" name="relationship" value={formData.contact.relationship} onChangeText={(e) => conChangeHandler("relationship", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Name:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter name" name="name" value={formData.contact.name} onChangeText={(e) => conChangeHandler("name", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Gender:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter gender" name="gender" value={formData.contact.gender} onChangeText={(e) => conChangeHandler("gender", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Mobile phone:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter contact phone number" name="phone" value={formData.contact.phone} onChangeText={(e) => conChangeHandler("phone", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Address:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter contact address" name="address" value={formData.contact.address} onChangeText={(e) => conChangeHandler("address", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Symptom:  </Text>
              <TextInput  style={styles.input} type="text" placeholder="Enter symptom" name="symptom" value={formData.symptom} onChangeText={(e) => changeHandler("symptom", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Adding comment:  </Text>
              <TextInput  style={styles.input} type="text" name="comment" value={formData.comment} onChangeText={(e) => changeHandler("comment", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Assigner:  </Text>
              <TextInput  style={styles.input} type="text"  name="assigner" value={formData.assigner} onChangeText={(e) => changeHandler("assigner", e)}/>
            </View>
            <View style={styles.container}>
              <Text style={{fontSize:20}}> Doctor:  </Text>
              <TextInput  style={styles.input} type="text"  name="doctorName" value={formData.doctorName} onChangeText={(e) => changeHandler("doctorName", e)}/>
            </View>
            <View style={{justifyContent:'center',alignItems: 'center'}}>
            <AuroraButton  text="View" buttonFunction={() => onClickSendHandler()} width={300} height={40} bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
            </View>
          </ScrollView>
       </>

    );
  }
  
  export default SourcesSendPHR;

  const styles = StyleSheet.create({
    input: {
        height: 40,
        width:200,
        borderWidth: 1,
        padding: 10,
      },
      container:{
        margin: "5%",
        width:200,
        flex:1,
        height: 40,
        flexDirection:"row"
      },
      avoid: {
        flex: 1,
      },
    }
  );
