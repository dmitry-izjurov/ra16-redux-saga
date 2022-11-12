import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, retry, debounceTime, switchMap, catchError} from 'rxjs/operators';
import {CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST, DOWNLOAD_SERVICES_REQUEST} from './action';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, servicesDownloadSuccess, servicesDownloadFailure } from './actionCreators';

export const changeSearchEpic = action$ => action$.pipe(
  ofType(CHANGE_SEARCH_FIELD),
  map(o => o.payload.search.trim()),
  debounceTime(100),
  map(o => searchSkillsRequest(o))
);

export const searchSkillsEpic = action$ => action$.pipe(
  ofType(SEARCH_SKILLS_REQUEST),
  map(o => o.payload.search),
  map(o => new URLSearchParams({q: o})),
  switchMap(o => ajax.getJSON(`http://localhost:7070/api/search?${o}`)),
  map(o => searchSkillsSuccess(o)),
  catchError(e => of(searchSkillsFailure(e))),
);

export const servicesDownloadEpic = action$ => action$.pipe(
  ofType(DOWNLOAD_SERVICES_REQUEST),
  map(o => o.payload.value),
  debounceTime(100),
  switchMap(o => ajax.getJSON(`http://localhost:7070/api/services/${o}`).pipe(
    retry(1),
    map(o => servicesDownloadSuccess(o)),
    catchError(e => of(servicesDownloadFailure(e))),
  )),
);