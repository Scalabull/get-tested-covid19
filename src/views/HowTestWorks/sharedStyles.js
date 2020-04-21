import styled from 'styled-components'

export const ResourcesWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
background-color: #F2F2F2;
padding-bottom: 50px;
`
export const CDCWrapper = styled.div`
width: 43%
`
export const QAWrapper = styled.div`
width: 57%;
display: column;
justify-content: center;
margin-right: 30px;
`

export const ResourceSection = styled.div`
display: flex;
flex-direction: column;
padding-left: 80px;
margin-left: 30px;
margin-top: 40px;
max-width: 100%
`

export const ResourcesListItem = styled.div`
padding: 10px;
background-color: white;
border-radius: 10px;
margin: 5px;
`

export const ResourceTitle = styled.label`
color: #5E72E4;
cursor: pointer;
font-size: 1.25rem;
font-family: inherit;
padding: 5px;
padding-left: 15px;
margin: 0px;
letter-spacing: -0.5px;
font-weight: 500;

& > span{
  color: #828282;
  position: absolute;
right: 46%;
font-size: 170%;
font-weight: lighter;
margin-top: -10px
  }
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
&:checked ~label :first-child{
  display: none
}

&:not(:checked) ~label span ~ :last-child{
  display: none
}
`
export const TextLink = styled.a`
color:#2F80ED`


