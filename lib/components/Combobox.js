/* eslint-disable react/jsx-handler-names */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchUtil from '../util';
import { InputField, ComboboxSuggestion } from '../elements';

const KeyboardKeys = {
    KEY_UP: 38,
    KEY_DOWN: 40,
    KEY_ESCAPE: 27,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ENTER: 14
};

const AutoCompleteContainer = styled.div`
    position: relative;
    width: 100%;
    *, *:before, *:after {
        box-sizing: border-box;
    }
`;

const AutoCompleteSuggestionsContainer = styled.div`
    position: absolute;
    border: 1px solid #D4D4D4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;
    max-height: calc(${props => props.visibleItems} * ${props => props.itemHeight} * 1px);
    overflow: hidden;
    overflow-y: auto;
`;

export default class Combobox extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentFocus: -1,
            suggestions: [],
            inputValue: ''
        };
        this.suggestions = React.createRef();
        this.onInputHandler = this.onInputHandler.bind(this);
        this.setCurrentSuggestion = this.setCurrentSuggestion.bind(this);
        this.closeSuggestionsList = this.closeSuggestionsList.bind(this);
        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            this.closeSuggestionsList();
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', () => {
            this.closeSuggestionsList();
        });
    }

    onInputHandler(event) {
        const val = event.target.value;
        const { data, filterProperty } = this.props;
        this.closeSuggestionsList();
        let results = [];
        if (typeof data[0] !== 'object'
            && Array.isArray(data)
        ) {
            // eslint-disable-next-line array-callback-return
            data.map((item) => {
                item = String(item);
                if (item.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                    results.push(SearchUtil.generateResultItem(item, item, val));
                }
            });
        } else {
            results = SearchUtil.searchData(data, filterProperty, val);
        }
        this.setState({
            inputValue: val,
            suggestions: val ? results : []
        });
    }

    setCurrentSuggestion(selectedSuggestion) {
        const { display, filterProperty } = this.props;
        let inputValueFromSuggestion = (
            typeof selectedSuggestion.item === 'object' || selectedSuggestion.item === '[object Object]'
                ?
                display && display.fields && display.fields.length > 0 
                    ?
                    (display.fields.map((item2Show, idx) => {
                        if (item2Show === filterProperty) {
                            return selectedSuggestion.selectedInput;
                        }
                        return selectedSuggestion.item[item2Show] ;
                    }))
                    :
                    [selectedSuggestion.selectedInput]
                :
                [selectedSuggestion.selectedInput]
        );
        inputValueFromSuggestion  = inputValueFromSuggestion.join(display.seperator + ' ');
        this.setState({
            inputValue: inputValueFromSuggestion
        }, () => {
            this.closeSuggestionsList();
            this.props.onSelectItem(selectedSuggestion.item);
        });
    }

    closeSuggestionsList() {
        this.setState({
            suggestions: [],
            currentFocus: -1
        });
    }

    onKeyDownHandler(e) {
        const { itemHeight, visibleItems } = this.props;
        switch (e.keyCode) {
            case KeyboardKeys.KEY_ESCAPE:
            case KeyboardKeys.KEY_TAB:
                e.target.setSelectionRange(e.target.value.length, e.target.value.length); // set cursor to the end of the input text
                this.closeSuggestionsList();
                break;
            case KeyboardKeys.KEY_DOWN:
                this.setState((prevState) => ({
                    currentFocus: prevState.currentFocus >= prevState.suggestions.length - 1 ? 0 : prevState.currentFocus + 1
                }), () => {
                    if ((this.state.currentFocus + 1) * itemHeight > ((visibleItems * itemHeight) + this.suggestions.current.scrollTop)) {
                        this.suggestions.current.scrollTop += itemHeight;
                    }
                    if (this.state.currentFocus * itemHeight < this.suggestions.current.scrollTop) {
                        this.suggestions.current.scrollTop = 0;
                    }
                });
                break;
            case KeyboardKeys.KEY_UP:
                this.setState((prevState) => ({
                    currentFocus: prevState.currentFocus <= 0 ? prevState.suggestions.length - 1 : prevState.currentFocus - 1
                }), () => {
                    if (this.state.currentFocus * itemHeight < this.suggestions.current.scrollTop) {
                        this.suggestions.current.scrollTop -= itemHeight;
                    }
                    if ((this.state.currentFocus + 1) * itemHeight > ((visibleItems * itemHeight) + this.suggestions.current.scrollTop)) {
                        this.suggestions.current.scrollTop = this.suggestions.current.querySelectorAll('div').length * itemHeight;
                    }
                });
                break;
            case KeyboardKeys.KEY_ENTER:
            case KeyboardKeys.KEY_RETURN:
                e.preventDefault();
                if (this.state.currentFocus > -1) {
                    this.setCurrentSuggestion(this.state.suggestions[this.state.currentFocus], e);
                }
                break;
            default: //
        }
    }

    render() {
        const {
            bgColor,
            data,
            itemHeight,
            visibleItems,
            highlight,
            placeholder,
            display,
            filterProperty
        } = this.props;
        const { suggestions, inputValue } = this.state;
        return (
            <AutoCompleteContainer>
                {data && data.length > 0 &&
                    <React.Fragment>
                        <InputField
                            autoComplete='off'
                            itemHeight={itemHeight}
                            name='lastname'
                            onChange={this.onInputHandler}
                            onKeyDown={this.onKeyDownHandler}
                            placeholder={placeholder}
                            type='text'
                            value={inputValue}
                        />
                        <AutoCompleteSuggestionsContainer
                            itemHeight={itemHeight}
                            ref={this.suggestions}
                            visibleItems={visibleItems}
                        >
                            {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                                <ComboboxSuggestion
                                    active={this.state.currentFocus === index}
                                    bgColor={bgColor}
                                    display={display}
                                    filterProperty={filterProperty}
                                    highlight={highlight}
                                    itemHeight={itemHeight}
                                    key={index}
                                    onClick={(e) => this.setCurrentSuggestion(suggestion)}
                                    suggestion={suggestion}
                                />
                            ))}
                        </AutoCompleteSuggestionsContainer>
                    </React.Fragment>
                }
            </AutoCompleteContainer>
        );
    }
}
Combobox.defaultProps = {
    bgColor: "#6B9FCE",
    placeholder: "Search...",
    itemHeight: 40,
    visibleItems: 5,
    highlight: false,
    display: {
        seperator: ',',
        fields: []
    },
    onSelectItem: () => null
};

Combobox.propTypes = {
    bgColor: PropTypes.string,
    data: PropTypes.array.isRequired,
    display: PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.string).isRequired,
        seperator: PropTypes.string
    }),
    filterProperty: function(props, propName, componentName) {
        if (['object', '[object Object]'].includes(typeof props.data[0]) && typeof props[propName] !== 'string') {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                Missing Property "filterProperty" type string.`
            );
        }
    },
    highlight: PropTypes.bool,
    itemHeight: PropTypes.number,
    onSelectItem: PropTypes.func,
    placeholder: PropTypes.string,
    visibleItems: PropTypes.number,
};
