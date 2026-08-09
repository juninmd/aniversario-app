import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders a View container', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.type).toBe('View');
  });

  it('renders the welcome message text', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(JSON.stringify(tree)).toContain(
      'Open up App.js to start working on your app!',
    );
  });

  it('renders the reload message', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(JSON.stringify(tree)).toContain(
      'Changes you make will automatically reload.',
    );
  });

  it('renders the shake message', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(JSON.stringify(tree)).toContain(
      'Shake your phone to open the developer menu.',
    );
  });

  it('has a container style with flex: 1', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.props.style).toEqual(expect.objectContaining({ flex: 1 }));
  });

  it('renders three Text children in the View', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('matches the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
