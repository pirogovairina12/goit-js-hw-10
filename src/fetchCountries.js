
const url = `https://restcountries.com/v3.1`

function fetchCountries(name){
  const queryList = 'name,capital,population,flags,languages';

  return fetch(`${url}/name/${name}??fullText=false&fields=${queryList}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}
export default { fetchCountries };