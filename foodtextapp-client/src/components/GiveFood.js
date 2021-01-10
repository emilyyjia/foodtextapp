import React, {useState} from 'react';
import styled from 'styled-components';

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'; // TODO: fix styling for picker
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

const Option = styled.option`

`

const Warn = styled(Form.Text)`
    color: #FF8B8B;
`

const GiveFood = () => {
    const [itemType, setItemType] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");

    const [isFormComplete, setFormComplete] = useState(false);
    const [triedSubmitting, setTriedSubmitting] = useState(false);

    const hasEmptyField = () => {
        return itemType === "" || itemType === "Select" || description === "" || time === "" || location === "";
    }

    const submitForm = (event) => {
        if (hasEmptyField()) {
            event.preventDefault();
            event.stopPropagation();
            setFormComplete(false);
            setTriedSubmitting(true);
            return;
        }
        // TODO: call API here

        setFormComplete(true);
    }

    if (isFormComplete) {
        return <Redirect to={'/thanksGive'} />;
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
                            Item Description
                        </StyledLabel>
                        <Form.Control as='textarea' onChange={e => setDescription(e.target.value)} value={description}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="form.quantity">
                        <StyledLabel>
                            Item Quantity
                        </StyledLabel>
                        <Form.Control onChange={e => setQuantity(e.target.value)} type="number" value={quantity}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="form.date">
                        <StyledLabel>
                            Pick-up Date &amp; Time
                        </StyledLabel>
                        <DateTimeRangePicker
                            disableClock={true}
                            format="y-MM-dd h:mm a"
                            onChange={setTime}
                            value={time}
                        />
                    </Form.Group>
                    <Form.Group controlId="form.location">
                        <StyledLabel>
                            Address &amp; Postal Code
                        </StyledLabel>
                        <Form.Control as='textarea' onChange={e => setLocation(e.target.value)} value={location}></Form.Control>
                    </Form.Group>
                    <Submit onClick={submitForm} type="submit">
                        Submit
                    </Submit>
                </StyledForm>
            </Row>
        </CenterContainer>
    );
  };
  
  export default GiveFood;