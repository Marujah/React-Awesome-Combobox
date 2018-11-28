import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Combobox from '../components/Combobox';

Enzyme.configure({ adapter: new Adapter() });

describe('Combobox Component', () => {
    test('Combobox renders', () => {
        const box = shallow(<Combobox data={[]} />);
        expect(box.exists()).toBe(true);
    });
});
