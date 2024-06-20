import React from 'react'
import { Image } from 'antd'

export default function Banner({image}) {
  return (
    <div>
      <Image src={image} alt='banner-img' preview={false}/>
    </div>
  )
}
