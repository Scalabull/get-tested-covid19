import styled from 'styled-components'

export const CDCContainer = styled.div`
background-color: #FFCAA4;
border-radius: 30px;
top: 90px;
z-index: 1;
position: sticky;
position: -webkit-sticky;
margin: 120px 100px 0px 30px;
padding: 30px;

@media(max-width: 1024px){
margin: 120px 10px 10px 10px;
max-width: 90%;
font-size: smaller;

& > h5 {
  font-size: smaller
}

& > p
{
  font-size: smaller
}
& > ul{
 font-size: smaller
}
};
@media(max-width: 414px){
  margin: 20px;
  padding: 15px 20px 5px 30px;
};
 `
