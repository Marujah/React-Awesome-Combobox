import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ComboboxSuggestion.css';

export class ComboboxSuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.showSuggestion = this.showSuggestion.bind(this);
    }

    showSuggestion(suggestion, highlight) {
        return (<span>
            {suggestion.before}
            {highlight
                ? <mark>{suggestion.hit}</mark>
                : <strong>{suggestion.hit}</strong>}
            {suggestion.after}
        </span>);
    }

    render() {
        const {
            suggestion,
            bgColor,
            active,
            onClick,
            highlight,
            itemHeight,
            display,
            filterProperty
        } = this.props;
        const ComboboxSuggestionContentStyles = {
            height: itemHeight + 'px',
            backgroundColor: active ? bgColor : '#FFFFFF'
        };
        return (
            <div
                className={`combobox-suggestion-content ${active ? 'active-item' : ''}`}
                onClick={onClick}
                style={ComboboxSuggestionContentStyles}
            >
                <span>
                    {typeof suggestion.item === 'object' || suggestion.item === '[object Object]'
                        ? 
                        display && display.fields && display.fields.length > 0 
                            ?
                            display.fields.map((item2Show, idx) => {
                                const isLastElement = idx === display.fields.length - 1;
                                if (item2Show === filterProperty) {
                                    return (
                                        <span key={idx}>
                                            {suggestion.before}
                                            {highlight
                                                ? <mark>{suggestion.hit}</mark>
                                                : <strong>{suggestion.hit}</strong>
                                            }
                                            {suggestion.after}{!isLastElement && display.seperator + ' '}
                                        </span>
                                    );
                                }
                                return <span key={idx}>{suggestion.item[item2Show]}{!isLastElement && display.seperator + ' '}</span>;
                            })
                            :
                            this.showSuggestion(suggestion, highlight)
                        :
                        this.showSuggestion(suggestion, highlight)
                    }
                </span>
            </div>
        )
    }
}

ComboboxSuggestion.propTypes = {
    active: PropTypes.bool,
    bgColor: PropTypes.string.isRequired,
    display: PropTypes.shape({
        seperator: PropTypes.string,
        fields: PropTypes.arrayOf(PropTypes.string)
    }),
    filterProperty: PropTypes.string,
    highlight: PropTypes.bool,
    itemHeight: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    suggestion: PropTypes.shape({
        before: PropTypes.string,
        hit: PropTypes.string,
        after: PropTypes.string
    })
};
