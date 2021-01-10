import React, {useState} from 'react';
import styled from 'styled-components';

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'; // TODO: fix styling for picker
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
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
    margin-top: 3px;
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
    const [name, setName] = useState("");
    const [item, setItem] = useState("");
    const [itemType, setItemType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [time, setTime] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [isFormComplete, setFormComplete] = useState(false);
    const [triedSubmitting, setTriedSubmitting] = useState(false);

    const hasEmptyField = () => {
        return itemType === "" || itemType === "Select" || description === "" || time === "" || neighbourhood === "" 
        || name ==="" || item === "" || neighbourhood === "Select" || neighbourhood === "";
    }

    const submitForm = async (event) => {
        if (hasEmptyField()) {
            event.preventDefault();
            event.stopPropagation();
            setFormComplete(false);
            setTriedSubmitting(true);
            return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;

        const data = {
            name: name, 
            item: item, 
            item_type: itemType,
            city: neighbourhood, 
            quantity: quantity,
            location: location,
            time: time,
            description: description,
        }

        let formData = new FormData();
        for (const key in data) {
            console.log(key)
            formData.append(key, data[key]);
        }
        console.log(data);
        console.log(formData);
        let response = await fetch(`${apiUrl}/sharefood` , {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: formData
        });
        console.log(response);
        event.preventDefault();
        event.stopPropagation();

        // setFormComplete(true);
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

                    <Form.Row>
                    <Col>
                    <Form.Group controlId="form.desc" >
                        <StyledLabel>
                           Name
                        </StyledLabel>
                        <Form.Control placeholder="your/company" onChange={e => setName(e.target.value)} value={name}></Form.Control>
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group controlId="form.desc" >
                        <StyledLabel>
                            Item Name
                        </StyledLabel>
                        <Form.Control onChange={e => setItem(e.target.value)} value={item}></Form.Control>
                    </Form.Group>

                    </Col>
                    </Form.Row>

                    <Form.Row>

                    <Col>
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
                    </Col>


                    <Col>
                    <Form.Group controlId="form.quantity">
                        <StyledLabel>
                            Item Quantity
                        </StyledLabel>
                        <Form.Control onChange={e => setQuantity(e.target.value)} type="number" min="0" value={quantity}></Form.Control>
                    </Form.Group>
                    </Col>

                    </Form.Row>

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
                    
                    <Form.Group controlId="form.neighbourhood">
                        <StyledLabel>
                            Neighbourhood
                        </StyledLabel>
                        <Form.Control as='select' onChange={e => setNeighbourhood(e.target.value)} required value={neighbourhood}>
                            <Option>Select</Option>
                            <Option>Cambie Village</Option>
                            <Option>Chinatown/Downtown EastSide</Option>
                            <Option>Downtown Vancouver</Option>
                            <Option>Grandview-Woodland</Option>
                            <Option>Granville Island</Option>
                            <Option>Kerrisdale</Option>
                            <Option>Kitsilano</Option>
                            <Option>Marpole</Option>
                            <Option>Mount Pleasant</Option>
                            <Option>South Granville</Option>
                            <Option>Strathcona</Option>
                            <Option>UBC</Option>
                            <Option>West End</Option>
                        </Form.Control>
                        {(itemType === "" || itemType === "Select") &&
                            <Warn>
                                Please select a location.
                            </Warn>
                        }
                    </Form.Group>

                    <Form.Group controlId="form.location">
                        <StyledLabel>
                            Address
                        </StyledLabel>
                        <Form.Control onChange={e => setLocation(e.target.value)} placeholder="The exact address for pickup" value={location}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="form.desc">
                        <StyledLabel>
                            Description
                        </StyledLabel>
                        <Form.Control placeholder="Tell us more or share a message" as='textarea' onChange={e => setDescription(e.target.value)} value={description}></Form.Control>
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