const Alerts = ({ alert }) => {
    return (
        <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-2 rounded-xl uppercase text-white font-bold text-sm my-5`}>
            {alert.msg}
        </div>
    )
}

export default Alerts