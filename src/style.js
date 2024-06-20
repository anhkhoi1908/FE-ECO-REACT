import styled from "styled-components";
import { Card, Col, Image, InputNumber, Input } from "antd";
import ButtonComponent from "./components/layout/button";

export const WrapperTypeProduct = styled.div `
    display: flex;
    align-items: center;
    gap: 3rem;
    justify-content: center;
    height: 4rem;
    font-weight: 500;
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
    width: 34.8rem;
    height: 56.4rem;
    & img {
        height: 37.4rem;
        width: 34.8rem;
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
    align-items: center;
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
export const WrapperStyleImageSmall = styled(Image)`
    padding: 1rem;
    border: 0.1rem solid #efefef;
    border-radius: 1rem;
    overflow: hidden;
`
export const WrapperStyleColImage = styled(Col)`
    display: flex;
    flex-basis: unset;
`
export const WrapperStyleNameProduct = styled.h1`
    font-size: 3.6rem;
    color: rgb(36,36,36);
    font-weight: 300;
    line-height: 3.2rem;
    word-break: break-word;
    font-weight: 400;
    margin-bottom: 2rem;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 1.5rem;
    color: rgb(120,120,120);
    line-height: 2.4rem;
`
export const WrapperPriceProduct = styled.div`
    background: rgb(250,250,250);
    border-radius: 0.5rem;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 4rem;
    margin-right: 1rem;
    padding: 1rem;
    margin-top: 1rem;
`
export const WrapperAddressProduct = styled.div`
    span.address {
        font-size: 1.5rem;
        text-decoration: underline;
        font-weight: 500;
        line-height: 2.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    };
    span.change-address {
        color: rgb(11,116,229);
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 500;
    }
`
export const WrapperQualityProduct = styled.div`
    display: flex;
    text-align: center;
    gap: 0.4rem;
    align-items: center;
    width: 12rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.4rem;
`
export const WrapperInputNumber = styled(InputNumber)`
    &..ant-input-number-sm input.ant-input-number-input {
        width: 6rem;
        border-top: none !important;
        border-bottom: none;
        height: 3rem !important;
    }
`   
export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 4rem 4.5rem 2.4rem;
`   
export const WrapperContainerRight = styled.div`
    width: 30rem;
    background-color: #000;
    gap: 0.5rem;
`   
export const WrapperTextLight = styled.span`
    color: rgb(13,92,182);
    font-size: 1.3rem;
    cursor: pointer;
` 
export const WrapperInputStyle = styled(Input)`
    color: #333;
    outline: none;
` 
export const WrapperContentPopOver = styled.p`
    cursor: pointer;
    &:hover {
        background: #000;
        color: #fff;
    }
` 