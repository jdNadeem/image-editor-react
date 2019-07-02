import EditorModel from '../models/Editor';
import { Action, Dispatch } from 'redux';
import EditorsService from '../services/editors';

export const ACTION_EDITORS_SAVE = 'EDITORS_SAVE';
export const ACTION_EDITORS_SAVE_SUCCESS = 'EDITORS_SAVE_SUCCESS';
export const ACTION_EDITORS_SAVE_ERROR = 'EDITORS_SAVE_ERROR';

export function isAction<A extends Action>(action: Action, type: string): action is A {
  return action.type === type;
}

export interface IActionEditorsSave extends Action {
  type: 'EDITORS_SAVE'
}

export interface IActionEditorsSaveSuccess extends Action {
  type: 'EDITORS_SAVE_SUCCESS',
  editor: EditorModel
}

export interface IActionEditorsSaveError extends Action {
  type: 'EDITORS_SAVE_ERROR',
  errorMessage: string,
  isUploading: boolean,
  isUploaded: boolean
}

export type AppActions = IActionEditorsSave | IActionEditorsSaveSuccess | IActionEditorsSaveError;

const dispatchSaveEditorsProgress = () => {
  return {
    type: ACTION_EDITORS_SAVE,
    isUploading: true,
    isUploaded: false
  };
}

const dispatchSyncEditor = (editor: any) => {
  return {
    type: ACTION_EDITORS_SAVE_SUCCESS,
    editor: editor
  };
}

const dispatchSaveEditorsSuccess = (editor: EditorModel) => {
  return {
    type: ACTION_EDITORS_SAVE_SUCCESS,
    editor: editor,
    isUploading: false,
    isUploaded: true
  };
}

const dispatchSaveEditorsError = (e: Error) => {
  return {
    type: ACTION_EDITORS_SAVE_ERROR,
    errorMessage: e.message,
    isUploading: false,
    isUploaded: false
  };
}

export function actionSaveEditors(editor) {

  return function(dispatch) {

    dispatch(dispatchSaveEditorsProgress())

    return EditorsService.saveImage(editor.croppedSrc)
      .then(json =>{
        if(json && json.ok && json.data) {
          dispatch(dispatchSaveEditorsSuccess(json.data))
        } else {
          dispatch(dispatchSaveEditorsError(json))
        }
       
      }
        
      )
  }
}
export const actionSync = async (editor) => {
  return (dispatch) => {
    return dispatch(
      {
        type: ACTION_EDITORS_SAVE_SUCCESS,
        editor
      }
    )
  }
};