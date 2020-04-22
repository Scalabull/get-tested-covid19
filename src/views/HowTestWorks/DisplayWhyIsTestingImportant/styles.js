import styled from 'styled-components'

export const WhyTestingWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background: white;
padding: 50px 110px 70px 130px;

@media(max-width: 1024px){
  padding: 0px 30px 8px 30px;
}

@media(max-width: 414px){
  flex-direction: column;
  align-items: center;
}
`
export const WhyTestingText = styled.div`
width: 70%;
display: flex;
flex-direction: column;
color: black;
padding-right: 80px;

@media(max-width: 1024px){
  margin-left: 20px;
  & > p {
    font-size: smaller;
  }

  & > h1 {
    font-size: 200%
  }
};

@media(max-width: 414px){
  width: 100%;
  padding: 0px
  }
`

export const WhyTestingImage = styled.img`
object-fit: contain;
width: 30%;
padding-top: 50px;

@media(max-width: 414px){
padding: 5px;
width: 50%
  }
`
