interface Props {
    mainText: string;
    subText?: string;
}
function Title({mainText, subText}: Props) {
    return ( <h2 className="text-center my-3">
            {mainText}<br />
            {subText &&
            <small className="text-center">
            {subText}
            </small>
    }
            </h2> );
}

export default Title;