import styled from 'styled-components'

export const ResourcesWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
background-color: #F2F2F2;
`
export const CDCWrapper = styled.div`
width: 43%
`
export const QAWrapper = styled.div`
width: 57%;
display: column;
justify-content: center;
margin-left: 30px
`

export const ResourceSection = styled.div`
display: flex;
flex-direction: column;
padding-left: 80px;
margin-left: 40px;
margin-top: 40px;
max-width: 100%
`

export const ResourcesListItem = styled.div`
padding: 10px;
background-color: white;
border-radius: 10px;
margin: 5px
`

export const ResourceTitle = styled.label`
backgroud-color: white;
color: #5E72E4;
cursor:pointer;
font-size: 1.25rem;
font-family: inherit;
font-weight: bold;
padding: 5px;
padding-left: 15px;
align: center;
`
export const Content = styled.div`
max-height: 0;
overflow: hidden;
font-family: 'Oswald', sans-serif;
padding-left: 15px;
padding-right: 50px
`

export const ResourceInput = styled.input`
display: none;
&:checked ~ ${Content} {
  max-height: 100%;
}

`


