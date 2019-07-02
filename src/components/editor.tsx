import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import * as src from '../img/1.jpg'
import Uploader from './uploader';
import EditorModel from '../models/Editor';
import { actionSync } from '../actions/index'
interface State {
  src: any,
  croppedSrc: any,
  scaleX: any,
  scaleY: any,
  editCompleted: boolean,
  editor: EditorModel,
  isUploading: any,
  isUploaded: any
}

interface Props {
  editor: EditorModel,
  list: any,
  actionSync: (parameter: any) => any
}
class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    console.log(props)
    super(props);
    this.state = {
      src,
      croppedSrc: null,
      scaleX: 1,
      scaleY: 1,
      editCompleted: false,
      editor: this.props.list.editor,
      isUploaded: this.props.list.isUploaded,
      isUploading: this.props.list.isUploading
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.back = this.back.bind(this);
  }
  cropper: any;
  fileInput: any;
  componentWillMount() {
    if (!this.cropper && typeof this.cropper != 'undefined') {
      this.setState({
        editor: this.props.list.editor,
        src: this.props.list.editor.src,

      })
      this.cropper.setData(this.state.editor.canvasData);
    }
  }
  componentWillReceiveProps(newProps: Props) {
    this.setState({isUploaded: this.props.list.isUploaded, isUploading:this.props.list.isUploading});
  }
  back(){
    this.setState({editCompleted: false});
  }
  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result, scaleX: 1, scaleY: 1 });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (!this.cropper || typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      croppedSrc: this.cropper.getCroppedCanvas().toDataURL(),
      editCompleted: true
    });
  }
  saveData() {
    let editor = this.state.editor;
    editor.canvasData = this.cropper.getData();
    editor.src = this.state.src
    this.setState({ editor: editor });
    //this.props.dispatch(actionSync(this.state.editor));
    this.props.actionSync(this.state.editor)
  }

  useDefaultImage() {
    this.setState({ src });
  }
  reset() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.reset()
    this.saveData()
  }
  zoomIn() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.zoom(0.1)
    this.saveData()
  }
  zoomOut() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.zoom(-0.1)
    this.saveData()
  }
  setDrag(e, type) {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    if (type == 'crop') {
      this.cropper.clear();
    }
    this.cropper.setDragMode(type)
    this.saveData()
  }

  rotate(e, angel) {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.rotate(angel)
    this.saveData()
  }
  scaleX() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    if (this.state.scaleX == 1) {
      this.setState({ scaleX: -1 })
    } else {
      this.setState({ scaleX: 1 })
    }
    this.cropper.scaleX(this.state.scaleX)
    this.saveData()
  }
  scaleY() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    if (this.state.scaleY == 1) {
      this.setState({ scaleY: -1 })
    } else {
      this.setState({ scaleY: 1 })
    }
    this.cropper.scaleY(this.state.scaleY)
    this.saveData()
  }
  render() {
    return (

      <div>
        {!this.state.editCompleted ?
          (<div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="img-container mt-3">
                  <Cropper
                    style={{ width: '825px', height: '497px', margin: 'auto' }}
                    aspectRatio={16 / 9}
                    //preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ref={cropper => { this.cropper = cropper; }}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 text-center" id="actions">
              <div className="col-md-12 docs-buttons">
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" title="Image Drag" onClick={(e) => this.setDrag(e, 'move')}>
                    <span className="fa fa-hand-paper-o"></span>
                  </button>
                  <button type="button" className="btn btn-primary" title="Crop Selection" onClick={(e) => this.setDrag(e, 'crop')}>
                    <span className="fa fa-arrows-alt"></span>
                  </button>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn-primary" title="Zoom In" onClick={this.zoomIn}>
                    <span className="fa fa-search-plus"></span>
                  </button>
                  <button type="button" className="btn btn-primary" title="Zoom Out" onClick={this.zoomOut}>
                    <span className="fa fa-search-minus"></span>
                  </button>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" title="Rotate Left" onClick={(e) => this.rotate(e, -45)}>
                    <span className="fa fa-undo"></span>
                  </button>
                  <button type="button" className="btn btn-primary" title="Rotate Right" onClick={(e) => this.rotate(e, 45)}>
                    <span className="fa fa-repeat"></span>
                  </button>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn-primary" title="Flip Horizontal" onClick={() => this.scaleX()}>
                    <span className="fa fa-arrows-h"></span>
                  </button>
                  <button type="button" className="btn btn-primary" title="Flip Vertical" onClick={() => this.scaleY()}>
                    <span className="fa fa-arrows-v"></span>
                  </button>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" title="Reset" onClick={() => this.reset()}>
                    <span className="fa fa-refresh"></span>
                  </button>
                  <input type="file" onChange={this.onChange} accept="image/*" className="hidden" style={{ display: 'none' }}
                    ref={fileInput => this.fileInput = fileInput} />
                  <button className="btn btn-primary btn-upload" title="Upload image file" onClick={() => this.fileInput.click()}>
                    <span className="fa fa-upload"></span>
                  </button>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" title="Reset" onClick={this.cropImage}>
                    Finsih
                </button>
                </div>
              </div>
            </div>
            <br style={{ clear: 'both' }} />
          </div>
          ) :
          <Uploader image={this.state.croppedSrc} src={this.state.src} isUploading={this.state.isUploading} isUploaded={this.state.isUploaded} back={this.back}/>
        }
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    editor: props.editor,
    list: state.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actionSync
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);