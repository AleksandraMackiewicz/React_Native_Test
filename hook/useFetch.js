import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
         ...query
        },
        headers: {
          'x-rapidapi-key': '8a1422389cmshf25319b8273143cp1a80b5jsnf458e4cca0e7' ,
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      };

      const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request
            (options);

            setData(response.data.data);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            alert('this is an error')
        } finally {
            setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();

      }, []);

      const refetch = () => {
        setIsLoading(true);
        refetch()
      }
      return{ data, isLoading, error, refetch}
} 

export default useFetch;