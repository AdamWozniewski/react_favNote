import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import ButtonIcon from 'ButtonIcon';
import bulb from 'assets/icons/bulb.svg';
import logout from 'assets/icons/logout.svg';
import pen from 'assets/icons/pen.svg';
import plus from 'assets/icons/plus.svg';
import twitter from 'assets/icons/twitter.svg';

const YellowBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: ${({ theme }) => theme.notes};
`;
storiesOf('ButtonIcon', module)
    .addDecorator(story =>
        <YellowBackground>
            {story()}
        </YellowBackground>
    )
    .add('Bulb', () => <ButtonIcon active icon={bulb}/>)
    .add('Logout', () => <ButtonIcon icon={logout}/>)
    .add('Pen', () => <ButtonIcon icon={pen}/>)
    .add('Plus', () => <ButtonIcon icon={plus}/>)
    .add('Twitter', () => <ButtonIcon icon={twitter}/>);
