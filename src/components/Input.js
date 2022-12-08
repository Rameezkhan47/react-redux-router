export function Input(props) {
    return (
        <>
            <div className='label'>
                {props.label}
            </div>
            <input type={props.type} name={props.name} value={props.val} onChange={props.change} />
        </>
    );

}