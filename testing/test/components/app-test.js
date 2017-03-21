import { renderComponent, expect } from '../test-helper';
import App from '../../src/components/app';

// Use 'describe' to group together similar tests
describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  // Use 'it' to test a single attribute of a target
  it('shows a comment box', () => {
    // Use 'expect' to make an assertion about a target
    // css-class of component is used to test existence of component
    expect(component.find('.comment-box')).to.exist;
  });

  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist;
  });

});
