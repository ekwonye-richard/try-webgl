import React, { Component } from 'react';
import MainLoader from '../../components/MainLoader';
import Landing from '../Landing';
import BookFlight from '../BookFlight';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      progress: 'loading'
    };

    this.gotoBooking = this.gotoBooking.bind(this);
    this.gotoLanding = this.gotoLanding.bind(this);
  }

  gotoLanding() {
    this.setState({ progress: 'landing' });
  }

  gotoBooking() {
    this.setState({ exitLanding: true });

    this.tt = setTimeout(() => {
      this.setState({
        progress: 'bookFlight',
        exitLanding: false
      });
    }, 700);
  }

  componentDidMount() {
    this.landingTimeout = setTimeout(() => {
      this.setState({ progress: 'landing' });
    }, 2800);
  }

  componentWillUnmount() {
    clearTimeout(this.landingTimeout);
    clearTimeout(this.exitLandingTimeout);
  }

  render() {
    const { progress } = this.state;

    return (
      <React.Fragment>
        <div className="main-container">
          {progress === 'loading' && <MainLoader />}

          {(progress === 'loading' || progress === 'landing') && (
            <Landing
              gotoNext={this.gotoBooking}
              isLoading={progress === 'loading'}
              beginExit={this.state.exitLanding}
            />
          )}

          {progress === 'bookFlight' && (
            <BookFlight gotoLanding={this.gotoLanding} />
          )}
        </div>
        <div className="sm-scr mega-text">
          OOPS! <br /> <br />
          THIS EXPERIMENT IS NOT <br />
          OPTIMIZED FOR SMALL SCREENS.
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
