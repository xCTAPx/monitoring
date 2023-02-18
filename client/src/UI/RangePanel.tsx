import styled from 'styled-components'

type Props = {
    title: string,
    value: number,
    max: number,
    units: string
}

const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border: 2px solid #8D9595 ;
    margin-bottom: 10px;
`
const Ceil = styled.div`
    width: 400px;
    padding: 10px;
    border-radius: 10px;
    background-color: #414F4F;
    color: white;
    font-weight: bold;
    margin: 30px;
    margin-bottom: 0;

`
const Pb = styled.div`
    height: 50px;
    width: 100%;
`
const CeilLi = styled.span`
    display: flex;
    justify-content: space-between;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 5px;

`


export const RangePanel: React.FC<Props> = ({ title, value, max, units }) => {
    return (
        <Ceil>
            <Title>{title}</Title>
            <h1>{value}</h1>
            <div className="progress">
                <div className="progress-bar" style={{ width: value / max * 100 + '%' }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} />
            </div>
            <CeilLi>
                <span>{units}</span>
                <span>{max}</span>
            </CeilLi>
        </Ceil>
    )
}