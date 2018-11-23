import React, { RefObject } from 'react';
import styled from 'styled-components';
import { ComboboxSuggestion } from './ComboboxSuggestion';

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
`;

const AutoCompleteSuggestionsContainer = styled.div`
    position: absolute;
    border: 1px solid #d4d4d4;
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

const InputField = styled.input`
    height: ${props => props.itemHeight}px;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
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
        const {color, data, itemHeight, visibleItems, highlight, placeholder} = this.props;
        const {suggestions, inputValue} = this.state;
        return (
            <AutoCompleteContainer color={color}>
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
                            autoComplete='off' // I Love this ^^
                        />
                        <AutoCompleteSuggestionsContainer ref={this.suggestions} itemHeight={itemHeight} visibleItems={visibleItems}>
                            {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                                <ComboboxSuggestion
                                    color={color}
                                    active={this.state.currentFocus === index}
                                    key={index}
                                    suggestion={suggestion}
                                    highlight={highlight}
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
        const results = [];
        this.closeSuggestionsList();
        this.props.data.map((item) => {
            if (item.hasOwnProperty(this.props.filterProperty)) {
                const filterProperty = String(item[this.props.filterProperty]);
                if (filterProperty) {
                    if (filterProperty.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                        const before = filterProperty.substring(0, filterProperty.toUpperCase().indexOf(val.toUpperCase()));
                        const hit = filterProperty.substr(filterProperty.toUpperCase().indexOf(val.toUpperCase()), val.length);
                        results.push({
                            item,
                            before,
                            hit,
                            after: filterProperty.substring((before + hit).length, filterProperty.length),
                            selectedInput: filterProperty
                        });
                    }
                }
            } else {
                item = String(item);
                if (item.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                    const before = item.substring(0, item.toUpperCase().indexOf(val.toUpperCase()));
                    const hit = item.substr(item.toUpperCase().indexOf(val.toUpperCase()), val.length);
                    results.push({
                        item,
                        before,
                        hit,
                        after: item.substring((before + hit).length, item.length),
                        selectedInput: item
                    });
                }
            }
        });
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
