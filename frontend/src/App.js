import axios from 'axios';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [serachData, setSearchData] = useState([]);

  const readableDate = (date) => {
    const dateObject = new Date(date);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:5000/search/${search}`);
    console.log('RES:', res.data.msg);
    setSearchData(res.data.msg);
  };

  return (
    <div className='container' style={{ marginTop: '30px' }}>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            value={search}
            type='text'
            className='form-control'
            aria-describedby='emailHelp'
            placeholder='Enter topic to search'
            onChange={onChange}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          style={{ marginBottom: '40px' }}
        >
          Submit
        </button>
      </form>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Tags</th>
            <th scope='col'>Last Activity</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {serachData &&
            serachData.length &&
            serachData.map((item) => {
              return (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.tags.toString()}</td>

                  <td>{readableDate(item.last_activity_date)}</td>
                  {item.is_answered === false ? (
                    <td>Not Answered</td>
                  ) : (
                    <td>Answered</td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
