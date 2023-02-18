import styled from 'styled-components'

type TDatas = {
    title: string,
    data: TData[]
}
type TData = {
    label: string,
    value: number
}
type Props = { data: TDatas }
const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border: 2px solid #8D9595 ;
    background-color: #ffffff7f;
`
const Ceil = styled.div`
    width: 300px;
    height: min-content;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #E8EAEA;
    font-weight: bold;
    margin: 30px;
    border: 2px solid #8D9595;
`
const ParList = styled.ul`
    list-style: none;
    padding: 11px;
    margin: 0;
`
const CeilLi = styled.li<{ statusColor: string }>`
    display: flex;
    justify-content: space-between;
 
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 5px;
    ${({ statusColor }) => statusColor == 'danger' ?
        "background-color: #EB5835;"
        :
        ""};
    ${({ statusColor }) => statusColor == 'warning' ?
        "background-color: #FAB82E;"
        :
        ""};
        `
const CeilGray = styled.span`
    background-color: #414F4F;
    border-radius: 5px;
    color: white;
    padding-left: 6px;
    padding-right: 6px;
    padding-bottom: 3px;
    padding-top: 3px;
`

export const CeilInfoWhite: React.FC<Props> = ({ data }) => {
    return (
<<<<<<< HEAD

=======
>>>>>>> ae21cdb (add whire ceil)
        <Ceil>
            <Title>{data.title}</Title>
            <ParList>
                {data.data.map(e => {
                    return (
                        <CeilLi statusColor='default'><span>{e.label}</span><CeilGray>{e.value}</CeilGray></CeilLi>
                    )
                })}
            </ParList>
        </Ceil>
    )
}