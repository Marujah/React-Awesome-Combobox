# [React-Combobox](https://npmjs.org/react-combobox) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/react-awesome-combobox.svg?style=flat)](https://www.npmjs.com/package/react-awesome-combobox) [![Build Status](https://travis-ci.com/Marujah/React-Combobox.svg?branch=master)](https://travis-ci.com/Marujah/React-Combobox)

React-Combobox is a React library for building autocomplete searchbox in an easy way.

## Installation

``` bash
npm install --save-dev react-awesome-combobox
```

## Usage
``` jsx
    import { Combobox } from 'react-awesome-combobox';
    const data=[
      {name: 'mike morales', age: 40, autos: {name: 'VW', EZ: '2015'}},
      {name: 'Tania Bruce', age: 30, autos: {name: 'Audi', EZ: '2018'}},
      {name: 'Adam Mhiri', age: 5, autos: {name: 'Mercedes', EZ: '2018'}},
      {name: 'Hanna Miriam', age: 30, autos: {name: 'VW', EZ: '2018'}},
      {name: 'Jasmin Gallas', age: 12, autos: {name: 'Skoda', EZ: '2018'}},
      {name: 'Sofia Mhiri', age: 10, autos: {name: 'Seat', EZ: '2018'}},
      {name: 'Sarah Moos', age: 20, autos: {name: 'Skoda', EZ: '2018'}},
    ];
    return (
        <Combobox
            placeholder='Placeholder'
            bgColor='cadetBlue'
            data={data}
            filterProperty='autos/name'
            display={{
            seperator: ',',
            fields: ['name', 'age', 'autos/name']
            }}
            highlight
            itemHeight={40}
            visibleItems={4}
            onSelectItem={(sugg) => console.log(sugg)}
        />
    );
```