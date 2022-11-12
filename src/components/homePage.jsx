import InputSearch from './inputSearch';
import ListServices from './listServices';

function HomePage() {
  return (
    <>
      <div className='task'>Поиск</div>
      <InputSearch />
      <div className='task'>Список и подробности</div>
      <ListServices />
    </>
  )
}

export default HomePage;