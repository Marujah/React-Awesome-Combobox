import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; 

const ComboboxSuggestionContainer = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: #FFFFFF;
    border-bottom: 1px solid #D4D4D4;
    color: gray;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: ${props => props.itemHeight}px;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #F1F1F1;
    }
    &.active-item {
        background-color: ${props => props.bgColor} !important;
        color: #FFFFFF;
        mark {
            background-color: rgba(255, 241, 0, 0.5);
        }
    }
`;

export const ComboboxSuggestion  = ({
    suggestion,
    bgColor,
    active,
    onClick,
    highlight,
    itemHeight,
    display,
    filterProperty
}) => (
    <ComboboxSuggestionContainer
        onClick={onClick}
        suggestion={suggestion}
        className={active ? 'active-item' : ''}
        bgColor={bgColor}
        itemHeight={itemHeight}
    >
        <span>
            {typeof suggestion.item === 'object' || suggestion.item === '[object Object]'
            ? 
            display.fields.map((item2Show, idx) => {
                if (item2Show === filterProperty) {
                    return (
                        <span key={idx}>
                            {suggestion.before}
                            {highlight
                                ? <mark>{suggestion.hit}</mark>
                                : <strong>{suggestion.hit}</strong>
                            }
                            {suggestion.after}{idx !== display.fields.length - 1 && display.seperator + ' '}
                        </span>
                    );
                }
                return <span key={idx}>{suggestion.item[item2Show]}{idx !== display.fields.length - 1 && display.seperator + ' '}</span>
            })
            :
                <span>
                    {suggestion.before}
                    {highlight
                        ? <mark>{suggestion.hit}</mark>
                        : <strong>{suggestion.hit}</strong>
                    }
                    {suggestion.after}
                </span>
            }
        </span>
    </ComboboxSuggestionContainer>
)

ComboboxSuggestion.propTypes = {
    bgColor: PropTypes.string.isRequired,
    itemHeight: PropTypes.number.isRequired,
    suggestion: PropTypes.shape({
        before: PropTypes.string,
        hit: PropTypes.string,
        after: PropTypes.string
    }),
    display: PropTypes.shape({
        seperator: PropTypes.string,
        fields: PropTypes.arrayOf(PropTypes.string)
    }),
    filterProperty: PropTypes.string,
    highlight: PropTypes.bool,
    onClick: PropTypes.func
}