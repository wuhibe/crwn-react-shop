import './category-item.styles.scss'

interface CategoryItemProps {
  title: string
  imageUrl: string
}

const CategoryItem = ({ title, imageUrl }: CategoryItemProps) => (
  <div className='category-container'>
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className='category-body-container'>
      <h2>{title}</h2>
      <p>SHOP NOW</p>
    </div>
  </div>
)

export default CategoryItem
