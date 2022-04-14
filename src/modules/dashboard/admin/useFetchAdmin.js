import React, { useEffect, useState } from 'react'

import axios from 'axios'
const token = localStorage.getItem('accessToken')

function useFetchAdminGet(url) {
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)

        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setData(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      }
    }
    fetchPosts()
  }, [url])
  return {
    data,
    isLoading,
  }
}

function useFetchAdminPost(url) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const { data } = await axios.get(url)
      setData(data)
      setIsLoading(false)
    }
    fetchPosts()
  }, [url])
  return {
    data,
    isLoading,
  }
}

export default { useFetchAdminGet, useFetchAdminPost }
