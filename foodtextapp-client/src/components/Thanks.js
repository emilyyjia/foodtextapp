import React from 'react';
import styled from 'styled-components';


const CenterContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h1`
    color: #6885EB;
    font-family: "Roboto", sans-serif; 
    font-size: 78px;
    font-weight: bolder;
    line-height: 84px;
`

const Thanks = () => {

    return (
        <CenterContainer>
            <Title>
                Thank you! ☺
            </Title>
        </CenterContainer>
    );
};

export default Thanks;