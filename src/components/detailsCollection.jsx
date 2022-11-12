import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { servicesDownloadRequest, servicesinitState } from '../redux/actionCreators';

function DetailsCollection() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {items, loading, error} = useSelector(state => state.services);

  useEffect(() => {
    dispatch(servicesDownloadRequest(`${id}`));
  }, []);

  const handleRetry = e => dispatch(servicesDownloadRequest(`${id}`));
  const handleInit = e => dispatch(servicesinitState());

  return(
    <>
      <section className="wrapper__item">
        {loading && <progress />}
        {!loading && !error ?
          <div className="box_item">
            <span className="item_name">Наименование услуги: {items.name}</span>
            <span className="item_price">Стоимость услуги: {items.price}</span>
            <span className="item_content">Подробно: {items.content}</span>
          </div>
          : undefined}
        {error ?
          <div className="box_error">
            <span className="text-error">Произошла ошибка</span>
            <button type="button" className="button_retry" onClick={handleRetry}>Повторить запрос</button>
          </div>
          : undefined
        }
        <Link className="link_main" to="/" onClick={handleInit} >На главную</Link>
      </section>
    </>
  )
}

export default DetailsCollection;