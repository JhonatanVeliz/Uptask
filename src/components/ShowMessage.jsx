const ShowMessage = ({ message = '' }) => {
  return (
    <aside className="message__info">
        <p>{ message }</p>
    </aside>
  )
}

export default ShowMessage