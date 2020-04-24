import styled from 'styled-components'

export const HeadingWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 40px 110px 0px 110px;

@media(max-width: 1024px){
  padding: 0px 20px 0px 20px;
};

@media(max-width: 414px){
  flex-direction: column;
  align-items: center;
}
`
export const HeadingText = styled.div`
padding: 35px 20px 0px 20px;
width: 60%;
display: flex;
flex-direction: column;
color: white;

@media(max-width: 414px){
width: 100%
}
`

export const HeadingImage = styled.img`
object-fit: contain;
width: 30%;

`
