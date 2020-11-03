'use strict';

let React;
let ReactDOM;

describe('ReactUnderstanding', () => {
  beforeEach(() => {
    React = require('react');
    ReactDOM = require('react-dom');
  });

  it('works', () => {
    let instance;

    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          text: 'hello'
        }
      }

      handleClick = () => {
        this.props.logger('before-setState', this.state.text);
        this.setState({ text: 'hi' })
        this.props.logger('after-setState', this.state.text);
      }

      render() {
        instance = this;
        this.props.logger('render', this.state.text);
        if (this.state.text === 'hello') {
          return (
            <div>
              <div>
                <button onClick={this.handleClick.bind(this)}>
                  {this.state.text}
                </button>
              </div>
            </div>
          )
        } else {
          return (
            <div>
              hello
            </div>
          )
        }
      }
    }
    const container = document.createElement('div');
    const logger = jest.fn();
    ReactDOM.render(<App logger={logger} />, container);
    console.log('clicking');
    instance.handleClick();
    console.log('clicked');

    expect(container.innerHTML).toBe(
      '<div>hello</div>'
    )

    expect(logger.mock.calls).toEqual(
      [['render', 'hello'],
      ['before-setState', 'hello'],
      ['render', 'hi'],
      ['after-setState', 'hi']]
    );
  })

});
