import React, {useState} from 'react';
import styled from 'styled-components';

import { Redirect } from 'react-router-dom';

const CenterContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const GetFood = () => {
    const [isFormComplete, setFormComplete] = useState(false);

    const createGetFoodUser = () => {
        // TODO: call API here

        setFormComplete(true);
    }

    if (isFormComplete) {
        return <Redirect to={'/thanks'} />;
    }

    return (
        <CenterContainer>
            <row>
                <h1>hello world2!</h1>
                <button onClick={createGetFoodUser} >click me</button>
            </row>
        </CenterContainer>
    );
};

export default GetFood;