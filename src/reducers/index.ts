
import { editorReducer, EditorState, defaultEditorState } from './editorsList';
import { Action } from 'redux';

export interface AppState {
    list: EditorState
}

export function defaultState() {
  return {
    list: defaultEditorState()
  };
}

export function mainReducer(state: AppState = defaultState(), action: Action) {
  return {
    list: editorReducer(state.list, action)
  };
}