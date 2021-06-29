import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

export const StyledCol = styled(Col)`
  padding-left: 0.5 rem;
  padding-right: 0.5 rem;
  border-style: solid;
`;

export const StyledRow = styled(Row)`
  padding-top: 0.5 rem;
  margin-left: -0.5 rem;
  margin-right: ;
  &:last-child {
    padding-bottom: 1rem;
  }
`;

const calcRentReturn = (homePrice, monthlyRent, taxRate, monthlyHOA) => {
  const totalRate =
    ((parseFloat(monthlyRent) - parseFloat(monthlyHOA)) * 12) /
      parseFloat(homePrice) -
    parseFloat(taxRate);
  return totalRate;
};

const calcLoanReturn = (homePrice, loanAmount, loanRate) => {
  const totalRate =
    (parseFloat(loanAmount) * parseFloat(loanRate)) / parseFloat(homePrice);
  return totalRate;
};

const AnalyticalTool = () => {
  const [homePrice, setHomePrice] = React.useState(940000);
  const [homePriceAppRate, setHomePriceAppRate] = React.useState(0.02);
  const [monthlyRent, setMonthlyRent] = React.useState(3800);
  const [monthlyHOA, setMonthlyHOA] = React.useState(1000);
  const [taxRate, setTaxRate] = React.useState(0.0155);

  const [loanAmount, setLoanAmount] = React.useState(740000);
  const [loanRate, setLoanRate] = React.useState(0.027);

  return (
    <Container>
      <StyledRow>
        <StyledCol>
          <h1>Rent or Loan</h1>
          <p>
            You need some place to live. You can rent. You can buy usually with
            a loan.
          </p>
          <p>Which one is financially more appealing?</p>
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol sm={4}>
          <form>
            <label>
              Home Price:
              <input
                type="Number"
                value={homePrice}
                onChange={(event) => {
                  setHomePrice(event.target.value);
                }}
              />
            </label>
            <label>
              Monthly Rent:
              <input
                type="Number"
                value={monthlyRent}
                onChange={(event) => {
                  setMonthlyRent(event.target.value);
                }}
              />
            </label>
            <label>
              Monthly HOA:
              <input
                type="Number"
                value={monthlyHOA}
                onChange={(event) => {
                  setMonthlyHOA(event.target.value);
                }}
              />
            </label>
            <label>
              Property Tax:
              <input
                type="Number"
                value={taxRate}
                onChange={(event) => {
                  setTaxRate(event.target.value);
                }}
              />
            </label>
          </form>
        </StyledCol>
        <StyledCol sm={8}>
          <h5>
            Assuming you own the house, what is the rate of return if you rent?
          </h5>
          <p>Rent Annual Return:</p>
          <p>{calcRentReturn(homePrice, monthlyRent, taxRate, monthlyHOA)}</p>
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol sm={4}>
          <form>
            <label>
              Loan Amount:
              <input
                type="Number"
                value={loanAmount}
                onChange={(event) => {
                  setLoanAmount(event.target.value);
                }}
              />
            </label>
            <label>
              Loan Rate:
              <input
                type="Number"
                value={loanRate}
                onChange={(event) => {
                  setLoanRate(event.target.value);
                }}
              />
            </label>
          </form>
        </StyledCol>
        <StyledCol sm={8}>
          <h5>
            Assuming you purchase a house by entering a loan, what is loan rate
            of return you paid in terms of home price?
          </h5>
          <p>Loan Annual Net Return:</p>
          <p>{calcLoanReturn(homePrice, loanAmount, loanRate)}</p>
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol sm={4}>
          <form>
            <label>
              Home Price Appreciation:
              <input
                type="Number"
                value={homePriceAppRate}
                onChange={(event) => {
                  setHomePriceAppRate(event.target.value);
                }}
              />
            </label>
          </form>
        </StyledCol>
        <StyledCol sm={8}>
          <h5>
            Financially, how much you earn if you buy a house with a loan and
            rent it out considering home price appreciation based on the
            downpayment you paid?
          </h5>
          <p>Net Annual Return:</p>
          <p>
            {((calcRentReturn(homePrice, monthlyRent, taxRate, monthlyHOA) -
              calcLoanReturn(homePrice, loanAmount, loanRate) +
              parseFloat(homePriceAppRate)) *
              parseFloat(homePrice)) /
              (parseFloat(homePrice) - parseFloat(loanAmount))}
          </p>
        </StyledCol>
      </StyledRow>
    </Container>
  );
};

ReactDOM.render(
  <React.Fragment>
    <AnalyticalTool />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
