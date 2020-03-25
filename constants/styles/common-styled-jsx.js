import css from 'styled-jsx/css';

export const styledBorder = css`
  .bottom-selected {
    border-bottom: 2px solid rgb(63, 205, 171);
    opacity: 1;
  }
  .bottom-not-selected::after {
    display: block;
    content: '';
    border-bottom: 2px solid rgb(63, 205, 171);
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  .bottom-not-selected:hover:after {
    transform: scaleX(1);
  }
`;

export const underSubNav = css`
  .under-sub-nav {
    padding-top: 60px;
    margin-left: -10px;
    margin-right: -10px;
  }
  @media only screen and (max-width: 768px) {
    .under-sub-nav {
      padding-top: 40px;
    }
  }
`;

export const blinkyborder = css`
  @-webkit-keyframes blink-2 {
    0% {
      border: 2px solid #eee;
    }
    100% {
      border: 2px solid #35caab;
    }
  }
  @keyframes blink-2 {
    0% {
      border: 2px solid #eee;
    }
    100% {
      border: 2px solid #35caab;
    }
  }

  .blinky-border {
    -webkit-animation: blink-2 2s alternate-reverse infinite both;
    animation: blink-2 2s alternate-reverse infinite both;
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
