import React from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Form from 'react-bootstrap/Form';

const CenterContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledForm = styled(Form)`
    width: 60%;
`
const StyledLabel = styled(Form.Label)`

`

const GiveFood = () => {
    return (
        <CenterContainer>
                <StyledForm>
                    <Form.Group controlId="form.desc">
                        <StyledLabel>
                            Item Description
                        </StyledLabel>
                        <Form.Control as='textarea'></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form.type">
                        <StyledLabel>
                            Item Type
                        </StyledLabel>
                        <Form.Control as='select'></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form.quantity">
                        <StyledLabel>
                            Item Quantity
                        </StyledLabel>
                        <Form.Control></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form.location">
                        <StyledLabel>
                            Pick-up Location
                        </StyledLabel>
                        <Form.Control as='textarea'></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form.date">
                        <StyledLabel>
                            Pick-up Date and Time
                        </StyledLabel>
                        <DateRangePicker initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}>
                            <Form.Control></Form.Control>
                        </DateRangePicker>
                    </Form.Group>
                </StyledForm>
        </CenterContainer>
    );
  };
  
  export default GiveFood;