import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

function collectTexts(node) {
  let texts = [];
  if (node.type === 'Text') {
    texts = texts.concat(node.children.filter(c => typeof c === 'string'));
  }
  if (node.children) {
    node.children.forEach(child => {
      if (typeof child === 'object' && child !== null) {
        texts = texts.concat(collectTexts(child));
      }
    });
  }
  return texts;
}

describe('App component', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders a root View with flex container styles', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.type).toBe('View');
    expect(tree.props.style).toEqual({
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('renders three instructional text messages', () => {
    const tree = renderer.create(<App />).toJSON();
    const textValues = collectTexts(tree);
    expect(textValues).toHaveLength(3);
    expect(textValues[0]).toBe('Open up App.js to start working on your app!');
    expect(textValues[1]).toBe('Changes you make will automatically reload.');
    expect(textValues[2]).toBe('Shake your phone to open the developer menu.');
  });
});
