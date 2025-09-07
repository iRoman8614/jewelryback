import React from 'react';
import { Input, Label, FormGroup } from '@adminjs/design-system';

const SimpleTest = (props) => {
    const { property } = props;

    return (
        <FormGroup>
            <Label htmlFor={property?.path || 'test'}>-- CUSTOM COMPONENT WAS LOADED --</Label>
        </FormGroup>
    );
};

export default SimpleTest;