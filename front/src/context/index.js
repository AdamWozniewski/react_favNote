import React from 'react';
import { typesOfItems } from '../static/types';

const { notes } = typesOfItems;

const pageContext = React.createContext(notes);

export default pageContext;
