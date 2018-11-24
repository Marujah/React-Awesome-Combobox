import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; 

const ComboboxSuggestionContainer = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
    color: gray;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: ${props => props.itemHeight};
    &:hover {
        background-color: lightGray;
    }
    &.active-item {
        background-color: ${props => props.color} !important;
        color: #fff;
    }
`;

export const ComboboxSuggestion  = ({suggestion, color, active, onClick, highlight, itemHeight}) => (
    <ComboboxSuggestionContainer
        onClick={onClick}
        suggestion={suggestion}
        className={active ? 'active-item' : ''}
        color={color}
        itemHeight={itemHeight}
    >
        {suggestion.before}
        {highlight
            ? <mark>{suggestion.hit}</mark>
            : <strong>{suggestion.hit}</strong>
        }
        {suggestion.after}
    </ComboboxSuggestionContainer>
)

ComboboxSuggestion.propTypes = {
    color: PropTypes.string.isRequired,
    itemHeight: PropTypes.string.isRequired,
    suggestion: PropTypes.shape({
        before: PropTypes.string,
        hit: PropTypes.string,
        after: PropTypes.string
    }),
    highlight: PropTypes.bool,
    onClick: PropTypes.func
}