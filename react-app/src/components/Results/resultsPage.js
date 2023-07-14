import './resultsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { getAllBusinessesThunk, getSearchResultsThunk } from '../../store/business';
import BusinessCard from './businessCard';

const ResultPage = () => {
  const {keywords} = useParams()
  const dispatch = useDispatch();
  const results = useSelector((state) => state.business?.allBusinesses)

  useEffect(() => {
    if(keywords === 'all') {
      console.log('dispatching get all')
      dispatch(getAllBusinessesThunk())
    }
    else {
      console.log('dispatching keywords', keywords)
      dispatch(getSearchResultsThunk(keywords))
    }
  },[dispatch, keywords])

  if(!results.length) return null
  return (

      <div className='results-page'>
        <div className='results-page-container'>
          <div className='results-page-header'>
            {keywords === 'all' && <h2>All Businesses</h2>}
            {keywords !== 'all' && <h2>{`Search Results for "${keywords}"`}</h2>}
          </div>
          <div className='results-grid'>
            {results && results.map((result, idx) => (
              <BusinessCard key={idx} business={result} idx={idx+1}/>
            ))}
          </div>
          <>
          </>
        </div>
        <div className='results-map'>
          </div>
      </div>
  )
}

export default ResultPage;
