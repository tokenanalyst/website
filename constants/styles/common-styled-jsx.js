import css from 'styled-jsx/css';

export const underSubNav = css`
  .under-sub-nav {
    padding-top: 60px;
  }
  @media only screen and (max-width: 768px) {
    .under-sub-nav {
      padding-top: 40px;
    }
  }
`;

export const pricingButton = css`
  button {
    background-color: #fff;
    width: 154px;
    height: 37px;
    border-radius: 8px;
    border: solid 2px #35caab;
    font-family: Space Grotesk;
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.13px;
    text-align: center;
    color: #222222;
    cursor: pointer;
  }
  .button {
    background-color: #fff;
    width: 154px;
    height: 37px;
    border-radius: 8px;
    border: solid 2px #35caab;
    font-family: Space Grotesk;
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.13px;
    text-align: center;
    color: #222222;
    cursor: pointer;
  }
  .buttonLink {
    padding-top: 7px;
    padding-bottom: 9px;
    padding-right: 15px;
    padding-left: 15px;
    background-color: #fff;
    width: 154px;
    height: 37px;
    border-radius: 8px;
    border: solid 2px #35caab;
    font-family: Space Grotesk;
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.13px;
    text-align: center;
    color: #252525;
    cursor: pointer;
  }
  .buttonActive {
    background-color: #35caab;
    color: #ffffff;
  }
`;
