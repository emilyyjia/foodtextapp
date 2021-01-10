import React, {useState} from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
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

const Option = styled.option`
`

const Warn = styled(Form.Text)`
    color: #FF8B8B;
`

const GetFood = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [itemType, setItemType] = useState("");

    const [isFormComplete, setFormComplete] = useState(false);
    const [triedSubmitting, setTriedSubmitting] = useState(false);

    const hasEmptyField = () => {
        return itemType === "" || itemType === "Select" || name === "" || phoneNumber === "" || location === "";
    }

    const badPhoneNumber = () => {
        let numWithoutAreaCode = phoneNumber.substring(2);
        if (numWithoutAreaCode === "") {
            return true;
        }

        return phoneNumber === "" || phoneNumber.length !== 12 || isNaN(parseInt(numWithoutAreaCode));
    }

    const createGetFoodUser = async (event) => {
        if (hasEmptyField() || badPhoneNumber()) {
            event.preventDefault();
            event.stopPropagation();
            setFormComplete(false);
            setTriedSubmitting(true);
            return;
        }
        
        const apiUrl = process.env.REACT_APP_API_URL;

        const data = {
            name: name,
            item_type: itemType,
            city: location, // TODO make neighbourhood
            phone: phoneNumber,
        }

        let formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        fetch(`${apiUrl}/getfood` , {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: formData
        });

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
                    <Form.Group controlId="form.type">
                        <StyledLabel>
                            Item Type
                        </StyledLabel>
                        <Form.Control as='select' onChange={e => setItemType(e.target.value)} required value={itemType}>
                            <Option>Select</Option>
                            <Option>Ready/Hot Food</Option>
                            <Option>Storable Food</Option>
                            <Option>Clothing</Option>
                            <Option>Daily Use Items</Option>
                        </Form.Control>
                        {(itemType === "" || itemType === "Select") &&
                            <Warn>
                                Please select the type of item.
                            </Warn>
                        }
                        
                    </Form.Group>

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
                        {badPhoneNumber() &&
                            <Warn>
                                Please enter +1 followed by a 10-digit phone number using only numbers.
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