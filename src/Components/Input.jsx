const Input = ({Ref}) =>{
    return(
        <>
            <div className="title-container">
                <input className="title" type="text" ref={Ref} placeholder="Digite o título da tarefa..." />
            </div>
        </>
    )
}

export default Input