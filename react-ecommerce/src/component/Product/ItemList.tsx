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

    const CategoryButton = ['beauty','fragrances','furniture','groceries']
    
  return (
    <>
    {error ? <div>{error}</div>: loading ? <div>Loading....</div> :
        <>
        <div className='flex flex-col items-center align-center'>
            <div className='drop-shadow-sm w-[100%] text-[#000000] py-2 px-4 bg-[#ffffff] sticky top-0 flex justify-between overflow-y-auto no-scrollbar'>
                <button className={`${category === '' ? 'active' : '' } flex justify-center p-1 min-w-[3rem]`} onClick={() => setCategory('')}>All</button>
                {
                    CategoryButton?.map((item) => (
                        <button className={`${category === item ? 'active' : '' } capitalize flex justify-center w-[100%] min-w-[6rem] p-1 px-2`} onClick={() => setCategory(item)} key={item}>
                            {item}
                        </button>
                    ))
                }
            </div>
            <div className='text-[#000000] p-[2vw] py-[2vh] grid grid-cols-2 gap-3 md:grid-cols-3'>
                {allItems && allItems.map((item) => (
                    <div className='p-2 pb-3 rounded-xl bg-[#f1f1f1]' key={item.id}>
                        <div className='font-semibold text-base flex flex-col justify-center min-h-[3.5rem] max-h-[3.5rem] line-clamp-2'>{item.title}</div>
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