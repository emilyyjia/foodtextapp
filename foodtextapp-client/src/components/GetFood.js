import React, {useState} from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';



const CenterContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const StyledForm = styled(Form)`
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    padding: 5%;
    width: 100%;
`;
//font-family: "Roboto", sans-serif; 
const StyledLabel = styled(Form.Label)`
    color: #6885EB; 
    font-family: monospace;
    font-size: 22px;
    font-weight: normal;
    margin-top: 15px;
`;
const Row = styled.div`
    width: 45%; 
`;
const TopCommand = styled.div`
    color: #B4CDA1; 
    font-family: "Roboto", sans-serif; 
    font-size: 20px;
    font-weight: bolder;
    letter-spacing: 1px;
    margin-bottom: 15px;
    text-align: center;
    width: 80%;
`;

const Submit = styled.button`
    border: 0px;
    border-radius: 20px;
    display: inline-block;
    font-family: "Roboto", sans-serif; 
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1px;

    margin: 0 0 10px 0; 
    position: relative;
    top: 100%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, 0%);

    overflow: hidden;  
    padding: 20px 50px;

    background-color: #FAF8F8;
    box-shadow: 0px 4px 0px #FFE395;
    border-radius: 32px;
    color: #7987F5;
    filter: drop-shadow(5px 10px 4px rgba(104, 133, 235, 0.2));

    &:hover{
        background-color: #7987F5;
        color: #FAF8F8;
        transition: background 0.3s, color 0.25s;
    }

    &:focus{
        outline: none;
    }
`;

const Warn = styled(Form.Text)`
    color: #FF8B8B;
`

const GetFood = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [location, setLocation] = useState("");

    const [isFormComplete, setFormComplete] = useState(false);
    const [triedSubmitting, setTriedSubmitting] = useState(false);
    const [isPhoneNumberGood, setPhoneNumber] = useState(true);

    const hasEmptyField = () => {
        return name === "" || phoneNumber === "" || location === "";
    }

    const badPhoneNumber = () => {
        return phoneNumber === "" || phoneNumber.length != 10 || isNaN(phoneNumber);
    }

    const createGetFoodUser = (event) => {
        if (hasEmptyField()) {
            event.preventDefault();
            event.stopPropagation();
            setFormComplete(false);
            setTriedSubmitting(true);
            setPhoneNumber(true);
            return;
        }
        if(badPhoneNumber()){
            event.preventDefault();
            event.stopPropagation();
            setPhoneNumber(false);
            setFormComplete(false);
            setTriedSubmitting(true);
            return;
        }
        console.log(name);
        console.log(phoneNumber);
        console.log(location);
        // TODO: call API here

        setFormComplete(true);
    }

    if (isFormComplete) {
        return <Redirect to={'/thanksGet'} />;
    }

    return (
        <CenterContainer>
            <TopCommand>
                Please enter your information below
            </TopCommand>
            <Row>
                <StyledForm> 
                    {triedSubmitting &&
                        <Warn>
                            One or more fields are empty.
                        </Warn>
                    }
                    <Form.Group controlId="form.desc">
                        <StyledLabel>
                            First &amp; Last Name
                        </StyledLabel>
                        <Form.Control onChange={e => setName(e.target.value)} value={name}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="form.quantity">
                        <StyledLabel>
                            Phone Number
                        </StyledLabel>
                        <Form.Control onChange={e => setphoneNumber(e.target.value)} value={phoneNumber}></Form.Control>
                        {isPhoneNumberGood === false &&
                            <Warn>
                                Please enter your 10-digit phone number with only numbers.
                            </Warn>
                        }
                    </Form.Group>

                    <Form.Group controlId="form.location">
                        <StyledLabel>
                            Address &amp; Postal Code
                        </StyledLabel>
                        <Form.Control as='textarea' onChange={e => setLocation(e.target.value)} value={location}></Form.Control>
                    </Form.Group>
                    <Submit type="submit" onClick={createGetFoodUser}>
                        Submit
                    </Submit>
                </StyledForm>
            </Row>
        </CenterContainer>
    );
};

export default GetFood;