import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router'
import SideBar from './Sidebar';

storiesOf('SideBar', module)
    .addDecorator(StoryRouter())
    .add('Primary', () => <SideBar />);

