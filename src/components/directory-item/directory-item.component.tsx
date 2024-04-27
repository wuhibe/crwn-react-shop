import './directory-item.styles.scss'
import { useNavigate } from 'react-router-dom'

interface DirectoryItemProps {
  title: string
  imageUrl: string
}

const DirectoryItem = ({ title, imageUrl }: DirectoryItemProps) => {
  const navigate = useNavigate()

  return (
    <div
      className='directory-item-container'
      onClick={() => navigate(`/shop/${title}`)}
    >
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='directory-body-container'>
        <h2>{title.toUpperCase()}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  )
}

export default DirectoryItem
