const Content = ({reftextarea}) => {
    return (
        <>
            <div>
                <textarea className="content" ref={reftextarea} name="" id="" placeholder="Digite o conteúdo da tarefa..."></textarea>
            </div>
        </>
    )
}

export default Content