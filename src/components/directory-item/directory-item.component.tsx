import './directory-item.styles.scss'

interface DirectoryItemProps {
  title: string
  imageUrl: string
}

const DirectoryItem = ({ title, imageUrl }: DirectoryItemProps) => (
  <div className='directory-item-container'>
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className='directory-body-container'>
      <h2>{title}</h2>
      <p>SHOP NOW</p>
    </div>
  </div>
)

export default DirectoryItem
