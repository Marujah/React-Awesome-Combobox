# [React-Combobox](https://npmjs.org/react-awesome-combobox) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/react-awesome-combobox.svg?style=flat)](https://www.npmjs.com/package/react-awesome-combobox) [![Build Status](https://travis-ci.com/Marujah/React-Combobox.svg?branch=master)](https://travis-ci.com/Marujah/React-Combobox)

React-Combobox is a React library for building autocomplete searchbox in an easy and fully customizable way.

## Installation

``` bash
npm install --save react-awesome-combobox
```

## Preview

<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1014830/react-awesome-combobox-2.png" width="300px" alt="racombobox">
<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1014830/react-awesome-combobox-1.png" width="300px" alt="racombobox">

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
| [`data`](#combobox-prop-data) | Array | ✓ | These are the suggestions that will be displayed. Items can take an arbitrary shape. |
| [`plaeholder`](#combobox-prop-placeholder) | String | | will display the placeholder of the input field. |
| [`bgColor`](#combobox-prop-bgcolor) | String | | When set it will style the background color of the suggestions when moved using keyboard arrows. Default is "`#6B9FCE`". |
| [`filterProperty`](#combobox-prop-filterProperty) | String | ✓[*](#combobox-prop-filterProperty) | When Implement it to teach Autosuggest what should be the input value when suggestion is clicked. |
| [`display`](#combobox-prop-display) | Object | | Gives the possibility to customize the suggestions. If your data is an array of objects and you filter for a specific property but want to display others. With this property it is possible (See [`Example here`](#combobox-prop-display)) |
| [`highlight`](#combobox-prop-highlight) | Boolean | | highlights the occurences in the suggestions using the mark tag. |
| [`itemHeight`](#combobox-prop-itemHeight) | Number | | specifies the items height of the suggestions dropdown. |
| [`visibleItems`](#combobox-prop-visibleItems) | Number | | sets the limit of the suggestions to see and make the dropdown scrollable. |
| [`onSelectItem`](#combobox-prop-onSelectItem) | Function | | A Callback function that will be triggered after selecting a suggestion. This function has as parameter the selected object.

**<a name="combobox-prop-data">data</a>**<br/>
[REQUIRED] the list of the suggestions to filter. This can be a simple array of i.e. strings, numbers, booleans... or an array of objects.
This property is REQUIRED.

**<a name="combobox-prop-placeholder">placeholder</a>**<br>
[OPTIONAL] the placeholder to show in the input field.

**<a name="combobox-prop-bgcolor">bgColor</a>**<br>
[OPTIONAL] the Background color of the suggestions when visited with keyboard up/down-arrows.

**<a name="combobox-prop-filterProperty">filterProperty</a>**<br>
[OPTIONAL] the Property to search for in the list of the suggestions. This property works with the property `data` when it's an array of objects.<br/>
filterProperty can contain '/'-sign to specify the property levels to search for.

**<a name="combobox-prop-display">display</a>**<br>
[OPTIONAL] Object specifying which property of the searched object should appear in the search result and how they should be seperated.<br/>
display property when used should have this shape:
```jsx
display = {{
    // or any other sign '|', ':', ' '...
    seperator: ',', 
    // Array of existing object properties
    fields: ['name', 'car/year'] 
}}
```

**<a name="combobox-prop-highlight">highlight</a>**<br>
[OPTIONAL] when true the found search string will be highlighted using the `<mark />`-html Tag

**<a name="combobox-prop-itemHeight">itemHeight</a>**<br>
[OPTIONAL] a number specifies the height of the suggestions boxes (this number will be used as pixel height) - default = 40

**<a name="combobox-prop-visibleItems">visibleItems</a>**<br>
[OPTIONAL] a maximum number of suggestions to see. The rest will be reached when scrolled or by tapping UP/Down Keys. Default = 4

**<a name="combobox-prop-onSelectItem">onSelectItem</a>**<br>
[OPTIONAL] a callback function which will be called after a selection of a suggestion took place. this function recieves a suggestion item as parameter. I.e. use onSelectItem={(sugg) => console.log(sugg)} to see the result.

### License

React-awesome-combobox is [MIT licensed](./LICENSE).

