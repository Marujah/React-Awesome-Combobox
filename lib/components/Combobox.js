import React, { RefObject } from 'react';
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
        const {suggestions, inputValue} = this.state;
        return (
            <AutoCompleteContainer>
                {data && data.length > 0 &&
                    <React.Fragment>
                        <InputField
                            itemHeight={itemHeight}
                            type='text'
                            name='lastname'
                            value={inputValue}
                            onChange={this.onInputHandler}
                            onKeyDown={this.onKeyDownHandler}
                            placeholder={placeholder}
                            autoComplete='off'
                        />
                        <AutoCompleteSuggestionsContainer
                            ref={this.suggestions}
                            itemHeight={itemHeight}
                            visibleItems={visibleItems}
                        >
                            {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                                <ComboboxSuggestion
                                    bgColor={bgColor}
                                    itemHeight={itemHeight}
                                    active={this.state.currentFocus === index}
                                    key={index}
                                    suggestion={suggestion}
                                    highlight={highlight}
                                    display={display}
                                    filterProperty={filterProperty}
                                    onClick={() => this.setCurrentSuggestion(suggestion)}
                                />
                            ))}
                        </AutoCompleteSuggestionsContainer>
                    </React.Fragment>
                }
            </AutoCompleteContainer>
        );
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
        const {data, filterProperty} = this.props;
        this.closeSuggestionsList();
        let results = [];
        if (typeof data[0] !== '[object Object]'
            && typeof data[0] !== 'object'
            && Array.isArray(data)
        ) {
            data.map((item) => {
                item = String(item);
                if (item.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                    results.push(SearchUtil.generateResultItem(item, item, val));
                }
            });
        } else {
            results = SearchUtil.filterData(data, filterProperty, val);
        }
        this.setState({
            inputValue: val,
            suggestions: val ? results : []
        });
    }

    setCurrentSuggestion(selectedSuggestion) {
        this.setState({
            inputValue: selectedSuggestion.selectedInput
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
        const {itemHeight, visibleItems} = this.props;
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
                    this.setCurrentSuggestion(this.state.suggestions[this.state.currentFocus]);
                }
                break;
            default: //
        }
    }
}
Combobox.defaultProps = {
    bgColor: "#6B9fFCE",
    placeholder: "Search...",
    itemHeight: '40',
    visibleItems: 5
};

Combobox.propTypes = {
    placeholder: PropTypes.string,
    bgColor: PropTypes.string,
    data: PropTypes.array.isRequired,
    filterProperty: PropTypes.string,
    display: PropTypes.shape({
        seperator: PropTypes.string,
        fields: PropTypes.arrayOf(PropTypes.string)
    }),
    itemHeight: PropTypes.number,
    visibleItems: PropTypes.number,
    onSelectItem: PropTypes.func
}