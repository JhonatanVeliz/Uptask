
const FarewellImg = ({ img = '', title = '', refTo = '#' }) => {
  return (
    <a href={ refTo } className='farewell__link' target='_blank'>

      <img className='farewell__img' src={img} alt={`perfil de ${title}`} />

      <aside className='farewell__info'>
        <img src="/img/profiles/github.png" alt="icono de github" />
        <span>{ title }</span>
      </aside>

    </a>
  )
}

export default FarewellImg