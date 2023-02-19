import styled from 'styled-components'
import { EStatuses } from '../types'

type TDatas = {
    title: string,
    data: TData[]
}
type TData = {
    label: string,
    value: number,
    status: string
}
type Props = { data: TDatas, status?: string }
const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border: 2px solid #8D9595 ;
`
const Ceil = styled.div`
    width: 200px;
    height: min-content;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #414F4F;
    color: white;
    font-weight: bold;
    margin: 30px;
    height: auto;

`
const ParList = styled.ul`
    list-style: none;
    padding: 11px;
    margin: 0;
`
const CeilLi = styled.li<{ statusColor: string }>`
    display: flex;
    justify-content: space-between;
    background-color: #414F4F;
    border-radius: 5px;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 5px;
    ${({ statusColor }) => statusColor == EStatuses.WARNING ?
        "background-color: #EB5835;"
        :
        ""};
    ${({ statusColor }) => statusColor == EStatuses.ERROR ?
        "background-color: #FAB82E;"
        :
        ""};
`

export const CeilInfo: React.FC<Props> = ({ data }) => {
    return (
        <Ceil>
            <Title>{data.title}</Title>
            <ParList>
                {data.data.map(e => {
                    return (
                        <CeilLi statusColor={e.status || ''}><span>{e.label}</span><span>{e.value}</span></CeilLi>
                    )
                })}
            </ParList>
        </Ceil>
    )
}