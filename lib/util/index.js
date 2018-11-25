export default class SearchUtil {
    
    static searchData(data, field, searchValue) {
        searchValue = searchValue.toLowerCase();
        return data.filter((item) => {
            let result = false;
            const propValue = this.getObjectPropertyValue(item, field);
            if (Array.isArray(propValue)) {
                result = propValue.some((someValue) => this.isSearchValueIncluded(someValue, searchValue));
            } else {
                result = this.isSearchValueIncluded(propValue, searchValue);
            }
            return result;
        }).map((item) => {
            const propValue = this.getObjectPropertyValue(item, field);
            return this.generateResultItem(item, propValue, searchValue);
        });
    }
    
    static generateResultItem(item, propValue, searchValue) {
        const before = propValue.substring(0, propValue.toUpperCase().indexOf(searchValue.toUpperCase()));
        const hit = propValue.substr(propValue.toUpperCase().indexOf(searchValue.toUpperCase()), searchValue.length);
        return {
            item,
            before,
            hit,
            after: propValue.substring((before + hit).length, propValue.length),
            selectedInput: propValue
        }
    }
    
    static getObjectPropertyValue(o, valueKey) {
        const subObjects = valueKey.split('/');
        valueKey = subObjects.pop();
        
        while (subObjects.length > 0 && !Array.isArray(o)) {
            o = o[subObjects.shift()];
        }
        
        if (Array.isArray(o)) {
            const results = [];
            const nextValueKey = subObjects.length ? `${subObjects.join('.')}.${valueKey}` : valueKey;
            o.forEach((subObject) => results.push(getObjectPropertyValue(subObject, nextValueKey)));
            return results;
        } else {
            return o[valueKey] || '';
        }
    }
    
    static isSearchValueIncluded(value, searchValue) {
        return value.toString().toLowerCase().indexOf(searchValue) !== -1;
    }
}