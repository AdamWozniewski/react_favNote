import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('Input', module)
    .add('Normal', () => <Input placeholder="Login" />)
    .add('Secondary', () => <Input search placeholder="Search" />);

