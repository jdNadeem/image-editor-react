import EditorModel from '../models/Editor';
import apisauce from 'apisauce'
const ENABLE_RANDOM_ERRORS = false;

export default class EditorsService {
  static saveImage(editor): Promise<any> {
      return new Promise((resolve, reject) => {
        const api = apisauce.create({
          baseURL: '/api',
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'multipart/form-data'
          },

          timeout: 10000
        });
        const formData = new FormData()
        formData.append('type', 'file')
        formData.append('image', editor)
        // const data = {uri: editor, name: 'image.jpg', type: 'multipart/form-data'}
        // formData.append('file', data)
        api.post('/add_item', formData).then((res) => {
          resolve(res);
        }).catch((e) => {
          reject(e)
        })
      });
  }
}