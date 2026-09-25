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
        <div className='grid grid-cols-3 gap-3 md:grid-cols-5 border-1 border-red-500'>
            {data && data.map((item) => (
                <div className='border-1 bg-[#0b2639]' key={item.id}>
                    <div>{item.title}</div>
                    <div><img src={item.thumbnail} alt={item.title} /></div>
                    <div>{item.price}</div>
                </div>
            ))}
        </div>
    </>
  )
}

export default ItemList
