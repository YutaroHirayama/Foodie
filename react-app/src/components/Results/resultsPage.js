import './resultsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getAllBusinessesThunk } from '../../store/business';
import BusinessCard from './businessCard';

const ResultPage = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.business?.allBusinesses)

  useEffect(() => {
    dispatch(getAllBusinessesThunk())
  },[dispatch])

  if(!results.length) return null
  return (

      <div className='results-page'>
        <div className='results-page-container'>
          <div className='results-page-header'>
            <h2>All Businesses</h2>
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
