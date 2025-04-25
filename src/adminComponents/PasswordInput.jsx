import React from 'react';
import { Input, Label, FormGroup } from '@adminjs/design-system';

const PasswordInput = (props) => {
    const { property, record, onChange } = props;
    const value = '';

    const handleChange = (event) => {
        onChange(property.name, event.target.value);
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
            />
        </FormGroup>
    );
};

export default PasswordInput;