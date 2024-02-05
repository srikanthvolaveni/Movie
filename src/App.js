import React,{useState} from 'react'

const App = () => {
  const [search,setSearch] = useState('')
  const [data,setData] = useState([])

  const submitHandler = e => {
    e.preventDefault();
    fetch(`https://omdbapi.com/?s=${search}&apikey=263d22d8`)
    .then(response => response.json())
    .then(value => setData(value.Search))
    .catch(err => console.log(err))
  }

  const download = url =>{
    fetch(url)
    .then(response =>{
      response.arrayBuffer().then(function(buffer){
        const url = window.URL.createObjectURL(new Blob([buffer]))
        const link = document.createElement('a')
        link.href = url 
        link.setAttribute('download','image.png')
        document.body.appendChild(link)
        link.click();
      })
    })
  }
  return (
    <div>
      <center>
        <h2>Search your Favourite Movie</h2>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/> <br/> <br/>
          <input type="submit" value="Search"/>
        </form> <br/>
        <div className='row'>
          {data.map((movie,index) => 
            <div key={index} className='col-md-4 mb-2'>
              <div class="card" style={{"width": "18rem"}}>
                  <img src={movie.Poster} class="card-img-top" alt={movie.title} />
                  <div class="card-body">
                      <h4>{movie.Title}</h4>
                      <button className='btn btn-primary' onClick={download(movie.Poster)}>Download Poster</button>
                  </div>
              </div>
            </div>
            )}
        </div>
      </center>
    </div>
  )
}

export default App