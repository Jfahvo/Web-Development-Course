const AppNotification = ( {message} ) => {
    if (message === null) {
        return null
    }

    if (message.includes("added")) {
        return (
            <div className="added">
                {message}
            </div>
        )
    }

    if (message.includes("Deleted")) {
        return (
            <div className="deleted">
                {message}
            </div>
        )
    }
    
}

export default AppNotification