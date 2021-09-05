import React, {useState,useEffect} from 'react'
import Sneaker from '../../components/Sneaker/Sneaker'
import './SneakersPage.css'
import { useSelector, useDispatch } from 'react-redux'
import {getSneakers} from '../../redux/actions/sneakerActions'
import Accordion from '../../components/Accordion/Accordion'
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate'

const SneakersPage = () => {
    const brands = ['Adidas', 'Jordan', 'Latest', 'Nike', 'Yeezy']
    const { brand } = useParams()
    const dispatch = useDispatch();
    const {sneakers, loading, error} = useSelector(state => state.getSneakers)
    const sessionStorageValue = sessionStorage.getItem('sort_value')
    const [sortValue, setSortValue] = useState(sessionStorageValue === null ? 'default'
     : sessionStorageValue)
    const [category, setCategory] = useState(brand.charAt(0).toUpperCase() + brand.slice(1))
    const [pageNumber, setPageNumber] = useState(0)
    const sneakersPerPage = 12
    const pagesVisited = pageNumber * sneakersPerPage
    const pageCount = Math.ceil(sneakers.length / sneakersPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const sortChangeHandler = (v) => {
        setSortValue(v)
        sessionStorage.setItem('sort_value',v)

    }

    useEffect(() => {
        dispatch(getSneakers(category))
        setPageNumber(0)
    }, [dispatch, category])

    const sortedSneakers = () => { 
        switch (sortValue) {
            case "default":
                sneakers.sort((a,b) => {
                    return a._id < b._id ? -1 : a._id > b._id ? 1 : 0
                })
                break
            case "size":
                sneakers.sort((a,b) => {
                    return Math.max(...a.sizes) - Math.max(...b.sizes)
                })
                break
            case "size-desc":
                sneakers.sort((a,b) => {
                    return Math.max(...b.sizes) - Math.max(...a.sizes)
                })
                break
            case "price":
                sneakers.sort((a,b) => {
                    return Math.max(...a.prices) - Math.max(...b.prices)
                })
                break
            case "price-desc":
                sneakers.sort((a,b) => {
                    return Math.max(...b.prices) - Math.max(...a.prices)
                })
                break
            default:
                break
        }
        let displaySneakers = sneakers.slice(pagesVisited, pagesVisited + sneakersPerPage)


        return (displaySneakers.map((sneakers) => 
        <Sneaker key = {sneakers._id} 
        sneakerId = {sneakers._id}
        name = {sneakers.name}
        style = {sneakers.style}
        brands = {sneakers.brands}    
        sizes = {sneakers.sizes}
        retailPrice = {sneakers.retailPrice}
        colorway = {sneakers.colorway}
        prices = {sneakers.prices}
        quantities = {sneakers.quantities}
        imageUrls = {sneakers.imageUrls}

        />)
        )
    }

    const brandButtonClicked = (name) => {
        setCategory(name)
        setPageNumber(0)
    }

    return (
        <div className = "sneakerspage">
                <h1 className = "sneakerspage_title">{category} Sneakers</h1>
                <div className = "filter_container">
                    <h2>Filter by</h2>
                    <select className = "sort_select" value = {sortValue}
                    onChange = {(e) => sortChangeHandler(e.target.value)}>
                        <option value="default">Default sorting</option>
                        <option value="size">Sort by size: small to large</option>
                        <option value="size-desc">Sort by size: large to small</option>
                        <option value="price">Sort by price: low to high</option>
                        <option value="price-desc">Sort by price: high to low</option>
                    </select>
                </div>

                <div className = "front_container">
                    <div className = "filter_sneaker_container">
                        <div className = "brands_container">
                            <Accordion title = 'Category' buttons = {brands} 
                            buttonClicked = {brandButtonClicked} category = {category} />
       
                        </div>
         
                    </div>
                    <div className = "sneakerspage_sneakers">

                        {loading ?
                        <ReactLoading type = {"spin"} color ={"black"} height = {100} width = {100} />
                        : error ? <h2>{error}</h2> 
                        : 
                        <>
                        {sortedSneakers()}  
      
                        </>
                        }
                    </div>
    
             </div>
             <div className = "pagination_container">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"pagination_buttons"}
                                previousLinkClassName={"previous_button"}
                                nextLinkClassName={"next_button"}
                                disabledClassName={"pagination_disabled"}
                                activeClassName={"pagination_active"}
                            />
                        </div>
    </div>
    )
}

export default SneakersPage
