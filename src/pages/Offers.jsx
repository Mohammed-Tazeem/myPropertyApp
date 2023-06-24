import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter } from 'firebase/firestore'
import { db} from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import { BiSad } from 'react-icons/bi'



function Offers() {
    const [listings,setListings] =useState(null)
    const [loading,setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    // eslint-disable-next-line
    const params = useParams()

    useEffect(()=>{
        const fetchListings =async () => {
            try{
                //Get Reference
                
                const listingsRef = collection(db,'listings')

                //create a Query
                const q = query(
                    listingsRef,
                    where('offer','==',true),
                    orderBy('timestamp','desc'),
                    limit(4)
                )

                //Execute The query
                const querySnap = await getDocs(q)
                const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)

                const listings = []

                querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
               

                })

                setListings(listings)
                setLoading(false)
                console.log(listings)

            }catch(error){
                toast.error('Could Not Fetch Listings')
                console.log(error)

            }
        }
        fetchListings()
    },[])

    // Paginarion /Load More
    const onFetchMoreListings =async () => {
        try{
            //Get Reference
            
            const listingsRef = collection(db,'listings')

            //create a Query
            const q = query(
                listingsRef,
                where('offer','==',true),
                orderBy('timestamp','desc'),
                startAfter(lastFetchedListing),
                limit(4)
            )

            //Execute The query
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)
            const listings = []

            querySnap.forEach((doc)=>{
            return listings.push({
                id:doc.id,
                data:doc.data()
            })
           

            })

            setListings((prevState)=>[...prevState,...listings])
            setLoading(false)
            //console.log(listings)

        }catch(error){
            toast.error('Could Not Fetch Listings')
            //console.log(error)

        }
    }

  return (
    <div className='category'>
        <header className='pageHeader'>
            Offers
        </header>
        {loading ?(

        <Spinner/>
        ) : listings && listings.length > 0 ? 
        (<>
        <main>
            <ul className='category flex flex-row'>
                {listings.map((listing)=>(
                  <ListingItem listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                  />  
                    
                ))}

            </ul>

        </main>

        <br/>
        <br/>
        {lastFetchedListing && (
            <p className='loadMore'
            onClick={onFetchMoreListings}>
                Load More
            </p>
        )}
        
        
        </>) : (<p>There Are No Offers For You 
          
          <BiSad />  </p>)}

        

    </div>
  )
}

export default Offers 