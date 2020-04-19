import styled from 'styled-components'
import Plus from '../../assets/img/icons/Plus.png'

export const ResourcesListItem = styled.div`
padding: 10px;
`
export const ResourceTitle = styled.label`
color: #5E72E4;
cursor:pointer;
font-size: 1.25rem;
font-family: inherit;
font-weight: bold;
`
export const Content = styled.div`
max-height: 0;
overflow: hidden;
font-family: 'Oswald', sans-serif;
`

export const ResourceInput = styled.input`
//display: none;
&:checked ~ ${Content} {
  max-height: 100%;
}
`


