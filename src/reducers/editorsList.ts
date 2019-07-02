import {
  AppActions
} from '../actions';

import EditorModel from '../models/Editor';

export interface EditorState {
  state: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  editor: any,
  errorMessage?: string,
  isUploading?: boolean,
  isUploaded?: boolean
}

export function defaultEditorState() {
  return {
    state: 'INIT',
    editor: {},
    isUploading: false,
    isUploaded: false
  };
}

export function editorReducer(state: EditorState, action: AppActions): EditorState {
  // TODO: Write reducers here.
  return state;
}
