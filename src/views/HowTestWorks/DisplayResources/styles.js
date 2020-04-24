import styled from 'styled-components'

export const SourcesWrapper = styled.div`
background-color: #F2F2F2;
padding: 50px 150px 50px 150px;

@media(max-width: 1024px){
  padding: 30px
}
`
export const SourcesUl = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;
padding: 0;
list-style-type: none;

@media(max-width: 414px){
max-width: 100%
   }
`

export const SourceLi = styled.li`
padding: 10px 0px 10px 0px;

@media(max-width: 1024px){
  padding: 5px
}

@media(max-width: 414px){
 font-size: smaller;
 word-wrap: break-word
  }
`
