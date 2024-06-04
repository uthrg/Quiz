const testHOC = ({ children}) => {
    console.log('!!!!', children)
    return(
        <li style={{ backgroundColor: 'red'}}>
            {children}
        </li>
    )
}

export default testHOC