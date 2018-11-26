import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { InputField } from '../lib/elements/InputField';

Enzyme.configure({ adapter: new Adapter() });

describe('InuptField Component', () => {
    test('search text is shown', () => {
        const wrapper = mount(
            <InputField
                onChange={() => null}
                value='Marouen'
            />);
        expect(wrapper.find('input').props().value).toEqual('Marouen');
    });
});
