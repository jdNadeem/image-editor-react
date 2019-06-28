import * as React from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import * as src from '../img/1.jpg'
interface State {
  src: any,
  cropResult: any,
}

interface Props {
}
export default class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }
  cropper: any;
  fileInput: any;
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
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }
  zoomIn() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.zoom(0.1)
  }
  zoomOut() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.zoom(-0.1)
  }
  setDrag(e, type) {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    if (type == 'crop') {
      this.cropper.clear();
    }
    this.cropper.setDragMode(type)
  }

  rotate(e, angel) {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.rotate(angel)
  }
  scaleX() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.scaleX(-1)
  }
  scaleY() {
    if (!this.cropper || typeof this.cropper === 'undefined') {
      return;
    }
    this.cropper.scaleY(-1)
  }
  render() {
    return (
      <div>
        <div className="container">
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
          <div className="row mt-2" id="actions">
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
                <button type="button" className="btn btn-primary" data-method="reset" title="Reset">
                  <span className="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.reset()">
                    <span className="fa fa-refresh"></span>
                  </span>
                </button>
                <input type="file" onChange={this.onChange} accept="image/*" className="hidden" style={{ display: 'none' }}
                  ref={fileInput => this.fileInput = fileInput} />
                <button className="btn btn-primary btn-upload" title="Upload image file" onClick={() => this.fileInput.click()}>

                  <span className="docs-tooltip" data-toggle="tooltip" title="" data-original-title="Upload Image">
                    <span className="fa fa-upload"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <button onClick={this.useDefaultImage}>Use default img</button>
            <br />
            <br />

          </div>
          <div>
            <div className="box" style={{ width: '50%', float: 'right' }}>
              <h1>Preview</h1>
              <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
            </div>
            <div className="box" style={{ width: '50%', float: 'right' }}>
              <h1>
                <span>Crop</span>
                <button onClick={this.cropImage} style={{ float: 'right' }}>
                  Crop Image
              </button>
              </h1>
              <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}