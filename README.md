# [React-Combobox](https://npmjs.org/react-combobox) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/react-awesome-combobox.svg?style=flat)](https://www.npmjs.com/package/react-awesome-combobox) [![Build Status](https://travis-ci.com/Marujah/React-Combobox.svg?branch=master)](https://travis-ci.com/Marujah/React-Combobox)

React-Combobox is a React library for building autocomplete searchbox in an easy way.

## Installation

``` bash
npm install --save react-awesome-combobox
```

## Preview
## Preview
![racbox](https://s3-us-west-2.amazonaws.com/s.cdpn.io/1014830/react-awesome-combobox-2.png)

![racbox](https://s3-us-west-2.amazonaws.com/s.cdpn.io/1014830/react-awesome-combobox-1.png)

## Usage
``` jsx
import { Combobox } from 'react-awesome-combobox';
const data=[
    {name: 'Marouen Mhiri', age: 40, car: {carMake: 'VW', year: '2018'}},
    {name: 'Tanja Bernhardt', age: 35, car: {carMake: 'Audi', year: '2017'}},
    {name: 'Adam Mhiri', age: 5, car: {carMake: 'Mercedes', year: '2018'}},
    {name: 'Hanna Miriam Mhiri', age: 3, car: {carMake: 'VW', year: '2016'}},
    {name: 'Jasmin Gallas', age: 12, car: {carMake: 'Skoda', year: '2018'}},
    {name: 'Sofia M`hiri', age: 10, car: {carMake: 'Seat', year: '2015'}},
    {name: 'Sofiene Attia', age: 20, car: {carMake: 'Skoda', year: '2018'}},
];
return (
    <Combobox
        placeholder='Placeholder'
        bgColor='cadetBlue'
        data={data}
        filterProperty='car/carMake'
        display={{
            seperator: ',',
            fields: ['name', 'age', 'car/carMake', 'car/year']
        }}
        highlight
        itemHeight={40}
        visibleItems={4}
        onSelectItem={(sugg) => console.log(sugg)}
    />
);
```

or (with a simple array of strings)

``` jsx
import { Combobox } from 'react-awesome-combobox';
const names = ['John', 'Marouen', 'Tanja', 'Hanna', 'Sofia', 'Adam', 'Rafif'];
return (
    <Combobox
        placeholder='Search for name...'
        bgColor='green'
        data={names}
        itemHeight={50}
        visibleItems={3}
        onSelectItem={(sugg) => console.log(sugg)}/>
    </div>
);
```


## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| [`data`](#suggestions-prop) | Array | ✓ | These are the suggestions that will be displayed. Items can take an arbitrary shape. |
| [`plaeholder`](#on-suggestions-fetch-requested-prop) | String | | will display the placeholder of the input field. |
| [`bgColor`](#on-suggestions-clear-requested-prop) | String | | When set it will style the background color of the suggestions when moved using keyboard arrows. Default is "`#6B9FCE`". |
| [`filterProperty`](#get-suggestion-value-prop) | String | ✓[*](#on-suggestions-clear-requested-prop-note) | When Implement it to teach Autosuggest what should be the input value when suggestion is clicked. |
| [`display`](#render-suggestion-prop) | Object | | Gives the possibility to customize the suggestions. If your data is an array of objects and you filter for a specific property but want to display others. With this property it is possible (See `Example here`) |
| [`highlight`](#input-props-prop) | Boolean | | highlights the occurences in the suggestions using the mark tag. |
| [`itemHeight`](#on-suggestion-selected-prop) | Number | | specifies the items height of the suggestions dropdown. |
| [`visibleItems`](#on-suggestion-highlighted-prop) | Number | | sets the limit of the suggestions to see and make the dropdown scrollable. |
| [`onSelectItem`](#should-render-suggestions-prop) | Function | | A Callback function that will be triggered after selecting a suggestion. This function has as parameter the selected object.
