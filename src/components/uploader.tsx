import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSaveEditors} from '../actions/index'
import EditorModel from '../models/Editor';

interface State {
}

interface Props {
    image: any,
    src: any,
    isUploaded: any,
    isUploading: any,
    back: () => any
    actionSaveEditors: (data: any) => any
}
 class Uploader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  uploadImage(){
      let editor: EditorModel = {
        croppedSrc: this.props.image,
        src: this.props.src,
        canvasData: {}
      };
      this.props.actionSaveEditors(editor);
      
  }
  componentWillReceiveProps(newProps) {
      if(newProps.isUploaded && !newProps.isUploading) {
          alert('image Uploaded successfully');
      }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="img-container mt-3 text-center">
                <img src={this.props.image} />
              </div>
            </div>
          </div>
          <div className="row mt-2 text-center" id="actions">
            <div className="col-md-12 docs-buttons">
              <div className="btn-group">
              <button type="button" className="btn btn-primary" title="Back " onClick={this.props.back}>
                  <span className="fa fa-arrow-left"></span>
                </button>
                <button type="button" className="btn btn-primary" title="Upload to server" onClick={() => this.uploadImage()}>
                  <span className="fa fa-upload"></span>
                </button>
                <a type="button" className="btn btn-primary" title="Download " download="image.png" href={this.props.image}>
                  <span className="fa fa-download"></span>
                </a>
              </div>
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    ...state,
  });
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        actionSaveEditors
    }, dispatch);
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Uploader);