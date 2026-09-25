import React, { useEffect, useState } from 'react'


interface DataProp {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    thumbnail: string
}
const ItemList = () => {
    const [data, setData] = useState<DataProp[] | null>()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async ()=> {
            try {
                const res = await fetch('https://dummyjson.com/products')
                if(!res.ok) {
                    throw new Error('Server Error')
                }
                const result = await res.json()
                setData(result.products)
            }
            catch(err) {
                if(err instanceof Error)
                {
                    setError(err.message)
                }
                else {
                    setError('An Error Occured')
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    },[])


  return (
    <>
        <ul>
            {data && data.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    </>
  )
}

export default ItemList
