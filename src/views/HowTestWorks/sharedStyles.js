import styled from 'styled-components'
import Plus from '../../assets/img/icons/Plus.png'

export const ResourcesWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
export const ResourceSection = styled.div`
display: flex;
flex-direction: column;
padding-left: 80px;
margin: 40px
`

export const QAWrapper = styled.div`
width: 60%;
display: column;
justify-content: center;
`
export const ResourcesListItem = styled.div`
padding: 10px;
`
export const ResourceTitle = styled.label`
backgroud-color: white;
color: #5E72E4;
cursor:pointer;
font-size: 1.25rem;
font-family: inherit;
font-weight: bold;
padding-right: 25px;
`
export const Content = styled.div`
max-height: 0;
overflow: hidden;
font-family: 'Oswald', sans-serif;
`

export const ResourceInput = styled.input`
display: none;
&:checked ~ ${Content} {
  max-height: 100%;
}
`


