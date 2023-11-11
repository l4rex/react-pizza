import React from "react"

function Categories({categoryId, onCategoryClick}) {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const onCatClick = (index) => {
    onCategoryClick(index)
  }

  return (
      <div className="categories">
                <ul>
                  {
                    categories.map((el, index) => (
                      <li
                       onClick={()=>onCatClick(index)}
                       className={categoryId === index? 'active' : ''}
                       key={el}
                       >{el}</li>
                    ))
                  }
                </ul>
              </div>
    )
  }

  export default Categories