import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import {addItem} from '../../redux/slices/cartSlice'
import { selectCartItemById } from "../../redux/slices/cartSlice"
import { Link } from "react-router-dom"

function PizzaBlock({id, title, price, image, sizes, types}) {

const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id))
const addedCount = cartItem ? cartItem.count : 0

const {items} = useSelector(state => state.cart)

const dispatch = useDispatch()

const [activeType, setActiveType] = useState(0)

const [activeSize, setActiveSize] = useState(0)

const typesName = ['тонкое', 'традиционное']


const [quontity, setQuontity] = useState(0)



const onAddClick = () => {
  const item = {
    id,
    title, 
    price, 
    image,
    size: sizes[activeSize],
    type: typesName[activeType] 
  }
    dispatch(addItem(item))
    setQuontity(quontity + 1)
    console.log(items)
}

    return(
      <div className="pizza-block-wrapper">
        <div className="pizza-block">
        <Link  to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={image}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
          </Link>
          <div className="pizza-block__selector">
            <ul>
              {
                types.map((el, i) => (
                  <li key={i} onClick={() => setActiveType(i)} className={activeType === i? 'active' : ''}>{typesName[el]}</li>
                ))
              }
            </ul>
            <ul>
              {
                sizes.map((size, i)=> (
                  <li key={i} onClick={() => setActiveSize(i)} className={activeSize === i? 'active' : ''}>{size} см.</li>
                ))
              }
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <div className="button button--outline button--add" onClick={onAddClick}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </div>
          </div>
</div> 
</div>
    )
}

export default PizzaBlock