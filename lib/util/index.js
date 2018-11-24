export function filterData(data, fields, searchValue) {
    const val = searchValue ? searchValue.toLowerCase() : '';
    return data.filter((item) => {
        let result = !val;
        fields.forEach((field) => {
            const value = getObjectValue(item, field);
            if (Array.isArray(value)) {
                result = result || value.some((someValue) => valueContainsSearchValue(someValue, val));
            } else {
                result = result || valueContainsSearchValue(value, val);
            }
        });
        return result;
    });
}

function getObjectValue(o, valueKey) {
    const subObjects = valueKey.split('/');
    valueKey = subObjects.pop();
    
    while (subObjects.length > 0 && !Array.isArray(o)) {
        o = o[subObjects.shift()];
    }
    
    if (Array.isArray(o)) {
        const results = [];
        const nextValueKey = subObjects.length ? `${subObjects.join('.')}.${valueKey}` : valueKey;
        o.forEach((subObject) => results.push(getObjectValue(subObject, nextValueKey)));
        return results;
    } else {
        return o[valueKey] || '';
    }
}

function valueContainsSearchValue(value, searchValue) {
    return value.toString().toLowerCase().indexOf(searchValue) !== -1;
}