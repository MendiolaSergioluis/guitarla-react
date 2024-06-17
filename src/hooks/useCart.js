import {useState, useEffect, useMemo} from "react";
import {db} from '../data/db.js'

function useCart() {
  // Hooks
  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)
  useEffect(() => {
    setData(db)
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Functions
  function initialCart() {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  function addToCart(item) {
    const itemExists = cart.findIndex(i => i.id === item.id)
    if (itemExists >= 0) { // Existe en el carrito
      // Actualizar la cantidad
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else { // No existe en el carrito
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < 12) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  // State derivado
  // eslint-disable-next-line react/prop-types
  const isEmpty = useMemo(() => cart.length === 0, [cart])

  // Reduce
  // eslint-disable-next-line react/prop-types
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0),
    [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}

export default useCart