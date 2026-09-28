import React, { use, useEffect, useMemo, useState } from 'react'
import type { DataProp } from '../../interfaces/Itemlist'
import type { ItemProp } from '../../interfaces/Itemlist'

const ItemList = () => {
    const [data, setData] = useState<DataProp[] | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('')
    const [previewItem, setPreviewItem] = useState<ItemProp | null>()
    const [showPreview, setShowPreview] = useState(false)
    
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
    
    const itemClick = (item:number) => {
        const seletedItem = data?.find((d) => d.id === item) 
        console.log(seletedItem)
        if(seletedItem) {
            setPreviewItem({
                previewTitle: seletedItem?.title,
                previewPrice: seletedItem?.price,
                previewThumbnail: seletedItem?.thumbnail
            })
            setShowPreview(true)
        }
    }
  return (
    <>
    {error ? <div>{error}</div>: loading ? <div>Loading....</div> :
        <>
        <div className='flex flex-col items-center align-center'>
            <div className='sticky top-[-0.05rem] text-xl drop-shadow-sm w-[100%] text-[#000000] py-2 px-4 bg-[#ffffff] flex gap-3 justify-between overflow-y-auto min-h-12'>
                <button className={`${category === '' ? 'active' : '' } flex justify-center py-1 px-5`} onClick={() => setCategory('')}>All</button>
                {
                    CategoryButton?.map((item) => (
                        <button className={`${category === item ? 'active' : '' } capitalize flex justify-center w-[100%] py-1 px-4`} onClick={() => setCategory(item)} key={item}>
                            {item}
                        </button>
                    ))
                }
            </div>
            <div className='text-[#000000] p-[2vw] py-[2vh] grid gap-3 grid-cols-2 md:grid-cols-4'>
                {allItems && allItems.map((item) => (
                    <div className='p-2 pb-3 rounded-xl bg-[#f1f1f1]' key={item.id} onClick={() => itemClick(item.id)}>
                        <div className='font-semibold text-base flex flex-col justify-center min-h-[3.5rem] max-h-[3.5rem] line-clamp-2'>{item.title}</div>
                        <div className='aspect-square w-[100%]'><img src={item.thumbnail} alt={item.title} /></div>
                        <div className='font-bold'>${item.price}</div>
                    </div>
                ))}
            </div>
        </div>
        {
            showPreview &&
            <div className='flex items-center align-center justify-center fixed top-0 z-1 backdrop-blur-md bg-[#dbdbdb00] h-full w-full'>
                <div className='bg-[#f9f9f9] flex justify-center items-center py-2 px-4 rounded-xl flex flex-col w-fit drop-shadow-md'>
                    <div className='text-xl max-w-70'>{previewItem?.previewTitle}</div>
                    <div className='aspect-square w-50'>
                        <img src={previewItem?.previewThumbnail} alt="previewItem?.previewTitle" />
                    </div>
                    <div className='text-xl font-bold'>{previewItem?.previewPrice}</div>
                    <div className='w-full text-white my-3 flex flex-col gap-2 text-xl font-semibold'>
                        <button className='py-0.5 rounded-xl bg-[#3b87f9] w-full'>ADD</button>
                        <button className='py-0.5 rounded-xl bg-[#ed3939] w-full' onClick={() => setShowPreview(false)}>CANCEL</button>
                    </div>
                </div> 
            </div>
        }
        </>
    }
    </>
  )
}

export default ItemList