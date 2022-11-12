import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, servicesDownloadSuccess, servicesDownloadFailure } from './actionCreators';
import { CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST, DOWNLOAD_SERVICES_REQUEST } from './action';

// - - - - inputSearch - - - - -

export const searchSkills = async (search) => {
  const params = new URLSearchParams({q: search});
  const response = await fetch(`http://localhost:7070/api/search?${params}`);
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  return await response.json();
}


function* watchChangeSearchSaga() {
  yield debounce(100, CHANGE_SEARCH_FIELD, handleChangeSearchSaga);
}

function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga)
}

function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 1;
    const retryDelay = 1000;
    const data = yield retry(retryCount, retryDelay, searchSkills, action.payload.search);
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e));
  }
}

// - - - - listServices - - - - -

export const servicesDownload = async (value) => {
  const response = await fetch(`http://localhost:7070/api/services/${value}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  return await response.json();
}

function* watchDownloadSaga() {
  yield takeLatest(DOWNLOAD_SERVICES_REQUEST, handleDownloadSaga);
}

function* handleDownloadSaga(action) {
  try {
    const retryCount = 2;
    const retryDelay = 1000;
    const data = yield retry(retryCount, retryDelay, servicesDownload, action.payload.value);
    yield put(servicesDownloadSuccess(data));
  } catch (e) {
    yield put(servicesDownloadFailure(e));
  }
}

// - - - - - - - - - - - - - - - -

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  yield spawn(watchDownloadSaga);
}
