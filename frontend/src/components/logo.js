import React, { Component } from 'react';
import imgfile from '../images/smilegate_logo.png'
import styled from 'styled-components';

const StyledLogo = styled.img`
    width: ;
    height: ;
    margin-left: 20px;
    border-style: solid;
    border-width: 1px; 
`;

function Logo({ Children }){
    return(
            <StyledLogo src={imgfile} />
    );
}

export default Logo;