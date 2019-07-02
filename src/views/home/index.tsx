import React from 'react';
import { Helmet } from 'react-helmet';
import EditorModel from '../../models/Editor';
import { connect } from 'react-redux';
import { AppState } from 'reducers';
import Editor from '../../components/editor';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
const style = require('./style.scss');

interface HomeViewProps {
  editor: EditorModel,
  state: string,
  errorMessage?: string
}

interface HomeViewState {
}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
  constructor(props: HomeViewProps, state: HomeViewState) {
    super(props, state);
  }

  render() {
    return (
      <section>
      <Helmet>
        <title>
          Editor
        </title>
      </Helmet>

      {this.renderEditor()}
    </section>
    );
  }

  renderEditor() {
    
      return (<Editor editor={this.props.editor}/>);
  }
}
const mapStateToProps = (state: AppState, ownProps: HomeViewProps) => {
  // TODO: Use state to fill the props of the component
  return state;
};

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);