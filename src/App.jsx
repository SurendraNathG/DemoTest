import { useEffect, useState } from 'react'
import './App.css'
import he from 'he'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
   handleData() 
  }, [])
  
  async function handleData() {
    try {
      const res = await fetch('https://www.reddit.com/r/reactjs.json')
      const response = await res.json()
       setData(response?.data?.children)
    } catch (error) {
      alert('API is Failing to Fetch data')
    }
  }
  return (
      <div className='container'>
      {
        data?.map((item, index) => {
          return (
            (item?.data?.selftext_html &&
              <div className='cardWrapper' key={index}>
                <h1 className='cardTitle'>{item?.data?.title}</h1>
                <div className='Description' dangerouslySetInnerHTML={{ __html: he?.decode(item?.data?.selftext_html) }}></div>
                <div className='bottomWrapper'>
              <a href={item?.data?.url} target="_blank">
              {"Click here"}
                  </a>
                  <span>{`score : ${item?.data?.score}`}</span>
                  </div>
            </div>
                 )
          )
        })
      }
   </div>
  )
}

export default App
