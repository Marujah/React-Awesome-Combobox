import React from 'react';
import styled from 'styled-components';
import { prototype } from 'stream';

const ComboboxSuggestionContainer = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid gray;
    color: gray;
    text-align: left;
    &:hover {
        background-color: lightGray;
    }
    &.active-item {
        background-color: ${props => props.color} !important;
        color: #fff;
    }
`;

export class ComboboxSuggestion extends React.Component {
    render() {
        const {suggestion, color, active, onClick, highlight} = this.props;
        return (
            <ComboboxSuggestionContainer
                onClick={onClick}
                suggestion={suggestion}
                className={active ? 'active-item' : ''}
                color={color}
                active={active}
            >
                {suggestion.before}
                {highlight
                    ? <mark>{suggestion.hit}</mark>
                    : <strong>{suggestion.hit}</strong>
                }
                {suggestion.after}
            </ComboboxSuggestionContainer>

        )
    }
};


// prototype {
//     {suggestion, color, active, onClick}
// }