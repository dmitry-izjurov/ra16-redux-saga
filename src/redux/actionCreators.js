import { 
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
  CHANGE_SEARCH_FIELD,
  DOWNLOAD_SERVICES_REQUEST,
  DOWNLOAD_SERVICES_SUCCESS,
  DOWNLOAD_SERVICES_FAILURE,
  DOWNLOAD_SERVICES_INIT_STATE } from './action';

export function searchSkillsRequest(value) {
  return {type: SEARCH_SKILLS_REQUEST, payload: {search: value}};
}

export function searchSkillsSuccess(value) {
  return {type: SEARCH_SKILLS_SUCCESS, payload: {items: value}};
}

export function searchSkillsFailure(value) {
  return {type: SEARCH_SKILLS_FAILURE, payload: {value}};
}

export function changeSearchField(value) {
  return {type: CHANGE_SEARCH_FIELD, payload: {search: value}};
}


export function servicesDownloadRequest(value) {
  return {type: DOWNLOAD_SERVICES_REQUEST, payload: {value}};
}

export function servicesDownloadSuccess(value) {
  return {type: DOWNLOAD_SERVICES_SUCCESS, payload: {value}};
}

export function servicesDownloadFailure(error) {
  return {type: DOWNLOAD_SERVICES_FAILURE, payload: {error}};
}

export function servicesinitState() {
  return {type: DOWNLOAD_SERVICES_INIT_STATE, payload: "init-state"};
}