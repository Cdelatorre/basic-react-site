import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ProductCard from './components/product-card/product-card';
import SearchBar from './components/search-bar/search-bar';
import Button from './components/button/button';
import Login from './screen/Login/login';

import './App.css'
import Cart from './components/cart/cart';

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('login')
  const [cart, setCart] = useState([])

  const divRef = useRef('hola')

  const routes = ['products', 'login', 'cart']

  const addToCart = (product) => {
    setCart((prev) => {
      localStorage.setItem("cart", JSON.stringify([...prev, product]));

      return [...prev, product]
    })
  }

  const deleteFromCart = (id) => {
    const filteredCart = cart.filter((product) => {
      return product.id !== id
    })

    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setCart(filteredCart)
  }

  const filterProducts = useCallback(() => {
    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase())
    })

    return filteredProducts;
  }, [products, search])

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart'))
    setCart(cartFromStorage)

    axios.get(`https://fakestoreapi.com/products/?limit=${limit}`)
      .then((products) => {
        setProducts(products.data) // axios devuelve un objeto que tiene mucha info, pero el payload de la api se guarda en la clave "data" de este objeto
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [limit])

  return (
    <>
      <div ref={divRef} className="buttons-routes-container">
        {routes.map((route) => {
          return (
            <Button key={route} action={() => setPage(route)}>
              Show {route}
            </Button>
          )
        })}
      </div>

      <div className="container mt-5">
        {page === "products" && (
          <div id="products-page">
            {loading && 'Loading...'}

            <div className="mb-4 mt-5">
              <h1>PRODUCTS</h1>
              <SearchBar value={search} onChange={setSearch} buttonAction={setLimit} />
            </div>

            <div className="row">
              {filterProducts().map((product) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={product.id}>
                    <ProductCard action={() => addToCart(product)} product={product} />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {
          page === 'login' && (
            <div className='mb-4'>
              <h1>Login Screen</h1>
              <Login onSubmit={() => setPage('products')} />
            </div>
          )
        }

        {
          page === 'cart' && (
            <Cart products={cart} onDeleteProduct={deleteFromCart} />
          )
        }
      </div>
    </>
  )
}

export default App
