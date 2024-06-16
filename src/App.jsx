import {useState, useEffect} from "react";
import {Header} from "./components/Header.jsx";
import {Guitar} from "./components/Guitar.jsx";
import {db} from "./data/db.js";

function App() {

  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  useEffect(() => {
    setData(db)
  }, []);

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
  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id) )
  }
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App