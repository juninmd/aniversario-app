import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('renders three text messages', () => {
    const instance = renderer.create(<App />).root;
    const textElements = instance.findAllByType(Text);
    expect(textElements).toHaveLength(3);
  });

  it('renders the welcome message', () => {
    const instance = renderer.create(<App />).root;
    const textElements = instance.findAllByType(Text);
    expect(textElements[0].props.children).toContain('App.tsx');
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
