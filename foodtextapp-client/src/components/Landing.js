import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

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

const Button = styled.button`
    border: 0px;
    border-radius: 20px;
    display: inline-block;
    font-family: "Roboto", sans-serif; 
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 4px 30px;  
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
`

const Landing = () => {
    return (
        <CenterContainer>
            <row>
                <Logo />
            </row>
            <row>
                <Title>
                    surplus
                </Title>
            </row>
            <row>
                <Link to="/give">
                    <Button>SHARE FOOD</Button>
                </Link>
                <Link to="/get">
                    <Button>GET FOOD</Button>
                </Link>
            </row>
        </CenterContainer>
    );
  };
  
  export default Landing;