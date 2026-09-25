import React, { use, useEffect, useMemo, useState } from 'react'


interface DataProp {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    thumbnail: string,
    category: string
}
const ItemList = () => {
    const [data, setData] = useState<DataProp[] | null>()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('')
    
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

    const allItems = useMemo(() => {
        if(!data) return []
        if(!category) return data
        return data?.filter(a => String(a.category) === category)
    },[data, category])
    
  return (
    <>
    {error ? <div>{error}</div>: loading ? <div>Loading....</div> :
    <>
    <div>
        <div className='text-[#000000] rounded-2xl p-2 px-4 bg-[#afafaf] sticky top-0 flex justify-between'>
            <button onClick={() => setCategory('')}>All</button>
            <button onClick={() => setCategory('beauty')}>Beauty</button>
            <button onClick={() => setCategory('fragrances')}>Fragrances</button>
            <button onClick={() => setCategory('furniture')}>Furniture</button>
            <button onClick={() => setCategory('groceries')}>Groceries</button>
        </div>
        <div className='text-[#000000] p-2 grid grid-cols-2 gap-3 md:grid-cols-3'>
            {allItems && allItems.map((item) => (
                <div className='p-2 pt-1 rounded-xl bg-[#d3d3d3]' key={item.id}>
                    <div className='text-base flex flex-col justify-center min-h-[3.5rem] max-h-[3.5rem] line-clamp-2'>{item.title}</div>
                    <div className='aspect-square w-[100%]'><img src={item.thumbnail} alt={item.title} /></div>
                    <div className='font-bold'>${item.price}</div>
                </div>
            ))}
        </div>

    </div>
    </>
    }
    </>
  )
}

export default ItemList
