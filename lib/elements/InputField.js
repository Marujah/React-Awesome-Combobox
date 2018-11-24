import React from 'react';
import styled from 'styled-components';

const InputFieldContainer = styled.input`
    height: ${props => props.itemHeight}px;
    width: 100%;
    padding-left: 10px;
    font-size: 1rem;
`;

export const InputField = (props) => (
    <InputFieldContainer {...props} />
)