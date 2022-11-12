import { useDispatch, useSelector } from 'react-redux';
import { changeSearchField } from '../redux/actionCreators';

function InputSearch() {
  const {items, loading, error, search} = useSelector(state => state.skills);

  const dispatch = useDispatch();

  const handleSearch = e => {
    const {value} = e.target;
    dispatch(changeSearchField(value));
  };

  const hasQuery = search.trim() !== '';

  return (
    <>
      <div className="wrapper">
        <input className="input" type="search" value={search} onChange={handleSearch}/>
      </div>
      {!hasQuery && <div>Type something to search</div>}
      {hasQuery && loading && <div>searching...</div>}
      {error ?
        <div>Error occured</div>
        :
        <ul>{items.map(o =>
          <li key={o.id}>{o.name}</li>)}
        </ul>}
    </>
  )
}
  
export default InputSearch;
