import styled from 'styled-components'

export const HowTestingWorksWrapper = styled.main`
overflow: visible;
@media(max-width: 414px){
  width: 100%;
  overflow: hidden;
}
`

export const ResourcesWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
background-color: #F2F2F2;
padding-bottom: 50px;

@media(max-width: 414px){
  flex-direction: column-reverse;
  padding-bottom: 0px;

}
`
export const CDCWrapper = styled.div`
width: 43%;
@media(max-width: 414px){
  width: 100%
}

`
export const QAWrapper = styled.div`
width: 57%;
display: column;
justify-content: center;
margin-right: 30px;

@media(max-width: 1024px){
  width: 80%;
  margin-right: 5px
};
@media(max-width: 414px){
  width: 100%;
  padding-bottom: 20px
}
`

export const ResourceSection = styled.div`
display: flex;
flex-direction: column;
padding-left: 80px;
margin-left: 30px;
margin-top: 40px;
max-width: 100%;

@media(max-width: 1024px){
  padding: 0px;
}

@media(max-width: 414px){
  margin: 0px 20px 0px 20px;

  & > h1{
    font-size: 150%
  }
}
`

export const ResourcesListItem = styled.div`
padding: 10px;
background-color: white;
border-radius: 10px;
margin: 5px;

@media(max-width: 1024px) {
  padding: 5px
}
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
right: 47%;
font-size: 170%;
font-weight: lighter;
margin-top: -10px
  }

  @media(max-width: 1024px){
    font-size: smaller;

    & > span {
      right: 38%
    }
  }
    @media(max-width: 414px){
      font-size: 70%;
      word-wrap: break-word;
      & > span {
        right: 10%
      }
    }
`
export const Content = styled.div`
max-height: 0;
overflow: hidden;
font-family: 'Oswald', sans-serif;
padding-left: 15px;
padding-right: 50px;

@media(max-width: 1024px){
  padding: 0px 15px 0px 15px;

  & > div > p {
  font-size: smaller
  };
  & > p {
    font-size: smaller
  };
  & > p > ul > li{
    font-size: smaller
  };
  & > div > ul > p > li{
    font-size: smaller
  }
}
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

export const ShareButton = styled.button`
background: none;
border: none;
position: relative;
display: inline-block;
cursor: pointer;
highlight-color: none;
text-decoration: underline;
&:active{
  outline: 0;
}

& > span {
    visibility: hidden;
    width: 350px;
    background-color: #5e72e4;
    opacity: 80%;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    top: 125%;
    left: 50%;
    margin-left: -200px;
}
`

