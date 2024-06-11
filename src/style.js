import styled from "styled-components";
import { Card, Col } from "antd";
import ButtonComponent from "./components/layout/button";

export const WrapperTypeProduct = styled.div `
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: flex-start;
    border-bottom: 1px solid #000;
    height: 3rem;
`
export const StyleNameProduct = styled.div `
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1rem;
    color: rgb(56, 56, 61);
`
export const WrapperReportText = styled.div `
    color: rgb(128, 128, 137);
    font-size: 1.1rem;
    margin: 0.6rem 0 0;
`
export const WrapperPriceText = styled.div `
    color: rgb(255, 66, 78);
    font-size: 1.6rem;
    font-weight: 500;

`
export const WrapperDiscountText = styled.span `
    color: rgb(255, 66, 78);
    font-size: 1.2rem;
    font-weight: 500;
`
export const WrapperCardStyle = styled(Card) `
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
`
export const WrapperLabelText = styled.h4`
    color: rgb(56, 56, 61);
    font-size: 1.4rem;
    font-weight: 500;
`
export const WrapperTextValue = styled.div`
    color: rgb(56, 56, 61);
    font-size: 1.2rem;
    font-weight: 400;
`
export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
    color: #fff;
    background: rgb(13, 92, 182);
    }
`
export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
`
export const WrapperNavbar = styled(Col)`
    backgroundColor: '#fff'; 
    margin-right: 2rem;
    padding: '1rem'; 
    borderRadius: '1rem';
    height: fit-content;
    margin-top: 2rem;
`



