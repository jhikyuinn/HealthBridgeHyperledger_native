import { KeyboardAvoidingView,Text, View,TextInput, StyleSheet, Alert,ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {useState} from 'react'

function SourcesSendPHR({user,navigation}) {

  const [formData, setFormData] = useState({
    pid: "",
    assigner: "",
    name: "",
    age: 0,
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
});

const sendPHR = async () => {
  axios.put(`${BASE_URL}/Patient/${formData.pid}`, {
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
      await axios.put(`${BASE_URL}/Condition/${formData.pid}`, {
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
  const PHRhash = crypto.SHA256(pid, 'INLab').toString();
  return PHRhash
}

const postOnChain = async () => {
  const PHRhash = phrHash(formData.pid);
  console.log(formData);
  await axios.post(`${BLOCK_CHAIN_URL}/create`, {
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

const telChangeHandler = (e) => {
  setFormData({
      ...formData,
      telecome: {
          ...formData.telecome,
          [e.target.name]: e.target.value,
      }
  })
}

const conChangeHandler = (e) => {
  setFormData({
      ...formData,
      contact: {
          ...formData.contact,
          [e.target.name]: e.target.value,
      }
  })
}

const changeHandler = (e) => {
  const date = new Date().toLocaleString();
  setFormData({
      ...formData,
      createdAt: date,
      [e.target.name]: e.target.value,
  })
  console.log(formData);
}

const resetForm = () => {
  setFormData({
      pid: "",
      assigner: "",
      name: "",
      age: 0,
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
  await sendPHR()
  await postOnChain().then(() => {
      Alert.alert("Success")
      resetForm();
  })

}


  
  
    return (
      <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" enabled>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> PID:  </Text>
          <TextInput style={styles.input} type="text" placeholder="Enter PID" name="pid" value={formData.pid.toString()} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Name:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter name" name="name" value={formData.name} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Age:  </Text>
          <TextInput  style={styles.input} keyboardType={'numeric'} placeholder="Enter age" name="age" value={formData.age} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Gender:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter gender" name="gender" value={formData.gender} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Mobile phone:  </Text>
          <TextInput  style={styles.input}  type="text" placeholder="Enter your phone number" name="myPhone" value={formData.telecome.myPhone} onChange={telChangeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Address:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter your home address" name="address" value={formData.address} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Relationship:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Relationship with patient" name="relationship" value={formData.contact.relationship} onChange={conChangeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Name:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter name" name="name" value={formData.contact.name} onChange={conChangeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Gender:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter gender" name="gender" value={formData.contact.gender} onChange={conChangeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Mobile phone:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter contact phone number" name="phone" value={formData.contact.phone} onChange={conChangeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Address:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter contact address" name="address" value={formData.contact.address} onChange={conChangeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Symptom:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter symptom" name="symptom" value={formData.symptom} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Adding comment:  </Text>
          <TextInput  style={styles.input} type="text" name="comment" value={formData.comment} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Assigner:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter assigner" name="assigner" value={formData.assigner} onChange={changeHandler}/>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize:20}}> Doctor:  </Text>
          <TextInput  style={styles.input} type="text" placeholder="Enter doctor name" name="doctorName" value={formData.doctorName} onChange={changeHandler}/>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>

    );
  }
  
  export default SourcesSendPHR;

  const styles = StyleSheet.create({
    input: {
        height: 40,
        width:250,
        borderWidth: 1,
        padding: 10,
      },
      container:{
        margin: "5%",
        width:250,
        flex:1,
        height: 40,
        flexDirection:"row"
    },
    avoid: {
      flex: 1,
    },
  });
