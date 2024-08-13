import { Grid } from "@mui/material";
import Navigation from "../components/navigation";
import TableTransaction from "../components/table";
import search from "../Assets/search.jpg";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import '../App.css';
import { useEffect, useState } from "react";

// import './navigation.css';
function Tablepage() {

  const [interchainCounterNumber, setInterChainCounterNumber] = useState(0);
  const [gasfeesSaved, setGasfeesSaved] = useState(0);
 const [interchainTransactions, setInterchainTransactions] = useState([]);
 const [isSearch,setIsSearch] = useState(false);

  const APIURL = 'https://api.studio.thegraph.com/query/53819/zkphype/version/latest'

const interChainCounter = `
  query {
      counters(where : {id : "root"}) {
        dispatchCounter
      }
  }
`
const remoteChain = `
  query {
      chainLists{
        id
        dispatchCounter
      }
  }
`
const totalTransactions = `
  query {
    interchainComputationRequesteds{
      id
      transactionHash
      hash
      verifier
      origin
      dest
      blockTimestamp
    }
  }
`

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})
useEffect(()=>{
  client
  .query({
    query: gql(interChainCounter),
  })
  .then((data) => {console.log('Subgraph data: ', data.data.counters); setInterChainCounterNumber(data.data.counters[0].dispatchCounter)})
  .catch((err) => {
    console.log('Error fetching data: ', err)
  });
},[]) 

useEffect(()=>{
  client
  .query({
    query: gql(remoteChain),
  })
  .then((data) => {console.log('Subgraph data: ', data); })
  .catch((err) => {
    console.log('Error fetching data: ', err)
  });
},[]);

useEffect(()=>{
  client
  .query({
    query: gql(totalTransactions),
  })
  .then((data) => {console.log('Subgraph data: ', data.data.interchainComputationRequesteds); setInterchainTransactions(data.data.interchainComputationRequesteds);
setGasfeesSaved(1000000*data.data.interchainComputationRequesteds?.length)})
  .catch((err) => {
    console.log('Error fetching data: ', err)
  });
},[isSearch]) 

// useEffect(()=>{

// },[!isSearch])
let searchArray=[]
let filteredArray=[]
const handleInputChange =(e)=>{
  console.log(e.target.value,"value")
  if(e.target.value && (e.target.value!==null || e.target.value!==' ' || e.target.value!==undefined)){
  // const pattern = new RegExp(e.target.value, 'i');
  for(let i=0;i<interchainTransactions?.length;i++){
    // if(pattern.test(interchainTransactions[i].transactionHash)){
      if(interchainTransactions[i].transactionHash.startsWith(e.target.value)){
      searchArray.push(interchainTransactions[i])
    }
  }
  setInterchainTransactions(searchArray);
  }
  else{
    setIsSearch(!isSearch);
  }
}
    return (
        <header className="App-header">
      <Grid container spacing={6} columns={12} >
      <Grid item xs={12}>
      <Navigation />
  </Grid>
  <Grid item xs={4}>
  <Grid item xs={12}>
  Total InterChain Computations
  </Grid> <Grid item xs={12}>
     {interchainCounterNumber}
  </Grid>
  </Grid>
  <Grid item xs={4}>
  <Grid item xs={12}>
  Total Gas fees saved
  </Grid> <Grid item xs={12}>
   
     {gasfeesSaved}
    
  </Grid>
  </Grid>
  <Grid item xs={4}>
  <Grid item xs={12}>
  Lowest gas fee chain
  </Grid> <Grid item xs={12}>
    opBNB
  </Grid>
           
  </Grid>
 
  <Grid item xs={12}>
  <Grid item xs={12}>
    <div className='search-maincontainer'>
    <div className='search-container'>
    <input className='search-container' type='text' placeholder='Search by transaction hash' onChange={handleInputChange}/> 
    <img src={search} alt="search" width="40px" height="40px"/>
    </div>
    </div>     
  </Grid>
  <Grid item xs={12}>
    <div className='table-container'>
      <span className='table-caption'>Messages</span>

    <TableTransaction interchainTransactions={interchainTransactions}/>
    </div>
           </Grid>
  </Grid>
      </Grid>
      </header>
    );
  }
  
  export default Tablepage;