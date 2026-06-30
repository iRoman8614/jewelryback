import React, { useState } from 'react';
import { Input, Label, FormGroup } from '@adminjs/design-system';

const PasswordInput = (props) => {
    const { property, onChange } = props;
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(property.name, newValue);
    };

    return (
        <FormGroup>
            <Label htmlFor={property.path}>{property.label || property.path}</Label>
            <Input
                type="password"
                id={property.path}
                name={property.path}
                value={value}
                onChange={handleChange}
                required={property.isRequired}
                autoComplete="new-password"
            />
        </FormGroup>
    );
};

export default PasswordInput;