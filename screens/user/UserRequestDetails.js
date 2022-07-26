import { Text, View } from 'react-native';

function UserRequestDetails({item,navigation}) {
    console.log(item)

    const initialState = {
        PID: false,
        Name: false,
        Age: false,
        Gender: false,
        MobilePhone: false,
        Address: false,
        Symptoms: false,
        AddingComment: false,
        Assigner: false,
        DoctorName: false,
      };

    
    const [request, setRequest] = useState({
        EHRNumber: item.resource.id,
        amount: "",
        doctor: item.resource.extension[0].valueString,
        phoneNumber: phone
    });

    const requestHandler = async () => {
        await axios.put(`http://203.247.240.226:22650/api/requestPHR`, {
            "EHRNumber" : request.EHRNumber, 
            "maxtoken": request.amount, 
            "doctor": request.doctor, 
            "data": "all",
            "phonenumber" : phone
        }).then((res) => {
            console.log(res);
        })

        closeHandler();
        setRequest({
            EHRNumber: "",
            amount: "",
            doctor: "",
            phoneNumber: "",
        })
    }

    const changeHandler = (e) => {
        setRequest({
            ...request,
            [e.target.name] : e.target.value
        })
        console.log(request);
    }
  
    return (
      <View><div className="request_modal">
      <Modal show={show} onHide={closeHandler} centered>
          <Modal.Header closeButton>
              <Modal.Title>Request PHR</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className='user_name'><h5>Patient Name: {name}</h5></div>
              <Form>
                  <div className='check_col'>
                      {checks.map((item, key) => {
                          return (<Form.Check 
                              inline
                              label={item}
                              type="checkbox"
                              name="PHRdata"
                              id={item}
                              key={key}
                          />)
                      })}
                  </div>
                  <div className='modal_amount'>
                      <Form.Group className="mb-3" controlId="amount">
                      <Form.Label>Amount payable</Form.Label>
                      <Form.Control
                          type="number"
                          placeholder="amount HBT"
                          name='amount'
                          value={request.amount}
                          autoFocus
                          onChange={changeHandler}
                      />
                      </Form.Group>
                  </div>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeHandler}>
                  Close
              </Button>
              <Button variant="primary" onClick={requestHandler}>
                  Request
              </Button>
          </Modal.Footer>
      </Modal>
  </div></View>
    );
  }
  
  export default UserRequestDetails;